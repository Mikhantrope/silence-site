/* SILENCE — ui.picker.js
   Блок подбора по шуму: шкала 0–60 дБ (SITE.scale), отметка норматива
   (SITE.NORM_WALL), под ней — перегородки из CATALOG.systems (place ===
   'partition'), верхняя граница индекса которых достигает выбранного
   значения. Единица «дБ/dB» берётся из SITE.specs.rw[lang][1], не
   зашивается в JS построчно на языке. */
(function (global) {
  'use strict';

  function pct(db) { return (db / 60 * 100).toFixed(2) + '%'; }

  function render(node) {
    var C = global.SILENCE_CORE;
    var SITE = global.SITE;
    var CATALOG = global.CATALOG;
    if (!C || !SITE || !CATALOG) return;

    var lang = C.getLang();
    var table = SITE.t[lang];
    var dbUnit = (SITE.specs.rw[lang] || SITE.specs.rw.ru)[1];
    var selected = (node._picker && node._picker.selected) || SITE.scale[0].db;

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container picker' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [table.pickTitle]),
      C.el('p', { class: 'lead' }, [table.pickLead])
    ]));

    var track = C.el('div', { class: 'picker__track', role: 'group', 'aria-label': table.pickTitle });

    var normMark = C.el('div', { class: 'picker__norm-mark' }, [
      C.el('span', { class: 'picker__norm-label' }, [table.pickNormMark])
    ]);
    normMark.style.setProperty('--pos', pct(SITE.NORM_WALL));
    track.appendChild(normMark);

    SITE.scale.forEach(function (step) {
      var label = table.sc[step.key];
      var btn = C.el('button', {
        type: 'button',
        class: 'picker__tick',
        'data-db': String(step.db),
        'aria-pressed': String(step.db === selected),
        'data-analytics': 'picker_select_level',
        'data-analytics-value': String(step.db)
      }, [
        C.el('span', { class: 'picker__tick-db' }, [String(step.db) + ' ' + dbUnit]),
        C.el('span', { class: 'picker__tick-label' }, [label])
      ]);
      btn.style.setProperty('--pos', pct(step.db));
      btn.addEventListener('click', function () { select(step.db); });
      track.appendChild(btn);
    });
    wrap.appendChild(track);

    var results = C.el('div', { class: 'picker__results cards-grid' });
    wrap.appendChild(results);
    wrap.appendChild(C.el('p', { class: 'caption picker__note' }, [table.pickNote]));
    node.appendChild(wrap);

    function select(db) {
      node._picker = { selected: db };
      C.$$('.picker__tick', track).forEach(function (b) {
        b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-db')) === db));
      });
      renderResults(db);
    }

    function renderResults(db) {
      results.innerHTML = '';
      var matches = CATALOG.systems.filter(function (s) {
        return s.place === 'partition' && s.to >= db;
      });
      if (matches.length === 0) {
        var noneWrap = C.el('div', { class: 'picker__none' }, [
          C.el('p', {}, [table.pickNone]),
          C.el('a', { class: 'btn btn--secondary', href: 'contacts.html', 'data-analytics': 'picker_none_cta_click' }, [table.pickNoneCta])
        ]);
        results.appendChild(noneWrap);
        return;
      }
      matches.forEach(function (s) {
        var range = s.from === s.to ? (s.from + ' ' + dbUnit) : (s.from + '\u2013' + s.to + ' ' + dbUnit);
        var card = C.el('a', { class: 'card picker__result', href: 'systems.html#sys-' + s.id, 'data-analytics': 'picker_open_result', 'data-analytics-value': s.id }, [
          C.el('span', { class: 'card__index' }, [range]),
          C.el('span', { class: 'card__name' }, [s.name]),
          C.el('span', { class: 'card__cta' }, [table.pickOpen])
        ]);
        results.appendChild(card);
      });
    }

    select(selected);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.picker = render;
}(window));
