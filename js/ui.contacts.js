/* SILENCE — contact form with problem/system context carried from the funnel. */
(function (global) {
  'use strict';
  var COPY = {
    ru: { problem:'Что беспокоит', surface:'Что звукоизолируем', system:'Выбранная система', choose:'Не выбрано', p:[['talk','Разговоры / телевизор'],['music','Музыка / басы'],['impact','Шаги / удары'],['repair','Ремонт / перфоратор'],['echo','Эхо']], s:[['wall','Стена'],['ceiling','Потолок'],['floor','Пол'],['partition','Новая перегородка']] },
    kz: { problem:'Не мазалайды', surface:'Нені дыбыс оқшаулаймыз', system:'Таңдалған жүйе', choose:'Таңдалмаған', p:[['talk','Әңгіме / теледидар'],['music','Музыка / бас'],['impact','Қадам / соққы'],['repair','Жөндеу / перфоратор'],['echo','Жаңғырық']], s:[['wall','Қабырға'],['ceiling','Төбе'],['floor','Еден'],['partition','Жаңа қалқа']] },
    en: { problem:'What bothers you', surface:'What to soundproof', system:'Selected system', choose:'Not selected', p:[['talk','Speech / TV'],['music','Music / bass'],['impact','Footsteps / impacts'],['repair','Drilling / renovation'],['echo','Echo']], s:[['wall','Wall'],['ceiling','Ceiling'],['floor','Floor'],['partition','New partition']] }
  };
  function addOptions(C, select, first, rows) {
    select.appendChild(C.el('option', { value:'' }, [first]));
    rows.forEach(function (r) { select.appendChild(C.el('option', { value:r[0] }, [r[1]])); });
  }
  function render(node) {
    var C = global.SILENCE_CORE, SITE = global.SITE; var lang = C.getLang(); var t = function(k){return C.t(k,lang);}; var x=COPY[lang]||COPY.ru; var c=SITE.contacts||{};
    var q = new URLSearchParams(global.location.search);
    node.innerHTML=''; var wrap=C.el('div',{class:'container contacts-page'});
    wrap.appendChild(C.el('h1',{},[t('formTitle')])); wrap.appendChild(C.el('p',{class:'lead'},[t('formLead')]));
    wrap.appendChild(C.el('div',{class:'contacts-quick'},[
      C.el('a',{class:'btn btn--secondary',href:c.phoneHref||'#','data-analytics':'phone_click_contacts'},[c.phone||'']),
      C.el('a',{class:'btn btn--secondary',href:c.whatsapp||'#','data-analytics':'whatsapp_click_contacts'},['WhatsApp'])
    ]));
    var problem=C.el('select',{id:'f-problem',name:'problem'}); addOptions(C,problem,x.choose,x.p);
    var surface=C.el('select',{id:'f-surface',name:'surface'}); addOptions(C,surface,x.choose,x.s);
    var systemId=q.get('system')||''; var systemItem=systemId && C.findItem ? C.findItem(systemId) : null; var systemName=systemItem ? (typeof systemItem.name==='string'?systemItem.name:(systemItem.name[lang]||systemItem.name.ru)) : '';
    var form=C.el('form',{class:'lead-form','data-lead-form':'',novalidate:''},[
      C.el('div',{class:'field'},[C.el('label',{for:'f-problem'},[x.problem]),problem]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-surface'},[x.surface]),surface]),
      systemName ? C.el('div',{class:'lead-context'},[C.el('span',{class:'caption u-muted'},[x.system]),C.el('strong',{},[systemName])]) : null,
      C.el('input',{id:'f-system',name:'system',type:'hidden',value:systemId}),
      C.el('div',{class:'field'},[C.el('label',{for:'f-name'},[t('fName')]),C.el('input',{id:'f-name',name:'name',type:'text',autocomplete:'name',placeholder:t('fNamePh')})]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-phone'},[t('fPhone')]),C.el('input',{id:'f-phone',name:'phone',type:'tel',inputmode:'numeric',autocomplete:'tel',placeholder:t('fPhonePh')}),C.el('p',{class:'caption field__error','data-phone-error':'',hidden:''},[t('fPhoneErr')])]),
      C.el('div',{class:'field'},[C.el('label',{for:'f-area'},[t('fArea')]),C.el('input',{id:'f-area',name:'area',type:'number',min:'1',step:'1',inputmode:'numeric',placeholder:t('fAreaPh')})]),
      C.el('div',{class:'hp','aria-hidden':'true'},[C.el('label',{for:'f-company'},['Company']),C.el('input',{id:'f-company',name:'company',type:'text',tabindex:'-1',autocomplete:'off'})]),
      C.el('button',{type:'submit',class:'btn btn--primary','data-analytics':'form_submit_click'},[t('fSend')]),
      C.el('p',{class:'caption lead-form__status','data-form-status':'',role:'status'})
    ].filter(Boolean));
    problem.value=q.get('problem')||''; surface.value=q.get('surface')||''; var area=form.querySelector('#f-area'); if(q.get('area')) area.value=q.get('area');
    wrap.appendChild(form); node.appendChild(wrap);
  }
  global.SILENCE_PAGES=global.SILENCE_PAGES||{}; global.SILENCE_PAGES.contacts=render;
}(window));
