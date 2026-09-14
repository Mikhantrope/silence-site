/* SILENCE — ui.trust.js
   index.html, блок «Почему это сработает» (маркетинговое ТЗ, Шаг 7). Две
   шкалы читаются раздельно, потому что это разные величины: дельта-системы
   поверх существующей конструкции (from/to = прирост в дБ) и готовые
   перегородки с нуля (from/to = абсолютный Rw, сравнимый с нормативом
   SITE.NORM_WALL). Ни одна формулировка не обещает полной тишины —
   см. core.decodeRwKey(). */
(function (global) {
  'use strict';

  var DELTA_BANDS = [
    { max: 10, key: 'rwDeltaLow' },
    { max: 15, key: 'rwDeltaMid' },
    { max: Infinity, key: 'rwDeltaHigh' }
  ];
  var PARTITION_BANDS = [
    { max: 51, key: 'rwBelowNorm' },
    { max: 55, key: 'rwMeetsNorm' },
    { max: Infinity, key: 'rwAboveNorm' }
  ];

  function render(node) {
    var C = global.SILENCE_CORE, SITE = global.SITE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [t('trustTitle')]),
      C.el('p', { class: 'lead trust-lead' }, [t('trustLead')])
    ]));

    var grid = C.el('div', { class: 'cards-grid trust-grid' });

    var deltaCard = C.el('div', { class: 'card trust-card' }, [
      C.el('span', { class: 'card__name' }, [t('trustDeltaTitle')])
    ]);
    var deltaList = C.el('ul', { class: 'trust-scale' });
    DELTA_BANDS.forEach(function (b) { deltaList.appendChild(C.el('li', {}, [t(b.key)])); });
    deltaCard.appendChild(deltaList);

    var partCard = C.el('div', { class: 'card trust-card' }, [
      C.el('span', { class: 'card__name' }, [t('trustPartitionTitle')])
    ]);
    var partList = C.el('ul', { class: 'trust-scale' });
    PARTITION_BANDS.forEach(function (b) { partList.appendChild(C.el('li', {}, [t(b.key)])); });
    partCard.appendChild(partList);

    grid.appendChild(deltaCard);
    grid.appendChild(partCard);
    wrap.appendChild(grid);

    wrap.appendChild(C.el('p', { class: 'caption u-muted trust-certs' }, [t('certs')]));
    var normsGrid = C.el('div', { class: 'cards-grid trust-norms' });
    ['sn', 'sp'].forEach(function (key) {
      var doc = (global.SILENCE_NORMS || {})[key];
      if (!doc) return;
      var body = doc[lang] || doc.ru;
      var btn = C.el('button', { type: 'button', class: 'card trust-norm-card', 'data-analytics': 'trust_norm_open', 'data-analytics-value': key }, [
        C.el('span', { class: 'card__name' }, [body.title]),
        C.el('span', { class: 'u-accent' }, [t('normMore')])
      ]);
      btn.addEventListener('click', function () { C.openNormDetail(key, lang); });
      normsGrid.appendChild(btn);
    });
    wrap.appendChild(normsGrid);

    wrap.appendChild(C.el('a', { class: 'btn btn--secondary trust-certs-cta', href: 'contacts.html', 'data-analytics': 'trust_certs_cta_click' }, [t('trustCertsCta')]));

    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.trust = render;
}(window));
