(function (global) {
  'use strict';

  var DATA = [
    { key: 'wood-rhomb', img: 'assets/journal_projects/wood-rhomb.webp', title: { ru: 'AcousticWood Rhomb', kz: 'AcousticWood Rhomb', en: 'AcousticWood Rhomb' }, meta: { ru: 'Декоративно-акустическая облицовка с ромбовидным рисунком.', kz: 'Ромб пішінді сәндік-акустикалық қаптама.', en: 'Decorative acoustic finish with a rhomb pattern.' } },
    { key: 'wood-hexa', img: 'assets/journal_projects/wood-hexa.webp', title: { ru: 'AcousticWood Hexa', kz: 'AcousticWood Hexa', en: 'AcousticWood Hexa' }, meta: { ru: 'Модульная стеновая композиция из шестиугольников.', kz: 'Алтыбұрышты модульдік қабырға композициясы.', en: 'Modular wall composition with hexagonal panels.' } },
    { key: 'wood-line', img: 'assets/journal_projects/wood-line.webp', title: { ru: 'AcousticWood Line', kz: 'AcousticWood Line', en: 'AcousticWood Line' }, meta: { ru: 'Линейный рельеф для современных интерьеров.', kz: 'Қазіргі интерьерге арналған сызықтық рельеф.', en: 'Linear relief for contemporary interiors.' } },
    { key: 'wood-art', img: 'assets/journal_projects/wood-art.webp', title: { ru: 'AcousticWood Art', kz: 'AcousticWood Art', en: 'AcousticWood Art' }, meta: { ru: 'Художественная композиция свободной формы.', kz: 'Еркін пішіндегі көркем композиция.', en: 'An artistic free-form composition.' } },
    { key: 'rever-spiral', img: 'assets/journal_projects/rever-spiral.webp', title: { ru: 'ReverBoard Spiral', kz: 'ReverBoard Spiral', en: 'ReverBoard Spiral' }, meta: { ru: 'Объёмная панель с мягким визуальным ритмом.', kz: 'Жұмсақ визуалды ырғақты көлемді панель.', en: 'Three-dimensional panel with a soft visual rhythm.' } },
    { key: 'rever-quad', img: 'assets/journal_projects/rever-quad.webp', title: { ru: 'ReverBoard Quad', kz: 'ReverBoard Quad', en: 'ReverBoard Quad' }, meta: { ru: 'Прямоугольные панели для стен и потолков.', kz: 'Қабырға мен төбеге арналған тікбұрышты панельдер.', en: 'Rectangular panels for walls and ceilings.' } },
    { key: 'rever-rhomb', img: 'assets/journal_projects/rever-rhomb.webp', title: { ru: 'ReverBoard Rhomb', kz: 'ReverBoard Rhomb', en: 'ReverBoard Rhomb' }, meta: { ru: 'Динамичный геометрический рисунок для акцентной стены.', kz: 'Акценттік қабырғаға арналған геометриялық өрнек.', en: 'Dynamic geometric pattern for an accent wall.' } },
    { key: 'rever-hexa', img: 'assets/journal_projects/rever-hexa.webp', title: { ru: 'ReverBoard Hexa', kz: 'ReverBoard Hexa', en: 'ReverBoard Hexa' }, meta: { ru: 'Яркая модульная композиция для жилых пространств.', kz: 'Тұрғын кеңістікке арналған жарқын модульдік композиция.', en: 'Bright modular composition for living spaces.' } }
  ];

  var COPY = {
    ru: { title: 'Примеры объектов и интерьерных решений', lead: 'Ниже — аккуратно вырезанные примеры из журнала SILENCE. Это не случайные вставки, а блок с единым визуальным стилем и понятной структурой.', tag: 'Пример решения', more: 'Все объекты', cta: 'Обсудить похожий проект' },
    kz: { title: 'Нысандар мен интерьерлік шешімдер мысалдары', lead: 'Төменде SILENCE журналынан ұқыпты іріктелген мысалдар берілген. Бұл жай суреттер емес, біртұтас стильдегі құрылымды блок.', tag: 'Шешім үлгісі', more: 'Барлық нысандар', cta: 'Ұқсас жобаны талқылау' },
    en: { title: 'Examples of projects and interior solutions', lead: 'Below are neatly cropped examples from the SILENCE journal. This section is structured and visually consistent rather than randomly inserted images.', tag: 'Solution example', more: 'All projects', cta: 'Discuss a similar project' }
  };

  function tx(obj, lang) { return (obj && (obj[lang] || obj.ru || obj.en)) || ''; }

  function renderCards(host, limit) {
    var C = global.SILENCE_CORE;
    var lang = C.getLang();
    var x = COPY[lang] || COPY.ru;
    host.innerHTML = '';
    var grid = C.el('div', { class: 'cards-grid presentation-projects' });
    DATA.slice(0, limit || DATA.length).forEach(function (item) {
      var card = C.el('article', { class: 'card presentation-project' }, [
        C.el('img', { class: 'presentation-project__img', src: item.img, alt: tx(item.title, lang), loading: 'lazy' }),
        C.el('div', { class: 'presentation-project__body' }, [
          C.el('span', { class: 'caption u-accent project-case__tag' }, [x.tag]),
          C.el('h3', { class: 'presentation-project__title' }, [tx(item.title, lang)]),
          C.el('p', { class: 'presentation-project__meta' }, [tx(item.meta, lang)]),
          C.el('a', { class: 'btn btn--secondary btn--sm', href: 'contacts.html?problem=similar', 'data-analytics': 'project_case_quote' }, [x.cta])
        ])
      ]);
      grid.appendChild(card);
    });
    host.appendChild(grid);
  }

  function renderTeaser(node) {
    var C = global.SILENCE_CORE;
    var lang = C.getLang();
    var x = COPY[lang] || COPY.ru;
    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [x.title]),
      C.el('p', { class: 'lead' }, [x.lead])
    ]));
    var host = C.el('div');
    wrap.appendChild(host);
    node.appendChild(wrap);
    renderCards(host, 8);
  }

  function renderPage(node) {
    var C = global.SILENCE_CORE;
    var lang = C.getLang();
    var x = COPY[lang] || COPY.ru;
    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('h1', {}, [x.title]));
    wrap.appendChild(C.el('p', { class: 'lead' }, [x.lead]));
    var host = C.el('div');
    wrap.appendChild(host);
    node.appendChild(wrap);
    renderCards(host);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.projects = renderPage;
  global.SILENCE_PAGES['projects-teaser'] = renderTeaser;
}(window));
