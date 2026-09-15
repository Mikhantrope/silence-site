(function (global) {
  'use strict';
  function normalizePhone(raw){var d=String(raw||'').replace(/\D/g,'');if(d.length===11&&(d[0]==='7'||d[0]==='8'))d=d.slice(1);return d.slice(0,10);}
  function formatPhone(d){return [d.slice(0,3),d.slice(3,6),d.slice(6,8),d.slice(8,10)].filter(Boolean).join(' ');}
  function attachPhoneMask(input){input.addEventListener('input',function(){input.value=formatPhone(normalizePhone(input.value));});input.addEventListener('paste',function(e){var p=(e.clipboardData||global.clipboardData).getData('text');if(!p)return;e.preventDefault();input.value=formatPhone(normalizePhone(p));});}
  function valueOf(form,id){var el=form.querySelector(id);return el?el.value:'';}
  function utmFields(){if(global.SILENCE_ANALYTICS&&typeof global.SILENCE_ANALYTICS.leadFields==='function')return global.SILENCE_ANALYTICS.leadFields();var out=[];try{var stored=JSON.parse(localStorage.getItem('silence_attribution')||'{}');['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){if(stored[k])out.push([k,stored[k]]);});}catch(e){}return out;}
  function wireForm(form){var C=global.SILENCE_CORE,lang=C.getLang(),t=function(k){return C.t(k,lang);};var phone=form.querySelector('#f-phone'),err=form.querySelector('[data-phone-error]'),status=form.querySelector('[data-form-status]'),hp=form.querySelector('#f-company');if(phone)attachPhoneMask(phone);
    form.addEventListener('submit',function(e){e.preventDefault();status.removeAttribute('data-ok');status.removeAttribute('data-err');status.textContent='';
      if(hp&&hp.value){if(global.SILENCE_TRACK)global.SILENCE_TRACK('lead_submit_blocked',{reason:'honeypot'});return;}
      var policy=form.querySelector('#f-policy'); if(policy && !policy.checked){status.textContent=lang==='kz'?'Жеке деректерді өңдеуге келісім беріңіз.':(lang==='en'?'Please confirm consent to personal data processing.':'Подтвердите согласие на обработку персональных данных.');status.setAttribute('data-err','');return;}
      var digits=normalizePhone(phone?phone.value:'');if(digits.length!==10){if(err)err.hidden=false;if(phone&&phone.closest('.field'))phone.closest('.field').classList.add('field--invalid');return;}if(err)err.hidden=true;if(phone&&phone.closest('.field'))phone.closest('.field').classList.remove('field--invalid');
      var name=form.querySelector('#f-name'),ads=form.querySelector('#f-ads');
      var fields=[
        [t('fName'),name?name.value:''],
        [t('fPhone'),'+7 '+formatPhone(digits)],
        ['Проблема',valueOf(form,'#f-problem')],
        ['Поверхность',valueOf(form,'#f-surface')],
        ['Система',valueOf(form,'#f-system')],
        ['Тип помещения',valueOf(form,'#f-room')],
        ['Площадь',valueOf(form,'#f-area')],
        ['Согласие на обработку',policy&&policy.checked?'Да':'Нет'],
        ['Согласие на рассылку',ads&&ads.checked?'Да':'Нет'],
        ['Страница',global.location.href]
      ].concat(utmFields());
      var btn=form.querySelector('button[type="submit"]');if(btn)btn.disabled=true;
      global.SILENCE_SEND(t('formTitle'),fields).then(function(){status.textContent=t('fOk');status.setAttribute('data-ok','');form.reset();if(global.SILENCE_TRACK)global.SILENCE_TRACK('lead_submit_success');}).catch(function(){status.textContent=t('fErr');status.setAttribute('data-err','');if(global.SILENCE_TRACK)global.SILENCE_TRACK('lead_submit_error');}).then(function(){if(btn)btn.disabled=false;});
    });
  }
  function init(){var f=document.querySelector('[data-lead-form]');if(f&&!f._wired){f._wired=true;wireForm(f);}}
  document.addEventListener('DOMContentLoaded',function(){setTimeout(init,0);});
}(window));
