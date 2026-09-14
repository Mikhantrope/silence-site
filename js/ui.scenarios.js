/* SILENCE — ui.scenarios.js
   index.html, блок «узнай свою ситуацию» (маркетинговое ТЗ, Шаг 3): 4
   карточки из SITE.scenarios, каждая ведёт в catalog.html#place-<place>
   (кроме echo — там просто якорь #decor, у декора нет поля place). */
(function (global) {
  'use strict';

  function render(node) {
    var C = global.SILENCE_CORE, SITE = global.SITE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [t('scenariosTitle')]),
      C.el('p', { class: 'lead' }, [t('scenariosLead')])
    ]));

    var grid = C.el('div', { class: 'cards-grid scenarios-grid' });
    SITE.scenarios.forEach(function (s) {
      var copy = s[lang] || s.ru;
      var href = s.anchor ? 'catalog.html#' + s.anchor : 'catalog.html#place-' + s.filterPlace;
      var card = C.el('a', { class: 'card scenario-card', href: href, 'data-analytics': 'scenario_click', 'data-analytics-value': s.id }, [
        C.el('img', { src: s.img, alt: copy.title, loading: 'lazy' }),
        C.el('span', { class: 'card__name' }, [copy.title]),
        C.el('span', { class: 'scenario-card__desc' }, [copy.desc])
      ]);
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.scenarios = render;
}(window));
