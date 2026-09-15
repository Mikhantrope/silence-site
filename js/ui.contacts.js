(function (global) {
  'use strict';

  var COPY = {
    ru: {
      problem:'Что беспокоит', surface:'Что звукоизолируем', system:'Выбранное решение', room:'Тип помещения', choose:'Не выбрано',
      p:[['talk','Разговоры / телевизор'],['music','Музыка / басы'],['impact_upstairs','Топот / удары сверху'],['repair','Ремонт / перфоратор'],['impact_down','Мой топот слышат снизу'],['below','Разговоры / басы снизу'],['echo','Эхо / гул']],
      s:[['wall','Стена'],['ceiling','Потолок'],['floor','Пол'],['partition','Новая перегородка'],['acoustics','Акустика помещения']],
      title: 'Бесплатная консультация инженера-акустика',
      lead: 'Оставьте заявку, а мы поможем подобрать материалы и конструкцию под Вашу задачу.',
      email: 'Электронная почта', emailPh: 'name@example.com',
      policy: 'Я даю согласие на обработку своих персональных данных и принимаю политику конфиденциальности.',
      ads: 'Я согласен получать информационные и рекламные сообщения.',
      send: 'Отправить'
    },
    kz: {
      problem:'Не мазалайды', surface:'Нені оқшаулаймыз', system:'Таңдалған шешім', room:'Бөлме түрі', choose:'Таңдалмаған',
      p:[['talk','Әңгіме / теледидар'],['music','Музыка / бас'],['impact_upstairs','Үстіден қадам / соққы'],['repair','Жөндеу / перфоратор'],['impact_down','Менің қадамымды төменнен естиді'],['below','Әңгіме / бас төменнен'],['echo','Жаңғырық / гуіл']],
      s:[['wall','Қабырға'],['ceiling','Төбе'],['floor','Еден'],['partition','Жаңа қалқа'],['acoustics','Бөлме акустикасы']],
      title: 'Инженер-акустиктің тегін кеңесі',
      lead: 'Өтінім қалдырыңыз, біз материалы мен конструкцияны міндетіңізге сай таңдап береміз.',
      email: 'Электрондық пошта', emailPh: 'name@example.com',
      policy: 'Жеке деректерімді өңдеуге келісім беремін және құпиялылық саясатымен келісемін.',
      ads: 'Ақпараттық және жарнамалық хабарламаларды алуға келісемін.',
      send: 'Жіберу'
    },
    en: {
      problem:'What bothers you', surface:'What are we treating', system:'Selected solution', room:'Room type', choose:'Not selected',
      p:[['talk','Speech / TV'],['music','Music / bass'],['impact_upstairs','Footsteps / impacts above'],['repair','Drilling / renovation'],['impact_down','My footsteps disturb downstairs'],['below','Speech / bass from below'],['echo','Echo / reverberation']],
      s:[['wall','Wall'],['ceiling','Ceiling'],['floor','Floor'],['partition','New partition'],['acoustics','Room acoustics']],
      title: 'Free consultation with an acoustic engineer',
      lead: 'Leave a request and we will help select materials and a suitable system for your task.',
      email: 'Email', emailPh: 'name@example.com',
      policy: 'I consent to the processing of my personal data and accept the privacy policy.',
      ads: 'I agree to receive informational and promotional messages.',
      send: 'Send'
    }
  };

  function addOptions(C, select, first, rows) {
    select.appendChild(C.el('option', { value:'' }, [first]));
    rows.forEach(function (r) { select.appendChild(C.el('option', { value:r[0] }, [r[1]])); });
  }

  function chip(C, label, value) {
    if (!value) return null;
    return C.el('span', { class: 'contacts-page__chip' }, [label + ': ' + value]);
  }

  function render(node) {
    var C = global.SILENCE_CORE, SITE = global.SITE; var lang = C.getLang(); var x=COPY[lang]||COPY.ru; var c=SITE.contacts||{};
    var t = function(k){return C.t(k,lang);};
    var q = new URLSearchParams(global.location.search);
    node.innerHTML='';

    var wrap=C.el('div',{class:'container contacts-page'});
    var shell=C.el('div',{class:'contacts-page__shell'});
    var intro=C.el('div',{class:'contacts-page__intro'},[
      C.el('img',{class:'contacts-page__icon',src:'assets/ico-engineer.svg',alt:'',loading:'eager'}),
      C.el('h1',{},[x.title]),
      C.el('p',{class:'lead'},[x.lead])
    ]);
    shell.appendChild(intro);

    shell.appendChild(C.el('div',{class:'contacts-page__quick'},[
      C.el('a',{class:'btn btn--secondary',href:c.phoneHref||'#','data-analytics':'phone_click_contacts'},[c.phone||'']),
      C.el('a',{class:'btn btn--secondary',href:c.whatsapp||'#','data-analytics':'whatsapp_click_contacts'},['WhatsApp'])
    ]));

    var problem=C.el('select',{id:'f-problem',name:'problem'}); addOptions(C,problem,x.choose,x.p);
    var surface=C.el('select',{id:'f-surface',name:'surface'}); addOptions(C,surface,x.choose,x.s);
    var systemId=q.get('system')||''; var systemItem=systemId && C.findItem ? C.findItem(systemId) : null; var systemName=systemItem ? (typeof systemItem.name==='string'?systemItem.name:(systemItem.name[lang]||systemItem.name.ru)) : '';
    var room=q.get('room')||'';
    problem.value=q.get('problem')||''; surface.value=q.get('surface')||'';

    var summary=C.el('div',{class:'contacts-page__summary'},[
      chip(C, x.problem, problem.options[problem.selectedIndex] ? problem.options[problem.selectedIndex].textContent : ''),
      chip(C, x.surface, surface.options[surface.selectedIndex] ? surface.options[surface.selectedIndex].textContent : ''),
      chip(C, x.room, room),
      chip(C, x.system, systemName)
    ].filter(Boolean));
    if (summary.children.length) shell.appendChild(summary);

    var form=C.el('form',{class:'lead-form contacts-page__form','data-lead-form':'',novalidate:''},[
      C.el('div',{class:'field'},[C.el('label',{for:'f-name'},[t('fName')]),C.el('input',{id:'f-name',name:'name',type:'text',autocomplete:'name',placeholder:t('fNamePh')})]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-phone'},[t('fPhone')]),C.el('input',{id:'f-phone',name:'phone',type:'tel',inputmode:'numeric',autocomplete:'tel',placeholder:t('fPhonePh')}),C.el('p',{class:'caption field__error','data-phone-error':'',hidden:''},[t('fPhoneErr')])]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-email'},[x.email]),C.el('input',{id:'f-email',name:'email',type:'email',autocomplete:'email',placeholder:x.emailPh})]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-problem'},[x.problem]),problem]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-surface'},[x.surface]),surface]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-area'},[t('fArea')]),C.el('input',{id:'f-area',name:'area',type:'number',min:'1',step:'1',inputmode:'numeric',placeholder:t('fAreaPh')})]),
      C.el('input',{id:'f-system',name:'system',type:'hidden',value:systemId}),
      C.el('input',{id:'f-room',name:'room',type:'hidden',value:room}),
      C.el('div',{class:'hp','aria-hidden':'true'},[C.el('label',{for:'f-company'},['Company']),C.el('input',{id:'f-company',name:'company',type:'text',tabindex:'-1',autocomplete:'off'})]),
      C.el('div',{class:'contacts-page__checks'},[
        C.el('label',{class:'contacts-page__check',for:'f-policy'},[
          C.el('input',{id:'f-policy',name:'policy',type:'checkbox',required:'required'}),
          C.el('span',{},[x.policy])
        ]),
        C.el('label',{class:'contacts-page__check',for:'f-ads'},[
          C.el('input',{id:'f-ads',name:'ads',type:'checkbox'}),
          C.el('span',{},[x.ads])
        ])
      ]),
      C.el('button',{type:'submit',class:'btn contacts-page__submit','data-analytics':'form_submit_click'},[x.send]),
      C.el('p',{class:'caption lead-form__status contacts-page__status','data-form-status':'',role:'status'})
    ]);
    if(q.get('area')) form.querySelector('#f-area').value=q.get('area');
    shell.appendChild(form);
    wrap.appendChild(shell);
    node.appendChild(wrap);
  }
  global.SILENCE_PAGES=global.SILENCE_PAGES||{}; global.SILENCE_PAGES.contacts=render;
}(window));
