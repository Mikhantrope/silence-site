/* SILENCE — ui.compare.js
   index.html, блок «Как это выглядит» (маркетинговое ТЗ, Шаг 4). Никакой
   выдуманной суммарной толщины систем — в данных её нет ни у одной из 20
   (проверено: клей, демпфер, утеплитель, глубина профиля и финиш нигде не
   указаны в мм). Сравнение опирается только на реально известные толщины
   несущих панелей/плит, разница — честно на замер. Карточки открывают
   реальные карточки систем (wf-standart / w-frame) через core.openCardOverlay. */
(function (global) {
  'use strict';

  function render(node) {
    var C = global.SILENCE_CORE, SITE = global.SITE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [t('compareTitle')]),
      C.el('p', { class: 'lead' }, [t('compareLead')])
    ]));

    var frameless = C.findItem('wf-standart');
    var framed = C.findItem('w-frame');

    var grid = C.el('div', { class: 'cards-grid compare-grid' });
    [
      { item: frameless, titleKey: 'compareFrameless', descKey: 'compareFramelessDesc' },
      { item: framed, titleKey: 'compareFrame', descKey: 'compareFrameDesc' }
    ].forEach(function (entry) {
      if (!entry.item) return;
      var card = C.el('button', { type: 'button', class: 'card compare-card', 'data-analytics': 'compare_card_click', 'data-analytics-value': entry.item.id }, [
        C.el('img', { src: entry.item.img, alt: t(entry.titleKey), loading: 'lazy' }),
        C.el('span', { class: 'card__name' }, [t(entry.titleKey)]),
        C.el('span', { class: 'compare-card__desc' }, [t(entry.descKey)]),
        C.el('span', { class: 'compare-card__cta u-accent' }, [t('dPage')])
      ]);
      card.addEventListener('click', function () {
        C.openCardOverlay(C.renderCardBody(entry.item, lang));
      });
      grid.appendChild(card);
    });
    wrap.appendChild(grid);

    /* реальные фото смонтированных систем — не «до/после», честная подпись */
    var shots = SITE.gallery.slice(0, 3);
    var allCaptions = SITE.gallery.map(function (_, i) {
      var entry = SITE.galleryCaptions && SITE.galleryCaptions[i];
      return entry ? (entry[lang] || entry.ru) : null;
    });
    wrap.appendChild(C.el('p', { class: 'caption u-muted compare-gal-caption' }, [t('compareGalCaption')]));
    var strip = C.el('div', { class: 'cards-grid compare-gal-strip' });
    shots.forEach(function (src, i) {
      var btn = C.el('button', { type: 'button', class: 'gallery-shot', 'data-analytics': 'gallery_open', 'data-analytics-value': 'compare-' + i }, [
        C.el('img', { src: src, alt: allCaptions[i] || t('galTitle'), loading: 'lazy' })
      ]);
      btn.addEventListener('click', function () { C.openGalleryViewer(SITE.gallery, i, allCaptions); });
      strip.appendChild(btn);
    });
    wrap.appendChild(strip);

    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.compare = render;
}(window));
