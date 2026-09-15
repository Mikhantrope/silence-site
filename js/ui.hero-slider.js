(function (global) {
  'use strict';

  var COPY = {
    ru: {
      title: 'Акустические системы SILENCE',
      lead: 'Ключевые узлы, решения и объекты из презентации — собраны в одной карусели без перегруза первого экрана.',
      cta: 'Получить расчёт',
      more: 'Открыть каталог',
      slides: [
        { id:'s01', img:'assets/promo/slide-01.png', title:'SILENCE — звукоизоляционные системы', text:'Короткое вступление в продуктовую линейку и общий стиль бренда.' },
        { id:'s02', img:'assets/promo/slide-02.png', title:'Акустические системы SILENCE', text:'Общее описание комплекса решений для звукоизоляции, акустической коррекции и декоративного оформления помещений.' },
        { id:'s03', img:'assets/promo/slide-03.png', title:'Звукоизоляционные материалы', text:'SoundFiber, EchoGuard, VibroGuard, панели, плиты, виброподвесы и подрозетники.' },
        { id:'s04', img:'assets/promo/slide-04.png', title:'Акустические интерьерные панели', text:'Декоративные решения AcousticWood для помещений, где важны и внешний вид, и акустический комфорт.' },
        { id:'s05', img:'assets/promo/slide-05.png', title:'Бескаркасные системы', text:'Тонкие решения для стен и потолков, когда важно сберечь полезную площадь.' },
        { id:'s06', img:'assets/promo/slide-06.png', title:'Каркасные системы', text:'Решения повышенной эффективности для потолков и других конструкций с большим запасом по акустике.' },
        { id:'s07', img:'assets/promo/slide-07.png', title:'Системы звукоизоляции пола', text:'Конструкции для снижения ударного шума и подготовки основания под чистовое покрытие.' },
        { id:'s08', img:'assets/promo/slide-08.png', title:'Звукоизоляционные перегородки', text:'Перегородки для новых помещений и перепланировок с расчётными показателями.' },
        { id:'s09', img:'assets/promo/slide-09.png', title:'Технические решения', text:'Соответствие нормам, снижение веса конструкций, повышение сейсмической безопасности и ускорение строительства.' },
        { id:'s10', img:'assets/promo/slide-10.png', title:'Социальные объекты', text:'Примеры применения решений SILENCE на общественных и коммерческих объектах.' },
        { id:'s11', img:'assets/promo/slide-11.png', title:'Гостиницы', text:'Примеры проектов для отелей и гостиничной инфраструктуры.' },
        { id:'s12', img:'assets/promo/slide-12.png', title:'Жилые комплексы', text:'Примеры объектов жилой недвижимости, где применялись решения SILENCE.' }
      ]
    },
    kz: {
      title: 'SILENCE акустикалық жүйелері',
      lead: 'Презентациядағы негізгі түйіндер, шешімдер және нысандар — бірінші экранды артық жүктемей бір карусельге жиналды.',
      cta: 'Есеп алу',
      more: 'Каталогты ашу',
      slides: [
        { id:'s01', img:'assets/promo/slide-01.png', title:'SILENCE — дыбыс оқшаулау жүйелері', text:'Өнім желісіне және бренд стиліне қысқа кіріспе.' },
        { id:'s02', img:'assets/promo/slide-02.png', title:'SILENCE акустикалық жүйелері', text:'Дыбыс оқшаулау, акустикалық түзету және сәндік әрлеуге арналған кешенді шешімдердің жалпы сипаттамасы.' },
        { id:'s03', img:'assets/promo/slide-03.png', title:'Дыбыс оқшаулағыш материалдар', text:'SoundFiber, EchoGuard, VibroGuard, панельдер, плиталар, виброаспалар және подрозетниктер.' },
        { id:'s04', img:'assets/promo/slide-04.png', title:'Акустикалық интерьер панельдері', text:'Сыртқы келбеті мен акустикалық жайлылығы қатар маңызды болатын бөлмелерге арналған AcousticWood шешімдері.' },
        { id:'s05', img:'assets/promo/slide-05.png', title:'Қаңқасыз жүйелер', text:'Пайдалы аумақты сақтау маңызды болғанда қабырға мен төбеге арналған жұқа шешімдер.' },
        { id:'s06', img:'assets/promo/slide-06.png', title:'Қаңқалы жүйелер', text:'Төбе және басқа конструкциялар үшін жоғары тиімді шешімдер.' },
        { id:'s07', img:'assets/promo/slide-07.png', title:'Еденнің дыбыс оқшаулау жүйелері', text:'Соққы шуды азайтуға және әрлеу жабындысына негіз дайындауға арналған конструкциялар.' },
        { id:'s08', img:'assets/promo/slide-08.png', title:'Дыбыс оқшаулағыш қалқалар', text:'Жаңа бөлмелер мен қайта жоспарлау үшін есептелген көрсеткіштері бар қалқалар.' },
        { id:'s09', img:'assets/promo/slide-09.png', title:'Техникалық шешімдер', text:'Нормаларға сәйкестік, конструкция салмағын азайту, сейсмикалық қауіпсіздікті арттыру және құрылыс мерзімін қысқарту.' },
        { id:'s10', img:'assets/promo/slide-10.png', title:'Әлеуметтік нысандар', text:'Қоғамдық және коммерциялық нысандардағы SILENCE шешімдерінің мысалдары.' },
        { id:'s11', img:'assets/promo/slide-11.png', title:'Қонақ үйлер', text:'Қонақ үй жобаларының мысалдары.' },
        { id:'s12', img:'assets/promo/slide-12.png', title:'Тұрғын кешендер', text:'SILENCE шешімдері қолданылған тұрғын үй нысандарының мысалдары.' }
      ]
    },
    en: {
      title: 'SILENCE acoustic systems',
      lead: 'Key nodes, solutions and projects from the presentation are assembled into one carousel instead of overloading the first screen.',
      cta: 'Get a quote',
      more: 'Open catalogue',
      slides: [
        { id:'s01', img:'assets/promo/slide-01.png', title:'SILENCE soundproofing systems', text:'A short introduction to the product line and the brand style.' },
        { id:'s02', img:'assets/promo/slide-02.png', title:'SILENCE acoustic systems', text:'An overview of the solution set for sound insulation, acoustic correction and decorative finishing.' },
        { id:'s03', img:'assets/promo/slide-03.png', title:'Sound-insulating materials', text:'SoundFiber, EchoGuard, VibroGuard, panels, boards, hangers and back boxes.' },
        { id:'s04', img:'assets/promo/slide-04.png', title:'Decorative acoustic panels', text:'AcousticWood solutions for rooms where both appearance and acoustic comfort matter.' },
        { id:'s05', img:'assets/promo/slide-05.png', title:'Frameless systems', text:'Slim solutions for walls and ceilings when usable area matters.' },
        { id:'s06', img:'assets/promo/slide-06.png', title:'Framed systems', text:'Higher-performance solutions for ceilings and other constructions.' },
        { id:'s07', img:'assets/promo/slide-07.png', title:'Floor soundproofing systems', text:'Constructions for impact-noise reduction and floor build-up preparation.' },
        { id:'s08', img:'assets/promo/slide-08.png', title:'Sound-insulating partitions', text:'Partitions for new rooms and replanning with calculated performance.' },
        { id:'s09', img:'assets/promo/slide-09.png', title:'Technical solutions', text:'Compliance with standards, lower structural weight, improved seismic safety and faster construction.' },
        { id:'s10', img:'assets/promo/slide-10.png', title:'Public projects', text:'Examples of SILENCE solutions in public and commercial facilities.' },
        { id:'s11', img:'assets/promo/slide-11.png', title:'Hotels', text:'Examples of hotel and hospitality projects.' },
        { id:'s12', img:'assets/promo/slide-12.png', title:'Residential complexes', text:'Examples of residential projects where SILENCE solutions were used.' }
      ]
    }
  };

  function render(node) {
    var C = global.SILENCE_CORE;
    var lang = C.getLang();
    var copy = COPY[lang] || COPY.ru;
    var index = 0;
    var timer = null;

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'hero-slider' });
    var head = C.el('div', { class: 'hero-slider__head' }, [
      C.el('p', { class: 'caption u-accent hero__eyebrow' }, [lang === 'kz' ? 'Қазақстанда жасалған' : (lang === 'en' ? 'Made in Kazakhstan' : 'Сделано в Казахстане')]),
      C.el('h1', { class: 'hero-slider__title' }, [copy.title]),
      C.el('p', { class: 'lead hero-slider__lead' }, [copy.lead])
    ]);
    var viewport = C.el('div', { class: 'hero-slider__viewport' });
    var track = C.el('div', { class: 'hero-slider__track' });
    var dots = C.el('div', { class: 'hero-slider__dots', 'aria-label': copy.title });
    var actions = C.el('div', { class: 'hero__actions hero-slider__actions' }, [
      C.el('a', { class: 'btn btn--primary', href: 'contacts.html', 'data-analytics': 'cta_hero_click' }, [copy.cta]),
      C.el('a', { class: 'btn btn--secondary', href: 'catalog.html', 'data-analytics': 'hero_catalog_click' }, [copy.more])
    ]);

    function slideNode(slide) {
      return C.el('article', { class: 'hero-slide' }, [
        C.el('div', { class: 'hero-slide__media' }, [
          C.el('img', { src: slide.img, alt: slide.title, loading: 'eager' })
        ]),
        C.el('div', { class: 'hero-slide__overlay' }, [
          C.el('h2', {}, [slide.title]),
          C.el('p', {}, [slide.text])
        ])
      ]);
    }

    function go(next) {
      index = (next + copy.slides.length) % copy.slides.length;
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      Array.prototype.forEach.call(dots.children, function (dot, i) {
        var on = i === index;
        dot.classList.toggle('hero-slider__dot--active', on);
        dot.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function restart() {
      if (timer) global.clearInterval(timer);
      timer = global.setInterval(function () { go(index + 1); }, 5000);
    }

    copy.slides.forEach(function (slide, i) {
      track.appendChild(slideNode(slide));
      var dot = C.el('button', {
        class: 'hero-slider__dot' + (i === 0 ? ' hero-slider__dot--active' : ''),
        type: 'button', 'aria-pressed': i === 0 ? 'true' : 'false',
        'aria-label': slide.title,
        'data-analytics': 'hero_slide_dot_click', 'data-analytics-value': slide.id
      });
      dot.addEventListener('click', function () { go(i); restart(); });
      dots.appendChild(dot);
    });

    var prevBtn = C.el('button', { class: 'hero-slider__nav hero-slider__nav--prev', type: 'button', 'aria-label': lang === 'kz' ? 'Алдыңғы слайд' : (lang === 'en' ? 'Previous slide' : 'Предыдущий слайд') }, ['‹']);
    var nextBtn = C.el('button', { class: 'hero-slider__nav hero-slider__nav--next', type: 'button', 'aria-label': lang === 'kz' ? 'Келесі слайд' : (lang === 'en' ? 'Next slide' : 'Следующий слайд') }, ['›']);

    viewport.appendChild(track);
    viewport.appendChild(prevBtn);
    viewport.appendChild(nextBtn);
    wrap.appendChild(head);
    wrap.appendChild(viewport);
    wrap.appendChild(dots);
    wrap.appendChild(actions);
    node.appendChild(wrap);

    var prev = prevBtn;
    var next = nextBtn;
    prev.addEventListener('click', function () { go(index - 1); restart(); });
    next.addEventListener('click', function () { go(index + 1); restart(); });
    wrap.addEventListener('mouseenter', function () { if (timer) global.clearInterval(timer); });
    wrap.addEventListener('mouseleave', restart);
    restart();
    go(0);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES['hero-slider'] = render;
}(window));
