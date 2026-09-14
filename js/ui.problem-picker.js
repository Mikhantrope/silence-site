/* SILENCE — B2C picker: user chooses the actual problem, not an acoustic index. */
(function (global) {
  'use strict';

  var COPY = {
    ru: {
      title: 'Подберём решение по вашей проблеме', lead: 'Не нужно разбираться в децибелах. Укажите, что слышите и через какую поверхность приходит шум.',
      problem: 'Что мешает', surface: 'Откуда идёт шум', area: 'Площадь поверхности, м²',
      problems: [['talk','Разговоры / телевизор'],['music','Музыка / басы'],['impact','Шаги / удары'],['repair','Ремонт / перфоратор'],['echo','Эхо в помещении']],
      surfaces: [['wall','Через стену'],['ceiling','Сверху / через потолок'],['floor','Снизу / через пол'],['partition','Нужна новая перегородка']],
      result: 'Подходящие решения', quote: 'Рассчитать под мой объект', open: 'Открыть систему', note: 'Финальный выбор зависит от основания, обходных путей шума и требований к толщине.'
    },
    kz: {
      title: 'Мәселеңізге сай шешім таңдаймыз', lead: 'Децибелдерді білудің қажеті жоқ. Не еститініңізді және шу қай бет арқылы келетінін көрсетіңіз.',
      problem: 'Не мазалайды', surface: 'Шу қайдан келеді', area: 'Бет ауданы, м²',
      problems: [['talk','Әңгіме / теледидар'],['music','Музыка / бас'],['impact','Қадам / соққы'],['repair','Жөндеу / перфоратор'],['echo','Бөлмедегі жаңғырық']],
      surfaces: [['wall','Қабырға арқылы'],['ceiling','Жоғарыдан / төбе арқылы'],['floor','Төменнен / еден арқылы'],['partition','Жаңа қалқа керек']],
      result: 'Қолайлы шешімдер', quote: 'Менің нысаныма есептеу', open: 'Жүйені ашу', note: 'Соңғы таңдау негізге, жанама шу жолдарына және қалыңдық талабына байланысты.'
    },
    en: {
      title: 'Choose by the problem, not by decibels', lead: 'Tell us what you hear and which surface the noise comes through. We will narrow down the system group.',
      problem: 'What bothers you', surface: 'Where the noise comes from', area: 'Surface area, m²',
      problems: [['talk','Speech / TV'],['music','Music / bass'],['impact','Footsteps / impacts'],['repair','Drilling / renovation'],['echo','Room echo']],
      surfaces: [['wall','Through a wall'],['ceiling','From above / ceiling'],['floor','From below / floor'],['partition','New partition needed']],
      result: 'Suitable systems', quote: 'Calculate for my property', open: 'Open system', note: 'Final selection depends on the base structure, flanking paths and thickness constraints.'
    }
  };

  function makeSelect(C, id, label, options) {
    var select = C.el('select', { id: id });
    options.forEach(function (o) { select.appendChild(C.el('option', { value: o[0] }, [o[1]])); });
    return C.el('div', { class: 'field' }, [C.el('label', { for: id }, [label]), select]);
  }

  function quoteUrl(problem, place, area, system) {
    var p = new URLSearchParams();
    if (problem) p.set('problem', problem);
    if (place) p.set('surface', place);
    if (area) p.set('area', area);
    if (system) p.set('system', system);
    return 'contacts.html?' + p.toString();
  }

  function render(node) {
    var C = global.SILENCE_CORE, CATALOG = global.CATALOG;
    if (!C || !CATALOG) return;
    var lang = C.getLang();
    var x = COPY[lang] || COPY.ru;
    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container problem-picker' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [C.el('h2', {}, [x.title]), C.el('p', { class: 'lead' }, [x.lead])]));

    var controls = C.el('div', { class: 'problem-picker__controls' });
    var problemField = makeSelect(C, 'problem-kind', x.problem, x.problems);
    var surfaceField = makeSelect(C, 'problem-surface', x.surface, x.surfaces);
    var areaField = C.el('div', { class: 'field' }, [C.el('label', { for: 'problem-area' }, [x.area]), C.el('input', { id: 'problem-area', type: 'number', min: '1', step: '1', value: '12' })]);
    controls.appendChild(problemField); controls.appendChild(surfaceField); controls.appendChild(areaField);
    wrap.appendChild(controls);

    var resultsTitle = C.el('h3', { class: 'problem-picker__results-title' }, [x.result]);
    var results = C.el('div', { class: 'cards-grid problem-picker__results' });
    wrap.appendChild(resultsTitle); wrap.appendChild(results);
    wrap.appendChild(C.el('p', { class: 'caption u-muted' }, [x.note]));
    node.appendChild(wrap);

    var problem = problemField.querySelector('select');
    var surface = surfaceField.querySelector('select');
    var area = areaField.querySelector('input');

    function update() {
      var place = surface.value;
      var matches = CATALOG.systems.filter(function (s) { return s.place === place; }).slice(0, 3);
      results.innerHTML = '';
      matches.forEach(function (s) {
        var ixLabel = s.ix + ' ' + (s.from === s.to ? s.from : s.from + '–' + s.to) + ' дБ';
        var card = C.el('article', { class: 'card problem-picker__card' }, [
          C.el('span', { class: 'card__index' }, [ixLabel]),
          C.el('span', { class: 'card__name' }, [s.name])
        ]);
        var actions = C.el('div', { class: 'card-actions' }, [
          C.el('a', { class: 'btn btn--secondary btn--sm', href: 'systems.html#sys-' + s.id, 'data-analytics': 'problem_picker_open_system', 'data-analytics-value': s.id }, [x.open]),
          C.el('a', { class: 'btn btn--primary btn--sm', href: quoteUrl(problem.value, place, area.value, s.id), 'data-analytics': 'problem_picker_quote', 'data-analytics-value': s.id }, [x.quote])
        ]);
        card.appendChild(actions); results.appendChild(card);
      });
      if (global.SILENCE_TRACK) global.SILENCE_TRACK('problem_picker_change', { problem: problem.value, surface: place });
    }
    problem.addEventListener('change', update); surface.addEventListener('change', update); area.addEventListener('change', update);
    update();
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES['problem-picker'] = render;
}(window));
