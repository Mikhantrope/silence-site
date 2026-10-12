/* SILENCE — app.js
   Точка входа. Общие для всех страниц вещи (слоган, контакты, активный
   пункт навигации) плюс реестр монтирования блоков по data-mount:
   ui.*.js регистрируют себя в window.SILENCE_PAGES['имя'] = fn(node),
   а app.js вызывает их для каждого найденного [data-mount] и повторно —
   при смене языка (модуль сам обязан очищать node перед рендером). */
(function (global) {
  'use strict';

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  var mounted = [];

  /* --- аналитика (маркетинговое ТЗ, Шаг 13): точки на конверсионных
     элементах, без привязки к конкретному вендору. Каждое событие уходит
     в window.dataLayer (общепринятый формат, который читают GA4/GTM/
     Яндекс.Метрика через свои сниппеты) — какой счётчик подключать,
     решает заказчик, здесь только сами точки инструментирования. */
  global.dataLayer = global.dataLayer || [];
  function track(name, detail) {
    var payload = { page: document.body ? document.body.getAttribute('data-page') : undefined };
    if (detail) { for (var k in detail) { if (detail[k] !== undefined) payload[k] = detail[k]; } }
    if (global.SILENCE_ANALYTICS && typeof global.SILENCE_ANALYTICS.track === 'function') {
      global.SILENCE_ANALYTICS.track(name, payload);
    } else {
      payload.event = name;
      global.dataLayer.push(payload);
    }
  }
  global.SILENCE_TRACK = track;

  /* делегированный обработчик: любой клик по [data-analytics] уходит в
     трекинг с именем события из атрибута и необязательным значением
     из data-analytics-value — так не нужно вешать отдельный listener
     на каждую кнопку в каждом ui.*.js модуле. */
  function analyticsPlacement(el) {
    if (!el || !el.closest) return 'content';
    if (el.closest('.site-header')) return 'header';
    if (el.closest('.site-footer')) return 'footer';
    if (el.closest('.floating-whatsapp')) return 'floating';
    if (el.closest('[data-lead-form], .consultation27')) return 'consultation';
    if (el.closest('.overlay')) return 'overlay';
    return 'content';
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-analytics]');
    var anchor = e.target.closest && e.target.closest('a[href]');
    if (el) {
      var detail = {
        value: el.getAttribute('data-analytics-value') || undefined,
        placement: analyticsPlacement(el)
      };
      if (anchor) detail.link_url = anchor.getAttribute('href') || undefined;
      track(el.getAttribute('data-analytics'), detail);
      return;
    }
    if (!anchor) return;
    var href = anchor.getAttribute('href') || '';
    if (/^tel:/i.test(href)) {
      track('phone_click', { placement: analyticsPlacement(anchor) });
    } else if (/^(?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com)\//i.test(href)) {
      track('whatsapp_click', { placement: analyticsPlacement(anchor) });
    }
  });

  var NAV_MAP = {
    catalog: 'catalog.html',
    systems: 'systems.html',
    pro: 'pro.html',
    projects: 'projects.html',
    contacts: 'contacts.html'
  };

  /* SEO metadata follows the selected interface language. Russian remains the
     static crawlable fallback in HTML; this keeps the browser title/description
     coherent when visitors switch to Kazakh or English. */
  var SEO_META = {
    index: {
      ru: {title:'Звукоизоляция стен, потолка и пола в Астане — SILENCE',desc:'Системы звукоизоляции SILENCE для стен, потолка, пола и перегородок в Астане. Материалы, акустические панели, примеры объектов и консультация.'},
      kz: {title:'Астанада қабырға, төбе және еденді дыбыстан оқшаулау — SILENCE',desc:'Астанада қабырға, төбе, еден және қалқаларға арналған SILENCE дыбыс оқшаулау жүйелері. Материалдар, акустикалық панельдер, нысандар және кеңес.'},
      en: {title:'Wall, ceiling and floor soundproofing in Astana — SILENCE',desc:'SILENCE soundproofing systems in Astana for walls, ceilings, floors and partitions. Materials, acoustic panels, project examples and consultation.'}
    },
    catalog: {
      ru: {title:'Материалы для звукоизоляции и акустики — SILENCE',desc:'Каталог SILENCE: панели для стен, потолка и пола, SoundFiber, VibroGuard, EchoGuard, интерьерные акустические панели и комплектующие.'},
      kz: {title:'Дыбыс оқшаулау материалдары мен акустикалық панельдер — SILENCE',desc:'SILENCE каталогы: қабырға, төбе және еден панельдері, SoundFiber, VibroGuard, EchoGuard, интерьерлік акустикалық панельдер және жинақтауыштар.'},
      en: {title:'Soundproofing materials and acoustic panels — SILENCE',desc:'SILENCE catalogue: wall, ceiling and floor panels, SoundFiber, VibroGuard, EchoGuard, interior acoustic panels and installation components.'}
    },
    systems: {
      ru: {title:'Системы звукоизоляции стен, потолка и пола — SILENCE',desc:'Каркасные и бескаркасные системы SILENCE для стен, потолка, пола и перегородок: состав слоёв, показатели ΔRw, ΔLn,w и Rw, схемы.'},
      kz: {title:'Қабырға, төбе және еденді дыбыс оқшаулау жүйелері — SILENCE',desc:'Қабырға, төбе, еден және қалқаларға арналған SILENCE қаңқалы және қаңқасыз жүйелері: қабаттар, ΔRw, ΔLn,w және Rw көрсеткіштері, схемалар.'},
      en: {title:'Soundproofing systems for walls, ceilings and floors — SILENCE',desc:'SILENCE framed and frameless systems for walls, ceilings, floors and partitions with layer build-ups, ΔRw, ΔLn,w and Rw ratings and diagrams.'}
    },
    pro: {
      ru: {title:'SILENCE для проектировщиков и дизайнеров — акустические решения',desc:'Технические решения SILENCE для проектировщиков, дизайнеров и бизнеса: нормативы СН/СП РК, состав систем, характеристики материалов и типовые задачи.'},
      kz: {title:'Жобалаушылар мен дизайнерлерге арналған SILENCE шешімдері',desc:'Жобалаушыларға, дизайнерлерге және бизнеске арналған SILENCE техникалық шешімдері: ҚР СН/СП нормативтері, жүйе құрамы, материал сипаттамалары және типтік міндеттер.'},
      en: {title:'SILENCE solutions for architects and designers',desc:'SILENCE technical solutions for architects, interior designers and business: Kazakhstan standards, assembly build-ups, material specifications and typical acoustic tasks.'}
    },
    projects: {
      ru: {title:'Объекты SILENCE — звукоизоляция и акустические решения',desc:'Примеры объектов SILENCE: жилые комплексы, гостиницы, общественные пространства, кинопавильон и музыкальные кабинеты.'},
      kz: {title:'SILENCE нысандары — дыбыс оқшаулау және акустикалық шешімдер',desc:'SILENCE нысандарының мысалдары: тұрғын кешендер, қонақ үйлер, қоғамдық кеңістіктер, кинопавильон және музыкалық кабинеттер.'},
      en: {title:'SILENCE projects — soundproofing and acoustic solutions',desc:'Examples of SILENCE projects: residential developments, hotels, public spaces, a film pavilion and music classrooms.'}
    },
    gallery: {
      ru: {title:'Галерея SILENCE — звукоизоляция и акустические панели',desc:'Фото и видео решений SILENCE: звукоизоляционные конструкции, интерьерные акустические панели, перегородки, кинозалы, хаммамы и другие объекты.'},
      kz: {title:'SILENCE галереясы — дыбыс оқшаулау және акустикалық панельдер',desc:'SILENCE шешімдерінің фото және видеолары: дыбыс оқшаулау конструкциялары, интерьерлік акустикалық панельдер, қалқалар және нысандар.'},
      en: {title:'SILENCE gallery — soundproofing and acoustic panels',desc:'Photos and videos of SILENCE solutions: soundproofing assemblies, interior acoustic panels, partitions and completed spaces.'}
    },
    contacts: {
      ru: {title:'Расчёт звукоизоляции в Астане — консультация SILENCE',desc:'Консультация по звукоизоляции в Астане. Подберём систему для стены, потолка, пола или перегородки и подготовим предварительный расчёт через WhatsApp.'},
      kz: {title:'Астанада дыбыс оқшаулауды есептеу — SILENCE кеңесі',desc:'Астанада дыбыс оқшаулау бойынша кеңес. Қабырға, төбе, еден немесе қалқаға жүйе таңдап, WhatsApp арқылы алдын ала есеп дайындаймыз.'},
      en: {title:'Soundproofing quote in Astana — SILENCE consultation',desc:'Soundproofing consultation in Astana. We help select a system for a wall, ceiling, floor or partition and prepare a preliminary quote via WhatsApp.'}
    }
  };

  function renderMeta(lang) {
    var page = document.body.getAttribute('data-page') || 'index';
    var entry = SEO_META[page];
    if (!entry) return;
    var meta = entry[lang] || entry.ru;
    document.title = meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.desc);
    var fields = [
      ['meta[property="og:title"]','content',meta.title],
      ['meta[property="og:description"]','content',meta.desc],
      ['meta[name="twitter:title"]','content',meta.title],
      ['meta[name="twitter:description"]','content',meta.desc]
    ];
    fields.forEach(function (row) { var node=document.querySelector(row[0]); if(node) node.setAttribute(row[1],row[2]); });
    var locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.setAttribute('content', lang==='kz'?'kk_KZ':lang==='en'?'en_US':'ru_RU');
  }

  function renderSlogan(lang) {
    var SITE = global.SITE;
    if (!SITE) return;
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
    if (!SITE || !SITE.contacts) return;
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
    if (!target) return;
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
        } catch (err) {
          /* одна упавшая секция не должна гасить рендер всех остальных —
             реальный случай, который так и был найден: ошибка в одном
             модуле молча обрывала весь цикл, и все секции после неё
             оставались пустыми без единого сообщения в консоли о причине */
          console.error('[SILENCE] секция "' + name + '" не отрендерилась:', err);
        }
      }
    }
    if (global.SILENCE_CORE) global.SILENCE_CORE.linkNorms(document.body);
  }

  function rerunMounts() {
    for (var i = 0; i < mounted.length; i++) {
      try { mounted[i].fn(mounted[i].node); } catch (err) { console.error('[SILENCE] пересборка секции упала:', err); }
    }
    if (global.SILENCE_CORE) global.SILENCE_CORE.linkNorms(document.body);
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (global.SILENCE_ANALYTICS) global.SILENCE_ANALYTICS.captureAttribution();
    initMobileMenu();
    var lang = (global.SILENCE_CORE && global.SILENCE_CORE.getLang()) || 'ru';
    renderSlogan(lang);
    renderContacts();
    markCurrentNav();
    renderMeta(lang);
    runMounts();
    track('page_view', { lang: lang });
  });

  document.addEventListener('silence:lang', function (e) {
    renderSlogan(e.detail.lang);
    renderMeta(e.detail.lang);
    rerunMounts();
    track('lang_change', { lang: e.detail.lang });
  });

  /* --- строка нормативов на главной ---
     Небольшая и специфичная для index.html, поэтому регистрируется прямо
     здесь, а не отдельным ui.*.js модулем. */
  global.SILENCE_PAGES['norms-strip'] = function (node) {
    var C = global.SILENCE_CORE;
    var SITE = global.SITE, NORMS = global.SILENCE_NORMS;
    if (!C || !NORMS) return;
    var lang = C.getLang();
    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container norms-strip' });
    ['sn', 'sp'].forEach(function (key) {
      var doc = NORMS[key];
      if (!doc) return;
      var body = doc[lang] || doc.ru;
      wrap.appendChild(C.el('p', { class: 'caption norms-strip__line' }, [body.title]));
    });
    node.appendChild(wrap);
    /* коды нормативов внутри body.title будут автоматически превращены
       в кнопки-ссылки общим проходом core.linkNorms() после runMounts() */
  };

  /* --- плавающая кнопка WhatsApp: второй уровень CTA, общая для всех
     страниц (маркетинговое ТЗ, Шаг 10). Появляется после того, как
     страницу проскроллили дальше первого экрана — чтобы не спорить с
     основной кнопкой героя за внимание, а не потому что средство связи
     менее важное. Не показывается на contacts.html — там уже есть форма
     и те же контакты в открытую, дублировать нечего. */
  function initFloatingWhatsApp() {
    var SITE = global.SITE;
    if (!SITE || !SITE.contacts || !SITE.contacts.whatsapp) return;
    if (document.body.getAttribute('data-page') === 'contacts') return;

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
      } else if (!pastHero && shown) {
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

  /* --- engagement / conversion instrumentation (v52) ---
     No form values, phone numbers or other personal data are sent. */
  function initEngagementTracking() {
    var seenDepth = {};
    function depthCheck() {
      if (global.scrollY < 40) return;
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - global.innerHeight);
      var pct = Math.min(100, Math.round((global.scrollY / max) * 100));
      [25, 50, 75, 90].forEach(function (n) {
        if (pct >= n && !seenDepth[n]) { seenDepth[n] = true; track('scroll_depth', { percent: n }); }
      });
    }
    global.addEventListener('scroll', depthCheck, { passive: true });

    var videoState = new WeakMap();
    function videoInfo(v) {
      var src = v.currentSrc || (v.querySelector('source') && v.querySelector('source').getAttribute('src')) || '';
      return {
        video_name: v.getAttribute('aria-label') || (src.split('/').pop() || 'video'),
        video_src: src ? src.split('?')[0].split('/').pop() : undefined
      };
    }
    document.addEventListener('play', function (e) {
      if (!e.target || e.target.tagName !== 'VIDEO') return;
      var v = e.target, st = videoState.get(v) || { started: false, marks: {} };
      if (!st.started) { st.started = true; track('video_start', videoInfo(v)); }
      videoState.set(v, st);
    }, true);
    document.addEventListener('timeupdate', function (e) {
      if (!e.target || e.target.tagName !== 'VIDEO') return;
      var v=e.target; if (!isFinite(v.duration) || v.duration <= 0) return;
      var st=videoState.get(v) || { started:false, marks:{} };
      var pct=(v.currentTime/v.duration)*100;
      [25,50,75].forEach(function(n){ if(pct>=n && !st.marks[n]){ st.marks[n]=true; var d=videoInfo(v); d.percent=n; track('video_progress',d); } });
      videoState.set(v,st);
    }, true);
    document.addEventListener('ended', function (e) {
      if (!e.target || e.target.tagName !== 'VIDEO') return;
      track('video_complete', videoInfo(e.target));
    }, true);

    var startedForms = new WeakSet();
    document.addEventListener('focusin', function (e) {
      var form = e.target && e.target.closest && e.target.closest('[data-lead-form]');
      if (!form || startedForms.has(form)) return;
      startedForms.add(form);
      track('consultation_form_start', { source: document.body.getAttribute('data-page') || 'index' });
    });
  }
  document.addEventListener('DOMContentLoaded', initEngagementTracking);


  function initMobileMenu() {
    var C=global.SILENCE_CORE,header=document.querySelector('.header27'),btn=document.querySelector('[data-mobile-menu-btn]'),panel=document.getElementById('mobile-site-menu');if(!header||!btn||!panel)return;
    var list=header.querySelector('.site-nav__list').cloneNode(true);list.className='mobile-menu__list';panel.appendChild(list);
    panel.appendChild(C.el('a',{class:'btn btn--primary',href:'contacts.html','data-i18n':'cta'},[C.t('cta',C.getLang())]));
    function label(){btn.setAttribute('aria-label',C.getLang()==='kz'?(panel.hidden?'Мәзірді ашу':'Мәзірді жабу'):C.getLang()==='en'?(panel.hidden?'Open menu':'Close menu'):(panel.hidden?'Открыть меню':'Закрыть меню'));}
    function close(focus){panel.hidden=true;btn.setAttribute('aria-expanded','false');label();if(focus)btn.focus({preventScroll:true});}
    btn.addEventListener('click',function(){panel.hidden=!panel.hidden;btn.setAttribute('aria-expanded',String(!panel.hidden));label();});
    panel.addEventListener('click',function(e){if(e.target.closest('a'))close(false);});
    document.addEventListener('click',function(e){if(!panel.hidden&&!header.contains(e.target))close(false);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){e.preventDefault();close(true);}});
    global.addEventListener('resize',function(){if(innerWidth>=1180)close(false);});document.addEventListener('silence:overlay-open',function(){close(false);});document.addEventListener('silence:lang',label);label();
    var language=header.querySelector('[data-language]'),theme=header.querySelector('[data-theme-toggle]');language.value=C.getLang();language.addEventListener('change',function(){C.applyLang(language.value);});
    function themeLabel(){theme.setAttribute('aria-label',C.getLang()==='kz'?'Тақырыпты ауыстыру':C.getLang()==='en'?'Switch colour theme':'Переключить тему');theme.setAttribute('aria-pressed',String(C.getTheme()==='dark'));}
    theme.addEventListener('click',function(){C.applyTheme(C.getTheme()==='dark'?'light':'dark');});document.addEventListener('silence:theme',themeLabel);document.addEventListener('silence:lang',themeLabel);themeLabel();
  }
}(window));
