(function (g) {
'use strict';
var zones = [
{ id: 'top', n: '1', x: 0, y: 0, w: 100, h: 30 },
{ id: 'left', n: '2', x: 0, y: 30, w: 29, h: 38 },
{ id: 'right', n: '3', x: 71, y: 30, w: 29, h: 38 },
{ id: 'bottom', n: '4', x: 0, y: 68, w: 100, h: 32 }
];
function render(node) {
var C = g.SILENCE_CORE, D = g.SILENCE_V27, U = g.SILENCE_V27_UI, lang = C.getLang();
function t(k) { return U.t(k); }
function tr(r, k, e) { return lang === 'kz' ? k : lang === 'en' ? e : r; }
var overlay = node.querySelector('[data-cutaway-overlay]');
var host = node.querySelector('[data-cutaway-content]');
var choices = node.querySelector('[data-room-choices]');
var otherChoices = node.querySelector('[data-room-other]');
if (!overlay || !host || !choices)
return;
if (node._room29Cleanup)
node._room29Cleanup();
overlay.innerHTML = '';
host.innerHTML = '';
choices.innerHTML = '';
if (otherChoices)
otherChoices.innerHTML = '';
var sourceLabel = node.querySelector('[data-room-source-label]');
if (sourceLabel)
sourceLabel.textContent = tr('Источник шума:', 'Шу көзі:', 'Noise source:');
var otherLabel = node.querySelector('[data-room-other-label]');
if (otherLabel)
otherLabel.textContent = tr('Другие задачи', 'Басқа міндеттер', 'Other tasks');
var instruction = node.querySelector('[data-room-instruction]');
if (instruction)
instruction.textContent = tr('Картинка интерактивная: нажмите на комнату или выберите источник шума кнопками.', 'Сурет интерактивті: бөлмені басыңыз немесе шу көзін түймелермен таңдаңыз.', 'Interactive image: tap a room or choose the noise source using the buttons.');
node.dataset.roomUiVersion = '34';
var entries = [
{ id: 'top', short: tr('Сверху', 'Жоғарыдан', 'Above'), title: tr('Сверлят и стучат сверху', 'Жоғарыдан бұрғылау мен соққы', 'Drilling and impacts above'), desc: tr('Для потолка рассматриваем систему с виброразвязкой. При ударах и ремонте сначала проверяем, как звук передаётся через перекрытие и примыкания.', 'Төбе үшін дірілді ажырататын жүйе қарастырылады. Алдымен дыбыстың жабын мен түйіспелер арқылы таралуын тексереміз.', 'Consider an isolated ceiling assembly. First assess how impacts and drilling travel through the slab and adjoining junctions.'), place: 'ceiling', systems: ['c-apex', 'c-comfort', 'c-premium'] },
{ id: 'left', short: tr('Слева', 'Сол жақтан', 'Left'), title: tr('Разговоры и бытовой шум за стеной', 'Қабырға артындағы әңгіме мен тұрмыстық шу', 'Speech and household noise behind the wall'), desc: tr('Дополнительная облицовка существующей стены. Конструкцию выбирают с учётом основания, розеток, щелей и примыканий.', 'Бар қабырғаның қосымша қаптамасы. Негіз, розеткалар, саңылаулар мен түйіспелер ескеріледі.', 'Additional lining for an existing wall. Selection depends on the base, sockets, gaps and junctions.'), place: 'wall', systems: ['wf-standart', 'w-comfort', 'w-premium'] },
{ id: 'right', short: tr('Справа', 'Оң жақтан', 'Right'), title: tr('Музыка через стену справа', 'Оң жақ қабырға арқылы музыка', 'Music through the right wall'), desc: tr('Для музыки и баса особенно важны исходная стена и обходные пути передачи. Ниже — варианты стеновых конструкций для обсуждения со специалистом.', 'Музыка мен бас үшін қабырға мен жанама берілу жолдары маңызды. Төменде маманмен талқылауға арналған қабырға жүйелері.', 'For music and bass, the existing wall and flanking paths matter. These wall assemblies are starting points for a specialist assessment.'), place: 'wall', systems: ['w-comfort', 'w-premium', 'w-business'] },
{ id: 'bottom', short: tr('Снизу', 'Төменнен', 'Below'), title: tr('Басы и разговоры снизу', 'Төменнен бас пен әңгіме', 'Bass and speech from below'), desc: tr('Звук может идти через перекрытие, стены и примыкания. Напольную систему против вашего топота нельзя автоматически назначать для шума, приходящего снизу.', 'Дыбыс жабын, қабырға және түйіспелер арқылы келуі мүмкін. Өз қадамыңызға арналған еден жүйесін төменнен келетін шуға автоматты түрде ұсынуға болмайды.', 'Sound may travel through the floor slab, walls and junctions. A floor system for your own footsteps is not automatically a solution for incoming noise from below.'), diagnostic: true },
{ id: 'impact-down', short: tr('Мой топот слышат снизу', 'Қадамымды төменнен естиді', 'My footsteps disturb downstairs'), title: tr('Системы звукоизоляции пола', 'Еденді дыбыстан оқшаулау жүйелері', 'Floor sound-insulating assemblies'), desc: tr('Задача — снизить передачу ударного шума от вашего пола вниз. Выбор зависит от основания, покрытия и допустимой высоты конструкции.', 'Мақсат — еденнен төменге берілетін соққы шуды азайту. Таңдау негізге, жабынға және рұқсат етілген биіктікке байланысты.', 'Reduce impact-noise transmission from your floor downwards. Selection depends on the base, finish and available build-up height.'), place: 'floor', systems: ['f-antistomp', 'f-sfgb', 'f-sf'] },
{ id: 'echo', short: tr('Эхо в комнате', 'Бөлмедегі жаңғырық', 'Echo in the room'), title: tr('Акустика внутри помещения', 'Бөлме ішіндегі акустика', 'Room acoustics'), desc: tr('Для работы с отражениями и эхом нужны интерьерные звукопоглощающие панели. Это отдельная задача, не замена звукоизоляции от соседей.', 'Шағылу мен жаңғырық үшін интерьерлік дыбыс жұтқыш панельдер қажет. Бұл көршілерден дыбыс оқшаулауды алмастырмайтын бөлек міндет.', 'Interior sound-absorbing panels address reflections and reverberation. This is a separate task, not a substitute for insulation from neighbours.'), echo: true }
];
var shortCopy = {
top: { title: tr('Сверлят и стучат сверху', 'Жоғарыдан бұрғылау мен соққы', 'Drilling and impacts above'), note: tr('Варианты потолочных конструкций.', 'Төбе конструкцияларының нұсқалары.', 'Explore ceiling assemblies.') },
left: { title: tr('Разговоры за стеной слева', 'Сол жақ қабырға артындағы әңгіме', 'Speech through the left wall'), note: tr('Варианты дополнительной облицовки.', 'Қосымша қаптама нұсқалары.', 'Explore additional wall linings.') },
right: { title: tr('Музыка через стену справа', 'Оң жақ қабырға арқылы музыка', 'Music through the right wall'), note: tr('Посмотрите варианты стеновых систем.', 'Қабырға жүйелерін қараңыз.', 'Explore wall assemblies.') },
bottom: { title: tr('Басы и разговоры снизу', 'Төменнен бас пен әңгіме', 'Bass and speech from below'), note: tr('Сначала определим путь передачи шума.', 'Алдымен шудың берілу жолын анықтаймыз.', 'First identify the transmission path.') }
};
var hits = [], buttons = [], cleanups = [], positionFrame = 0, focusTimer = 0;
var figure = overlay.parentElement, lastTrigger = null;
var motion = g.matchMedia('(prefers-reduced-motion: reduce)');
function headerOffset() { var h = document.querySelector('.header27'); if (!h)
return 0; var r = h.getBoundingClientRect(); return r.width >= g.innerWidth * .6 ? Math.max(0, r.bottom) : 0; }
var guideTimer = 0, guideLeaveTimer = 0, guideSuppressed = false, guideHover = false, guidePointer = null;
var guide = C.el('div', { id: 'room34-guide', class: 'room34-guide', role: 'tooltip', hidden: '' }, [
C.el('strong', {}, [tr('На комнаты можно нажимать', 'Бөлмелерді басуға болады', 'The rooms are clickable')]),
C.el('span', {}, [tr('Выберите, откуда слышен шум. Покажем описание и варианты решения.', 'Шу қай жақтан естілетінін таңдаңыз. Сипаттама мен шешім нұсқаларын көрсетеміз.', 'Choose where the noise comes from to see details and possible solutions.')])
]);
overlay.appendChild(guide);
function hideGuide(suppress) { g.clearTimeout(guideTimer); g.clearTimeout(guideLeaveTimer); guide.hidden = true; if (suppress)
guideSuppressed = true; }
function positionGuide() {
if (guide.hidden)
return;
var r = overlay.getBoundingClientRect(), w = guide.offsetWidth, h = guide.offsetHeight, pad = 10;
var minY = Math.max(pad, headerOffset() - r.top + pad), maxY = Math.min(r.height - h - pad, g.innerHeight - r.top - h - pad);
if (minY > maxY) {
minY = pad;
maxY = Math.max(pad, r.height - h - pad);
}
var maxX = Math.max(pad, r.width - w - pad), p = guidePointer || { x: r.width * .5, y: r.height * .15 };
var targets = hits.map(function (b) { var t = b.querySelector('.room27-pin').getBoundingClientRect(); return { x: t.left - r.left - 6, y: t.top - r.top - 6, w: t.width + 12, h: t.height + 12 }; });
var candidate = [{ x: p.x + 16, y: p.y + 20 }, { x: p.x - w - 16, y: p.y + 20 }, { x: pad, y: minY }, { x: maxX, y: minY }, { x: pad, y: maxY }, { x: maxX, y: maxY }], best;
candidate.forEach(function (c) { var b = { x: clamp(c.x, pad, maxX), y: clamp(c.y, minY, maxY), w: w, h: h }; var covered = targets.reduce(function (n, t) { return n + area(b, t); }, 0); var pointerOverlap = area(b, { x: p.x - 10, y: p.y - 10, w: 20, h: 20 }); var score = (covered + pointerOverlap) * 10000 + Math.hypot(b.x + w / 2 - p.x, b.y + h / 2 - p.y); if (!best || score < best.score)
best = { x: b.x, y: b.y, score: score }; });
guide.style.left = Math.round(best.x) + 'px';
guide.style.top = Math.round(best.y) + 'px';
}
function showGuide() { if (guideSuppressed || node._selectedProblem || !figure.isConnected)
return; guide.hidden = false; positionGuide(); }
function requestGuide() { g.clearTimeout(guideLeaveTimer); g.clearTimeout(guideTimer); if (!guide.hidden)
return; guideTimer = g.setTimeout(showGuide, 180); }
function on(target, event, handler, options) { target.addEventListener(event, handler, options); cleanups.push(function () { target.removeEventListener(event, handler, options); }); }
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function area(a, b) { return Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)); }
function safeFocus(el) { if (el && el.isConnected)
el.focus({ preventScroll: true }); }
var title = C.el('h3', { id: 'room29-caption-title', class: 'room29-caption__title' });
var note = C.el('p', { id: 'room29-caption-note', class: 'room29-caption__note' });
var close = C.el('button', { type: 'button', class: 'room29-caption__close', 'aria-label': tr('Скрыть подсказку', 'Кеңесті жабу', 'Dismiss room details') }, [C.el('span', { 'aria-hidden': 'true' }, ['×'])]);
var more = C.el('button', { type: 'button', class: 'room29-caption__more', 'aria-controls': 'room27-result' }, [
C.el('span', {}, [tr('Показать решения', 'Шешімдерді көрсету', 'Show solutions')]), C.el('span', { 'aria-hidden': 'true' }, ['↓'])
]);
var caption = C.el('aside', { id: 'room29-caption', class: 'room29-caption', hidden: '', role: 'region', 'aria-labelledby': 'room29-caption-title' }, [
C.el('div', { class: 'room29-caption__heading' }, [title, close]), note, more
]);
var live = C.el('span', { class: 'room29-sr-only', 'aria-live': 'polite', 'aria-atomic': 'true' });
var ns = 'http://www.w3.org/2000/svg';
var leader = document.createElementNS(ns, 'svg');
leader.setAttribute('class', 'room29-leader');
leader.setAttribute('aria-hidden', 'true');
var leaderLine = document.createElementNS(ns, 'path');
leader.appendChild(leaderLine);
overlay.appendChild(leader);
overlay.appendChild(caption);
overlay.appendChild(live);
function captionState() {
hits.forEach(function (b) { b.setAttribute('aria-expanded', String(!caption.hidden && b.dataset.room === node._selectedProblem)); });
}
function hideCaption(returnFocus) {
var focused = caption.contains(document.activeElement);
caption.hidden = true;
leader.style.display = 'none';
node._room29CaptionOpen = false;
captionState();
if (returnFocus || focused)
safeFocus(lastTrigger);
}
function positionCaption() {
positionFrame = 0;
if (caption.hidden)
return;
var active = hits.find(function (b) { return b.dataset.room === node._selectedProblem; });
if (!active)
return;
var box = overlay.getBoundingClientRect(), pin = active.querySelector('.room27-pin').getBoundingClientRect();
if (box.width < 1 || box.height < 1)
return;
caption.classList.toggle('room29-caption--compact', box.width < 420);
caption.classList.toggle('room29-caption--narrow', box.width < 310);
var w = caption.offsetWidth, h = caption.offsetHeight, pad = 8, gap = box.width < 400 ? 6 : 10;
var anchor = { x: pin.left - box.left, y: pin.top - box.top, w: pin.width, h: pin.height };
var cx = anchor.x + anchor.w / 2, cy = anchor.y + anchor.h / 2;
var headerBottom = headerOffset();
var vv = g.visualViewport, vtop = vv ? vv.offsetTop : 0, vbottom = vtop + (vv ? vv.height : g.innerHeight);
var ymin = pad, ymax = Math.max(pad, box.height - h - pad);
var vymin = Math.max(pad, headerBottom - box.top + pad, vtop - box.top + pad);
var vymax = Math.min(ymax, vbottom - box.top - h - pad);
if (vymax >= vymin) {
ymin = vymin;
ymax = vymax;
}
var xmax = Math.max(pad, box.width - w - pad);
var guard = box.width < 400 ? 3 : 7;
var targets = hits.map(function (b) { var r = b.querySelector('.room27-pin').getBoundingClientRect(); return { x: r.left - box.left - guard, y: r.top - box.top - guard, w: r.width + 2 * guard, h: r.height + 2 * guard }; });
var center = { x: box.width * .29, y: box.height * .30, w: box.width * .42, h: box.height * .38 };
var candidates = [
{ x: anchor.x + anchor.w + gap, y: cy - h / 2 },
{ x: anchor.x - w - gap, y: cy - h / 2 },
{ x: cx - w / 2, y: anchor.y + anchor.h + gap },
{ x: cx - w / 2, y: anchor.y - h - gap },
{ x: pad, y: pad }, { x: xmax, y: pad },
{ x: pad, y: box.height * .30 - h - pad }, { x: xmax, y: box.height * .30 - h - pad },
{ x: pad, y: box.height * .68 + pad }, { x: xmax, y: box.height * .68 + pad },
{ x: pad, y: box.height - h - pad }, { x: xmax, y: box.height - h - pad },
{ x: cx - w / 2, y: ymin }, { x: cx - w / 2, y: ymax }
];
var best = null;
candidates.forEach(function (c) {
var r = { x: clamp(c.x, pad, xmax), y: clamp(c.y, ymin, ymax), w: w, h: h };
var dx = Math.max(r.x - cx, 0, cx - (r.x + w)), dy = Math.max(r.y - cy, 0, cy - (r.y + h));
var covered = targets.reduce(function (sum, t) { return sum + area(r, t); }, 0);
var score = covered * 10000 + area(r, center) * .9 + (dx * dx + dy * dy) * .15;
if (!best || score < best.score)
best = { x: r.x, y: r.y, score: score };
});
caption.style.left = Math.round(best.x) + 'px';
caption.style.top = Math.round(best.y) + 'px';
var ex = clamp(cx, best.x, best.x + w), ey = clamp(cy, best.y, best.y + h);
var lx = ex - cx, ly = ey - cy, length = Math.hypot(lx, ly), radius = anchor.w / 2 + 4;
if (length > radius + 6) {
leader.style.display = 'block';
leader.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
var sx = cx + lx / length * radius, sy = cy + ly / length * radius;
leaderLine.setAttribute('d', 'M ' + sx + ' ' + sy + ' L ' + ex + ' ' + ey);
}
else
leader.style.display = 'none';
}
function queuePosition() { if (!caption.hidden && !positionFrame)
positionFrame = g.requestAnimationFrame(positionCaption); }
function showCaption(id, trigger) {
var text = shortCopy[id];
if (!text) {
hideCaption(false);
return;
}
title.textContent = text.title;
note.textContent = text.note;
caption.dataset.room = id;
lastTrigger = trigger || hits.find(function (b) { return b.dataset.room === id; });
caption.hidden = false;
node._room29CaptionOpen = true;
captionState();
positionCaption();
live.textContent = text.title + '. ' + tr('Кнопка «Показать решения» откроет описание ниже.', '«Шешімдерді көрсету» түймесі төмендегі сипаттаманы ашады.', 'Use Show solutions to move to the detailed description.');
}
function select(id, user, trigger) {
hideGuide(true);
var e = entries.find(function (x) { return x.id === id; });
if (!e)
return;
g.clearTimeout(focusTimer);
node._selectedProblem = id;
node.dataset.activeRoom = id;
g.SILENCE_CONSULTATION_CONTEXT = { problem: id, label: e.title };
document.dispatchEvent(new CustomEvent('silence:problem', { detail: g.SILENCE_CONSULTATION_CONTEXT }));
var isMap = zones.some(function (z) { return z.id === id; });
buttons.concat(hits).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.room === id)); });
hits.forEach(function (b) { b.classList.toggle('room29-hotspot--dimmed', isMap && b.dataset.room !== id); });
host.innerHTML = '';
host.className = 'room27-result';
var q = 'contacts.html?problem=' + encodeURIComponent(id) + (e.place ? '&surface=' + e.place : '');
var heading = C.el('h2', { id: 'room29-result-title', tabindex: '-1' }, [e.title]);
host.setAttribute('aria-labelledby', 'room29-result-title');
var copy = C.el('div', { class: 'room27-result__copy' }, [
C.el('p', { class: 'eyebrow' }, [t('selection')]), heading, C.el('p', {}, [e.desc]),
C.el('a', { class: 'btn btn--primary', href: q, 'data-analytics': 'consultation_scenario', 'data-analytics-value': id }, [t('cta')])
]);
host.appendChild(copy);
var rec = C.el('div', { class: 'room27-recommendations' });
if (e.systems) {
rec.appendChild(C.el('p', { class: 'eyebrow' }, [t('options')]));
e.systems.forEach(function (sid) {
var s = g.CATALOG.systems.find(function (x) { return x.id === sid; });
if (!s)
return;
var b = C.el('button', { type: 'button', class: 'room27-system', 'data-system': s.id }, [
C.el('span', {}, [s.name]), C.el('span', { class: 'room27-system__rating' }, [
s.ix + ' ' + s.from + (s.to !== s.from ? '–' + s.to : '') + ' ' + tr('дБ', 'дБ', 'dB'), C.el('span', { 'aria-hidden': 'true' }, [' ↗'])
])
]);
b.addEventListener('click', function () { C.openCardOverlay(C.renderCardBody(s, lang)); });
rec.appendChild(b);
});
rec.appendChild(C.el('p', { class: 'source27-note' }, [t('notGuarantee')]));
}
else if (e.echo) {
['acousticwood', 'reverboard', 'acousticloft'].forEach(function (parent) {
var p = D.products.find(function (x) { return x.parent === parent; });
var b = C.el('button', { type: 'button', class: 'room27-system' }, [C.el('span', {}, [parent === 'acousticwood' ? 'AcousticWood' : parent === 'reverboard' ? 'ReverBoard' : 'AcousticLoft']), C.el('span', { 'aria-hidden': 'true' }, ['↗'])]);
b.addEventListener('click', function () { U.openProduct(p); });
rec.appendChild(b);
});
}
else {
rec.appendChild(C.el('div', { class: 'diagnostic27' }, [
C.el('span', { class: 'diagnostic27-symbol', 'aria-hidden': 'true' }, ['↗']), C.el('h3', {}, [tr('Сначала — диагностика', 'Алдымен — диагностика', 'Assessment first')]),
C.el('p', {}, [tr('Опишите шум и конструкцию помещения. По одному направлению звука нельзя выбрать готовую систему.', 'Шуды және бөлме конструкциясын сипаттаңыз. Бір бағыт бойынша дайын жүйені таңдау мүмкін емес.', 'Describe the noise and construction. The direction alone is not enough to prescribe an assembly.')])
]));
}
host.appendChild(rec);
if (isMap && (trigger && trigger.classList.contains('room27-hotspot') || node._room29CaptionOpen))
showCaption(id, trigger);
else
hideCaption(false);
if (user && g.SILENCE_TRACK)
g.SILENCE_TRACK('room_selection', { value: id });
}
zones.forEach(function (z) {
var e = entries.find(function (x) { return x.id === z.id; });
var b = C.el('button', { type: 'button', class: 'room27-hotspot room27-hotspot--' + z.id, 'data-room': z.id, 'aria-label': e.title, 'aria-pressed': 'false', 'aria-expanded': 'false', 'aria-controls': 'room29-caption room27-result', 'aria-describedby': 'room34-instruction room34-guide' }, [C.el('span', { class: 'room27-pin', 'aria-hidden': 'true' }, [z.n])]);
b.style.left = z.x + '%';
b.style.top = z.y + '%';
b.style.width = z.w + '%';
b.style.height = z.h + '%';
var start = null, suppressUntil = 0;
on(b, 'pointerdown', function (ev) { start = { x: ev.clientX, y: ev.clientY }; }, { passive: true });
on(b, 'pointermove', function (ev) { if (start && (Math.abs(ev.clientX - start.x) > 9 || Math.abs(ev.clientY - start.y) > 9))
suppressUntil = Date.now() + 600; }, { passive: true });
on(b, 'pointercancel', function () { start = null; suppressUntil = Date.now() + 600; }, { passive: true });
on(b, 'pointerup', function () { start = null; }, { passive: true });
on(b, 'click', function (ev) { if (ev.detail !== 0 && Date.now() < suppressUntil)
return; select(z.id, true, b); });
on(b, 'keydown', function (ev) { if (ev.key === 'Tab' && !ev.shiftKey && !caption.hidden && node._selectedProblem === z.id) {
ev.preventDefault();
safeFocus(more);
} });
overlay.appendChild(b);
hits.push(b);
});
entries.forEach(function (e, i) {
var b = C.el('button', { type: 'button', class: 'room27-choice', 'data-room': e.id, 'aria-pressed': 'false', 'aria-controls': 'room27-result' }, [i < 4 ? C.el('span', { class: 'room27-choice__num', 'aria-hidden': 'true' }, [String(i + 1)]) : null, e.short]);
on(b, 'click', function () { select(e.id, true, b); });
(i < 4 || !otherChoices ? choices : otherChoices).appendChild(b);
buttons.push(b);
});
overlay.appendChild(leader);
overlay.appendChild(caption);
overlay.appendChild(live);
on(figure, 'pointerenter', function (ev) {
if (ev.pointerType === 'touch')
return;
guideHover = true;
var r = figure.getBoundingClientRect();
guidePointer = { x: ev.clientX - r.left, y: ev.clientY - r.top };
requestGuide();
}, { passive: true });
on(figure, 'pointerleave', function () { guideHover = false; g.clearTimeout(guideTimer); guideSuppressed = false; guideLeaveTimer = g.setTimeout(function () { if (!figure.contains(document.activeElement))
hideGuide(false); }, 120); }, { passive: true });
on(guide, 'pointerenter', function () { guideHover = true; g.clearTimeout(guideLeaveTimer); }, { passive: true });
on(figure, 'focusin', function (ev) {
if (!ev.target.classList.contains('room27-hotspot'))
return;
var r = figure.getBoundingClientRect(), b = ev.target.querySelector('.room27-pin').getBoundingClientRect();
guidePointer = { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2 };
requestGuide();
});
on(figure, 'focusout', function (ev) { if (!figure.contains(ev.relatedTarget)) {
guideSuppressed = false;
if (!guideHover)
hideGuide(false);
} });
on(document, 'keydown', function (ev) { if (ev.key === 'Escape' && !guide.hidden) {
ev.preventDefault();
hideGuide(true);
} });
on(close, 'click', function () { hideCaption(true); });
on(node, 'keydown', function (ev) {
if (ev.key === 'Escape' && !guide.hidden) {
ev.preventDefault();
ev.stopPropagation();
hideGuide(true);
return;
}
if (ev.key === 'Escape' && !caption.hidden) {
ev.preventDefault();
ev.stopPropagation();
hideCaption(caption.contains(document.activeElement));
}
});
on(more, 'keydown', function (ev) { if (ev.key === 'Tab' && ev.shiftKey) {
ev.preventDefault();
safeFocus(lastTrigger);
} });
on(more, 'click', function () {
var heading = host.querySelector('h2');
if (!heading)
return;
hideCaption(false);
var offset = headerOffset() + 16;
var target = Math.max(0, g.scrollY + host.getBoundingClientRect().top - offset);
if (motion.matches) {
var previous = document.documentElement.style.scrollBehavior;
document.documentElement.style.scrollBehavior = 'auto';
g.scrollTo({ top: target, behavior: 'instant' });
document.documentElement.style.scrollBehavior = previous;
safeFocus(heading);
}
else {
g.scrollTo({ top: target, behavior: 'smooth' });
focusTimer = g.setTimeout(function () { safeFocus(heading); }, 500);
}
if (g.SILENCE_TRACK)
g.SILENCE_TRACK('room_show_solutions', { value: node._selectedProblem });
});
on(g, 'resize', function () { queuePosition(); positionGuide(); }, { passive: true });
on(g, 'scroll', function () { queuePosition(); positionGuide(); }, { passive: true });
if (g.visualViewport) {
on(g.visualViewport, 'resize', queuePosition, { passive: true });
on(g.visualViewport, 'scroll', queuePosition, { passive: true });
}
var ro = null;
if (g.ResizeObserver) {
ro = new ResizeObserver(queuePosition);
ro.observe(figure);
ro.observe(caption);
}
if (document.fonts && document.fonts.ready)
document.fonts.ready.then(function () { if (caption.isConnected)
queuePosition(); });
node._room29Cleanup = function () { cleanups.forEach(function (f) { f(); }); if (ro)
ro.disconnect(); g.cancelAnimationFrame(positionFrame); g.clearTimeout(focusTimer); g.clearTimeout(guideTimer); g.clearTimeout(guideLeaveTimer); };
if (node._selectedProblem)
select(node._selectedProblem, false);
else {
host.className = 'room27-result room27-result--empty';
host.removeAttribute('aria-labelledby');
host.appendChild(C.el('div', {}, [C.el('p', { class: 'eyebrow' }, [t('selection')]), C.el('h2', {}, [t('resultTitle')]), C.el('p', {}, [tr('Нажмите на комнату или на кнопку источника шума. Здесь появятся описание ситуации и варианты решения.', 'Бөлмені немесе шу көзінің түймесін басыңыз. Мұнда жағдай сипаттамасы мен шешім нұсқалары пайда болады.', 'Tap a room or a noise-source button. The situation and possible solutions will appear here.')])]));
}
}
g.SILENCE_PAGES = g.SILENCE_PAGES || {};
g.SILENCE_PAGES['section-cutaway'] = render;
g.SILENCE_SECTION = { ZONES: zones };
}(window));
;
(function (global) {
'use strict';
var COPY = {
ru: {
title: 'Решения по типу объекта',
lead: 'От жилой комнаты до общественного пространства — разные задачи требуют разных решений.',
cta: 'Получить расчёт',
items: [
{
id: 'apartments',
tab: 'Квартиры',
img: 'assets/solutions/apartments.webp',
title: 'Звукоизоляция квартир',
text: 'Стены, потолки и полы для типовых квартирных сценариев: разговоры, телевизор, шаги сверху, басы и домашний кинотеатр.'
},
{
id: 'cottages',
tab: 'Коттеджи',
img: 'assets/solutions/cottages.webp',
title: 'Звукоизоляция коттеджей',
text: 'Решения для отдельных домов и коттеджей: спальни, детские, домашние кабинеты, инженерные помещения и межкомнатные перегородки.'
},
{
id: 'offices',
tab: 'Офисы',
img: 'assets/solutions/offices.webp',
title: 'Офисы и переговорные',
text: 'Снижение слышимости между кабинетами, акустический комфорт в open space, переговорных и рабочих помещениях.'
},
{
id: 'concert',
tab: 'Концертные залы',
img: 'assets/solutions/concert.webp',
title: 'Концертные и event-площадки',
text: 'Комплексные решения для больших объёмов: акустическая коррекция, управление реверберацией и снижение паразитных отражений.'
},
{
id: 'cinema',
tab: 'Кинотеатры',
img: 'assets/solutions/cinema.webp',
title: 'Кинотеатры и private cinema',
text: 'Облицовки и акустические решения для залов с высокими требованиями к разборчивости, контролю баса и комфорту зрителей.'
},
{
id: 'sport',
tab: 'Спортивные залы',
img: 'assets/solutions/sport.webp',
title: 'Спортивные и многофункциональные залы',
text: 'Снижение гулкости и избыточного шума в помещениях с большими площадями, жёсткими поверхностями и высоким уровнем активности.'
},
{
id: 'restaurant',
tab: 'Ресторан / караоке',
img: 'assets/solutions/restaurant-karaoke.webp',
title: 'Рестораны и караоке',
text: 'Звукоизоляция между залами и соседними помещениями, а также акустическая обработка для контроля эха, речи и музыки.'
},
{
id: 'hammam',
tab: 'Хаммам',
img: 'assets/solutions/hammam.webp',
title: 'Хаммам и SPA-зоны',
text: 'Решения для влажных помещений с учётом ограждающих конструкций, инженерного шума и требований к акустическому комфорту.'
}
]
},
kz: {
title: 'Нысан түрі бойынша шешімдер',
lead: 'Тұрғын бөлмеден қоғамдық кеңістікке дейін — әр міндетке өз шешімі.',
cta: 'Есеп алу',
items: [
{ id: 'apartments', tab: 'Пәтерлер', img: 'assets/solutions/apartments.webp', title: 'Пәтерлердің дыбыс оқшаулауы', text: 'Қабырға, төбе және еден үшін типтік пәтер сценарийлері: әңгіме, теледидар, жоғарыдан қадам, бас және үй кинотеатры.' },
{ id: 'cottages', tab: 'Коттедждер', img: 'assets/solutions/cottages.webp', title: 'Коттедждердің дыбыс оқшаулауы', text: 'Жеке үйлер мен коттедждерге арналған шешімдер: жатын бөлме, балалар бөлмесі, үй кабинеті, инженерлік бөлмелер және арақабырғалар.' },
{ id: 'offices', tab: 'Кеңселер', img: 'assets/solutions/offices.webp', title: 'Кеңсе және келіссөз бөлмелері', text: 'Кабинеттер арасындағы естілуін азайту, open space, келіссөз және жұмыс бөлмелерінде акустикалық жайлылық жасау.' },
{ id: 'concert', tab: 'Концерт залдары', img: 'assets/solutions/concert.webp', title: 'Концерт және event-алаңдар', text: 'Үлкен көлемдерге арналған кешенді шешімдер: акустикалық түзету, реверберацияны басқару және паразиттік шағылуды азайту.' },
{ id: 'cinema', tab: 'Кинотеатрлар', img: 'assets/solutions/cinema.webp', title: 'Кинотеатрлар және private cinema', text: 'Сөйлеудің анықтығына, бас контроліне және көрермен жайлылығына жоғары талап қойылатын залдарға арналған шешімдер.' },
{ id: 'sport', tab: 'Спорт залдары', img: 'assets/solutions/sport.webp', title: 'Спорт және көпфункциялы залдар', text: 'Аумағы үлкен, қатты беттері көп және белсенділігі жоғары бөлмелердегі гуілді және артық шуды азайту.' },
{ id: 'restaurant', tab: 'Мейрамхана / караоке', img: 'assets/solutions/restaurant-karaoke.webp', title: 'Мейрамханалар мен караоке', text: 'Залдар мен көрші үй-жайлар арасындағы дыбыс оқшаулауы, сондай-ақ жаңғырықты, сөйлеуді және музыканы бақылауға арналған акустикалық өңдеу.' },
{ id: 'hammam', tab: 'Хаммам', img: 'assets/solutions/hammam.webp', title: 'Хаммам және SPA-аймақтар', text: 'Қоршау конструкцияларын, инженерлік шуды және акустикалық жайлылық талаптарын ескеретін ылғалды үй-жайларға арналған шешімдер.' }
]
},
en: {
title: 'Solutions by facility type',
lead: 'From living rooms to public spaces — different tasks need different solutions.',
cta: 'Get a quote',
items: [
{ id: 'apartments', tab: 'Apartments', img: 'assets/solutions/apartments.webp', title: 'Apartment soundproofing', text: 'Walls, ceilings and floors for common apartment scenarios: speech, TV, footsteps from above, bass and home cinema.' },
{ id: 'cottages', tab: 'Cottages', img: 'assets/solutions/cottages.webp', title: 'Cottage soundproofing', text: 'Solutions for detached houses and cottages: bedrooms, children rooms, home offices, utility rooms and internal partitions.' },
{ id: 'offices', tab: 'Offices', img: 'assets/solutions/offices.webp', title: 'Offices and meeting rooms', text: 'Reducing audibility between rooms and improving acoustic comfort in open-space offices, meeting rooms and workplaces.' },
{ id: 'concert', tab: 'Concert halls', img: 'assets/solutions/concert.webp', title: 'Concert and event venues', text: 'Integrated solutions for large volumes: acoustic correction, reverberation control and reduction of unwanted reflections.' },
{ id: 'cinema', tab: 'Cinemas', img: 'assets/solutions/cinema.webp', title: 'Cinemas and private cinema', text: 'Facings and acoustic solutions for halls with high demands on intelligibility, bass control and audience comfort.' },
{ id: 'sport', tab: 'Sports halls', img: 'assets/solutions/sport.webp', title: 'Sports and multifunctional halls', text: 'Reducing boominess and excessive noise in spaces with large areas, hard surfaces and high activity levels.' },
{ id: 'restaurant', tab: 'Restaurant / karaoke', img: 'assets/solutions/restaurant-karaoke.webp', title: 'Restaurants and karaoke venues', text: 'Sound insulation between halls and neighbouring spaces, plus acoustic treatment to control echo, speech and music.' },
{ id: 'hammam', tab: 'Hammam', img: 'assets/solutions/hammam.webp', title: 'Hammam and spa areas', text: 'Solutions for wet areas that account for enclosure assemblies, building-services noise and acoustic-comfort requirements.' }
]
}
};
function render(node) {
var C = global.SILENCE_CORE;
var lang = C.getLang();
var copy = COPY[lang] || COPY.ru;
var active = copy.items.filter(function (item) { return item.id === node._selectedObject; })[0] || copy.items[0];
node.innerHTML = '';
var wrap = C.el('div', { class: 'container object-zones' });
wrap.appendChild(global.SILENCE_V27_UI.heading('04', copy.title, copy.lead));
var tabs = C.el('div', { class: 'object-zones__tabs', role: 'tablist', 'aria-label': copy.title });
var panel = C.el('div', { class: 'object-zones__panel', id: 'object-zone-panel', role: 'tabpanel' });
function draw(item) {
node._selectedObject = item.id;
panel.setAttribute('aria-labelledby', 'object-tab-' + item.id);
panel.innerHTML = '';
panel.appendChild(C.el('div', { class: 'object-zones__media' }, [
C.el('img', { src: item.img, alt: item.title, width: '1448', height: '1086', loading: 'lazy', decoding: 'async' })
]));
panel.appendChild(C.el('div', { class: 'object-zones__copy' }, [
C.el('p', { class: 'eyebrow' }, [global.SILENCE_V27_UI.t('visualization')]),
C.el('h3', {}, [item.title]),
C.el('p', {}, [item.text]),
C.el('div', { class: 'object-zones__actions' }, [
C.el('a', { class: 'btn btn--primary', href: 'contacts.html?room=' + encodeURIComponent(item.tab), 'data-analytics': 'object_zone_quote_click', 'data-analytics-value': item.id }, [global.SILENCE_V27_UI.t('cta')]),
C.el('a', { class: 'btn btn--secondary', href: 'catalog.html', 'data-analytics': 'object_zone_catalog_click', 'data-analytics-value': item.id }, [lang === 'kz' ? 'Каталогты ашу' : (lang === 'en' ? 'Open catalogue' : 'Смотреть каталог')])
])
]));
}
copy.items.forEach(function (item, index) {
var btn = C.el('button', {
class: 'object-zones__tab' + (item.id === active.id ? ' object-zones__tab--active' : ''),
type: 'button', role: 'tab', id: 'object-tab-' + item.id, 'aria-controls': 'object-zone-panel', tabindex: item.id === active.id ? '0' : '-1', 'aria-selected': item.id === active.id ? 'true' : 'false',
'data-analytics': 'object_zone_tab_click', 'data-analytics-value': item.id
}, [item.tab]);
btn.addEventListener('click', function () {
active = item;
draw(item);
Array.prototype.forEach.call(tabs.children, function (child) {
var on = child === btn;
child.classList.toggle('object-zones__tab--active', on);
child.setAttribute('aria-selected', on ? 'true' : 'false');
child.tabIndex = on ? 0 : -1;
});
});
tabs.appendChild(btn);
});
tabs.addEventListener('keydown', function (e) {
var all = Array.prototype.slice.call(tabs.querySelectorAll('[role=tab]')), i = all.indexOf(document.activeElement), n;
if (i < 0)
return;
if (e.key === 'ArrowRight')
n = (i + 1) % all.length;
else if (e.key === 'ArrowLeft')
n = (i + all.length - 1) % all.length;
else if (e.key === 'Home')
n = 0;
else if (e.key === 'End')
n = all.length - 1;
else
return;
e.preventDefault();
all[n].click();
all[n].focus({ preventScroll: true });
all[n].scrollIntoView({ block: 'nearest', inline: 'nearest' });
});
draw(active);
wrap.appendChild(tabs);
wrap.appendChild(panel);
node.appendChild(wrap);
}
global.SILENCE_PAGES = global.SILENCE_PAGES || {};
global.SILENCE_PAGES['solution-zones'] = render;
}(window));
;
(function (g) {
'use strict';
var C = g.SILENCE_CORE, pages = g.SILENCE_PAGES;
if (!C || !pages)
return;
function tr(ru, kz, en) { var l = C.getLang(); return l === 'kz' ? kz : l === 'en' ? en : ru; }
function highlight() {
return C.el('article', { class: 'school30-highlight', 'data-school-case': 'biart' }, [
C.el('div', { class: 'school30-highlight__media' }, [
C.el('img', { src: 'assets/projects/biart-exterior.webp', srcset: 'assets/projects/biart-exterior-960.webp 960w, assets/projects/biart-exterior.webp 2048w', sizes: '(max-width:600px) 100vw, 50vw', width: '2048', height: '1152', loading: 'lazy', decoding: 'async', alt: tr('Здание BIART в Астане — вид фасада', 'Астанадағы BIART ғимаратының қасбеті', 'BIART building in Astana — exterior view') }),
C.el('span', {}, [tr('BIART, Астана', 'BIART, Астана', 'BIART, Astana')])
]),
C.el('div', { class: 'school30-highlight__body' }, [
C.el('p', { class: 'eyebrow' }, [tr('Образовательный объект · Астана', 'Білім беру нысаны · Астана', 'Educational facility · Astana')]),
C.el('h3', {}, ['BIART']),
C.el('p', {}, [tr('Звукоизоляция музыкальных кабинетов. По информации SILENCE, в BIART применены решения компании.', 'Музыкалық кабинеттерді дыбыс оқшаулау. SILENCE ақпараты бойынша BIART-та компания шешімдері қолданылған.', 'Sound insulation for music classrooms. According to SILENCE, the company’s solutions were used at BIART.')]),
C.el('a', { class: 'text-link', href: 'projects/biart-astana.html', 'data-analytics': 'biart_project_open' }, [tr('Подробнее об объекте ↗', 'Нысан туралы ↗', 'View project ↗')])
])
]);
}
function dalaedgeHighlight() {
var image = C.el('img', { src: 'assets/projects/dalaedge-kaskelen.webp', width: '1224', height: '1530', loading: 'lazy', decoding: 'async', sizes: '(max-width:600px) 88vw, 344px', alt: tr('DalaEdge, Каскелен — общий вид территории', 'DalaEdge, Қаскелең — аумақтың жалпы көрінісі', 'DalaEdge, Kaskelen — overview of the grounds') });
var media = C.el('button', { type: 'button', class: 'project33-media-button', 'aria-label': tr('Увеличить фото DalaEdge', 'DalaEdge фотосын үлкейту', 'Enlarge the DalaEdge photo') }, [image]);
media.addEventListener('click', function () { C.openGalleryViewer(['assets/projects/dalaedge-kaskelen.webp'], 0, [tr('DalaEdge, Каскелен', 'DalaEdge, Қаскелең', 'DalaEdge, Kaskelen')]); });
return C.el('article', { class: 'school30-highlight project33-dalaedge', 'data-project-case': 'dalaedge' }, [
C.el('div', { class: 'school30-highlight__media' }, [media, C.el('span', {}, [tr('DalaEdge, Каскелен', 'DalaEdge, Қаскелең', 'DalaEdge, Kaskelen')])]),
C.el('div', { class: 'school30-highlight__body' }, [
C.el('p', { class: 'eyebrow' }, [tr('Кинопавильон · Каскелен', 'Кинопавильон · Қаскелең', 'Film pavilion · Kaskelen')]),
C.el('h3', {}, [tr('Кинопавильон DalaEdge', 'DalaEdge кинопавильоны', 'DalaEdge film pavilion')]),
C.el('p', {}, [tr('Полная звуко- и шумоизоляция кинопавильона. Перегородка — 16 м.', 'Кинопавильонды толық дыбыс пен шудан оқшаулау. Қалқа — 16 м.', 'Full sound and noise insulation for the film pavilion. Partition — 16 m.')]),
C.el('div', { class: 'project33-facts' }, [
C.el('span', {}, [tr('Перегородка — 16 м', 'Қалқа — 16 м', 'Partition — 16 m')]),
C.el('span', {}, [tr('Звуко- и шумоизоляция', 'Дыбыс пен шудан оқшаулау', 'Sound and noise insulation')])
]),
C.el('a', { class: 'text-link', href: 'projects/dalaedge-kaskelen.html', 'data-analytics': 'dalaedge_project_open' }, [tr('Подробнее об объекте ↗', 'Нысан туралы ↗', 'View project ↗')])
])
]);
}
['projects-teaser', 'projects'].forEach(function (key) { var original = pages[key]; if (typeof original !== 'function')
return; pages[key] = function (node) { original(node); var grid = node.querySelector('.projects27-grid'); if (grid) {
grid.before(highlight());
grid.before(dalaedgeHighlight());
} }; });
function labels() { document.querySelectorAll('[data-journal-nav]').forEach(function (a) { a.textContent = tr('Статьи', 'Мақалалар', 'Articles'); }); }
document.addEventListener('DOMContentLoaded', labels);
document.addEventListener('silence:lang', labels);
}(window));