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
  var activeLang = null;

  // ---------- DOM helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    if (tag.toLowerCase() === 'img' && global.SILENCE_PERF) attrs = global.SILENCE_PERF.prepareImage(attrs);
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
    if (tag.toLowerCase() === 'img' && global.SILENCE_PERF) global.SILENCE_PERF.watchImage(node);
    return node;
  }

  // ---------- i18n ----------
  function getLang() {
    if (LANGS.indexOf(activeLang) !== -1) return activeLang;
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
    activeLang = lang;
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
  var openStack = [], pageLock = null, inertState = [];

  function safeFocus(node) {
    if (!node || !node.isConnected || typeof node.focus !== 'function') return;
    try { node.focus({ preventScroll: true }); } catch (e) { node.focus(); }
  }
  function updateInert() {
    inertState.forEach(function (x) { x.node.inert = x.value; });
    inertState = [];
    var top = openStack.length && openStack[openStack.length - 1].node;
    if (!top) return;
    Array.prototype.forEach.call(document.body.children, function (node) {
      if (node === top || node.contains(top) || /^(SCRIPT|STYLE|LINK)$/.test(node.tagName)) return;
      inertState.push({ node: node, value: node.inert });
      node.inert = true;
    });
  }
  function lockPage() {
    if (pageLock) return;
    var body = document.body;
    pageLock = { x: global.scrollX, y: global.scrollY, props: {} };
    ['position', 'top', 'left', 'right', 'width', 'overflow', 'paddingRight'].forEach(function (k) { pageLock.props[k] = body.style[k]; });
    var scrollbar = Math.max(0, global.innerWidth - document.documentElement.clientWidth);
    body.style.position = 'fixed'; body.style.top = -pageLock.y + 'px';
    body.style.left = '0'; body.style.right = '0'; body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbar) body.style.paddingRight = scrollbar + 'px';
    body.classList.add('no-scroll');
  }
  function unlockPage() {
    if (!pageLock) return;
    var saved = pageLock; pageLock = null;
    Object.keys(saved.props).forEach(function (key) { document.body.style[key] = saved.props[key]; });
    document.body.classList.remove('no-scroll');
    var behavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    global.scrollTo(saved.x, saved.y);
    document.documentElement.style.scrollBehavior = behavior;
  }
  function trapKeydown(e) {
    var current = openStack[openStack.length - 1];
    if (!current) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeOverlay(current.node); return; }
    if (e.key !== 'Tab') return;
    var items = $$(FOCUSABLE, current.node).filter(function (n) {
      return n.tabIndex >= 0 && !n.closest('[hidden], [inert]') && n.getClientRects().length;
    });
    if (!items.length) { e.preventDefault(); return; }
    var first = items[0], last = items[items.length - 1];
    if (!current.node.contains(document.activeElement)) { e.preventDefault(); safeFocus(e.shiftKey ? last : first); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); safeFocus(last); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); safeFocus(first); }
  }
  function openOverlay(node, opts) {
    if (!node) return;
    opts = opts || {};
    if (openStack.some(function (x) { return x.node === node; })) return;
    var opener = document.activeElement;
    node.hidden = false; node.inert = false; node.setAttribute('aria-hidden', 'false');
    var heading = $('h1, h2, h3', node);
    if (!node.hasAttribute('aria-label') && !node.hasAttribute('aria-labelledby')) {
      node.setAttribute('aria-label', heading ? heading.textContent : t('close'));
    }
    lockPage(); openStack.push({ node: node, opener: opener });
    document.addEventListener('keydown', trapKeydown, true);
    var focusTarget = (opts.initialFocus && $(opts.initialFocus, node)) || $(FOCUSABLE, node);
    safeFocus(focusTarget);
    updateInert();
    document.dispatchEvent(new CustomEvent('silence:overlay-open', { detail: { node: node } }));
  }
  function closeOverlay(node) {
    var idx = -1;
    for (var i = openStack.length - 1; i >= 0; i--) { if (openStack[i].node === node) { idx = i; break; } }
    if (idx < 0) return;
    var entry = openStack.splice(idx, 1)[0];
    updateInert();
    if (node.contains(document.activeElement)) document.activeElement.blur();
    node.hidden = true; node.setAttribute('aria-hidden', 'true');
    if (!openStack.length) { unlockPage(); document.removeEventListener('keydown', trapKeydown, true); }
    var fallback = openStack.length ? $(FOCUSABLE, openStack[openStack.length - 1].node) : $('.skip-link');
    safeFocus(entry.opener && entry.opener.isConnected ? entry.opener : fallback);
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
  /* One in-page image viewer for carousel posters, catalogue diagrams and galleries.
     Images keep their full proportions. Zoom changes dimensions, not a cropped CSS cover. */
  var viewer = null;
  var VIEW_COPY = {
    ru: { title:'Просмотр изображения', close:'Закрыть', plus:'Увеличить', minus:'Уменьшить', fit:'Вписать', prev:'Назад', next:'Далее', hint:'Нажмите +, чтобы прочитать детали. Увеличенное изображение можно прокручивать.', error:'Не удалось загрузить изображение.' },
    kz: { title:'Суретті қарау', close:'Жабу', plus:'Үлкейту', minus:'Кішірейту', fit:'Сыйғызу', prev:'Артқа', next:'Келесі', hint:'Мәліметтерді оқу үшін + басыңыз. Үлкейтілген суретті жылжытуға болады.', error:'Сурет жүктелмеді.' },
    en: { title:'Image viewer', close:'Close', plus:'Zoom in', minus:'Zoom out', fit:'Fit', prev:'Previous', next:'Next', hint:'Use + to read details. Scroll or drag the enlarged image.', error:'The image could not be loaded.' }
  };
  function buildViewer() {
    var overlay = $('#overlay-album');
    if (!overlay) return null;
    overlay.innerHTML = '';
    overlay.classList.add('image-lightbox');
    overlay.setAttribute('aria-labelledby', 'image-viewer-title');
    overlay.setAttribute('data-viewer-version', '26');
    var title = el('h2', { id:'image-viewer-title', class:'image-lightbox__title' });
    var close = el('button', {type:'button', class:'image-lightbox__button image-lightbox__close', 'data-viewer-close':''}, ['×']);
    var minus = el('button', {type:'button', class:'image-lightbox__button', 'data-viewer-minus':''}, ['−']);
    var plus = el('button', {type:'button', class:'image-lightbox__button', 'data-viewer-plus':''}, ['+']);
    var fit = el('button', {type:'button', class:'image-lightbox__button image-lightbox__fit', 'data-viewer-fit':''});
    var zoomLabel = el('output', {class:'image-lightbox__scale', 'data-viewer-scale':''});
    var toolbar = el('div', {class:'image-lightbox__toolbar'}, [minus, zoomLabel, plus, fit]);
    var head = el('div', {class:'image-lightbox__header'}, [title, close, toolbar]);
    var img = el('img', {class:'image-lightbox__image', 'data-album-img':'', alt:'', draggable:'false'});
    var canvas = el('div', {class:'image-lightbox__canvas'}, [img]);
    var stage = el('div', {class:'image-lightbox__stage', tabindex:'0', 'data-viewer-stage':''}, [canvas]);
    var error = el('p', {class:'image-lightbox__error', role:'status', hidden:''});
    stage.appendChild(error);
    var prev = el('button', {type:'button', class:'image-lightbox__button image-lightbox__step', 'data-album-prev':''});
    var next = el('button', {type:'button', class:'image-lightbox__button image-lightbox__step', 'data-album-next':''});
    var count = el('span', {class:'image-lightbox__count', 'data-viewer-count':'', 'aria-live':'polite'});
    var hint = el('p', {class:'image-lightbox__hint'});
    var foot = el('div', {class:'image-lightbox__footer'}, [el('div',{class:'image-lightbox__navigation'},[prev,count,next]),hint]);
    overlay.appendChild(head); overlay.appendChild(stage); overlay.appendChild(foot);
    var v = {overlay:overlay, img:img, stage:stage, canvas:canvas, list:[], captions:[], index:0, scale:1, fitScale:1, fitted:true, drag:null, touch:null, moved:false};
    function copy() { return VIEW_COPY[getLang()] || VIEW_COPY.ru; }
    function setSize(scale, centre) {
      if (!img.naturalWidth || overlay.hidden) return;
      var oldW = img.width || 1, oldH = img.height || 1;
      var relX = (stage.scrollLeft + stage.clientWidth / 2 - img.offsetLeft) / oldW;
      var relY = (stage.scrollTop + stage.clientHeight / 2 - img.offsetTop) / oldH;
      v.scale = Math.max(v.fitScale, Math.min(scale, 3));
      img.style.width = Math.round(img.naturalWidth * v.scale) + 'px';
      img.style.height = Math.round(img.naturalHeight * v.scale) + 'px';
      v.fitted = Math.abs(v.scale - v.fitScale) < 0.002;
      overlay.classList.toggle('image-lightbox--zoomed', !v.fitted);
      zoomLabel.value = Math.round(v.scale * 100) + '%'; zoomLabel.textContent = zoomLabel.value;
      minus.disabled = v.fitted; plus.disabled = v.scale >= 3;
      if (centre && !v.fitted) {
        stage.scrollLeft = img.offsetLeft + relX * img.width - stage.clientWidth / 2;
        stage.scrollTop = img.offsetTop + relY * img.height - stage.clientHeight / 2;
      } else { stage.scrollLeft = 0; stage.scrollTop = 0; }
    }
    function fitImage() {
      if (overlay.hidden || !img.naturalWidth) return;
      v.fitScale = Math.min(1, Math.max(0.04, Math.min((stage.clientWidth - 32) / img.naturalWidth, (stage.clientHeight - 32) / img.naturalHeight)));
      setSize(v.fitScale, false);
    }
    function show(i) {
      v.index = (i + v.list.length) % v.list.length;
      var c = copy(), cap = v.captions[v.index] || c.title;
      title.textContent = cap; img.alt = cap;
      close.setAttribute('aria-label', c.close); close.title = c.close;
      minus.setAttribute('aria-label', c.minus); plus.setAttribute('aria-label', c.plus);
      fit.textContent = c.fit; prev.textContent = c.prev; next.textContent = c.next;
      stage.setAttribute('aria-label', c.title); hint.textContent = c.hint;
      count.textContent = (v.index + 1) + ' / ' + v.list.length;
      overlay.setAttribute('data-viewer-index', String(v.index));
      prev.disabled = next.disabled = v.list.length < 2;
      error.hidden = true; img.hidden = false; v.fitted = true;
      img.onload = fitImage;
      img.onerror = function () { img.hidden = true; error.textContent = copy().error; error.hidden = false; };
      img.src = v.list[v.index];
      if (img.complete && img.naturalWidth) fitImage();
    }
    close.addEventListener('click', function () { closeOverlay(overlay); });
    plus.addEventListener('click', function () { setSize(v.scale * 1.5, true); });
    minus.addEventListener('click', function () { setSize(v.scale / 1.5, true); });
    fit.addEventListener('click', fitImage);
    prev.addEventListener('click', function () { show(v.index - 1); });
    next.addEventListener('click', function () { show(v.index + 1); });
    stage.addEventListener('click', function (e) {
      if ((e.target === stage || e.target === canvas) && !v.moved) closeOverlay(overlay);
    });
    img.addEventListener('dblclick', function (e) { e.preventDefault(); if (v.fitted) setSize(Math.max(1, v.scale * 2), true); else fitImage(); });
    stage.addEventListener('pointerdown', function (e) {
      v.moved = false;
      if (e.pointerType !== 'mouse' || v.fitted || e.button !== 0) return;
      e.preventDefault();
      v.drag = {x:e.clientX, y:e.clientY, left:stage.scrollLeft, top:stage.scrollTop};
      stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', function (e) {
      if (!v.drag) return;
      var dx=e.clientX-v.drag.x, dy=e.clientY-v.drag.y;
      if (Math.abs(dx)+Math.abs(dy)>8) v.moved=true;
      stage.scrollLeft=v.drag.left-dx; stage.scrollTop=v.drag.top-dy;
    });
    function endDrag() { v.drag=null; }
    stage.addEventListener('pointerup',endDrag); stage.addEventListener('pointercancel',endDrag);
    stage.addEventListener('touchstart', function (e) {
      v.moved=false;
      v.touch = e.touches.length===1 ? {x:e.touches[0].clientX,y:e.touches[0].clientY} : null;
    },{passive:true});
    stage.addEventListener('touchmove', function (e) {
      if(e.touches.length!==1) v.touch=null;
      v.moved=true;
    },{passive:true});
    stage.addEventListener('touchend', function (e) {
      if(v.touch && v.fitted && e.changedTouches.length===1){
        var dx=e.changedTouches[0].clientX-v.touch.x, dy=e.changedTouches[0].clientY-v.touch.y;
        if(Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.5) show(v.index+(dx<0?1:-1));
      }
      v.touch=null;
    },{passive:true});
    overlay.addEventListener('keydown', function (e) {
      if(e.key==='+' || e.key==='='){e.preventDefault();setSize(v.scale*1.5,true);}
      else if(e.key==='-'){e.preventDefault();setSize(v.scale/1.5,true);}
      else if(e.key==='0'){e.preventDefault();fitImage();}
      else if(v.fitted && (e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();show(v.index+(e.key==='ArrowRight'?1:-1));}
    });
    function resized(){ if(!overlay.hidden)fitImage(); }
    if(global.ResizeObserver) new ResizeObserver(resized).observe(stage);
    else global.addEventListener('resize',resized);
    v.show=show; v.fit=fitImage;
    overlay._prev=function(){show(v.index-1);}; overlay._next=function(){show(v.index+1);};
    return v;
  }
  function openViewer(srcList, startIndex, captions) {
    if(!srcList || !srcList.length) return;
    if(!viewer) viewer=buildViewer();
    if(!viewer) return;
    viewer.list=srcList.slice(); viewer.captions=captions || [];
    openOverlay(viewer.overlay, {initialFocus:'[data-viewer-close]'});
    viewer.show(Number(startIndex)||0);
    global.requestAnimationFrame(viewer.fit);
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
      var quoteText = lang === 'kz' ? 'Осы жүйені есептеу' : (lang === 'en' ? 'Calculate this system' : 'Консультация специалиста');
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
