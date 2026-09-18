(function (global) {
'use strict';
var AUD_ORDER = ['eng', 'biz', 'dec'];
var AUD_LABEL_KEY = { eng: 'audEng', biz: 'audBiz', dec: 'audDec' };
function itemName(item, lang) {
return typeof item.name === 'string' ? item.name : (item.name[lang] || item.name.ru);
}
function renderAudience(host, key) {
var C = global.SILENCE_CORE, SITE = global.SITE;
var lang = C.getLang();
var t = function (k) { return C.t(k, lang); };
var a = SITE.audience[key];
var copy = a[lang] || a.ru;
host.innerHTML = '';
host.appendChild(C.el('h2', {}, [copy.title]));
host.appendChild(C.el('p', { class: 'lead' }, [copy.lead]));
host.appendChild(C.el('h3', { class: 'pro__subhead' }, [t('audTasks')]));
var taskList = C.el('ul', { class: 'pro__tasks' });
copy.tasks.forEach(function (task) {
var item = C.findItem(task[1]);
if (!item)
return;
var li = C.el('li', {}, [
C.el('button', { type: 'button', class: 'pro__task-btn', 'data-analytics': 'pro_task_open', 'data-analytics-value': task[1] }, [
C.el('span', { class: 'pro__task-label' }, [task[0]]),
C.el('span', { class: 'pro__task-item u-accent' }, [itemName(item, lang)])
])
]);
li.firstChild.addEventListener('click', function () {
C.openCardOverlay(C.renderCardBody(item, lang));
});
taskList.appendChild(li);
});
host.appendChild(taskList);
host.appendChild(C.el('h3', { class: 'pro__subhead' }, [t('audPicks')]));
var picksGrid = C.el('div', { class: 'cards-grid pro__picks' });
a.picks.forEach(function (id) {
var item = C.findItem(id);
if (!item)
return;
var card = C.el('button', { type: 'button', class: 'card pro__pick', 'data-analytics': 'pro_system_open', 'data-analytics-value': item.id }, [
item.img ? C.el('img', { src: item.img, alt: itemName(item, lang), loading: 'lazy' }) : null,
C.el('span', { class: 'card__name' }, [itemName(item, lang)])
]);
card.addEventListener('click', function () { C.openCardOverlay(C.renderCardBody(item, lang)); });
picksGrid.appendChild(card);
});
host.appendChild(picksGrid);
}
function renderBoardDetail(item, lang) {
var C = global.SILENCE_CORE;
var name = itemName(item, lang);
var groups = (item.detail[lang] || item.detail.ru).map(function (group) {
var rows = group[1].map(function (pair) {
return C.el('div', { class: 'board-detail__row' }, [
C.el('dt', {}, [pair[0]]), C.el('dd', {}, [pair[1]])
]);
});
return C.el('details', { class: 'board-detail__group' }, [
C.el('summary', {}, [group[0]]),
C.el('dl', { class: 'board-detail__dl' }, rows)
]);
});
return C.el('article', { class: 'board-detail' }, [
item.img ? C.el('img', { src: item.img, alt: name, loading: 'lazy' }) : null,
C.el('h3', {}, [name]),
C.el('div', { class: 'board-detail__groups' }, groups)
]);
}
function renderNorms(host) {
var C = global.SILENCE_CORE;
var lang = C.getLang();
var t = function (k) { return C.t(k, lang); };
host.innerHTML = '';
host.appendChild(C.el('h2', {}, [t('normTitle')]));
host.appendChild(C.el('p', { class: 'lead' }, [t('normLead')]));
var grid = C.el('div', { class: 'cards-grid pro__norms' });
['sn', 'sp'].forEach(function (key) {
var doc = (global.SILENCE_NORMS || {})[key];
if (!doc)
return;
var body = doc[lang] || doc.ru;
var btn = C.el('button', { type: 'button', class: 'card pro__norm-card', 'data-analytics': 'pro_norm_open', 'data-analytics-value': key }, [
C.el('span', { class: 'card__name' }, [body.title]),
C.el('span', { class: 'card__cta u-accent' }, [t('normMore')])
]);
btn.addEventListener('click', function () { C.openNormDetail(key, lang); });
grid.appendChild(btn);
});
host.appendChild(grid);
}
function render(node) {
var C = global.SILENCE_CORE, CATALOG = global.CATALOG;
var lang = C.getLang();
var t = function (k) { return C.t(k, lang); };
var hashAud = (global.location.hash || '').replace('#aud-', '');
var active = (node._pro && node._pro.active) || (AUD_ORDER.indexOf(hashAud) !== -1 ? hashAud : AUD_ORDER[0]);
node.innerHTML = '';
var wrap = C.el('div', { class: 'container pro-page' });
var intro = C.el('header', { class: 'section-heading pro-page__intro' }, [
C.el('h1', {}, [t('proTitle')]),
C.el('p', { class: 'lead' }, [t('proLead')])
]);
var jump = C.el('nav', { class: 'pro-jump', 'aria-label': t('proTitle') }, [
C.el('a', { class: 'btn btn--secondary btn--sm', href: '#pro-audiences' }, [t('proAudienceTitle')]),
C.el('a', { class: 'btn btn--secondary btn--sm', href: '#pro-norms' }, [t('proNormAnchor')]),
C.el('a', { class: 'btn btn--secondary btn--sm', href: '#pro-materials' }, [t('proMaterialsAnchor')])
]);
intro.appendChild(jump);
wrap.appendChild(intro);
var audienceSection = C.el('section', { id: 'pro-audiences', class: 'pro-section section--tight' });
audienceSection.appendChild(C.el('h2', {}, [t('proAudienceTitle')]));
var switcher = C.el('div', { class: 'catalog-filter', role: 'group', 'aria-label': t('audTitle') });
var audienceHost = C.el('div', { class: 'pro__audience' });
AUD_ORDER.forEach(function (key) {
var btn = C.el('button', {
type: 'button', class: 'switch-btn', 'data-aud': key,
'data-analytics': 'pro_audience_select', 'data-analytics-value': key,
'aria-pressed': String(key === active)
}, [t(AUD_LABEL_KEY[key])]);
btn.addEventListener('click', function () {
node._pro = { active: key };
C.$$('[data-aud]', switcher).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
renderAudience(audienceHost, key);
if (global.history && global.history.replaceState)
global.history.replaceState(null, '', '#aud-' + key);
});
switcher.appendChild(btn);
});
audienceSection.appendChild(switcher);
audienceSection.appendChild(audienceHost);
renderAudience(audienceHost, active);
wrap.appendChild(audienceSection);
var normsHost = C.el('section', { id: 'pro-norms', class: 'pro-section section--tight' });
wrap.appendChild(normsHost);
renderNorms(normsHost);
var boardsHost = C.el('section', { id: 'pro-materials', class: 'pro__boards pro-section section--tight' });
boardsHost.appendChild(C.el('h2', {}, [t('matTitle')]));
CATALOG.boards.forEach(function (board) {
boardsHost.appendChild(renderBoardDetail(board, lang));
});
wrap.appendChild(boardsHost);
node.appendChild(wrap);
if (/^#pro-(audiences|norms|materials)$/.test(global.location.hash || '')) {
var target = document.querySelector(global.location.hash);
if (target)
global.requestAnimationFrame(function () { target.scrollIntoView({ block: 'start' }); });
}
}
global.SILENCE_PAGES = global.SILENCE_PAGES || {};
global.SILENCE_PAGES.pro = render;
}(window));