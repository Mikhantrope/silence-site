(function (global) {
  'use strict';

  var COPY = {
    ru: {
      title: 'Решения по типу объекта',
      lead: 'Разделили направления отдельно, чтобы не смешивать квартиру, коммерцию и большие залы в одном блоке.',
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
        }
      ]
    },
    kz: {
      title: 'Нысан түрі бойынша шешімдер',
      lead: 'Пәтер, коммерция және үлкен залдарды бір блокқа араластырмау үшін бағыттарды бөлек шығардық.',
      cta: 'Есеп алу',
      items: [
        { id:'apartments', tab:'Пәтерлер', img:'assets/solutions/apartments.webp', title:'Пәтерлердің дыбыс оқшаулауы', text:'Қабырға, төбе және еден үшін типтік пәтер сценарийлері: әңгіме, теледидар, жоғарыдан қадам, бас және үй кинотеатры.' },
        { id:'cottages', tab:'Коттедждер', img:'assets/solutions/cottages.webp', title:'Коттедждердің дыбыс оқшаулауы', text:'Жеке үйлер мен коттедждерге арналған шешімдер: жатын бөлме, балалар бөлмесі, үй кабинеті, инженерлік бөлмелер және арақабырғалар.' },
        { id:'offices', tab:'Кеңселер', img:'assets/solutions/offices.webp', title:'Кеңсе және келіссөз бөлмелері', text:'Кабинеттер арасындағы естілуін азайту, open space, келіссөз және жұмыс бөлмелерінде акустикалық жайлылық жасау.' },
        { id:'concert', tab:'Концерт залдары', img:'assets/solutions/concert.webp', title:'Концерт және event-алаңдар', text:'Үлкен көлемдерге арналған кешенді шешімдер: акустикалық түзету, реверберацияны басқару және паразиттік шағылуды азайту.' },
        { id:'cinema', tab:'Кинотеатрлар', img:'assets/solutions/cinema.webp', title:'Кинотеатрлар және private cinema', text:'Сөйлеудің анықтығына, бас контроліне және көрермен жайлылығына жоғары талап қойылатын залдарға арналған шешімдер.' },
        { id:'sport', tab:'Спорт залдары', img:'assets/solutions/sport.webp', title:'Спорт және көпфункциялы залдар', text:'Аумағы үлкен, қатты беттері көп және белсенділігі жоғары бөлмелердегі гуілді және артық шуды азайту.' }
      ]
    },
    en: {
      title: 'Solutions by facility type',
      lead: 'The directions are separated so flats, commercial spaces and large halls are not mixed in one noisy block.',
      cta: 'Get a quote',
      items: [
        { id:'apartments', tab:'Apartments', img:'assets/solutions/apartments.webp', title:'Apartment soundproofing', text:'Walls, ceilings and floors for common apartment scenarios: speech, TV, footsteps from above, bass and home cinema.' },
        { id:'cottages', tab:'Cottages', img:'assets/solutions/cottages.webp', title:'Cottage soundproofing', text:'Solutions for detached houses and cottages: bedrooms, children rooms, home offices, utility rooms and internal partitions.' },
        { id:'offices', tab:'Offices', img:'assets/solutions/offices.webp', title:'Offices and meeting rooms', text:'Reducing audibility between rooms and improving acoustic comfort in open-space offices, meeting rooms and workplaces.' },
        { id:'concert', tab:'Concert halls', img:'assets/solutions/concert.webp', title:'Concert and event venues', text:'Integrated solutions for large volumes: acoustic correction, reverberation control and reduction of unwanted reflections.' },
        { id:'cinema', tab:'Cinemas', img:'assets/solutions/cinema.webp', title:'Cinemas and private cinema', text:'Facings and acoustic solutions for halls with high demands on intelligibility, bass control and audience comfort.' },
        { id:'sport', tab:'Sports halls', img:'assets/solutions/sport.webp', title:'Sports and multifunctional halls', text:'Reducing boominess and excessive noise in spaces with large areas, hard surfaces and high activity levels.' }
      ]
    }
  };

  function render(node) {
    var C = global.SILENCE_CORE;
    var lang = C.getLang();
    var copy = COPY[lang] || COPY.ru;
    var active = copy.items[0];

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container object-zones' });
    wrap.appendChild(C.el('h2', {}, [copy.title]));
    wrap.appendChild(C.el('p', { class: 'lead object-zones__lead' }, [copy.lead]));

    var tabs = C.el('div', { class: 'object-zones__tabs', role: 'tablist', 'aria-label': copy.title });
    var panel = C.el('div', { class: 'object-zones__panel' });

    function draw(item) {
      panel.innerHTML = '';
      panel.appendChild(C.el('div', { class: 'object-zones__media' }, [
        C.el('img', { src: item.img, alt: item.title, width: '1448', height: '1086', loading: 'lazy', decoding: 'async' })
      ]));
      panel.appendChild(C.el('div', { class: 'object-zones__copy' }, [
        C.el('h3', {}, [item.title]),
        C.el('p', {}, [item.text]),
        C.el('div', { class: 'object-zones__actions' }, [
          C.el('a', { class: 'btn btn--primary', href: 'contacts.html?room=' + encodeURIComponent(item.tab), 'data-analytics': 'object_zone_quote_click', 'data-analytics-value': item.id }, [copy.cta]),
          C.el('a', { class: 'btn btn--secondary', href: 'catalog.html', 'data-analytics': 'object_zone_catalog_click', 'data-analytics-value': item.id }, [lang === 'kz' ? 'Каталогты ашу' : (lang === 'en' ? 'Open catalogue' : 'Смотреть каталог')])
        ])
      ]));
    }

    copy.items.forEach(function (item, index) {
      var btn = C.el('button', {
        class: 'object-zones__tab' + (index === 0 ? ' object-zones__tab--active' : ''),
        type: 'button', role: 'tab', 'aria-selected': index === 0 ? 'true' : 'false',
        'data-analytics': 'object_zone_tab_click', 'data-analytics-value': item.id
      }, [item.tab]);
      btn.addEventListener('click', function () {
        active = item;
        draw(item);
        Array.prototype.forEach.call(tabs.children, function (child) {
          var on = child === btn;
          child.classList.toggle('object-zones__tab--active', on);
          child.setAttribute('aria-selected', on ? 'true' : 'false');
        });
      });
      tabs.appendChild(btn);
    });

    draw(active);
    wrap.appendChild(tabs);
    wrap.appendChild(panel);
    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES['solution-zones'] = render;
}(window));
