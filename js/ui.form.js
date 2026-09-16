(function(g){'use strict';
 g.SILENCE_WIRE_CONSULTATION=function(form){if(form._wired)return;form._wired=true;var name=form.elements.namedItem('name'),phone=form.elements.namedItem('phone'),consent=form.elements.namedItem('consent'),status=form.querySelector('[data-form-status]');
 function msg(r,k,e){var l=g.SILENCE_CORE.getLang();return l==='kz'?k:l==='en'?e:r;}
 function error(field,text){status.textContent=text;status.setAttribute('data-error','');field.setAttribute('aria-invalid','true');field.setAttribute('aria-describedby','consult-status');field.focus();if(g.SILENCE_TRACK)g.SILENCE_TRACK('consultation_validation_error',{field:field.name});}
 form.addEventListener('submit',function(e){e.preventDefault();status.textContent='';status.removeAttribute('data-error');[name,phone,consent].forEach(function(f){f.removeAttribute('aria-invalid');f.removeAttribute('aria-describedby');});
 if(!name.value.trim()){error(name,msg('Укажите имя.','Атыңызды енгізіңіз.','Enter your name.'));return;}
 var d=phone.value.replace(/\D/g,'');if(d.length===11&&(d[0]==='7'||d[0]==='8'))d='7'+d.slice(1);else if(d.length===10)d='7'+d;else{error(phone,msg('Введите номер: +7 и 10 цифр.','Нөмірді енгізіңіз: +7 және 10 сан.','Enter +7 followed by 10 digits.'));return;}
 if(!consent.checked){error(consent,msg('Подтвердите передачу данных через WhatsApp.','Деректерді WhatsApp арқылы беруді растаңыз.','Confirm sharing your details through WhatsApp.'));return;}
 var text=msg('Здравствуйте. Нужна консультация специалиста SILENCE.','Сәлеметсіз бе. SILENCE маманының кеңесі қажет.','Hello. I would like to consult a SILENCE specialist.')+'\n'+msg('Имя: ','Аты: ','Name: ')+name.value.trim()+'\n'+msg('Телефон: ','Телефон: ','Phone: ')+'+'+d;
 if(form._context)text+='\n'+msg('Тема: ','Тақырып: ','Subject: ')+form._context;
 var url=new URL(g.SITE.contacts.whatsapp);url.searchParams.set('text',text);
 // Only a handoff event. No personal data in analytics and no claim that the message was sent.
 if(g.SILENCE_TRACK)g.SILENCE_TRACK('consultation_whatsapp_handoff',{source:document.body.dataset.page||'index'});
 status.textContent=msg('Переходим в WhatsApp. Отправьте подготовленное сообщение.','WhatsApp-қа өтеміз. Дайын хабарламаны жіберіңіз.','Opening WhatsApp. Send the prepared message.');g.location.assign(url.href);
 });
 };
}(window));
