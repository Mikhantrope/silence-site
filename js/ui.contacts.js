/* v28: name and phone only; no consultation subject or context line. */
(function(g){'use strict';
 function render(node){var C=g.SILENCE_CORE,U=g.SILENCE_V27_UI,lang=C.getLang(),standalone=node.dataset.mount==='contacts',saved={};
 function tr(r,k,e){return lang==='kz'?k:lang==='en'?e:r;}
 node.querySelectorAll('input').forEach(function(f){saved[f.name]={value:f.value,checked:f.checked};});node.innerHTML='';
 var wrap=C.el('div',{class:'container consultation27'}),copy=C.el('div',{class:'consultation27-copy'},[C.el('p',{class:'eyebrow'},[tr('Обсудим вашу задачу','Міндетіңізді талқылайық','Let’s discuss your task')]),C.el(standalone?'h1':'h2',{},[U.t('cta')]),C.el('p',{class:'lead'},[U.t('formLead')]),C.el('a',{class:'contact27-phone',href:g.SITE.contacts.phoneHref,'data-analytics':'phone_click_consultation'},[g.SITE.contacts.phone]),C.el('p',{class:'caption'},[C.t('headerAddress',lang)])]);
 var form=C.el('form',{class:'consultation27-form','data-lead-form':'',novalidate:'','data-wa-form':''}),nameid='consult-name',phoneid='consult-phone';
 function field(label,id,name,type,placeholder){return C.el('div',{class:'field'},[C.el('label',{for:id},[label]),C.el('input',{id:id,name:name,type:type,required:'',autocomplete:name==='name'?'name':'tel',inputmode:name==='phone'?'tel':'text',maxlength:name==='name'?'100':'30',placeholder:placeholder})]);}
 form.appendChild(field(tr('Имя','Аты','Name'),nameid,'name','text',tr('Как к вам обращаться','Атыңыз','Your name')));form.appendChild(field(tr('Телефон','Телефон','Phone'),phoneid,'phone','tel','+7 700 000 00 00'));
 form.appendChild(C.el('label',{class:'consent27'},[C.el('input',{type:'checkbox',name:'consent',required:''}),C.el('span',{},[U.t('formConsent')])]));
 form.appendChild(C.el('button',{type:'submit',class:'btn btn--primary'},[U.t('waSubmit')]));form.appendChild(C.el('p',{class:'source27-note'},[U.t('waNote')]));form.appendChild(C.el('p',{class:'form27-status',role:'status','aria-live':'polite','data-form-status':'',id:'consult-status'}));
 form.appendChild(C.el('details',{class:'privacy27'},[C.el('summary',{},[U.t('dataNote')]),C.el('p',{},[U.t('dataText')])]));
 Object.keys(saved).forEach(function(k){var f=form.elements.namedItem(k);if(f){f.value=saved[k].value;f.checked=saved[k].checked;}});
 wrap.appendChild(copy);wrap.appendChild(form);node.appendChild(wrap);g.SILENCE_WIRE_CONSULTATION(form);
 // The form intentionally has no subject and does not follow the room selection.
 if(node._contextHandler){document.removeEventListener('silence:problem',node._contextHandler);node._contextHandler=null;}
 }
 g.SILENCE_PAGES=g.SILENCE_PAGES||{};g.SILENCE_PAGES.contacts=render;g.SILENCE_PAGES.consultation27=render;
}(window));
