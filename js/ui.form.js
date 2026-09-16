/* v26: small form, no silent truncation, re-wires after language changes.
   Backend success is never simulated. WhatsApp is a user-clicked fallback only. */
(function(global){
  'use strict';
  var COPY={
    ru:{name:'Введите имя.',phone:'Введите 10 цифр номера или полный номер с +7 / 8.',consent:'Подтвердите согласие на обработку персональных данных.',busy:'Отправляем…',failed:'Заявка не отправлена. Попробуйте ещё раз или напишите в WhatsApp.',wa:'Отправить через WhatsApp'},
    kz:{name:'Атыңызды енгізіңіз.',phone:'Нөмірдің 10 цифрын немесе +7 / 8 арқылы толық нөмірді енгізіңіз.',consent:'Жеке деректерді өңдеуге келісім беріңіз.',busy:'Жіберілуде…',failed:'Өтінім жіберілмеді. Қайта көріңіз немесе WhatsApp арқылы жазыңыз.',wa:'WhatsApp арқылы жіберу'},
    en:{name:'Enter your name.',phone:'Enter a 10-digit number or the full number starting with +7 / 8.',consent:'Please consent to personal data processing.',busy:'Sending…',failed:'The request was not sent. Retry or contact us on WhatsApp.',wa:'Send via WhatsApp'}
  };
  function normalize(raw){var d=String(raw||'').replace(/\D/g,'');if(d.length===11&&(d.charAt(0)==='7'||d.charAt(0)==='8'))return d.slice(1);return d;}
  function format(d){return '+7 '+[d.slice(0,3),d.slice(3,6),d.slice(6,8),d.slice(8,10)].join(' ');}
  function val(form,id){var n=form.querySelector(id);return n?n.value:'';}
  function init(){
    document.querySelectorAll('[data-lead-form]').forEach(function(form){
      if(form._wired)return;form._wired=true;
      var C=global.SILENCE_CORE,phone=form.querySelector('#f-phone'),name=form.querySelector('#f-name'),policy=form.querySelector('#f-policy');
      var status=form.querySelector('[data-form-status]'),error=form.querySelector('[data-phone-error]'),btn=form.querySelector('button[type="submit"]');
      var fallback=C.el('a',{class:'btn contacts-page__fallback',hidden:'',target:'_blank',rel:'noopener','data-whatsapp-fallback':''});
      form.appendChild(fallback);
      phone.addEventListener('blur',function(){var d=normalize(phone.value);if(d.length===10)phone.value=format(d);});
      [phone,name,policy].forEach(function(input){if(!input)return;input.addEventListener('input',function(){input.removeAttribute('aria-invalid');input.closest('.field')&&input.closest('.field').classList.remove('field--invalid');if(input===phone&&error)error.hidden=true;});});
      form.addEventListener('submit',function(e){
        e.preventDefault();if(form._submitting)return;
        var lang=C.getLang(),x=COPY[lang]||COPY.ru;
        status.textContent='';status.removeAttribute('data-ok');status.removeAttribute('data-err');fallback.hidden=true;
        if(val(form,'#f-company'))return;
        function invalid(input,message){status.textContent=message;status.setAttribute('data-err','');input.setAttribute('aria-invalid','true');input.focus();}
        if(!name.value.trim()){invalid(name,x.name);return;}
        var d=normalize(phone.value);
        if(d.length!==10){if(error){error.hidden=false;error.textContent=x.phone;}phone.closest('.field').classList.add('field--invalid');invalid(phone,x.phone);return;}
        if(policy&&!policy.checked){invalid(policy,x.consent);return;}
        var fields=[[C.t('fName',lang),name.value.trim()],[C.t('fPhone',lang),format(d)],['Проблема',val(form,'#f-problem')],['Поверхность',val(form,'#f-surface')],['Система',val(form,'#f-system')],['Тип помещения',val(form,'#f-room')],['Площадь',val(form,'#f-area')],['Согласие на обработку','Да'],['Согласие на рассылку',form.querySelector('#f-ads').checked?'Да':'Нет'],['Страница',global.location.href]];
        if(global.SILENCE_ANALYTICS&&global.SILENCE_ANALYTICS.leadFields)fields=fields.concat(global.SILENCE_ANALYTICS.leadFields());
        var wa=((global.SITE||{}).contacts||{}).whatsapp;
        if(wa){var u=new URL(wa,document.baseURI);u.searchParams.set('text',fields.filter(function(f){return f[1];}).map(function(f){return f[0]+': '+f[1];}).join('\n'));fallback.href=u.href;fallback.textContent=x.wa;}
        form._submitting=true;btn.disabled=true;status.textContent=x.busy;form.setAttribute('aria-busy','true');
        var timeoutId;
        var request=new Promise(function(resolve,reject){
          timeoutId=global.setTimeout(function(){reject(new Error('Request timeout'));},15000);
          try{if(typeof global.SILENCE_SEND!=='function')throw new Error('Sender not configured');Promise.resolve(global.SILENCE_SEND(C.t('formTitle',lang),fields)).then(resolve,reject);}catch(err){reject(err);}
        });
        request.then(function(){status.textContent=C.t('fOk',lang);status.setAttribute('data-ok','');form.reset();if(global.SILENCE_TRACK)global.SILENCE_TRACK('lead_submit_success');},function(){status.textContent=x.failed;status.setAttribute('data-err','');if(wa)fallback.hidden=false;if(global.SILENCE_TRACK)global.SILENCE_TRACK('lead_submit_error');}).then(function(){global.clearTimeout(timeoutId);btn.disabled=false;form._submitting=false;form.removeAttribute('aria-busy');});
      });
    });
  }
  global.SILENCE_FORM_INIT=init;
  document.addEventListener('DOMContentLoaded',function(){global.setTimeout(init,0);});
  document.addEventListener('silence:lang',function(){global.setTimeout(init,0);});
}(window));
