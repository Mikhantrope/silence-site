/* SILENCE — core.js
   Общее ядро: el()/$(), i18n поверх SITE.t, применение темы (после
   theme-init.js), оверлеи с ловушкой фокуса, простой роутинг по hash.
   ES5-совместимо, без модулей, без fetch для данных. */
(function (global) {
  'use strict';

  var LANG_KEY = 'silence.lang';
  var THEME_KEY = 'silence.theme';
  var DEFAULT_LANG = 'ru';
  var LANGS = ['ru', 'kz', 'en'];

  // ---------- DOM helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    for (var key in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, key)) continue;
      var val = attrs[key];
      if (val == null || val === false) continue;
      if (key === 'class') node.className = val;
      else if (key === 'html') node.innerHTML = val; /* только с доверенными данными из data.*.js */
      else if (key.indexOf('on') === 0 && typeof val === 'function') {
        node.addEventListener(key.slice(2).toLowerCase(), val);
      } else {
        node.setAttribute(key, val);
      }
    }
    children = children || [];
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (child == null) continue;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
  }

  // ---------- i18n ----------
  function getLang() {
    var stored = null;
    try { stored = global.localStorage.getItem(LANG_KEY); } catch (e) { /* noop */ }
    return LANGS.indexOf(stored) !== -1 ? stored : DEFAULT_LANG;
  }

  function t(key, lang) {
    var SITE = global.SITE || {};
    var table = SITE.t && SITE.t[lang || getLang()];
    if (!table || !(key in table)) return key;
    return table[key];
  }

  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT_LANG;
    try { global.localStorage.setItem(LANG_KEY, lang); } catch (e) { /* noop */ }
    document.documentElement.setAttribute('lang', lang === 'kz' ? 'kk' : lang);

    $$('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      var value = t(key, lang);
      if (node.hasAttribute('data-i18n-html')) node.innerHTML = value;
      else node.textContent = value;
    });
    $$('[data-i18n-attr]').forEach(function (node) {
      /* формат: data-i18n-attr="placeholder:formName|aria-label:closeBtn" */
      var spec = node.getAttribute('data-i18n-attr').split('|');
      for (var i = 0; i < spec.length; i++) {
        var pair = spec[i].split(':');
        if (pair.length === 2) node.setAttribute(pair[0], t(pair[1], lang));
      }
    });
    $$('.switch-btn[data-lang]').forEach(function (btn) {
      var pressed = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });

    document.dispatchEvent(new CustomEvent('silence:lang', { detail: { lang: lang } }));
  }

  // ---------- тема ----------
  function getTheme() {
    var stored = null;
    try { stored = global.localStorage.getItem(THEME_KEY); } catch (e) { /* noop */ }
    return stored === 'light' || stored === 'dark'
      ? stored
      : document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function applyTheme(theme) {
    theme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    try { global.localStorage.setItem(THEME_KEY, theme); } catch (e) { /* noop */ }
    $$('.switch-btn[data-theme-choice]').forEach(function (btn) {
      var pressed = btn.getAttribute('data-theme-choice') === theme;
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    });
    document.dispatchEvent(new CustomEvent('silence:theme', { detail: { theme: theme } }));
  }

  // ---------- оверлеи с ловушкой фокуса ----------
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var openStack = [];

  function trapKeydown(e) {
    var current = openStack[openStack.length - 1];
    if (!current) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeOverlay(current.node);
      return;
    }
    if (e.key !== 'Tab') return;
    var focusable = $$(FOCUSABLE, current.node).filter(function (n) { return n.offsetParent !== null; });
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function openOverlay(node, opts) {
    opts = opts || {};
    var opener = document.activeElement;
    node.hidden = false;
    node.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    openStack.push({ node: node, opener: opener });
    document.addEventListener('keydown', trapKeydown, true);
    var focusTarget = (opts.initialFocus && $(opts.initialFocus, node)) || $(FOCUSABLE, node);
    if (focusTarget) focusTarget.focus();
    document.dispatchEvent(new CustomEvent('silence:overlay-open', { detail: { node: node } }));
  }

  function closeOverlay(node) {
    node.hidden = true;
    node.setAttribute('aria-hidden', 'true');
    var idx = -1;
    for (var i = openStack.length - 1; i >= 0; i--) {
      if (openStack[i].node === node) { idx = i; break; }
    }
    var entry = idx !== -1 ? openStack.splice(idx, 1)[0] : null;
    if (openStack.length === 0) {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', trapKeydown, true);
    }
    if (entry && entry.opener && typeof entry.opener.focus === 'function') entry.opener.focus();
    document.dispatchEvent(new CustomEvent('silence:overlay-close', { detail: { node: node } }));
  }

  // ---------- расшифровка характеристик (SITE.specs) ----------
  function specLine(specs, lang) {
    var SITE = global.SITE || {};
    return (specs || []).map(function (pair) {
      var meta = SITE.specs && SITE.specs[pair[0]];
      if (!meta) return String(pair[1]);
      var m = meta[lang] || meta.ru;
      return m[0] + ': ' + pair[1] + (m[1] ? ' ' + m[1] : '');
    });
  }

  // ---------- расшифровка слоёв (SITE.layers) ----------
  function decodeLayers(codes, lang) {
    var SITE = global.SITE || {};
    return (codes || []).map(function (code) {
      var entry = SITE.layers && SITE.layers[code];
      if (!entry) return code; /* код без расшифровки — не должно случаться, п.4.6 */
      return entry[lang] || entry.ru;
    });
  }

  // ---------- карточка позиции (общий оверлей для каталога, системной таблицы, подбора) ----------
  function findAlbumGroup(page) {
    var SITE = global.SITE || {};
    var groups = SITE.album || {};
    for (var key in groups) {
      if (groups[key].indexOf(page) !== -1) return groups[key];
    }
    return [page];
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  /* общий просмотрщик изображений с перелистыванием: используется и для
     разворотов альбома (страницы по номерам), и для галереи объектов
     (готовые пути к файлам) — оба ведут на один и тот же #overlay-album.
     captions — необязательный параллельный массив строк (уже на нужном
     языке); если для индекса подписи нет, строка подписи скрывается, а не
     показывает пустоту или заглушку. */
  function openViewer(srcList, startIndex, captions) {
    var overlay = $('#overlay-album');
    if (!overlay || !srcList.length) return;
    var idx = ((startIndex % srcList.length) + srcList.length) % srcList.length;
    var img = $('[data-album-img]', overlay);
    var captionEl = $('[data-album-caption]', overlay);

    function show(i) {
      idx = (i + srcList.length) % srcList.length;
      img.src = srcList[idx];
      var cap = captions && captions[idx];
      img.alt = cap || (global.SITE ? global.SITE.t[getLang()].galTitle : '');
      if (captionEl) {
        if (cap) { captionEl.textContent = cap; captionEl.hidden = false; }
        else { captionEl.textContent = ''; captionEl.hidden = true; }
      }
    }
    overlay._prev = function () { show(idx - 1); };
    overlay._next = function () { show(idx + 1); };
    show(idx);
    openOverlay(overlay);
  }

  function openAlbumViewer(page) {
    var group = findAlbumGroup(page);
    var idx = group.indexOf(page);
    var srcList = group.map(function (n) { return 'assets/album/p' + pad2(n) + '.webp'; });
    var lang = getLang();
    var captions = group.map(function (n) {
      var tpl = (global.SITE.t[lang] || global.SITE.t.ru).albumPageAlt;
      return tpl ? tpl.replace('{{n}}', n) : null;
    });
    openViewer(srcList, idx === -1 ? 0 : idx, captions);
  }

  function openGalleryViewer(srcList, startIndex, captions) {
    openViewer(srcList, startIndex || 0, captions);
  }

  function openCardOverlay(bodyNode) {
    var overlay = $('#overlay-card');
    if (!overlay) return;
    var body = $('[data-card-body]', overlay);
    body.innerHTML = '';
    body.appendChild(bodyNode);
    openOverlay(overlay, { initialFocus: '.overlay__close' });
  }

  function initGlobalOverlays() {
    $$('[data-close-overlay]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var overlay = btn.closest('.overlay');
        if (overlay) closeOverlay(overlay);
      });
    });
    var album = $('#overlay-album');
    if (album) {
      var prevBtn = $('[data-album-prev]', album);
      var nextBtn = $('[data-album-next]', album);
      if (prevBtn) prevBtn.addEventListener('click', function () { album._prev && album._prev(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { album._next && album._next(); });
      var touchX = null;
      album.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
      album.addEventListener('touchend', function (e) {
        if (touchX == null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) { dx > 0 ? album._prev() : album._next(); }
        touchX = null;
      }, { passive: true });
    }
    $$('.overlay').forEach(function (ov) {
      ov.addEventListener('click', function (e) { if (e.target === ov) closeOverlay(ov); });
    });
  }

  // ---------- содержимое карточки позиции (переиспользуется каталогом и таблицей конструкций) ----------
  function renderCardBody(item, lang) {
    var SITE = global.SITE;
    var table = SITE.t[lang];
    var name = typeof item.name === 'string' ? item.name : (item.name[lang] || item.name.ru);
    var desc = item.desc ? (item.desc[lang] || item.desc.ru) : '';
    var children = [];

    if (global.SILENCE_TRACK) global.SILENCE_TRACK('card_open', { value: item.id });
    if (item.img) children.push(el('img', { src: item.img, alt: name, class: 'overlay-card__img' }));
    children.push(el('h2', {}, [name]));

    if (item.ix) {
      var unitKey = item.ix === 'Rw' ? 'rw' : (item.ix === 'Lw' ? 'lw' : null);
      var unit = unitKey && (SITE.specs[unitKey] || {})[lang];
      var unitLabel = unit ? unit[1] : 'дБ';
      var range = item.from === item.to ? String(item.from) : (item.from + '\u2013' + item.to);
      children.push(el('p', { class: 'overlay-card__index' }, [
        item.ix + ' ' + range + (unitLabel ? ' ' + unitLabel : '')
      ]));
    }
    if (desc) children.push(el('p', { class: 'lead' }, [desc]));

    if (item.load) {
      children.push(el('p', { class: 'caption' }, [table.dLoad + ': ' + item.load + ' ' + table.sysLoad]));
    }

    if (item.layers && item.layers.length) {
      children.push(el('h3', { class: 'overlay-card__subhead' }, [table.dLayers]));
      var layerLines = decodeLayers(item.layers, lang);
      children.push(el('ol', { class: 'overlay-card__layers' }, layerLines.map(function (l) { return el('li', {}, [l]); })));
    }

    if (item.specs) {
      var specLines = specLine(item.specs, lang);
      children.push(el('ul', { class: 'overlay-card__specs' }, specLines.map(function (l) { return el('li', {}, [l]); })));
    }

    if (item.page) {
      var pageBtn = el('button', { type: 'button', class: 'btn btn--secondary', 'data-analytics': 'card_show_scheme', 'data-analytics-value': item.id }, [table.dPage]);
      pageBtn.addEventListener('click', function () { openAlbumViewer(item.page); });
      children.push(pageBtn);
    }

    if (item.place && item.id) {
      var quoteText = lang === 'kz' ? 'Осы жүйені есептеу' : (lang === 'en' ? 'Calculate this system' : 'Рассчитать эту систему');
      var quote = el('a', {
        class: 'btn btn--primary overlay-card__quote',
        href: 'contacts.html?system=' + encodeURIComponent(item.id) + '&surface=' + encodeURIComponent(item.place),
        'data-analytics': 'system_quote_click', 'data-analytics-value': item.id
      }, [quoteText]);
      children.push(quote);
    }

    return el('div', { class: 'overlay-card' }, children);
  }

  // ---------- поиск позиции по id в любой коллекции каталога ----------
  function findItem(id) {
    var CATALOG = global.CATALOG || {};
    var collections = [CATALOG.systems, CATALOG.materials, CATALOG.decor, CATALOG.parts, CATALOG.boards];
    for (var i = 0; i < collections.length; i++) {
      var list = collections[i] || [];
      for (var j = 0; j < list.length; j++) {
        if (list[j].id === id) return list[j];
      }
    }
    return null;
  }

  // ---------- справка по нормативу (SILENCE_NORMS), общий оверлей карточки ----------
  function openNormDetail(key, lang) {
    var SITE = global.SITE;
    lang = lang || getLang();
    var doc = (global.SILENCE_NORMS || {})[key];
    if (!doc) return;
    var body = doc[lang] || doc.ru;
    var node = el('div', { class: 'norm-detail' }, [
      el('h2', {}, [body.title]),
      el('div', { class: 'norm-detail__body', html: body.body })
    ]);
    openCardOverlay(node);
  }

  // ---------- автоссылки на нормативы в любом тексте (п. 4.9, регулярка из прототипа) ----------
  var NORM_RE = /С[НП] РК 2\.04-(?:02-2011|105-2012)/g;

  function linkNorms(scope) {
    var root = scope || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentElement;
        if (!p || /^(H1|H2|H3|H4|BUTTON|SCRIPT|STYLE)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
        if (p.classList.contains('normlink')) return NodeFilter.FILTER_REJECT;
        NORM_RE.lastIndex = 0;
        return NORM_RE.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var hits = [], n;
    while ((n = walker.nextNode())) hits.push(n);

    hits.forEach(function (node) {
      var frag = document.createDocumentFragment();
      var text = node.nodeValue, last = 0, m;
      NORM_RE.lastIndex = 0;
      while ((m = NORM_RE.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var code = m[0];
        var key = code.indexOf('СН') === 0 ? 'sn' : 'sp';
        var b = el('button', { type: 'button', class: 'normlink' }, [code]);
        b.addEventListener('click', (function (k) { return function () { openNormDetail(k); }; }(key)));
        frag.appendChild(b);
        last = m.index + code.length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  // ---------- бытовая расшифровка Rw/Lw (маркетинговое ТЗ, Шаг 7) ----------
  // Важно: для wall/ceiling и floor "from/to" — это ПРИРОСТ (дельта) к уже
  // существующей стене/потолку/полу, а не абсолютный показатель. Только у
  // partition (готовая перегородка с нуля) число абсолютное и сравнимо с
  // нормативом SITE.NORM_WALL. Разные шкалы — разные формулировки, и ни
  // одна не обещает полной тишины.
  function decodeRwKey(system) {
    var to = system.to;
    if (system.place === 'partition') {
      if (to < 52) return 'rwBelowNorm';
      if (to < 56) return 'rwMeetsNorm';
      return 'rwAboveNorm';
    }
    if (system.ix === 'Lw' || system.ix === 'ΔLn,w') {
      if (to <= 5) return 'lwSoft';
      if (to <= 11) return 'lwNoticeable';
      return 'lwGood';
    }
    if (to <= 10) return 'rwDeltaLow';
    if (to <= 15) return 'rwDeltaMid';
    return 'rwDeltaHigh';
  }

  // ---------- роутинг по hash (глубокие ссылки, п. 4.12) ----------
  var hashHandlers = [];
  function onHash(handler) { hashHandlers.push(handler); }
  function dispatchHash() {
    var hash = global.location.hash.replace(/^#/, '');
    if (!hash) return;
    hashHandlers.forEach(function (h) { h(hash); });
  }
  global.addEventListener('hashchange', dispatchHash);

  // ---------- инициализация переключателей темы/языка (общие для всех страниц) ----------
  function initSwitches(root) {
    $$('.switch-btn[data-lang]', root).forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-lang')); });
    });
    $$('.switch-btn[data-theme-choice]', root).forEach(function (btn) {
      btn.addEventListener('click', function () { applyTheme(btn.getAttribute('data-theme-choice')); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
    applyTheme(getTheme());
    initSwitches(document);
    initGlobalOverlays();
    dispatchHash();
  });

  global.SILENCE_CORE = {
    el: el, $: $, $$: $$,
    t: t, getLang: getLang, applyLang: applyLang, LANGS: LANGS,
    getTheme: getTheme, applyTheme: applyTheme,
    openOverlay: openOverlay, closeOverlay: closeOverlay,
    onHash: onHash, dispatchHash: dispatchHash,
    specLine: specLine, decodeLayers: decodeLayers,
    openAlbumViewer: openAlbumViewer, openGalleryViewer: openGalleryViewer, openCardOverlay: openCardOverlay,
    renderCardBody: renderCardBody, findItem: findItem,
    openNormDetail: openNormDetail, linkNorms: linkNorms, decodeRwKey: decodeRwKey
  };
}(window));
