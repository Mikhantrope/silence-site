/* SILENCE — ui.catalog.js
   Пять групп каталога в один список (catalog.html), плюс тизер-версия
   для index.html (data-mount="catalog-teaser"). Режим показа позиции
   берётся из данных: full === true -> разворот альбома (крупное фото +
   переход на страницу разворота), иначе -> строка с таблицей характеристик
   (SITE.specs даёт подпись и единицу на каждый ключ specs[]). Фильтр по
   месту применения работает на системах и материалах (у них есть place);
   декор и комплектующие места применения не имеют и не участвуют в фильтре. */
(function (global) {
  'use strict';

  var PLACES = ['wall', 'ceiling', 'floor', 'partition'];
  var PLACE_LABEL_KEY = { wall: 'sysWall', ceiling: 'sysCeiling', floor: 'sysFloor', partition: 'sysPartition' };

  function openDetail(item, lang) {
    var C = global.SILENCE_CORE;
    C.openCardOverlay(C.renderCardBody(item, lang));
  }

  function renderFullCard(el, C, t, item, lang) {
    var name = typeof item.name === 'string' ? item.name : (item.name[lang] || item.name.ru);
    var btn = el('button', { type: 'button', class: 'card catalog-card catalog-card--full' }, [
      el('img', { src: item.img, alt: name, loading: 'lazy' }),
      el('span', { class: 'card__name' }, [name]),
      el('span', { class: 'card__cta' }, [t('dPage')])
    ]);
    btn.addEventListener('click', function () { openDetail(item, lang); });
    return btn;
  }

  function renderTableCard(el, C, t, item, lang) {
    var name = typeof item.name === 'string' ? item.name : (item.name[lang] || item.name.ru);
    var children = [el('span', { class: 'card__name' }, [name])];
    if (item.specs) {
      var lines = C.specLine(item.specs, lang);
      children.push(el('ul', { class: 'catalog-card__specs' }, lines.map(function (l) { return el('li', {}, [l]); })));
    }
    if (item.variants) {
      children.push(el('p', { class: 'caption' }, [t('decVariants') + ': ' + item.variants]));
    }
    if (item.formats) {
      children.push(el('p', { class: 'caption' }, [t('decFormats') + ': ' + item.formats.join(' \u00B7 ')]));
    }
    if (item.table) {
      var headers = item.table[0].length === 4
        ? [t('thName'), t('thSize'), t('thMetal'), t('thWeight')]
        : [t('thName'), t('thSize'), t('thMetal')];
      var tableEl = el('table', { class: 'catalog-card__table' }, [
        el('thead', {}, [el('tr', {}, headers.map(function (h) { return el('th', {}, [h]); }))]),
        el('tbody', {}, item.table.map(function (row) {
          return el('tr', {}, row.map(function (cell) { return el('td', {}, [String(cell)]); }));
        }))
      ]);
      children.push(tableEl);
    }
    if (item.img && !item.formats) {
      children.unshift(el('img', { src: item.img, alt: name, loading: 'lazy' }));
    }
    var card = el('button', { type: 'button', class: 'card catalog-card catalog-card--table' }, children);
    card.addEventListener('click', function () { openDetail(item, lang); });
    return card;
  }

  function renderGroup(node, groupKey, items, opts) {
    var C = global.SILENCE_CORE;
    var SITE = global.SITE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };
    opts = opts || {};

    var section = C.el('div', { class: 'catalog-group', id: opts.anchorId });
    section.appendChild(C.el('h3', {}, [t(opts.titleKey)]));
    if (opts.leadKey) section.appendChild(C.el('p', { class: 'lead' }, [t(opts.leadKey)]));

    var grid = C.el('div', { class: 'cards-grid catalog-group__grid' });
    items.forEach(function (item) {
      var card = item.full === true
        ? renderFullCard(C.el, C, t, item, lang)
        : renderTableCard(C.el, C, t, item, lang);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    node.appendChild(section);
    return items.length;
  }

  function buildGroups(node, filterPlace) {
    var CATALOG = global.CATALOG;
    node.innerHTML = '';
    var counts = {};

    var systems = filterPlace ? CATALOG.systems.filter(function (s) { return s.place === filterPlace; }) : CATALOG.systems;
    counts.solutions = renderGroup(node, 'solutions', systems, { anchorId: 'solutions', titleKey: 'grpSolutions' });

    var panels = CATALOG.materials.filter(function (m) { return m.group === 'panel' && (!filterPlace || m.place === filterPlace); });
    counts.panels = renderGroup(node, 'panels', panels, { anchorId: 'panels', titleKey: 'grpPanels' });

    var sheets = CATALOG.materials.filter(function (m) { return m.group === 'sheet' && (!filterPlace || m.place === filterPlace || m.place === 'any'); });
    counts.materials = renderGroup(node, 'materials', sheets, { anchorId: 'materials', titleKey: 'grpMaterials' });

    /* декор и комплектующие места применения не имеют — фильтр их не касается */
    counts.decor = renderGroup(node, 'decor', CATALOG.decor, { anchorId: 'decor', titleKey: 'grpDecor' });
    counts.parts = renderGroup(node, 'parts', CATALOG.parts, { anchorId: 'parts', titleKey: 'grpParts' });

    return counts;
  }

  function renderCatalogPage(node) {
    var C = global.SILENCE_CORE;
    var SITE = global.SITE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };

    var hashPlace = (global.location.hash || '').replace('#place-', '');
    var initialPlace = PLACES.indexOf(hashPlace) !== -1 ? hashPlace : '';

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container catalog' });
    wrap.appendChild(C.el('h1', {}, [t('catTitle')]));
    wrap.appendChild(C.el('p', { class: 'lead' }, [t('catLead')]));

    var filterBar = C.el('div', { class: 'catalog-filter', role: 'group' }, [
      C.el('button', { class: 'switch-btn', type: 'button', 'data-place': '', 'aria-pressed': String(initialPlace === '') }, [t('tblAll')])
    ].concat(PLACES.map(function (p) {
      return C.el('button', { class: 'switch-btn', type: 'button', 'data-place': p, 'aria-pressed': String(initialPlace === p) }, [t(PLACE_LABEL_KEY[p])]);
    })));
    wrap.appendChild(filterBar);

    var groupsHost = C.el('div', { class: 'catalog-groups' });
    wrap.appendChild(groupsHost);
    node.appendChild(wrap);

    buildGroups(groupsHost, initialPlace);

    C.$$('.catalog-filter .switch-btn', filterBar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        C.$$('.catalog-filter .switch-btn', filterBar).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        buildGroups(groupsHost, btn.getAttribute('data-place'));
      });
    });

    injectProductJsonLd(lang);
  }

  /* Schema.org Product для 20 готовых систем (Шаг 11 маркетингового ТЗ).
     Никакой цены/offers — в данных её нет, а требовать её для Product не
     обязательно по спецификации. Только реально существующие поля:
     name, description, image, category. Перегенерируется при смене языка
     на этой же странице, чтобы не плодить теги — старый удаляется первым. */
  function injectProductJsonLd(lang) {
    var C = global.SILENCE_CORE, CATALOG = global.CATALOG;
    var old = document.getElementById('product-jsonld');
    if (old) old.parentNode.removeChild(old);

    var items = CATALOG.systems.map(function (s) {
      return {
        '@type': 'Product',
        name: s.name,
        description: (s.desc && (s.desc[lang] || s.desc.ru)) || '',
        image: s.img || undefined,
        category: t_(lang, PLACE_LABEL_KEY[s.place])
      };
    });

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'product-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': items
    });
    document.head.appendChild(script);
  }

  function t_(lang, key) {
    var SITE = global.SITE;
    var table = SITE.t[lang] || SITE.t.ru;
    return table[key] || '';
  }

  function renderTeaser(node) {
    var C = global.SILENCE_CORE;
    var CATALOG = global.CATALOG;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };
    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [t('catTitle')]),
      C.el('p', { class: 'lead' }, [t('catLead')])
    ]));
    var tiles = C.el('div', { class: 'cards-grid catalog-teaser__grid' });
    var groupKeys = ['grpSolutions', 'grpPanels', 'grpMaterials', 'grpDecor', 'grpParts'];
    groupKeys.forEach(function (key, i) {
      var anchors = ['solutions', 'panels', 'materials', 'decor', 'parts'];
      tiles.appendChild(C.el('a', { class: 'card', href: 'catalog.html#' + anchors[i] }, [
        C.el('span', { class: 'card__name' }, [t(key)])
      ]));
    });
    wrap.appendChild(tiles);
    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.catalog = renderCatalogPage;
  global.SILENCE_PAGES['catalog-teaser'] = renderTeaser;
}(window));
