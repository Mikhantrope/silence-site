window.SITE={"t":{"ru":{"headerAddress":"Проспект Бауыржан Момышулы, 15/2, Астана","slogan":["ОТ ВАС — ЗАДАЧА","ОТ НАС — РЕШЕНИЕ!"],"close":"Закрыть","skip":"К содержимому","themeLight":"Светлая","themeDark":"Тёмная","navCat":"Материалы","navPro":"Проектировщикам","navGal":"Объекты","navGallery":"Галерея","navGame":"Игра","navSystems":"Системы","navContacts":"Контакты","cta":"Консультация специалиста","formTitle":"Консультация специалиста","formLead":"Укажите имя и телефон — подготовим сообщение для консультации в WhatsApp.","footRights":"Звукоизоляционные системы SILENCE"},"kz":{"headerAddress":"Проспект Бауыржан Момышулы, 15/2, Астана","slogan":["СІЗДЕН — МІНДЕТ","БІЗДЕН — ШЕШІМ!"],"close":"Жабу","skip":"Мазмұнға","themeLight":"Ашық","themeDark":"Қараңғы","navCat":"Материалдар","navPro":"Жобалаушыларға","navGal":"Нысандар","navGallery":"Галерея","navGame":"Ойын","navSystems":"Жүйелер","navContacts":"Байланыс","cta":"Маманның кеңесі","formTitle":"Маманның кеңесі","formLead":"Атыңыз бен телефон нөміріңізді көрсетіңіз — WhatsApp-та кеңес алу үшін хабарлама дайындаймыз.","footRights":"SILENCE дыбыс оқшаулау жүйелері"},"en":{"headerAddress":"Prospekt Bauyrzhan Momyshuly, 15/2, Astana","slogan":["YOUR TASK —","OUR SOLUTION!"],"close":"Close","skip":"Skip to content","themeLight":"Light","themeDark":"Dark","navCat":"Materials","navPro":"For designers","navGal":"Projects","navGallery":"Gallery","navGame":"Game","navSystems":"Assemblies","navContacts":"Contact","cta":"Specialist consultation","formTitle":"Specialist consultation","formLead":"Enter your name and phone number to prepare a consultation message in WhatsApp.","footRights":"SILENCE sound insulation systems"}},"contacts":{"phone":"+7 776 17 888 17","phoneHref":"tel:+77761788817","whatsapp":"https://wa.me/77761788817"}};window.SILENCE_V27={"copy":{"cta":{"ru":"Консультация специалиста","kz":"Маманның кеңесі","en":"Specialist consultation"},"formLead":{"ru":"Укажите имя и телефон — подготовим сообщение для консультации в WhatsApp.","kz":"Атыңыз бен телефон нөміріңізді көрсетіңіз — WhatsApp-та кеңес алу үшін хабарлама дайындаймыз.","en":"Enter your name and phone number to prepare a consultation message in WhatsApp."},"formConsent":{"ru":"Согласен передать указанные данные специалисту через WhatsApp для ответа на обращение.","kz":"Өтінішіме жауап алу үшін көрсетілген деректерді маманға WhatsApp арқылы беруге келісемін.","en":"I agree to share these details with a specialist through WhatsApp to receive a response."},"waSubmit":{"ru":"Перейти в WhatsApp","kz":"WhatsApp-қа өту","en":"Continue to WhatsApp"},"waNote":{"ru":"Откроется WhatsApp с готовым текстом. Сообщение нужно отправить самостоятельно.","kz":"Дайын мәтінмен WhatsApp ашылады. Хабарламаны өзіңіз жіберуіңіз керек.","en":"WhatsApp opens with a prepared message. You still need to send it yourself."},"dataNote":{"ru":"Как используются данные","kz":"Деректер қалай пайдаланылады","en":"How your data is used"},"dataText":{"ru":"Форма не отправляет данные на сервер сайта. Имя и телефон включаются в сообщение WhatsApp. После перехода действуют условия сервиса WhatsApp.","kz":"Форма деректерді сайт серверіне жібермейді. Аты мен телефон нөмірі WhatsApp хабарламасына қосылады. Өткеннен кейін WhatsApp шарттары қолданылады.","en":"This form does not submit data to the website server. Your name and phone number are included in a WhatsApp message. WhatsApp’s terms apply after you continue."},"footerText":{"ru":"Звукоизоляция · Акустика · Декоративные решения","kz":"Дыбыс оқшаулау · Акустика · Декор","en":"Sound insulation · Acoustics · Decorative solutions"}}};
(function (global) {
'use strict';
var LANG_KEY = 'silence.lang';
var THEME_KEY = 'silence.theme';
var DEFAULT_LANG = 'ru';
var LANGS = ['ru', 'kz', 'en'];
var activeLang = null;
function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) {
return Array.prototype.slice.call((root || document).querySelectorAll(sel));
}
function el(tag, attrs, children) {
var node = document.createElement(tag);
attrs = attrs || {};
if (tag.toLowerCase() === 'img' && global.SILENCE_PERF)
attrs = global.SILENCE_PERF.prepareImage(attrs);
for (var key in attrs) {
if (!Object.prototype.hasOwnProperty.call(attrs, key))
continue;
var val = attrs[key];
if (val == null || val === false)
continue;
if (key === 'class')
node.className = val;
else if (key === 'html')
node.innerHTML = val;
else if (key.indexOf('on') === 0 && typeof val === 'function') {
node.addEventListener(key.slice(2).toLowerCase(), val);
}
else {
node.setAttribute(key, val);
}
}
children = children || [];
for (var i = 0; i < children.length; i++) {
var child = children[i];
if (child == null)
continue;
node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
}
if (tag.toLowerCase() === 'img' && global.SILENCE_PERF)
global.SILENCE_PERF.watchImage(node);
return node;
}
function getLang() {
if (LANGS.indexOf(activeLang) !== -1)
return activeLang;
var stored = null;
try {
stored = global.localStorage.getItem(LANG_KEY);
}
catch (e) { }
return LANGS.indexOf(stored) !== -1 ? stored : DEFAULT_LANG;
}
function t(key, lang) {
var SITE = global.SITE || {};
var table = SITE.t && SITE.t[lang || getLang()];
if (!table || !(key in table))
return key;
return table[key];
}
function applyLang(lang) {
if (LANGS.indexOf(lang) === -1)
lang = DEFAULT_LANG;
activeLang = lang;
try {
global.localStorage.setItem(LANG_KEY, lang);
}
catch (e) { }
document.documentElement.setAttribute('lang', lang === 'kz' ? 'kk' : lang);
$$('[data-i18n]').forEach(function (node) {
var key = node.getAttribute('data-i18n');
var value = t(key, lang);
if (node.hasAttribute('data-i18n-html'))
node.innerHTML = value;
else
node.textContent = value;
});
$$('[data-i18n-attr]').forEach(function (node) {
var spec = node.getAttribute('data-i18n-attr').split('|');
for (var i = 0; i < spec.length; i++) {
var pair = spec[i].split(':');
if (pair.length === 2)
node.setAttribute(pair[0], t(pair[1], lang));
}
});
$$('.switch-btn[data-lang]').forEach(function (btn) {
var pressed = btn.getAttribute('data-lang') === lang;
btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
});
document.dispatchEvent(new CustomEvent('silence:lang', { detail: { lang: lang } }));
}
function getTheme() {
var stored = null;
try {
stored = global.localStorage.getItem(THEME_KEY);
}
catch (e) { }
return stored === 'light' || stored === 'dark'
? stored
: document.documentElement.getAttribute('data-theme') || 'dark';
}
function applyTheme(theme) {
theme = theme === 'light' ? 'light' : 'dark';
document.documentElement.setAttribute('data-theme', theme);
try {
global.localStorage.setItem(THEME_KEY, theme);
}
catch (e) { }
$$('.switch-btn[data-theme-choice]').forEach(function (btn) {
var pressed = btn.getAttribute('data-theme-choice') === theme;
btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
});
document.dispatchEvent(new CustomEvent('silence:theme', { detail: { theme: theme } }));
}
var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
var openStack = [], pageLock = null, inertState = [];
function safeFocus(node) {
if (!node || !node.isConnected || typeof node.focus !== 'function')
return;
try {
node.focus({ preventScroll: true });
}
catch (e) {
node.focus();
}
}
function updateInert() {
inertState.forEach(function (x) { x.node.inert = x.value; });
inertState = [];
var top = openStack.length && openStack[openStack.length - 1].node;
if (!top)
return;
Array.prototype.forEach.call(document.body.children, function (node) {
if (node === top || node.contains(top) || /^(SCRIPT|STYLE|LINK)$/.test(node.tagName))
return;
inertState.push({ node: node, value: node.inert });
node.inert = true;
});
}
function lockPage() {
if (pageLock)
return;
var body = document.body;
pageLock = { x: global.scrollX, y: global.scrollY, props: {} };
['position', 'top', 'left', 'right', 'width', 'overflow', 'paddingRight'].forEach(function (k) { pageLock.props[k] = body.style[k]; });
var scrollbar = Math.max(0, global.innerWidth - document.documentElement.clientWidth);
body.style.position = 'fixed';
body.style.top = -pageLock.y + 'px';
body.style.left = '0';
body.style.right = '0';
body.style.width = '100%';
body.style.overflow = 'hidden';
if (scrollbar)
body.style.paddingRight = scrollbar + 'px';
body.classList.add('no-scroll');
}
function unlockPage() {
if (!pageLock)
return;
var saved = pageLock;
pageLock = null;
Object.keys(saved.props).forEach(function (key) { document.body.style[key] = saved.props[key]; });
document.body.classList.remove('no-scroll');
var behavior = document.documentElement.style.scrollBehavior;
document.documentElement.style.scrollBehavior = 'auto';
global.scrollTo(saved.x, saved.y);
document.documentElement.style.scrollBehavior = behavior;
}
function trapKeydown(e) {
var current = openStack[openStack.length - 1];
if (!current)
return;
if (e.key === 'Escape') {
e.preventDefault();
e.stopPropagation();
closeOverlay(current.node);
return;
}
if (e.key !== 'Tab')
return;
var items = $$(FOCUSABLE, current.node).filter(function (n) {
return n.tabIndex >= 0 && !n.closest('[hidden], [inert]') && n.getClientRects().length;
});
if (!items.length) {
e.preventDefault();
return;
}
var first = items[0], last = items[items.length - 1];
if (!current.node.contains(document.activeElement)) {
e.preventDefault();
safeFocus(e.shiftKey ? last : first);
}
else if (e.shiftKey && document.activeElement === first) {
e.preventDefault();
safeFocus(last);
}
else if (!e.shiftKey && document.activeElement === last) {
e.preventDefault();
safeFocus(first);
}
}
function openOverlay(node, opts) {
if (!node)
return;
opts = opts || {};
if (openStack.some(function (x) { return x.node === node; }))
return;
var opener = document.activeElement;
node.hidden = false;
node.inert = false;
node.setAttribute('aria-hidden', 'false');
var heading = $('h1, h2, h3', node);
if (!node.hasAttribute('aria-label') && !node.hasAttribute('aria-labelledby')) {
node.setAttribute('aria-label', heading ? heading.textContent : t('close'));
}
lockPage();
openStack.push({ node: node, opener: opener });
document.addEventListener('keydown', trapKeydown, true);
var focusTarget = (opts.initialFocus && $(opts.initialFocus, node)) || $(FOCUSABLE, node);
safeFocus(focusTarget);
updateInert();
document.dispatchEvent(new CustomEvent('silence:overlay-open', { detail: { node: node } }));
}
function closeOverlay(node) {
var idx = -1;
for (var i = openStack.length - 1; i >= 0; i--) {
if (openStack[i].node === node) {
idx = i;
break;
}
}
if (idx < 0)
return;
var entry = openStack.splice(idx, 1)[0];
updateInert();
if (node.contains(document.activeElement))
document.activeElement.blur();
node.hidden = true;
node.setAttribute('aria-hidden', 'true');
if (!openStack.length) {
unlockPage();
document.removeEventListener('keydown', trapKeydown, true);
}
var fallback = openStack.length ? $(FOCUSABLE, openStack[openStack.length - 1].node) : $('.skip-link');
safeFocus(entry.opener && entry.opener.isConnected ? entry.opener : fallback);
document.dispatchEvent(new CustomEvent('silence:overlay-close', { detail: { node: node } }));
}
function specLine(specs, lang) {
var SITE = global.SITE || {};
return (specs || []).map(function (pair) {
var meta = SITE.specs && SITE.specs[pair[0]];
if (!meta)
return String(pair[1]);
var m = meta[lang] || meta.ru;
return m[0] + ': ' + pair[1] + (m[1] ? ' ' + m[1] : '');
});
}
function decodeLayers(codes, lang) {
var SITE = global.SITE || {};
return (codes || []).map(function (code) {
var entry = SITE.layers && SITE.layers[code];
if (!entry)
return code;
return entry[lang] || entry.ru;
});
}
function findAlbumGroup(page) {
var SITE = global.SITE || {};
var groups = SITE.album || {};
for (var key in groups) {
if (groups[key].indexOf(page) !== -1)
return groups[key];
}
return [page];
}
function pad2(n) { return n < 10 ? '0' + n : String(n); }
var viewer = null;
var VIEW_COPY = {
ru: { title: 'Просмотр изображения', close: 'Закрыть', plus: 'Увеличить', minus: 'Уменьшить', fit: 'Вписать', prev: 'Назад', next: 'Далее', hint: 'Нажмите +, чтобы прочитать детали. Увеличенное изображение можно прокручивать.', error: 'Не удалось загрузить изображение.' },
kz: { title: 'Суретті қарау', close: 'Жабу', plus: 'Үлкейту', minus: 'Кішірейту', fit: 'Сыйғызу', prev: 'Артқа', next: 'Келесі', hint: 'Мәліметтерді оқу үшін + басыңыз. Үлкейтілген суретті жылжытуға болады.', error: 'Сурет жүктелмеді.' },
en: { title: 'Image viewer', close: 'Close', plus: 'Zoom in', minus: 'Zoom out', fit: 'Fit', prev: 'Previous', next: 'Next', hint: 'Use + to read details. Scroll or drag the enlarged image.', error: 'The image could not be loaded.' }
};
function buildViewer() {
var overlay = $('#overlay-album');
if (!overlay)
return null;
overlay.innerHTML = '';
overlay.classList.add('image-lightbox');
overlay.setAttribute('aria-labelledby', 'image-viewer-title');
overlay.setAttribute('data-viewer-version', '26');
var title = el('h2', { id: 'image-viewer-title', class: 'image-lightbox__title' });
var close = el('button', { type: 'button', class: 'image-lightbox__button image-lightbox__close', 'data-viewer-close': '' }, ['×']);
var minus = el('button', { type: 'button', class: 'image-lightbox__button', 'data-viewer-minus': '' }, ['−']);
var plus = el('button', { type: 'button', class: 'image-lightbox__button', 'data-viewer-plus': '' }, ['+']);
var fit = el('button', { type: 'button', class: 'image-lightbox__button image-lightbox__fit', 'data-viewer-fit': '' });
var zoomLabel = el('output', { class: 'image-lightbox__scale', 'data-viewer-scale': '' });
var toolbar = el('div', { class: 'image-lightbox__toolbar' }, [minus, zoomLabel, plus, fit]);
var head = el('div', { class: 'image-lightbox__header' }, [title, close, toolbar]);
var img = el('img', { class: 'image-lightbox__image', 'data-album-img': '', alt: '', draggable: 'false' });
var canvas = el('div', { class: 'image-lightbox__canvas' }, [img]);
var stage = el('div', { class: 'image-lightbox__stage', tabindex: '0', 'data-viewer-stage': '' }, [canvas]);
var error = el('p', { class: 'image-lightbox__error', role: 'status', hidden: '' });
stage.appendChild(error);
var prev = el('button', { type: 'button', class: 'image-lightbox__button image-lightbox__step', 'data-album-prev': '' });
var next = el('button', { type: 'button', class: 'image-lightbox__button image-lightbox__step', 'data-album-next': '' });
var count = el('span', { class: 'image-lightbox__count', 'data-viewer-count': '', 'aria-live': 'polite' });
var hint = el('p', { class: 'image-lightbox__hint' });
var foot = el('div', { class: 'image-lightbox__footer' }, [el('div', { class: 'image-lightbox__navigation' }, [prev, count, next]), hint]);
overlay.appendChild(head);
overlay.appendChild(stage);
overlay.appendChild(foot);
var v = { overlay: overlay, img: img, stage: stage, canvas: canvas, list: [], captions: [], index: 0, scale: 1, fitScale: 1, fitted: true, drag: null, touch: null, moved: false };
function copy() { return VIEW_COPY[getLang()] || VIEW_COPY.ru; }
function setSize(scale, centre) {
if (!img.naturalWidth || overlay.hidden)
return;
var oldW = img.width || 1, oldH = img.height || 1;
var relX = (stage.scrollLeft + stage.clientWidth / 2 - img.offsetLeft) / oldW;
var relY = (stage.scrollTop + stage.clientHeight / 2 - img.offsetTop) / oldH;
v.scale = Math.max(v.fitScale, Math.min(scale, 3));
img.style.width = Math.round(img.naturalWidth * v.scale) + 'px';
img.style.height = Math.round(img.naturalHeight * v.scale) + 'px';
v.fitted = Math.abs(v.scale - v.fitScale) < 0.002;
overlay.classList.toggle('image-lightbox--zoomed', !v.fitted);
zoomLabel.value = Math.round(v.scale * 100) + '%';
zoomLabel.textContent = zoomLabel.value;
minus.disabled = v.fitted;
plus.disabled = v.scale >= 3;
if (centre && !v.fitted) {
stage.scrollLeft = img.offsetLeft + relX * img.width - stage.clientWidth / 2;
stage.scrollTop = img.offsetTop + relY * img.height - stage.clientHeight / 2;
}
else {
stage.scrollLeft = 0;
stage.scrollTop = 0;
}
}
function fitImage() {
if (overlay.hidden || !img.naturalWidth)
return;
v.fitScale = Math.min(1, Math.max(0.04, Math.min((stage.clientWidth - 32) / img.naturalWidth, (stage.clientHeight - 32) / img.naturalHeight)));
setSize(v.fitScale, false);
}
function show(i) {
v.index = (i + v.list.length) % v.list.length;
var c = copy(), cap = v.captions[v.index] || c.title;
title.textContent = cap;
img.alt = cap;
close.setAttribute('aria-label', c.close);
close.title = c.close;
minus.setAttribute('aria-label', c.minus);
plus.setAttribute('aria-label', c.plus);
fit.textContent = c.fit;
prev.textContent = c.prev;
next.textContent = c.next;
stage.setAttribute('aria-label', c.title);
hint.textContent = c.hint;
count.textContent = (v.index + 1) + ' / ' + v.list.length;
overlay.setAttribute('data-viewer-index', String(v.index));
prev.disabled = next.disabled = v.list.length < 2;
error.hidden = true;
img.hidden = false;
v.fitted = true;
img.onload = fitImage;
img.onerror = function () { img.hidden = true; error.textContent = copy().error; error.hidden = false; };
img.src = v.list[v.index];
if (img.complete && img.naturalWidth)
fitImage();
}
close.addEventListener('click', function () { closeOverlay(overlay); });
plus.addEventListener('click', function () { setSize(v.scale * 1.5, true); });
minus.addEventListener('click', function () { setSize(v.scale / 1.5, true); });
fit.addEventListener('click', fitImage);
prev.addEventListener('click', function () { show(v.index - 1); });
next.addEventListener('click', function () { show(v.index + 1); });
stage.addEventListener('click', function (e) {
if ((e.target === stage || e.target === canvas) && !v.moved)
closeOverlay(overlay);
});
img.addEventListener('dblclick', function (e) { e.preventDefault(); if (v.fitted)
setSize(Math.max(1, v.scale * 2), true);
else
fitImage(); });
stage.addEventListener('pointerdown', function (e) {
v.moved = false;
if (e.pointerType !== 'mouse' || v.fitted || e.button !== 0)
return;
e.preventDefault();
v.drag = { x: e.clientX, y: e.clientY, left: stage.scrollLeft, top: stage.scrollTop };
stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove', function (e) {
if (!v.drag)
return;
var dx = e.clientX - v.drag.x, dy = e.clientY - v.drag.y;
if (Math.abs(dx) + Math.abs(dy) > 8)
v.moved = true;
stage.scrollLeft = v.drag.left - dx;
stage.scrollTop = v.drag.top - dy;
});
function endDrag() { v.drag = null; }
stage.addEventListener('pointerup', endDrag);
stage.addEventListener('pointercancel', endDrag);
stage.addEventListener('touchstart', function (e) {
v.moved = false;
v.touch = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
}, { passive: true });
stage.addEventListener('touchmove', function (e) {
if (e.touches.length !== 1)
v.touch = null;
v.moved = true;
}, { passive: true });
stage.addEventListener('touchend', function (e) {
if (v.touch && v.fitted && e.changedTouches.length === 1) {
var dx = e.changedTouches[0].clientX - v.touch.x, dy = e.changedTouches[0].clientY - v.touch.y;
if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5)
show(v.index + (dx < 0 ? 1 : -1));
}
v.touch = null;
}, { passive: true });
overlay.addEventListener('keydown', function (e) {
if (e.key === '+' || e.key === '=') {
e.preventDefault();
setSize(v.scale * 1.5, true);
}
else if (e.key === '-') {
e.preventDefault();
setSize(v.scale / 1.5, true);
}
else if (e.key === '0') {
e.preventDefault();
fitImage();
}
else if (v.fitted && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
e.preventDefault();
show(v.index + (e.key === 'ArrowRight' ? 1 : -1));
}
});
function resized() { if (!overlay.hidden)
fitImage(); }
if (global.ResizeObserver)
new ResizeObserver(resized).observe(stage);
else
global.addEventListener('resize', resized);
v.show = show;
v.fit = fitImage;
overlay._prev = function () { show(v.index - 1); };
overlay._next = function () { show(v.index + 1); };
return v;
}
function openViewer(srcList, startIndex, captions) {
if (!srcList || !srcList.length)
return;
if (!viewer)
viewer = buildViewer();
if (!viewer)
return;
viewer.list = srcList.slice();
viewer.captions = captions || [];
openOverlay(viewer.overlay, { initialFocus: '[data-viewer-close]' });
viewer.show(Number(startIndex) || 0);
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
if (!overlay)
return;
var body = $('[data-card-body]', overlay);
body.innerHTML = '';
body.appendChild(bodyNode);
openOverlay(overlay, { initialFocus: '.overlay__close' });
}
function initGlobalOverlays() {
$$('[data-close-overlay]').forEach(function (btn) {
btn.addEventListener('click', function () {
var overlay = btn.closest('.overlay');
if (overlay)
closeOverlay(overlay);
});
});
$$('.overlay').forEach(function (ov) {
ov.addEventListener('click', function (e) { if (e.target === ov)
closeOverlay(ov); });
});
}
function renderCardBody(item, lang) {
var SITE = global.SITE;
var table = SITE.t[lang];
var name = typeof item.name === 'string' ? item.name : (item.name[lang] || item.name.ru);
var desc = item.desc ? (item.desc[lang] || item.desc.ru) : '';
var children = [];
if (global.SILENCE_TRACK)
global.SILENCE_TRACK('card_open', { value: item.id });
if (item.img)
children.push(el('img', { src: item.img, alt: name, class: 'overlay-card__img' }));
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
if (desc)
children.push(el('p', { class: 'lead' }, [desc]));
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
function findItem(id) {
var CATALOG = global.CATALOG || {};
var collections = [CATALOG.systems, CATALOG.materials, CATALOG.decor, CATALOG.parts, CATALOG.boards];
for (var i = 0; i < collections.length; i++) {
var list = collections[i] || [];
for (var j = 0; j < list.length; j++) {
if (list[j].id === id)
return list[j];
}
}
return null;
}
function openNormDetail(key, lang) {
var SITE = global.SITE;
lang = lang || getLang();
var doc = (global.SILENCE_NORMS || {})[key];
if (!doc)
return;
var body = doc[lang] || doc.ru;
var node = el('div', { class: 'norm-detail' }, [
el('h2', {}, [body.title]),
el('div', { class: 'norm-detail__body', html: body.body })
]);
openCardOverlay(node);
}
var NORM_RE = /С[НП] РК 2\.04-(?:02-2011|105-2012)/g;
function linkNorms(scope) {
var root = scope || document.body;
var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
acceptNode: function (node) {
var p = node.parentElement;
if (!p || /^(H1|H2|H3|H4|BUTTON|SCRIPT|STYLE)$/.test(p.tagName))
return NodeFilter.FILTER_REJECT;
if (p.classList.contains('normlink'))
return NodeFilter.FILTER_REJECT;
NORM_RE.lastIndex = 0;
return NORM_RE.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
}
});
var hits = [], n;
while ((n = walker.nextNode()))
hits.push(n);
hits.forEach(function (node) {
var frag = document.createDocumentFragment();
var text = node.nodeValue, last = 0, m;
NORM_RE.lastIndex = 0;
while ((m = NORM_RE.exec(text))) {
if (m.index > last)
frag.appendChild(document.createTextNode(text.slice(last, m.index)));
var code = m[0];
var key = code.indexOf('СН') === 0 ? 'sn' : 'sp';
var b = el('button', { type: 'button', class: 'normlink' }, [code]);
b.addEventListener('click', (function (k) { return function () { openNormDetail(k); }; }(key)));
frag.appendChild(b);
last = m.index + code.length;
}
if (last < text.length)
frag.appendChild(document.createTextNode(text.slice(last)));
node.parentNode.replaceChild(frag, node);
});
}
function decodeRwKey(system) {
var to = system.to;
if (system.place === 'partition') {
if (to < 52)
return 'rwBelowNorm';
if (to < 56)
return 'rwMeetsNorm';
return 'rwAboveNorm';
}
if (system.ix === 'Lw' || system.ix === 'ΔLn,w') {
if (to <= 5)
return 'lwSoft';
if (to <= 11)
return 'lwNoticeable';
return 'lwGood';
}
if (to <= 10)
return 'rwDeltaLow';
if (to <= 15)
return 'rwDeltaMid';
return 'rwDeltaHigh';
}
var hashHandlers = [];
function onHash(handler) { hashHandlers.push(handler); }
function dispatchHash() {
var hash = global.location.hash.replace(/^#/, '');
if (!hash)
return;
hashHandlers.forEach(function (h) { h(hash); });
}
global.addEventListener('hashchange', dispatchHash);
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
;
window.SILENCE_CONFIG = {
endpoint: '/api/lead',
leadMode: 'whatsapp',
tg: {
token: '',
chatId: ''
},
analytics: {
gtmId: '',
ga4Id: '',
yandexMetrikaId: '',
yandexWebvisor: false,
respectDoNotTrack: true,
debug: false
}
};
window.SILENCE_SEND = function (title, fields) {
var cfg = window.SILENCE_CONFIG || {};
var esc = function (v) {
return String(v == null ? '' : v)
.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
if (cfg.endpoint) {
return fetch(cfg.endpoint, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title: title, fields: fields })
}).then(function (r) { if (!r.ok)
throw new Error('endpoint'); });
}
if (!cfg.tg || !cfg.tg.token || !cfg.tg.chatId) {
return Promise.reject(new Error('\u041f\u0440\u0438\u0451\u043c\u043d\u0438\u043a \u0437\u0430\u044f\u0432\u043e\u043a \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d: \u0441\u043c. js/config.js'));
}
var lines = fields.map(function (f) { return esc(f[0]) + ': ' + esc(f[1] || '\u2014'); });
var text = '<b>' + esc(title) + '</b>\n' + lines.join('\n');
return fetch('https://api.telegram.org/bot' + cfg.tg.token + '/sendMessage', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ chat_id: cfg.tg.chatId, text: text, parse_mode: 'HTML' })
}).then(function (r) { if (!r.ok)
throw new Error('telegram'); });
};
;
(function (global) {
'use strict';
var cfg = (global.SILENCE_CONFIG && global.SILENCE_CONFIG.analytics) || {};
var DNT = String(global.navigator.doNotTrack || global.doNotTrack || '') === '1';
var disabled = cfg.respectDoNotTrack !== false && DNT;
global.dataLayer = global.dataLayer || [];
function addScript(src, attrs) {
var s = document.createElement('script');
s.async = true;
s.src = src;
if (attrs)
Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
document.head.appendChild(s);
return s;
}
function valid(prefix, value) {
return typeof value === 'string' && value.indexOf(prefix) === 0 && value.length > prefix.length + 3;
}
var useGtm = !disabled && valid('GTM-', cfg.gtmId || '');
var useGa4 = !useGtm && !disabled && valid('G-', cfg.ga4Id || '');
var ymId = !disabled && /^\d{4,12}$/.test(String(cfg.yandexMetrikaId || '')) ? Number(cfg.yandexMetrikaId) : null;
if (useGtm) {
global.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
addScript('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(cfg.gtmId));
}
else if (useGa4) {
addScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4Id));
global.gtag = global.gtag || function () { global.dataLayer.push(arguments); };
global.gtag('js', new Date());
global.gtag('config', cfg.ga4Id, { send_page_view: false, anonymize_ip: true });
}
if (ymId) {
global.ym = global.ym || function () { (global.ym.a = global.ym.a || []).push(arguments); };
global.ym.l = Date.now();
addScript('https://mc.yandex.ru/metrika/tag.js');
global.ym(ymId, 'init', {
clickmap: true,
trackLinks: true,
accurateTrackBounce: true,
webvisor: cfg.yandexWebvisor === true
});
}
function cleanParams(obj) {
var out = {};
Object.keys(obj || {}).forEach(function (k) {
var v = obj[k];
if (v !== undefined && v !== null && v !== '')
out[k] = v;
});
return out;
}
function track(name, detail) {
var payload = cleanParams(detail || {});
payload.page_location = payload.page_location || global.location.href;
payload.page_path = payload.page_path || (global.location.pathname + global.location.search);
payload.page_title = payload.page_title || document.title;
payload.event = name;
global.dataLayer.push(payload);
if (useGa4 && typeof global.gtag === 'function') {
var ga = {};
Object.keys(payload).forEach(function (k) { if (k !== 'event')
ga[k] = payload[k]; });
global.gtag('event', name, ga);
}
if (ymId && typeof global.ym === 'function') {
global.ym(ymId, 'reachGoal', name, payload);
}
if (cfg.debug && global.console)
console.info('[SILENCE analytics]', name, payload);
}
var ATTR_KEY = 'silence_attribution_v2';
var LEGACY_KEY = 'silence_attribution';
var campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'yclid', 'fbclid'];
function readAttr() {
try {
return JSON.parse(global.localStorage.getItem(ATTR_KEY) || '{}') || {};
}
catch (e) {
return {};
}
}
function writeAttr(v) {
try {
global.localStorage.setItem(ATTR_KEY, JSON.stringify(v));
}
catch (e) { }
}
function campaignFromUrl() {
var q = new URLSearchParams(global.location.search);
var out = {};
campaignKeys.forEach(function (k) { if (q.get(k))
out[k] = q.get(k).slice(0, 500); });
return out;
}
function capture() {
var now = new Date().toISOString();
var current = campaignFromUrl();
var hasCampaign = Object.keys(current).length > 0;
var state = readAttr();
if (!state.first) {
state.first = Object.assign({
captured_at: now,
landing_page: global.location.href,
referrer: document.referrer || ''
}, current);
}
if (hasCampaign || !state.last) {
state.last = Object.assign({
captured_at: now,
landing_page: global.location.href,
referrer: document.referrer || ''
}, current);
}
state.session_landing = state.session_landing || global.location.href;
writeAttr(state);
try {
var legacy = {};
campaignKeys.slice(0, 5).forEach(function (k) {
if (state.last && state.last[k])
legacy[k] = state.last[k];
});
global.localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy));
}
catch (e) { }
return state;
}
function leadFields() {
var state = readAttr();
var out = [];
function add(prefix, obj) {
if (!obj)
return;
campaignKeys.forEach(function (k) { if (obj[k])
out.push([prefix + k, obj[k]]); });
if (obj.landing_page)
out.push([prefix + 'landing_page', obj.landing_page]);
if (obj.referrer)
out.push([prefix + 'referrer', obj.referrer]);
if (obj.captured_at)
out.push([prefix + 'captured_at', obj.captured_at]);
}
add('first_', state.first);
add('last_', state.last);
return out;
}
global.SILENCE_ANALYTICS = {
track: track,
captureAttribution: capture,
getAttribution: readAttr,
leadFields: leadFields,
enabled: { gtm: useGtm, ga4: useGa4, yandex: Boolean(ymId) }
};
capture();
}(window));
(function(g){var C=g.SILENCE_CORE;function t(k){var o=g.SILENCE_V27.copy[k];return typeof o==='string'?o:(o&&(o[C.getLang()]||o.ru))||k;}function copy(){document.querySelectorAll('[data-v27]').forEach(function(n){n.textContent=t(n.dataset.v27);});document.querySelectorAll('[data-journal-nav]').forEach(function(n){n.textContent=C.getLang()==='kz'?'Мақалалар':C.getLang()==='en'?'Articles':'Статьи';});}g.SILENCE_V27_UI={t:t};document.addEventListener('DOMContentLoaded',copy);document.addEventListener('silence:lang',copy);})(window);
(function (g) {
'use strict';
g.SILENCE_WIRE_CONSULTATION = function (form) {
if (form._wired)
return;
form._wired = true;
var name = form.elements.namedItem('name'), phone = form.elements.namedItem('phone'), consent = form.elements.namedItem('consent'), status = form.querySelector('[data-form-status]');
function msg(r, k, e) { var l = g.SILENCE_CORE.getLang(); return l === 'kz' ? k : l === 'en' ? e : r; }
function error(field, text) { status.textContent = text; status.setAttribute('data-error', ''); field.setAttribute('aria-invalid', 'true'); field.setAttribute('aria-describedby', 'consult-status'); field.focus(); if (g.SILENCE_TRACK)
g.SILENCE_TRACK('consultation_validation_error', { field: field.name }); }
form.addEventListener('submit', function (e) {
e.preventDefault();
status.textContent = '';
status.removeAttribute('data-error');
[name, phone, consent].forEach(function (f) { f.removeAttribute('aria-invalid'); f.removeAttribute('aria-describedby'); });
if (!name.value.trim()) {
error(name, msg('Укажите имя.', 'Атыңызды енгізіңіз.', 'Enter your name.'));
return;
}
var d = phone.value.replace(/\D/g, '');
if (d.length === 11 && (d[0] === '7' || d[0] === '8'))
d = '7' + d.slice(1);
else if (d.length === 10)
d = '7' + d;
else {
error(phone, msg('Введите номер: +7 и 10 цифр.', 'Нөмірді енгізіңіз: +7 және 10 сан.', 'Enter +7 followed by 10 digits.'));
return;
}
if (!consent.checked) {
error(consent, msg('Подтвердите передачу данных через WhatsApp.', 'Деректерді WhatsApp арқылы беруді растаңыз.', 'Confirm sharing your details through WhatsApp.'));
return;
}
var text = msg('Здравствуйте. Нужна консультация специалиста SILENCE.', 'Сәлеметсіз бе. SILENCE маманының кеңесі қажет.', 'Hello. I would like to consult a SILENCE specialist.') + '\n' + msg('Имя: ', 'Аты: ', 'Name: ') + name.value.trim() + '\n' + msg('Телефон: ', 'Телефон: ', 'Phone: ') + '+' + d;
var url = new URL(g.SITE.contacts.whatsapp);
url.searchParams.set('text', text);
if (g.SILENCE_TRACK)
g.SILENCE_TRACK('consultation_whatsapp_handoff', { source: document.body.dataset.page || 'index' });
status.textContent = msg('Переходим в WhatsApp. Отправьте подготовленное сообщение.', 'WhatsApp-қа өтеміз. Дайын хабарламаны жіберіңіз.', 'Opening WhatsApp. Send the prepared message.');
g.location.assign(url.href);
});
};
}(window));
;
(function (g) {
'use strict';
function render(node) {
var C = g.SILENCE_CORE, U = g.SILENCE_V27_UI, lang = C.getLang(), standalone = node.dataset.mount === 'contacts', saved = {};
function tr(r, k, e) { return lang === 'kz' ? k : lang === 'en' ? e : r; }
node.querySelectorAll('input').forEach(function (f) { saved[f.name] = { value: f.value, checked: f.checked }; });
node.innerHTML = '';
var wrap = C.el('div', { class: 'container consultation27' }), copy = C.el('div', { class: 'consultation27-copy' }, [C.el('p', { class: 'eyebrow' }, [tr('Обсудим вашу задачу', 'Міндетіңізді талқылайық', 'Let’s discuss your task')]), C.el(standalone ? 'h1' : 'h2', {}, [U.t('cta')]), C.el('p', { class: 'lead' }, [U.t('formLead')]), C.el('a', { class: 'contact27-phone', href: g.SITE.contacts.phoneHref, 'data-analytics': 'phone_click_consultation' }, [g.SITE.contacts.phone]), C.el('p', { class: 'caption' }, [C.t('headerAddress', lang)])]);
var form = C.el('form', { class: 'consultation27-form', 'data-lead-form': '', novalidate: '', 'data-wa-form': '' }), nameid = 'consult-name', phoneid = 'consult-phone';
function field(label, id, name, type, placeholder) { return C.el('div', { class: 'field' }, [C.el('label', { for: id }, [label]), C.el('input', { id: id, name: name, type: type, required: '', autocomplete: name === 'name' ? 'name' : 'tel', inputmode: name === 'phone' ? 'tel' : 'text', maxlength: name === 'name' ? '100' : '30', placeholder: placeholder })]); }
form.appendChild(field(tr('Имя', 'Аты', 'Name'), nameid, 'name', 'text', tr('Как к вам обращаться', 'Атыңыз', 'Your name')));
form.appendChild(field(tr('Телефон', 'Телефон', 'Phone'), phoneid, 'phone', 'tel', '+7 700 000 00 00'));
form.appendChild(C.el('label', { class: 'consent27' }, [C.el('input', { type: 'checkbox', name: 'consent', required: '' }), C.el('span', {}, [U.t('formConsent')])]));
form.appendChild(C.el('button', { type: 'submit', class: 'btn btn--primary' }, [U.t('waSubmit')]));
form.appendChild(C.el('p', { class: 'source27-note' }, [U.t('waNote')]));
form.appendChild(C.el('p', { class: 'form27-status', role: 'status', 'aria-live': 'polite', 'data-form-status': '', id: 'consult-status' }));
form.appendChild(C.el('details', { class: 'privacy27' }, [C.el('summary', {}, [U.t('dataNote')]), C.el('p', {}, [U.t('dataText')])]));
Object.keys(saved).forEach(function (k) { var f = form.elements.namedItem(k); if (f) {
f.value = saved[k].value;
f.checked = saved[k].checked;
} });
wrap.appendChild(copy);
wrap.appendChild(form);
node.appendChild(wrap);
g.SILENCE_WIRE_CONSULTATION(form);
if (node._contextHandler) {
document.removeEventListener('silence:problem', node._contextHandler);
node._contextHandler = null;
}
}
g.SILENCE_PAGES = g.SILENCE_PAGES || {};
g.SILENCE_PAGES.contacts = render;
g.SILENCE_PAGES.consultation27 = render;
}(window));
;
(function (global) {
'use strict';
global.SILENCE_PAGES = global.SILENCE_PAGES || {};
var mounted = [];
global.dataLayer = global.dataLayer || [];
function track(name, detail) {
var payload = { page: document.body ? document.body.getAttribute('data-page') : undefined };
if (detail) {
for (var k in detail) {
if (detail[k] !== undefined)
payload[k] = detail[k];
}
}
if (global.SILENCE_ANALYTICS && typeof global.SILENCE_ANALYTICS.track === 'function') {
global.SILENCE_ANALYTICS.track(name, payload);
}
else {
payload.event = name;
global.dataLayer.push(payload);
}
}
global.SILENCE_TRACK = track;
document.addEventListener('click', function (e) {
var el = e.target.closest && e.target.closest('[data-analytics]');
if (!el)
return;
track(el.getAttribute('data-analytics'), { value: el.getAttribute('data-analytics-value') || undefined });
});
var NAV_MAP = {
catalog: 'catalog.html',
systems: 'systems.html',
pro: 'pro.html',
projects: 'projects.html',
contacts: 'contacts.html'
};
var SEO_TITLE = {
index: {
ru: 'SILENCE \u2014 звукоизоляция стен, потолка и пола в Астане',
kz: 'SILENCE \u2014 Астанада қабырға, төбе және еденді дыбыстан оқшаулау',
en: 'SILENCE \u2014 wall, ceiling and floor soundproofing in Astana'
},
catalog: {
ru: 'Каталог материалов \u2014 SILENCE Астана',
kz: 'Дыбыс оқшаулау жүйелерінің каталогы \u2014 SILENCE Астана',
en: 'Soundproofing systems catalogue \u2014 SILENCE Astana'
},
systems: {
ru: 'Таблица конструкций \u2014 звукоизоляция SILENCE',
kz: 'Конструкциялар кестесі \u2014 SILENCE дыбыс оқшаулауы',
en: 'Construction table \u2014 SILENCE soundproofing'
},
pro: {
ru: 'Профессионалам \u2014 акустические решения и нормативы SILENCE',
kz: 'Кәсіпқойларға \u2014 SILENCE акустикалық шешімдері мен нормативтері',
en: 'For professionals \u2014 SILENCE acoustic solutions and standards'
},
projects: {
ru: 'Объекты из презентации SILENCE',
kz: 'SILENCE объектілері \u2014 дыбыс оқшаулау монтажының мысалдары',
en: 'SILENCE projects \u2014 soundproofing installation examples'
},
contacts: {
ru: 'Консультация специалиста \u2014 SILENCE Астана',
kz: 'Дыбыс оқшаулау есебіне өтінім \u2014 SILENCE Астана',
en: 'Request a soundproofing quote \u2014 SILENCE Astana'
}
};
function renderTitle(lang) {
var page = document.body.getAttribute('data-page') || 'index';
var entry = SEO_TITLE[page];
if (!entry)
return;
document.title = entry[lang] || entry.ru;
}
function renderSlogan(lang) {
var SITE = global.SITE;
if (!SITE)
return;
var table = SITE.t[lang] || SITE.t.ru;
var slogan = table.slogan || [];
var nodes = document.querySelectorAll('[data-slogan-line]');
for (var i = 0; i < nodes.length; i++) {
var idx = Number(nodes[i].getAttribute('data-slogan-line'));
nodes[i].textContent = slogan[idx] || '';
}
}
function renderContacts() {
var SITE = global.SITE;
if (!SITE || !SITE.contacts)
return;
var c = SITE.contacts;
var phoneNodes = document.querySelectorAll('[data-bind="phone"]');
for (var i = 0; i < phoneNodes.length; i++) {
phoneNodes[i].textContent = c.phone || '';
phoneNodes[i].setAttribute('href', c.phoneHref || '#');
}
var waNodes = document.querySelectorAll('[data-bind="whatsapp"]');
for (var j = 0; j < waNodes.length; j++) {
waNodes[j].setAttribute('href', c.whatsapp || '#');
}
}
function markCurrentNav() {
var page = document.body.getAttribute('data-page');
var target = NAV_MAP[page];
if (!target)
return;
var links = document.querySelectorAll('.site-nav__list a, .mobile-menu__list a');
for (var i = 0; i < links.length; i++) {
if (links[i].getAttribute('href') === target) {
links[i].setAttribute('aria-current', 'page');
}
}
}
function runMounts() {
mounted = [];
var nodes = document.querySelectorAll('[data-mount]');
for (var i = 0; i < nodes.length; i++) {
var name = nodes[i].getAttribute('data-mount');
var fn = global.SILENCE_PAGES[name];
if (typeof fn === 'function') {
try {
fn(nodes[i]);
mounted.push({ fn: fn, node: nodes[i] });
}
catch (err) {
console.error('[SILENCE] секция "' + name + '" не отрендерилась:', err);
}
}
}
if (global.SILENCE_CORE)
global.SILENCE_CORE.linkNorms(document.body);
}
function rerunMounts() {
for (var i = 0; i < mounted.length; i++) {
try {
mounted[i].fn(mounted[i].node);
}
catch (err) {
console.error('[SILENCE] пересборка секции упала:', err);
}
}
if (global.SILENCE_CORE)
global.SILENCE_CORE.linkNorms(document.body);
}
document.addEventListener('DOMContentLoaded', function () {
if (global.SILENCE_ANALYTICS)
global.SILENCE_ANALYTICS.captureAttribution();
initMobileMenu();
var lang = (global.SILENCE_CORE && global.SILENCE_CORE.getLang()) || 'ru';
renderSlogan(lang);
renderContacts();
markCurrentNav();
renderTitle(lang);
runMounts();
track('page_view', { lang: lang });
});
document.addEventListener('silence:lang', function (e) {
renderSlogan(e.detail.lang);
renderTitle(e.detail.lang);
rerunMounts();
track('lang_change', { lang: e.detail.lang });
});
global.SILENCE_PAGES['norms-strip'] = function (node) {
var C = global.SILENCE_CORE;
var SITE = global.SITE, NORMS = global.SILENCE_NORMS;
if (!C || !NORMS)
return;
var lang = C.getLang();
node.innerHTML = '';
var wrap = C.el('div', { class: 'container norms-strip' });
['sn', 'sp'].forEach(function (key) {
var doc = NORMS[key];
if (!doc)
return;
var body = doc[lang] || doc.ru;
wrap.appendChild(C.el('p', { class: 'caption norms-strip__line' }, [body.title]));
});
node.appendChild(wrap);
};
function initFloatingWhatsApp() {
var SITE = global.SITE;
if (!SITE || !SITE.contacts || !SITE.contacts.whatsapp)
return;
if (document.body.getAttribute('data-page') === 'contacts')
return;
var core = global.SILENCE_CORE;
var btn = core.el('a', {
class: 'floating-whatsapp',
href: SITE.contacts.whatsapp,
'aria-label': 'WhatsApp',
'aria-hidden': 'true',
tabindex: '-1',
'data-analytics': 'whatsapp_click_floating'
});
document.body.appendChild(btn);
var shown = false;
function check() {
var pastHero = global.scrollY > global.innerHeight * 0.9;
if (pastHero && !shown) {
btn.classList.add('floating-whatsapp--visible');
btn.removeAttribute('aria-hidden');
btn.removeAttribute('tabindex');
shown = true;
}
else if (!pastHero && shown) {
btn.classList.remove('floating-whatsapp--visible');
btn.setAttribute('aria-hidden', 'true');
btn.setAttribute('tabindex', '-1');
shown = false;
}
}
global.addEventListener('scroll', check, { passive: true });
check();
}
document.addEventListener('DOMContentLoaded', initFloatingWhatsApp);
function initMobileMenu() {
var C = global.SILENCE_CORE, header = document.querySelector('.header27'), btn = document.querySelector('[data-mobile-menu-btn]'), panel = document.getElementById('mobile-site-menu');
if (!header || !btn || !panel)
return;
var list = header.querySelector('.site-nav__list').cloneNode(true);
list.className = 'mobile-menu__list';
panel.appendChild(list);
panel.appendChild(C.el('a', { class: 'btn btn--primary', href: 'contacts.html', 'data-i18n': 'cta' }, [C.t('cta', C.getLang())]));
function label() { btn.setAttribute('aria-label', C.getLang() === 'kz' ? (panel.hidden ? 'Мәзірді ашу' : 'Мәзірді жабу') : C.getLang() === 'en' ? (panel.hidden ? 'Open menu' : 'Close menu') : (panel.hidden ? 'Открыть меню' : 'Закрыть меню')); }
function close(focus) { panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); label(); if (focus)
btn.focus({ preventScroll: true }); }
btn.addEventListener('click', function () { panel.hidden = !panel.hidden; btn.setAttribute('aria-expanded', String(!panel.hidden)); label(); });
panel.addEventListener('click', function (e) { if (e.target.closest('a'))
close(false); });
document.addEventListener('click', function (e) { if (!panel.hidden && !header.contains(e.target))
close(false); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) {
e.preventDefault();
close(true);
} });
global.addEventListener('resize', function () { if (innerWidth >= 1180)
close(false); });
document.addEventListener('silence:overlay-open', function () { close(false); });
document.addEventListener('silence:lang', label);
label();
var language = header.querySelector('[data-language]'), theme = header.querySelector('[data-theme-toggle]');
language.value = C.getLang();
language.addEventListener('change', function () { C.applyLang(language.value); });
function themeLabel() { theme.setAttribute('aria-label', C.getLang() === 'kz' ? 'Тақырыпты ауыстыру' : C.getLang() === 'en' ? 'Switch colour theme' : 'Переключить тему'); theme.setAttribute('aria-pressed', String(C.getTheme() === 'dark')); }
theme.addEventListener('click', function () { C.applyTheme(C.getTheme() === 'dark' ? 'light' : 'dark'); });
document.addEventListener('silence:theme', themeLabel);
document.addEventListener('silence:lang', themeLabel);
themeLabel();
}
}(window));