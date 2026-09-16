/* v27: honest static-site consultation handoff; no silent submission. */
(function(g){'use strict';
 function render(node){var C=g.SILENCE_CORE,U=g.SILENCE_V27_UI,D=g.SILENCE_V27,lang=C.getLang(),standalone=node.dataset.mount==='contacts',saved={};
 function tr(r,k,e){return lang==='kz'?k:lang==='en'?e:r;}
 node.querySelectorAll('input').forEach(function(f){saved[f.name]={value:f.value,checked:f.checked};});node.innerHTML='';
 var p=new URLSearchParams(location.search),context=p.get('project')||p.get('room')||'';var id=p.get('system'),item=D.products.find(function(i){return i.id===id;})||C.findItem(id||'');if(item)context=item.title||item.name;
 if(p.get('topic')==='protocol')context=tr('Протокол испытаний','Сынақ хаттамасы','Test report');
 var labels={top:tr('Шум сверху','Жоғарыдан шу','Noise above'),left:tr('Шум за стеной','Қабырға артындағы шу','Noise behind the wall'),right:tr('Музыка через стену','Қабырға арқылы музыка','Music through the wall'),bottom:tr('Шум снизу','Төменнен шу','Noise below'),below:tr('Шум снизу','Төменнен шу','Noise below'),'impact-down':tr('Ударный шум от моего пола','Менің еденімнен соққы шу','Impact noise from my floor'),echo:tr('Эхо в помещении','Бөлмедегі жаңғырық','Room reverberation'),talk:tr('Разговоры','Әңгіме','Speech'),music:tr('Музыка','Музыка','Music'),repair:tr('Ремонт','Жөндеу','Renovation')};
 if(!context&&p.get('problem'))context=labels[p.get('problem')]||p.get('problem');if(!standalone&&g.SILENCE_CONSULTATION_CONTEXT)context=g.SILENCE_CONSULTATION_CONTEXT.label;
 var wrap=C.el('div',{class:'container consultation27'}),copy=C.el('div',{class:'consultation27-copy'},[C.el('p',{class:'eyebrow'},[tr('Обсудим вашу задачу','Міндетіңізді талқылайық','Let’s discuss your task')]),C.el(standalone?'h1':'h2',{},[U.t('cta')]),C.el('p',{class:'lead'},[U.t('formLead')]),C.el('a',{class:'contact27-phone',href:g.SITE.contacts.phoneHref,'data-analytics':'phone_click_consultation'},[g.SITE.contacts.phone]),C.el('p',{class:'caption'},[C.t('headerAddress',lang)])]);
 var form=C.el('form',{class:'consultation27-form','data-lead-form':'',novalidate:'','data-wa-form':''}),nameid='consult-name',phoneid='consult-phone';
 function field(label,id,name,type,placeholder){return C.el('div',{class:'field'},[C.el('label',{for:id},[label]),C.el('input',{id:id,name:name,type:type,required:'',autocomplete:name==='name'?'name':'tel',inputmode:name==='phone'?'tel':'text',maxlength:name==='name'?'100':'30',placeholder:placeholder})]);}
 form.appendChild(field(tr('Имя','Аты','Name'),nameid,'name','text',tr('Как к вам обращаться','Атыңыз','Your name')));form.appendChild(field(tr('Телефон','Телефон','Phone'),phoneid,'phone','tel','+7 700 000 00 00'));
 var ctx=C.el('p',{class:'consultation27-context','data-form-context':''},context?[U.t('formContext')+': '+context]:[]);ctx.hidden=!context;form._context=context;form.appendChild(ctx);
 form.appendChild(C.el('label',{class:'consent27'},[C.el('input',{type:'checkbox',name:'consent',required:''}),C.el('span',{},[U.t('formConsent')])]));
 form.appendChild(C.el('button',{type:'submit',class:'btn btn--primary'},[U.t('waSubmit')]));form.appendChild(C.el('p',{class:'source27-note'},[U.t('waNote')]));form.appendChild(C.el('p',{class:'form27-status',role:'status','aria-live':'polite','data-form-status':'',id:'consult-status'}));
 form.appendChild(C.el('details',{class:'privacy27'},[C.el('summary',{},[U.t('dataNote')]),C.el('p',{},[U.t('dataText')])]));
 Object.keys(saved).forEach(function(k){var f=form.elements.namedItem(k);if(f){f.value=saved[k].value;f.checked=saved[k].checked;}});
 wrap.appendChild(copy);wrap.appendChild(form);node.appendChild(wrap);g.SILENCE_WIRE_CONSULTATION(form);
 if(node._contextHandler)document.removeEventListener('silence:problem',node._contextHandler);node._contextHandler=function(e){if(standalone)return;form._context=e.detail.label;ctx.textContent=U.t('formContext')+': '+e.detail.label;ctx.hidden=false;};document.addEventListener('silence:problem',node._contextHandler);
 }
 g.SILENCE_PAGES=g.SILENCE_PAGES||{};g.SILENCE_PAGES.contacts=render;g.SILENCE_PAGES.consultation27=render;
}(window));
