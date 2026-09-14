/* SILENCE — ui.systems.js
   systems.html: таблица всех 20 систем (CATALOG.systems) с фильтром по
   назначению (place) и типу конструкции (kind: frame|frameless — для
   floor/partition отдельного типа нет, в колонке прочерк), сортировкой
   по показателю (to) и несущей способности (load). Строка открывает ту
   же карточку позиции, что и каталог (core.renderCardBody). Мобильный
   вид — карточками (см. components.css), не горизонтальный скролл. */
(function (global) {
  'use strict';

  var PLACES = ['wall', 'ceiling', 'floor', 'partition'];
  var PLACE_KEY = { wall: 'sysWall', ceiling: 'sysCeiling', floor: 'sysFloor', partition: 'sysPartition' };
  var KIND_KEY = { frame: 'sysFrame', frameless: 'sysFrameless' };

  var state = { place: '', kind: '', sort: null, dir: 1 };

  function kindLabel(t, kind) {
    return KIND_KEY[kind] ? t(KIND_KEY[kind]) : '\u2014';
  }

  function rowsFor() {
    var CATALOG = global.CATALOG;
    var rows = CATALOG.systems.slice();
    if (state.place) rows = rows.filter(function (s) { return s.place === state.place; });
    if (state.kind) rows = rows.filter(function (s) { return s.kind === state.kind; });
    if (state.sort === 'index') rows.sort(function (a, b) { return (a.to - b.to) * state.dir; });
    if (state.sort === 'load') rows.sort(function (a, b) { return (a.load - b.load) * state.dir; });
    return rows;
  }

  function openRow(item, lang) {
    var C = global.SILENCE_CORE;
    C.openCardOverlay(C.renderCardBody(item, lang));
    global.history.replaceState(null, '', '#sys-' + item.id);
  }

  function render(node) {
    var C = global.SILENCE_CORE;
    var SITE = global.SITE, CATALOG = global.CATALOG;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };
    var dbUnit = (SITE.specs.rw[lang] || SITE.specs.rw.ru)[1];

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container systems-page' });
    wrap.appendChild(C.el('h1', {}, [t('sysTitle')]));
    wrap.appendChild(C.el('p', { class: 'lead' }, [t('sysLead')]));

    var filters = C.el('div', { class: 'systems-filters' });

    var placeBar = C.el('div', { class: 'catalog-filter', role: 'group' }, [
      C.el('button', { class: 'switch-btn', type: 'button', 'data-place': '', 'aria-pressed': state.place === '' ? 'true' : 'false' }, [t('tblAll')])
    ].concat(PLACES.map(function (p) {
      return C.el('button', { class: 'switch-btn', type: 'button', 'data-place': p, 'aria-pressed': state.place === p ? 'true' : 'false' }, [t(PLACE_KEY[p])]);
    })));

    var kindBar = C.el('div', { class: 'catalog-filter', role: 'group' }, [
      C.el('button', { class: 'switch-btn', type: 'button', 'data-kind': '', 'aria-pressed': state.kind === '' ? 'true' : 'false' }, [t('tblAll')]),
      C.el('button', { class: 'switch-btn', type: 'button', 'data-kind': 'frameless', 'aria-pressed': state.kind === 'frameless' ? 'true' : 'false' }, [t('tblFrameless')]),
      C.el('button', { class: 'switch-btn', type: 'button', 'data-kind': 'frame', 'aria-pressed': state.kind === 'frame' ? 'true' : 'false' }, [t('tblFrame')])
    ]);

    filters.appendChild(placeBar);
    filters.appendChild(kindBar);
    wrap.appendChild(filters);

    var countLine = C.el('p', { class: 'caption u-muted systems-count' });
    wrap.appendChild(countLine);

    var tableHost = C.el('div', { class: 'systems-table-host' });
    wrap.appendChild(tableHost);
    node.appendChild(wrap);

    function sortBtn(label, key) {
      var btn = C.el('button', { type: 'button', class: 'systems-sort-btn' }, [
        label, C.el('span', { class: 'systems-sort-arrow', 'aria-hidden': 'true' }, [state.sort === key ? (state.dir === 1 ? '\u2191' : '\u2193') : ''])
      ]);
      btn.addEventListener('click', function () {
        if (state.sort === key) state.dir = -state.dir; else { state.sort = key; state.dir = 1; }
        renderTable();
      });
      return btn;
    }

    function renderTable() {
      tableHost.innerHTML = '';
      var rows = rowsFor();
      countLine.textContent = t('tblFound') + ': ' + rows.length;

      if (rows.length === 0) {
        tableHost.appendChild(C.el('p', { class: 'lead' }, [t('tblNothing')]));
        return;
      }

      var table = C.el('table', { class: 'systems-table' });
      var thead = C.el('thead', {}, [
        C.el('tr', {}, [
          C.el('th', {}, [t('tblName')]),
          C.el('th', {}, [t('tblPlace')]),
          C.el('th', {}, [t('tblKind')]),
          C.el('th', {}, [sortBtn(t('tblIndex'), 'index')]),
          C.el('th', {}, [sortBtn(t('tblLoad'), 'load')])
        ])
      ]);
      var tbody = C.el('tbody', {}, rows.map(function (s) {
        var range = s.from === s.to ? String(s.from) : (s.from + '\u2013' + s.to);
        var tr = C.el('tr', { class: 'systems-row', tabindex: '0', id: 'sys-' + s.id }, [
          C.el('td', { 'data-label': t('tblName') }, [s.name]),
          C.el('td', { 'data-label': t('tblPlace') }, [t(PLACE_KEY[s.place])]),
          C.el('td', { 'data-label': t('tblKind') }, [kindLabel(t, s.kind)]),
          C.el('td', { 'data-label': t('tblIndex') }, [s.ix + ' ' + range + ' ' + dbUnit]),
          C.el('td', { 'data-label': t('tblLoad') }, [s.load ? (s.load + ' ' + t('sysLoad')) : '\u2014'])
        ]);
        tr.addEventListener('click', function () { openRow(s, lang); });
        tr.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRow(s, lang); }
        });
        return tr;
      }));
      table.appendChild(thead);
      table.appendChild(tbody);
      tableHost.appendChild(table);
    }

    C.$$('[data-place]', placeBar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.place = btn.getAttribute('data-place');
        C.$$('[data-place]', placeBar).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        renderTable();
      });
    });
    C.$$('[data-kind]', kindBar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.kind = btn.getAttribute('data-kind');
        C.$$('[data-kind]', kindBar).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        renderTable();
      });
    });

    renderTable();

    C.onHash(function (hash) {
      if (hash.indexOf('sys-') !== 0) return;
      var id = hash.slice(4);
      var item = CATALOG.systems.filter(function (s) { return s.id === id; })[0];
      if (item) global.SILENCE_CORE.openCardOverlay(global.SILENCE_CORE.renderCardBody(item, lang));
    });
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.systems = render;
}(window));
