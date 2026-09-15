/* SILENCE — ui.section.js
   index.html, интерактивный разрез (ТЗ 5). Волны уже впечатаны в картинку —
   SVG рисует только прозрачные интерактивные области поверх неё.

   Координаты зон — в процентах от размеров изображения, а не в пикселях:
   viewBox="0 0 100 100" + preserveAspectRatio="none" даёт систему координат,
   где 1 единица = 1% ширины/высоты, поэтому при любом размере контейнера
   зоны остаются приклеенными к своим квартирам.

   Значения выверены по реальному файлу assets/rooms/section.webp (1254×1254),
   а не взяты из ориентировочной таблицы исходного ТЗ: верхняя и нижняя
   квартиры занимают всю ширину дома между кирпичными колоннами, а не
   центральную треть, и зоны не пересекаются между собой.

   Десктоп и мобильный — два независимых режима, переключаются через
   matchMedia (Шаг 8), а не CSS-реflow: при смене режима DOM предыдущего
   полностью уничтожается перед тем, как строится DOM следующего. */
(function (global) {
  'use strict';

  /* Место (place) выверено с заказчиком и НЕ совпадает с ориентировочной
     таблицей исходного ТЗ (там была ошибка): лево и право — оба wall,
     с разной рамкой в тексте (воздушный / ударный шум), а не отдельные
     сценарии neighbors/heard. Порядок массива = порядок обхода по Tab на
     десктопе (верх → лево → право → низ). */
  var ZONES = [
    { id: 'top',    place: 'ceiling',  labelKey: 'sectionZoneTop',    descKey: 'sectionZoneTopDesc',    x: 0,  y: 0,  w: 100, h: 30 },
    { id: 'left',   place: 'wall',     labelKey: 'sectionZoneLeft',   descKey: 'sectionZoneLeftDesc',   x: 0,  y: 30, w: 29,  h: 38 },
    { id: 'right',  place: 'wall',     labelKey: 'sectionZoneRight',  descKey: 'sectionZoneRightDesc',  x: 71, y: 30, w: 29,  h: 38 },
    { id: 'bottom', place: 'floor',    labelKey: 'sectionZoneBottom', descKey: 'sectionZoneBottomDesc', x: 0,  y: 68, w: 100, h: 32 }
  ];

  /* центр не кликабелен: это результат, а не проблема */
  var CENTER = { id: 'center', x: 29, y: 30, w: 42, h: 38, labelKey: 'sectionZoneCenter' };

  /* декоративные точки-источники звука для мягкой анимации волн */
  var WAVE_SOURCES = [
    { id: 'top', cx: 50, cy: 14, r0: 2.1, r1: 10.6, delays: [0, 0.85, 1.7] },
    { id: 'left', cx: 14.5, cy: 48, r0: 1.8, r1: 8.2, delays: [0.2, 1.05, 1.9] },
    { id: 'right', cx: 85.5, cy: 48, r0: 1.8, r1: 8.2, delays: [0.45, 1.3, 2.15] },
    { id: 'bottom', cx: 50, cy: 84, r0: 2.2, r1: 10.4, delays: [0.7, 1.55, 2.4] }
  ];

  /* две карточки рядом с разрезом — существующие сценарии из SITE.scenarios,
     которые на самом разрезе не размещаются (см. переписку с заказчиком):
     heard — направление волн наружу, echo — на картинке этого источника нет.
     У них нет зоны на картинке (zoneId остаётся null везде ниже). */
  var SIDE_CARD_IDS = ['heard', 'echo'];

  /* три системы по месту, отсортированные по верхней границе показателя
     (order: убывание — сильнейший вариант первым), без единой выдуманной
     цифры — только то, что есть в CATALOG.systems. */
  function findSuitedSystems(place, limit) {
    var CATALOG = global.CATALOG;
    return CATALOG.systems
      .filter(function (s) { return s.place === place; })
      .slice()
      .sort(function (a, b) { return b.to - a.to; })
      .slice(0, limit || 3);
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k) && attrs[k] != null) {
        node.setAttribute(k, attrs[k]);
      }
    }
    return node;
  }

  function buildWaveGroup(source) {
    var group = svgEl('g', {
      class: 'cutaway__wave-group',
      'data-wave-source': source.id,
      'aria-hidden': 'true'
    });

    group.appendChild(svgEl('circle', {
      class: 'cutaway__wave-core',
      cx: source.cx, cy: source.cy, r: Math.max(0.9, source.r0 * 0.45)
    }));

    source.delays.forEach(function (delay) {
      var ring = svgEl('circle', {
        class: 'cutaway__wave-ring',
        cx: source.cx, cy: source.cy, r: source.r0
      });
      ring.appendChild(svgEl('animate', {
        attributeName: 'r',
        values: source.r0 + ';' + source.r1,
        dur: '2.8s',
        begin: delay + 's',
        repeatCount: 'indefinite'
      }));
      ring.appendChild(svgEl('animate', {
        attributeName: 'opacity',
        values: '0;0.42;0',
        keyTimes: '0;0.2;1',
        dur: '2.8s',
        begin: delay + 's',
        repeatCount: 'indefinite'
      }));
      group.appendChild(ring);
    });

    return group;
  }

  /* interactive=false (мобильный режим): без tabindex/role/aria-pressed —
     на разрезе на мобильном нет кликабельных зон вообще, картинка чисто
     иллюстративная, попасть пальцем в 14%-ширины квартиру всё равно нельзя. */
  function buildOverlay(host, lang, interactive) {
    var C = global.SILENCE_CORE;
    var t = function (k) { return C.t(k, lang); };

    host.innerHTML = '';
    var svg = svgEl('svg', {
      class: 'cutaway__svg',
      viewBox: '0 0 100 100',
      preserveAspectRatio: 'none',
      'aria-label': t('sectionTitle')
    });

    var defs = svgEl('defs', {});
    var gradient = svgEl('radialGradient', { id: 'cutawayPulseGradient', cx: '50%', cy: '50%', r: '70%' });
    gradient.appendChild(svgEl('stop', { class: 'cutaway__pulse-stop-in', offset: '0%' }));
    gradient.appendChild(svgEl('stop', { class: 'cutaway__pulse-stop-out', offset: '100%' }));
    defs.appendChild(gradient);
    svg.appendChild(defs);

    WAVE_SOURCES.forEach(function (source) {
      svg.appendChild(buildWaveGroup(source));
    });

    svg.appendChild(svgEl('rect', {
      class: 'cutaway__zone cutaway__zone--center',
      'data-zone': CENTER.id,
      x: CENTER.x, y: CENTER.y, width: CENTER.w, height: CENTER.h,
      'aria-hidden': 'true', 'pointer-events': 'none'
    }));

    ZONES.forEach(function (z) {
      var attrs = {
        class: 'cutaway__zone cutaway__zone--hit' + (interactive ? '' : ' cutaway__zone--static'),
        'data-zone': z.id,
        'data-place': z.place,
        x: z.x, y: z.y, width: z.w, height: z.h
      };
      if (interactive) {
        attrs.tabindex = '0';
        attrs.role = 'button';
        attrs['aria-pressed'] = 'false';
        attrs['aria-label'] = t(z.labelKey);
      } else {
        attrs['aria-hidden'] = 'true';
        attrs['pointer-events'] = 'none';
      }
      svg.appendChild(svgEl('rect', attrs));
    });

    /* пульсирующая/статичная подсветка активной зоны — отдельные rect'ы
       поверх, вне потока кликов/наведения, только opacity анимируется */
    ZONES.forEach(function (z) {
      svg.appendChild(svgEl('rect', {
        class: 'cutaway__zone-pulse',
        'data-zone-pulse': z.id,
        x: z.x, y: z.y, width: z.w, height: z.h,
        fill: 'url(#cutawayPulseGradient)',
        'pointer-events': 'none',
        'aria-hidden': 'true'
      }));
    });

    host.appendChild(svg);
    return svg;
  }

  function systemsList(C, SITE, lang, place) {
    var systems = findSuitedSystems(place, 3);
    var list = C.el('ul', { class: 'cutaway__systems' });
    systems.forEach(function (s) {
      var unitEntry = SITE.specs[s.ix.toLowerCase()];
      var unit = unitEntry ? (unitEntry[lang] || unitEntry.ru) : null;
      var unitLabel = unit ? unit[1] : 'дБ';
      var range = s.from === s.to ? String(s.from) : (s.from + '\u2013' + s.to);
      list.appendChild(C.el('li', { class: 'cutaway__system' }, [
        C.el('span', { class: 'cutaway__system-name' }, [s.name]),
        C.el('span', { class: 'cutaway__system-index u-accent' }, [s.ix + ' ' + range + (unitLabel ? ' ' + unitLabel : '')])
      ]));
    });
    return list;
  }

  function sideCards(C, SITE, lang, t) {
    var host = C.el('div', { class: 'cutaway__side-cards' });
    SIDE_CARD_IDS.forEach(function (id) {
      var sc = SITE.scenarios.filter(function (s) { return s.id === id; })[0];
      if (!sc) return; /* защитный отказ — не выдумываем карточку без данных */
      var copy = sc[lang] || sc.ru;
      var href = sc.anchor ? ('catalog.html#' + sc.anchor) : ('catalog.html#place-' + sc.filterPlace);
      host.appendChild(C.el('a', {
        class: 'card cutaway__side-card',
        href: href,
        'data-analytics': 'section_side_card_click',
        'data-analytics-value': id
      }, [
        C.el('img', { src: sc.img, alt: copy.title, loading: 'lazy' }),
        C.el('span', { class: 'card__name' }, [copy.title]),
        C.el('span', { class: 'cutaway__side-card-desc' }, [copy.desc])
      ]));
    });
    return host;
  }

  /* ================= ДЕСКТОП ================= */

  function buildDesktop(svg, contentHost, lang, t) {
    var C = global.SILENCE_CORE, SITE = global.SITE;
    var zoneEls = C.$$('.cutaway__zone--hit', svg);
    var centerEl = svg.querySelector('.cutaway__zone--center');

    var panel = C.el('div', { class: 'cutaway__panel' });
    contentHost.appendChild(panel);
    contentHost.appendChild(sideCards(C, SITE, lang, t));

    function renderEmpty() {
      panel.innerHTML = '';
      panel.appendChild(C.el('h3', {}, [t('sectionEmptyTitle')]));
      panel.appendChild(C.el('p', { class: 'lead' }, [t('sectionEmptyText')]));
    }

    function renderZone(zone) {
      panel.innerHTML = '';
      panel.appendChild(C.el('h3', {}, [t(zone.labelKey)]));
      panel.appendChild(C.el('p', {}, [t(zone.descKey)]));

      /* Incoming bass/speech from below is NOT sold as a floor-system task.
         ΔLn,w describes impact-noise reduction in the opposite direction. */
      if (zone.id === 'bottom') {
        panel.appendChild(C.el('p', { class: 'cutaway__diagnostic-note' }, [
          lang === 'kz' ? 'Бұл жерде типтік еден жүйесін бірден ұсынбаймыз: алдымен дыбыстың қай жолмен өтетінін анықтау керек.' :
          (lang === 'en' ? 'We do not prescribe a floor system here by default: the transmission path should be identified first.' :
          'Здесь не выдаём напольную систему как готовый ответ: сначала нужно определить путь передачи шума.')
        ]));
        panel.appendChild(C.el('div', { class: 'cutaway__actions' }, [
          C.el('a', {
            class: 'btn btn--primary', href: 'contacts.html?problem=below',
            'data-analytics': 'section_zone_diagnostic_click', 'data-analytics-value': zone.id
          }, [lang === 'kz' ? 'Жағдайды талдау' : (lang === 'en' ? 'Assess the situation' : 'Разобрать ситуацию')])
        ]));
        return;
      }

      panel.appendChild(C.el('p', { class: 'caption u-muted cutaway__suited-label' }, [t('sectionSuited')]));
      panel.appendChild(systemsList(C, SITE, lang, zone.place));
      var problem = zone.id === 'top' ? 'repair' : (zone.id === 'right' ? 'music' : 'talk');
      var zoneActions = C.el('div', { class: 'cutaway__actions' }, [
        C.el('a', {
          class: 'btn btn--primary',
          href: 'contacts.html?problem=' + encodeURIComponent(problem) + '&surface=' + encodeURIComponent(zone.place),
          'data-analytics': 'section_zone_quote_click', 'data-analytics-value': zone.id
        }, [lang === 'kz' ? 'Есеп алу' : (lang === 'en' ? 'Get a quote' : 'Рассчитать решение')]),
        C.el('a', {
          class: 'btn btn--secondary', href: 'catalog.html#place-' + zone.place,
          'data-analytics': 'section_zone_catalog_click', 'data-analytics-value': zone.id
        }, [t('sectionCatalogCta')])
      ]);
      panel.appendChild(zoneActions);
    }

    function dimOthers(exceptEl) {
      zoneEls.forEach(function (el) { if (el !== exceptEl) el.classList.add('cutaway__zone--dim'); });
    }
    function clearDim() {
      zoneEls.forEach(function (el) { el.classList.remove('cutaway__zone--dim'); });
    }

    function select(zoneId, el) {
      var zone = ZONES.filter(function (z) { return z.id === zoneId; })[0];
      if (!zone) return;
      zoneEls.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === el));
        other.classList.toggle('cutaway__zone--active', other === el);
      });
      C.$$('.cutaway__zone-pulse', svg).forEach(function (p) {
        p.classList.toggle('cutaway__zone-pulse--active', p.getAttribute('data-zone-pulse') === zoneId);
      });
      if (centerEl) centerEl.classList.add('cutaway__zone--center-active');
      renderZone(zone);
      if (global.SILENCE_TRACK) global.SILENCE_TRACK('section_zone_click', { value: zoneId });
    }

    var handlers = [];
    function on(el, evt, fn) { el.addEventListener(evt, fn); handlers.push({ el: el, evt: evt, fn: fn }); }

    zoneEls.forEach(function (el) {
      var zoneId = el.getAttribute('data-zone');
      on(el, 'mouseenter', function () { dimOthers(el); });
      on(el, 'mouseleave', clearDim);
      on(el, 'focus', function () { dimOthers(el); });
      on(el, 'blur', clearDim);
      on(el, 'click', function () { select(zoneId, el); });
      on(el, 'keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          select(zoneId, el);
        }
      });
    });

    renderEmpty();

    return function cleanup() {
      handlers.forEach(function (h) { h.el.removeEventListener(h.evt, h.fn); });
    };
  }

  /* ================= МОБИЛЬНЫЙ ================= */

  /* На телефоне не повторяем шесть полноразмерных карточек. Пять компактных
     входов переключают ОДНУ карточку с деталями. Левую/правую стену объединяем
     в один понятный сценарий «за стеной». */
  function getMobileEntries(lang, t) {
    var SITE = global.SITE;
    function scenario(id) {
      var sc = SITE.scenarios.filter(function (s) { return s.id === id; })[0];
      if (!sc) return null;
      var copy = sc[lang] || sc.ru;
      return { scenario: sc, copy: copy };
    }
    var n = scenario('neighbors');
    var h = scenario('heard');
    var e = scenario('echo');
    var labels = lang === 'kz'
      ? { top:'Жоғарыдан', wall:'Қабырға', bottom:'Төменнен', heard:'Мені естиді', echo:'Жаңғырық' }
      : (lang === 'en'
        ? { top:'Above', wall:'Wall', bottom:'Below', heard:'I can be heard', echo:'Echo' }
        : { top:'Сверху', wall:'За стеной', bottom:'Снизу', heard:'Меня слышат', echo:'Эхо' });

    return [
      { id:'top', zoneId:'top', short:labels.top, title:t('sectionZoneTop'), desc:t('sectionZoneTopDesc'), place:'ceiling', problem:'repair', catalog:'catalog.html#place-ceiling' },
      n ? { id:'wall', zoneId:'left', short:labels.wall, title:n.copy.title, desc:n.copy.desc, place:'wall', problem:'talk', catalog:'catalog.html#place-wall' } : null,
      { id:'bottom', zoneId:'bottom', short:labels.bottom, title:t('sectionZoneBottom'), desc:t('sectionZoneBottomDesc'), problem:'below', diagnostic:true },
      h ? { id:'heard', zoneId:null, short:labels.heard, title:h.copy.title, desc:h.copy.desc, problem:'music', fullContour:true } : null,
      e ? { id:'echo', zoneId:null, short:labels.echo, title:e.copy.title, desc:e.copy.desc, problem:'echo', surface:'acoustics', catalog:'catalog.html#decor', echo:true } : null
    ].filter(Boolean);
  }

  function buildMobile(svg, contentHost, lang, t) {
    var C = global.SILENCE_CORE;
    var entries = getMobileEntries(lang, t);
    var tabs = C.el('div', { class: 'cutaway__mobile-tabs', role: 'tablist', 'aria-label': t('sectionEmptyTitle') });
    var detail = C.el('article', { class: 'cutaway__mobile-detail' });
    contentHost.appendChild(tabs);
    contentHost.appendChild(detail);

    var centerEl = svg.querySelector('.cutaway__zone--center');
    var pulses = C.$$('.cutaway__zone-pulse', svg);
    var buttons = [];

    function setActiveZone(zoneId) {
      pulses.forEach(function (p) {
        p.classList.toggle('cutaway__zone-pulse--active', !!zoneId && p.getAttribute('data-zone-pulse') === zoneId);
      });
      if (centerEl) centerEl.classList.toggle('cutaway__zone--center-active', !!zoneId);
    }

    function contactHref(entry) {
      var q = new URLSearchParams();
      if (entry.problem) q.set('problem', entry.problem);
      if (entry.place) q.set('surface', entry.place);
      if (entry.surface) q.set('surface', entry.surface);
      return 'contacts.html?' + q.toString();
    }

    function renderEntry(entry) {
      detail.innerHTML = '';
      detail.appendChild(C.el('h3', {}, [entry.title]));
      detail.appendChild(C.el('p', {}, [entry.desc]));

      if (entry.diagnostic) {
        detail.appendChild(C.el('p', { class:'cutaway__diagnostic-note' }, [
          lang === 'kz' ? 'Төменнен келетін бас пен сөйлеуге ΔLn,w еден көрсеткішін тікелей қолдануға болмайды — алдымен берілу жолын анықтаймыз.' :
          (lang === 'en' ? 'A floor ΔLn,w rating is not a direct answer for incoming bass or speech from below — first identify the transmission path.' :
          'Для входящего баса и речи снизу нельзя напрямую применять ΔLn,w пола — сначала определяем путь передачи.')
        ]));
      }
      if (entry.fullContour) {
        detail.appendChild(C.el('p', { class:'caption u-muted' }, [
          lang === 'kz' ? 'Мұнда бір қабырға емес, толық контур қарастырылады: қабырға + төбе + еден.' :
          (lang === 'en' ? 'This is a full-envelope task rather than a single-wall solution: walls + ceiling + floor.' :
          'Здесь рассматривается не одна стена, а полный контур: стены + потолок + пол.')
        ]));
      }
      if (entry.echo) {
        detail.appendChild(C.el('p', { class:'caption u-muted' }, [
          lang === 'kz' ? 'Бұл дыбыс оқшаулау емес: бөлме ішіндегі шағылуды азайтатын акустикалық панельдер қажет.' :
          (lang === 'en' ? 'This is room acoustics, not neighbour sound insulation: use sound-absorbing panels to reduce reflections.' :
          'Это акустика помещения, а не шумоизоляция от соседей: нужны звукопоглощающие панели против отражений.')
        ]));
      }

      var actions = C.el('div', { class:'cutaway__actions' });
      actions.appendChild(C.el('a', {
        class:'btn btn--primary', href:contactHref(entry),
        'data-analytics':'section_mobile_quote_click', 'data-analytics-value':entry.id
      }, [entry.diagnostic
        ? (lang === 'kz' ? 'Жағдайды талдау' : (lang === 'en' ? 'Assess the situation' : 'Разобрать ситуацию'))
        : (lang === 'kz' ? 'Есеп алу' : (lang === 'en' ? 'Get a quote' : 'Рассчитать решение'))]));
      if (entry.catalog) {
        actions.appendChild(C.el('a', {
          class:'btn btn--secondary', href:entry.catalog,
          'data-analytics':'section_mobile_catalog_click', 'data-analytics-value':entry.id
        }, [t('sectionCatalogCta')]));
      }
      detail.appendChild(actions);
      setActiveZone(entry.zoneId);
      buttons.forEach(function (b) {
        var active = b.entry.id === entry.id;
        b.el.classList.toggle('cutaway__mobile-tab--active', active);
        b.el.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (global.SILENCE_TRACK) global.SILENCE_TRACK('section_mobile_tab', { value: entry.id });
    }

    entries.forEach(function (entry) {
      var btn = C.el('button', {
        class:'cutaway__mobile-tab', type:'button', role:'tab', 'aria-selected':'false',
        'data-analytics':'section_mobile_tab_click', 'data-analytics-value':entry.id
      }, [entry.short]);
      btn.addEventListener('click', function () { renderEntry(entry); });
      tabs.appendChild(btn);
      buttons.push({ el:btn, entry:entry });
    });

    if (entries.length) renderEntry(entries[0]);
    return function cleanup() {};
  }

  /* ================= ПЕРЕКЛЮЧЕНИЕ РЕЖИМОВ ================= */

  function render(node) {
    var C = global.SILENCE_CORE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };

    /* картинка с оверлеем теперь физически в герое (один инстанс, не два),
       а не внутри этой секции — ищем её по всему документу, ключи
       data-cutaway-* на странице встречаются ровно по одному разу. */
    var overlayHost = document.querySelector('[data-cutaway-overlay]');
    var contentHost = node.querySelector('[data-cutaway-content]');
    if (!overlayHost || !contentHost) return;

    var mql = global.matchMedia('(max-width: 720px)');
    var cleanup = null;

    function apply() {
      if (cleanup) { cleanup(); cleanup = null; }
      contentHost.innerHTML = '';
      var mobile = mql.matches;
      var svg = buildOverlay(overlayHost, lang, !mobile);
      cleanup = mobile ? buildMobile(svg, contentHost, lang, t) : buildDesktop(svg, contentHost, lang, t);
      if (global.SILENCE_TRACK) {
        global.SILENCE_TRACK('section_mode', { value: mobile ? 'mobile' : 'desktop' });
      }
    }

    if (mql.addEventListener) mql.addEventListener('change', apply);
    else if (mql.addListener) mql.addListener(apply); /* старые Safari */

    apply();
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES['section-cutaway'] = render;

  global.SILENCE_SECTION = {
    ZONES: ZONES,
    CENTER: CENTER,
    WAVE_SOURCES: WAVE_SOURCES,
    SIDE_CARD_IDS: SIDE_CARD_IDS,
    findSuitedSystems: findSuitedSystems,
    getMobileEntries: getMobileEntries,
    buildWaveGroup: buildWaveGroup,
    buildOverlay: buildOverlay,
    svgEl: svgEl
  };
}(window));
