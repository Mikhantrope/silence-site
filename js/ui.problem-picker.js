/* SILENCE — B2C problem picker v16.
   The result depends on BOTH the noise type and the relevant construction.
   Impact noise to downstairs, incoming noise from below and room echo are
   intentionally separated: they are different acoustic tasks. */
(function (global) {
  'use strict';

  var COPY = {
    ru: {
      title: 'Подберём решение по вашей проблеме',
      lead: 'Не нужно разбираться в децибелах. Выберите реальную ситуацию — покажем только подходящую группу решений.',
      problem: 'Что происходит', surface: 'Через какую конструкцию', room: 'Тип помещения', area: 'Площадь поверхности / помещения, м²',
      problems: [
        ['talk','Слышу разговоры / телевизор'],
        ['music','Слышу музыку / басы'],
        ['impact_upstairs','Топот / удары сверху'],
        ['repair','Ремонт / перфоратор'],
        ['impact_down','Мой топот слышат соседи снизу'],
        ['below','Разговоры / басы идут снизу'],
        ['echo','Эхо и гул внутри помещения']
      ],
      surfaces: {
        talk: [['wall','Через стену'],['ceiling','Сверху / через потолок'],['partition','Нужна новая перегородка']],
        music: [['wall','Через стену'],['ceiling','Сверху / через потолок'],['partition','Нужна новая перегородка']],
        repair: [['ceiling','Сверху / через потолок'],['wall','Через стену']]
      },
      rooms: [['home','Квартира / дом'],['office','Офис / переговорная'],['horeca','Кафе / ресторан / зал'],['studio','Студия / кинозал']],
      result: 'Подходящие решения', quote: 'Рассчитать под мой объект', open: 'Открыть систему', catalog: 'Смотреть акустические панели', diagnose: 'Разобрать мою ситуацию',
      notes: {
        talk: 'Воздушный шум: выбор зависит от основания, примыканий и обходных путей передачи.',
        music: 'Низкие частоты сложнее изолировать. Поэтому здесь показаны более мощные решения, но финальный выбор делается после оценки конструкции.',
        impact_upstairs: 'Ударный и структурный шум сверху распространяется по перекрытию и примыканиям. Потолочная система снижает передачу, но не обещает полного исчезновения ударов.',
        repair: 'Перфоратор — структурный шум. Локальная облицовка может снизить его на выбранной поверхности, но результат сильно зависит от обходных путей по зданию.',
        impact_down: 'Напольные системы оцениваются по ΔLn,w: это снижение ударного шума, который ваши шаги и удары передают в перекрытие и соседям снизу.',
        below: 'Разговоры и басы снизу — входящий воздушный/структурный шум. ΔLn,w напольных систем не является прямым показателем решения этой задачи: сначала нужно определить путь передачи.',
        echo: 'Эхо — не звукоизоляция от соседей. Здесь нужны звукопоглощающие акустические панели, которые уменьшают отражения внутри помещения.'
      },
      belowTitle: 'Сначала определить путь шума',
      belowText: 'Не будем выдавать «шумоизоляцию пола» как универсальный ответ. Для баса и речи снизу нужно понять, идёт ли звук через перекрытие, стены, шахты или примыкания.',
      empty: 'Для этой комбинации нет корректного типового решения — лучше начать с диагностики.'
    },
    kz: {
      title: 'Мәселеңізге сай шешім таңдаймыз',
      lead: 'Децибелдерді білудің қажеті жоқ. Нақты жағдайды таңдаңыз — тек сәйкес шешімдер тобын көрсетеміз.',
      problem: 'Не болып жатыр', surface: 'Қай конструкция арқылы', room: 'Бөлме түрі', area: 'Бет / бөлме ауданы, м²',
      problems: [
        ['talk','Әңгіме / теледидар естіледі'],
        ['music','Музыка / бас естіледі'],
        ['impact_upstairs','Үстіден қадам / соққы'],
        ['repair','Жөндеу / перфоратор'],
        ['impact_down','Менің қадамымды төмендегі көрші естиді'],
        ['below','Әңгіме / бас төменнен келеді'],
        ['echo','Бөлме ішінде жаңғырық пен гуіл']
      ],
      surfaces: {
        talk: [['wall','Қабырға арқылы'],['ceiling','Жоғарыдан / төбе арқылы'],['partition','Жаңа қалқа керек']],
        music: [['wall','Қабырға арқылы'],['ceiling','Жоғарыдан / төбе арқылы'],['partition','Жаңа қалқа керек']],
        repair: [['ceiling','Жоғарыдан / төбе арқылы'],['wall','Қабырға арқылы']]
      },
      rooms: [['home','Пәтер / үй'],['office','Кеңсе / келіссөз бөлмесі'],['horeca','Кафе / мейрамхана / зал'],['studio','Студия / кинозал']],
      result: 'Қолайлы шешімдер', quote: 'Менің нысаныма есептеу', open: 'Жүйені ашу', catalog: 'Акустикалық панельдерді көру', diagnose: 'Жағдайымды талдау',
      notes: {
        talk: 'Ауа шуы: соңғы таңдау негізге, түйіспелерге және дыбыстың жанама өту жолдарына байланысты.',
        music: 'Төмен жиіліктерді оқшаулау күрделірек. Сондықтан мұнда күштірек шешімдер көрсетіледі, бірақ соңғы таңдау конструкцияны бағалағаннан кейін жасалады.',
        impact_upstairs: 'Үстіден келетін соққы және құрылымдық шу жабын мен түйіспелер арқылы таралады. Төбе жүйесі берілуді азайтады, бірақ соққыны толық жояды деп уәде бермейді.',
        repair: 'Перфоратор — құрылымдық шу. Жергілікті қаптама шуды азайта алады, бірақ нәтиже ғимараттағы жанама жолдарға қатты тәуелді.',
        impact_down: 'Еден жүйелері ΔLn,w бойынша бағаланады: бұл сіздің қадамдарыңыз бен соққыларыңыздың төмендегі көршіге берілуін азайту көрсеткіші.',
        below: 'Төменнен келетін әңгіме мен бас — ауа/құрылымдық шу. Еден жүйелерінің ΔLn,w көрсеткіші бұл міндеттің тікелей шешімі емес: алдымен берілу жолын анықтау қажет.',
        echo: 'Жаңғырық — көршіден дыбыс оқшаулау емес. Мұнда бөлме ішіндегі шағылуды азайтатын дыбыс сіңіргіш акустикалық панельдер қажет.'
      },
      belowTitle: 'Алдымен шу жолын анықтау керек',
      belowText: '«Еден дыбыс оқшаулауы» әмбебап жауап емес. Төменнен келетін бас пен сөйлеу жабын, қабырға, шахта немесе түйіспелер арқылы өтуі мүмкін.',
      empty: 'Бұл комбинация үшін дұрыс типтік шешім жоқ — диагностикадан бастаған жөн.'
    },
    en: {
      title: 'Choose by the real noise problem',
      lead: 'You do not need to understand decibels. Choose the real situation and we will show only the relevant solution group.',
      problem: 'What is happening', surface: 'Which construction carries it', room: 'Room type', area: 'Surface / room area, m²',
      problems: [
        ['talk','I hear speech / TV'],
        ['music','I hear music / bass'],
        ['impact_upstairs','Footsteps / impacts from above'],
        ['repair','Drilling / renovation'],
        ['impact_down','My footsteps disturb downstairs'],
        ['below','Speech / bass comes from below'],
        ['echo','Echo and reverberation in the room']
      ],
      surfaces: {
        talk: [['wall','Through a wall'],['ceiling','From above / ceiling'],['partition','New partition needed']],
        music: [['wall','Through a wall'],['ceiling','From above / ceiling'],['partition','New partition needed']],
        repair: [['ceiling','From above / ceiling'],['wall','Through a wall']]
      },
      rooms: [['home','Home / apartment'],['office','Office / meeting room'],['horeca','Café / restaurant / hall'],['studio','Studio / cinema room']],
      result: 'Suitable solutions', quote: 'Calculate for my property', open: 'Open system', catalog: 'View acoustic panels', diagnose: 'Assess my situation',
      notes: {
        talk: 'Airborne noise: final selection depends on the base construction, junctions and flanking transmission.',
        music: 'Low frequencies are harder to isolate. Stronger systems are shown here, but final selection requires an assessment of the construction.',
        impact_upstairs: 'Impact and structure-borne noise from above travels through the slab and junctions. A ceiling system can reduce transmission but cannot guarantee that every impact disappears.',
        repair: 'Hammer drilling is structure-borne noise. A local lining can reduce it on the treated surface, but the result depends heavily on flanking paths through the building.',
        impact_down: 'Floor systems are rated by ΔLn,w: the reduction of impact noise your footsteps and impacts transmit into the slab and to neighbours below.',
        below: 'Speech and bass from below are incoming airborne/structure-borne noise. The ΔLn,w of a floor system is not a direct rating for this task: first identify the transmission path.',
        echo: 'Echo is not sound insulation from neighbours. It calls for sound-absorbing acoustic panels that reduce reflections inside the room.'
      },
      belowTitle: 'Identify the transmission path first',
      belowText: 'We do not present a floor system as a universal answer. Bass and speech from below may travel through the slab, walls, shafts or junctions.',
      empty: 'There is no technically sound generic solution for this combination — start with an assessment.'
    }
  };

  var SYSTEM_MAP = {
    talk: {
      wall: ['wf-standart','wf-comfort','w-comfort'],
      ceiling: ['cf-standart','cf-comfort','c-comfort'],
      partition: ['p-standart','p-comfort','p-premium']
    },
    music: {
      wall: ['w-comfort','w-premium','w-business'],
      ceiling: ['c-comfort','c-premium','c-business'],
      partition: ['p-comfort','p-premium','p-standart']
    },
    impact_upstairs: {
      ceiling: ['c-apex','c-comfort','c-premium']
    },
    repair: {
      ceiling: ['c-comfort','c-premium','c-business'],
      wall: ['w-comfort','w-premium','w-business']
    },
    impact_down: {
      floor: ['f-antistomp','f-sfgb','f-sf']
    }
  };

  var ECHO_MAP = {
    home: ['acousticwood','reverboard','acousticloft'],
    office: ['reverboard','acousticwood','acousticloft'],
    horeca: ['acousticloft','reverboard','acousticwood'],
    studio: ['reverboard','acousticwood','acousticloft']
  };

  function makeSelect(C, id, label, options) {
    var select = C.el('select', { id: id });
    (options || []).forEach(function (o) { select.appendChild(C.el('option', { value: o[0] }, [o[1]])); });
    return C.el('div', { class: 'field' }, [C.el('label', { for: id }, [label]), select]);
  }

  function replaceOptions(C, select, options) {
    select.innerHTML = '';
    (options || []).forEach(function (o) { select.appendChild(C.el('option', { value: o[0] }, [o[1]])); });
  }

  function quoteUrl(problem, place, area, system, room) {
    var p = new URLSearchParams();
    if (problem) p.set('problem', problem);
    if (place) p.set('surface', place);
    if (area) p.set('area', area);
    if (system) p.set('system', system);
    if (room) p.set('room', room);
    return 'contacts.html?' + p.toString();
  }

  function itemById(C, id) { return C.findItem ? C.findItem(id) : null; }

  function indexText(s) {
    if (!s || !s.ix) return '';
    return s.ix + ' ' + (s.from === s.to ? s.from : s.from + '–' + s.to) + ' дБ';
  }

  function systemCard(C, x, s, problem, place, area) {
    var card = C.el('article', { class: 'card problem-picker__card' }, [
      C.el('span', { class: 'card__index' }, [indexText(s)]),
      C.el('span', { class: 'card__name' }, [s.name])
    ]);
    card.appendChild(C.el('div', { class: 'card-actions' }, [
      C.el('a', { class: 'btn btn--secondary btn--sm', href: 'systems.html#sys-' + s.id, 'data-analytics': 'problem_picker_open_system', 'data-analytics-value': s.id }, [x.open]),
      C.el('a', { class: 'btn btn--primary btn--sm', href: quoteUrl(problem, place, area, s.id), 'data-analytics': 'problem_picker_quote', 'data-analytics-value': s.id }, [x.quote])
    ]));
    return card;
  }

  function decorCard(C, x, d, problem, room, area) {
    var card = C.el('article', { class: 'card problem-picker__card problem-picker__card--decor' });
    if (d.img) card.appendChild(C.el('img', { class: 'problem-picker__decor-img', src: d.img, alt: d.name, loading: 'lazy' }));
    card.appendChild(C.el('span', { class: 'card__name' }, [d.name]));
    if (d.variants) card.appendChild(C.el('span', { class: 'caption u-muted' }, [d.variants]));
    card.appendChild(C.el('div', { class: 'card-actions' }, [
      C.el('a', { class: 'btn btn--secondary btn--sm', href: 'catalog.html#decor', 'data-analytics': 'problem_picker_open_decor', 'data-analytics-value': d.id }, [x.catalog]),
      C.el('a', { class: 'btn btn--primary btn--sm', href: quoteUrl(problem, 'acoustics', area, d.id, room), 'data-analytics': 'problem_picker_quote_echo', 'data-analytics-value': d.id }, [x.quote])
    ]));
    return card;
  }

  function render(node) {
    var C = global.SILENCE_CORE, CATALOG = global.CATALOG;
    if (!C || !CATALOG) return;
    var lang = C.getLang();
    var x = COPY[lang] || COPY.ru;
    node.innerHTML = '';

    var wrap = C.el('div', { class: 'container problem-picker' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [x.title]),
      C.el('p', { class: 'lead' }, [x.lead])
    ]));

    var controls = C.el('div', { class: 'problem-picker__controls' });
    var problemField = makeSelect(C, 'problem-kind', x.problem, x.problems);
    var surfaceField = makeSelect(C, 'problem-surface', x.surface, x.surfaces.talk);
    var roomField = makeSelect(C, 'problem-room', x.room, x.rooms); roomField.hidden = true;
    var areaField = C.el('div', { class: 'field' }, [
      C.el('label', { for: 'problem-area' }, [x.area]),
      C.el('input', { id: 'problem-area', type: 'number', min: '1', step: '1', value: '12' })
    ]);
    controls.appendChild(problemField); controls.appendChild(surfaceField); controls.appendChild(roomField); controls.appendChild(areaField);
    wrap.appendChild(controls);

    var resultsTitle = C.el('h3', { class: 'problem-picker__results-title' }, [x.result]);
    var note = C.el('p', { class: 'problem-picker__note caption u-muted' });
    var results = C.el('div', { class: 'cards-grid problem-picker__results' });
    wrap.appendChild(resultsTitle); wrap.appendChild(note); wrap.appendChild(results);
    node.appendChild(wrap);

    var problem = problemField.querySelector('select');
    var surface = surfaceField.querySelector('select');
    var room = roomField.querySelector('select');
    var area = areaField.querySelector('input');

    function configureControls() {
      var kind = problem.value;
      var previous = surface.value;
      surfaceField.hidden = false;
      roomField.hidden = true;

      if (kind === 'impact_upstairs') {
        replaceOptions(C, surface, [['ceiling', lang === 'kz' ? 'Төбе' : (lang === 'en' ? 'Ceiling' : 'Потолок')]]);
      } else if (kind === 'impact_down') {
        replaceOptions(C, surface, [['floor', lang === 'kz' ? 'Еден' : (lang === 'en' ? 'Floor' : 'Пол')]]);
      } else if (kind === 'below') {
        surfaceField.hidden = true;
        replaceOptions(C, surface, []);
      } else if (kind === 'echo') {
        surfaceField.hidden = true;
        roomField.hidden = false;
      } else {
        replaceOptions(C, surface, x.surfaces[kind] || x.surfaces.talk);
      }

      /* Rebuilding the options must not reset a choice made by the user. */
      for (var i = 0; i < surface.options.length; i++) {
        if (surface.options[i].value === previous) { surface.value = previous; break; }
      }
    }

    function renderDiagnostic() {
      results.appendChild(C.el('article', { class: 'card problem-picker__diagnostic' }, [
        C.el('h4', {}, [x.belowTitle]),
        C.el('p', {}, [x.belowText]),
        C.el('a', { class: 'btn btn--primary', href: quoteUrl('below', '', area.value, '', ''), 'data-analytics': 'problem_picker_diagnostic_quote' }, [x.diagnose])
      ]));
    }

    function update() {
      configureControls();
      var kind = problem.value;
      var place = surface.value || '';
      results.innerHTML = '';
      note.textContent = x.notes[kind] || '';

      if (kind === 'below') {
        renderDiagnostic();
      } else if (kind === 'echo') {
        var ids = ECHO_MAP[room.value] || ECHO_MAP.home;
        ids.map(function (id) { return itemById(C, id); }).filter(Boolean).forEach(function (d) {
          results.appendChild(decorCard(C, x, d, kind, room.value, area.value));
        });
      } else {
        var ids2 = SYSTEM_MAP[kind] && SYSTEM_MAP[kind][place] ? SYSTEM_MAP[kind][place] : [];
        var matches = ids2.map(function (id) { return itemById(C, id); }).filter(Boolean);
        if (!matches.length) {
          results.appendChild(C.el('article', { class: 'card problem-picker__diagnostic' }, [
            C.el('p', {}, [x.empty]),
            C.el('a', { class: 'btn btn--primary', href: quoteUrl(kind, place, area.value, '', ''), 'data-analytics': 'problem_picker_no_match_quote' }, [x.diagnose])
          ]));
        } else {
          matches.forEach(function (s) { results.appendChild(systemCard(C, x, s, kind, place, area.value)); });
        }
      }

      if (global.SILENCE_TRACK) global.SILENCE_TRACK('problem_picker_change', { problem: kind, surface: place, room: room.value });
    }

    problem.addEventListener('change', update);
    surface.addEventListener('change', update);
    room.addEventListener('change', update);
    area.addEventListener('change', update);
    update();
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES['problem-picker'] = render;
}(window));
