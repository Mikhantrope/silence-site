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
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-analytics]');
    if (!el) return;
    track(el.getAttribute('data-analytics'), { value: el.getAttribute('data-analytics-value') || undefined });
  });

  var NAV_MAP = {
    catalog: 'catalog.html',
    systems: 'systems.html',
    pro: 'pro.html',
    projects: 'projects.html',
    contacts: 'contacts.html'
  };

  /* Заголовок вкладки (Шаг 11): полные SEO-версии на трёх языках, ru
     совпадает буквально с тем, что уже статично лежит в <title> каждой
     страницы — при первой загрузке (ru, язык по умолчанию) переписывать
     его тем же текстом безопасно, а при переключении языка заголовок
     вкладки честно следует за языком интерфейса. */
  var SEO_TITLE = {
    index: {
      ru: 'SILENCE \u2014 звукоизоляция стен, потолка и пола в Астане',
      kz: 'SILENCE \u2014 Астанада қабырға, төбе және еденді дыбыстан оқшаулау',
      en: 'SILENCE \u2014 wall, ceiling and floor soundproofing in Astana'
    },
    catalog: {
      ru: 'Каталог систем звукоизоляции \u2014 SILENCE Астана',
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
      ru: 'Объекты SILENCE \u2014 примеры монтажа звукоизоляции',
      kz: 'SILENCE объектілері \u2014 дыбыс оқшаулау монтажының мысалдары',
      en: 'SILENCE projects \u2014 soundproofing installation examples'
    },
    contacts: {
      ru: 'Заявка на расчёт звукоизоляции \u2014 SILENCE Астана',
      kz: 'Дыбыс оқшаулау есебіне өтінім \u2014 SILENCE Астана',
      en: 'Request a soundproofing quote \u2014 SILENCE Astana'
    }
  };

  function renderTitle(lang) {
    var page = document.body.getAttribute('data-page') || 'index';
    var entry = SEO_TITLE[page];
    if (!entry) return;
    document.title = entry[lang] || entry.ru;
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


  function initMobileMenu() {
    var header=document.querySelector('.site-header'), C=global.SILENCE_CORE;
    var nav=header && header.querySelector('.site-nav'), list=nav && nav.querySelector('.site-nav__list');
    var actions=header && header.querySelector('.site-header__actions');
    if(!header||!nav||!list||!actions||header.querySelector('[data-mobile-menu-btn]')) return;
    var btn=C.el('button',{type:'button',class:'mobile-menu-btn','data-mobile-menu-btn':'','aria-expanded':'false','aria-controls':'mobile-site-menu'},[C.el('span'),C.el('span'),C.el('span')]);
    actions.insertBefore(btn,actions.firstChild);
    var panel=C.el('div',{id:'mobile-site-menu',class:'mobile-menu',hidden:''});
    var cloned=list.cloneNode(true);cloned.className='mobile-menu__list';panel.appendChild(cloned);
    var extras=C.el('div',{class:'mobile-menu__extras'});
    nav.querySelectorAll('[data-role="lang-switch"], [data-role="theme-switch"]').forEach(function(n){extras.appendChild(n.cloneNode(true));});
    panel.appendChild(extras);
    var contacts=(global.SITE||{}).contacts||{};
    panel.appendChild(C.el('div',{class:'mobile-menu__contacts'},[
      C.el('a',{class:'btn btn--secondary',href:contacts.phoneHref||'#','data-analytics':'phone_click_menu'},[contacts.phone||'']),
      C.el('a',{class:'btn btn--primary',href:contacts.whatsapp||'#','data-analytics':'whatsapp_click_menu'},['WhatsApp'])
    ]));
    header.appendChild(panel);
    function labels(){
      var lang=C.getLang();
      btn.setAttribute('aria-label',panel.hidden?(lang==='kz'?'Мәзірді ашу':lang==='en'?'Open menu':'Открыть меню'):(lang==='kz'?'Мәзірді жабу':lang==='en'?'Close menu':'Закрыть меню'));
    }
    function close(focus){panel.hidden=true;btn.setAttribute('aria-expanded','false');document.body.classList.remove('mobile-menu-open');labels();if(focus)btn.focus({preventScroll:true});}
    btn.addEventListener('click',function(){var open=panel.hidden;panel.hidden=!open;btn.setAttribute('aria-expanded',String(open));document.body.classList.toggle('mobile-menu-open',open);labels();});
    panel.addEventListener('click',function(e){if(e.target.closest('a'))close(false);});
    extras.querySelectorAll('[data-lang]').forEach(function(n){n.addEventListener('click',function(){C.applyLang(n.getAttribute('data-lang'));});});
    extras.querySelectorAll('[data-theme-choice]').forEach(function(n){n.addEventListener('click',function(){C.applyTheme(n.getAttribute('data-theme-choice'));});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){e.preventDefault();close(true);}});
    document.addEventListener('click',function(e){if(!panel.hidden&&!header.contains(e.target))close(false);});
    document.addEventListener('silence:lang',labels);
    document.addEventListener('silence:overlay-open',function(){close(false);});
    global.addEventListener('resize',function(){if(global.innerWidth>1279)close(false);});
    labels();
  }
}(window));
