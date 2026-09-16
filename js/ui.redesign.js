/* SILENCE v27: source-based product cards, finite carousel and shared sections. */
(function(g){
 'use strict';
 var D=g.SILENCE_V27,C=g.SILENCE_CORE;g.SILENCE_PAGES=g.SILENCE_PAGES||{};
 function txt(o){return typeof o==='string'?o:(o[C.getLang()]||o.ru||'');}
 function t(k){return txt(D.copy[k]);}
 function el(tag,attrs,kids){return C.el(tag,attrs,kids);}
 function tr(ru,kz,en){return C.getLang()==='kz'?kz:C.getLang()==='en'?en:ru;}
 function track(name,value){if(g.SILENCE_TRACK)g.SILENCE_TRACK(name,{value:value});}
 function heading(number,title,lead,link){
  var box=el('div',{class:'section27-heading'},[el('div',{class:'section27-title'},[el('span',{class:'section27-number','aria-hidden':'true'},[number]),el('h2',{},[title])]),lead?el('p',{class:'section27-lead'},[lead]):null]);
  if(link)box.appendChild(link); return box;
 }
 function sourceButton(page){var b=el('button',{type:'button',class:'text-link', 'data-source-page':String(page)},[t('sourceSheet')+' · '+page]); b.addEventListener('click',function(){C.openAlbumViewer(page);});return b;}
 function openProduct(p){C.openCardOverlay(productDetail(p));track('material_details',p.id);}
 function productDetail(p){
  var box=el('div',{class:'product27-detail'}),pic=el('button',{type:'button',class:'product27-detail__visual','aria-label':tr('Увеличить изображение','Суретті үлкейту','Enlarge image')},[el('img',{src:p.img,alt:p.title,decoding:'async'})]);
  if(p.back)pic.appendChild(el('img',{src:p.back,alt:tr('Оборотная сторона','Артқы жағы','Reverse side')}));
  pic.addEventListener('click',function(){C.openGalleryViewer([p.img].concat(p.back?[p.back]:[]),0,[p.title,tr('Оборотная сторона','Артқы жағы','Reverse side')]);});
  box.appendChild(el('p',{class:'eyebrow'},[t(p.family)]));box.appendChild(el('h2',{},[p.title]));box.appendChild(pic);box.appendChild(el('p',{class:'lead'},[txt(p.desc)]));
  var facts=el('dl',{class:'product27-detail__facts'});
  p.stats.forEach(function(s){facts.appendChild(el('div',{},[el('dt',{},[s[1]==='мм'?tr('Толщина изделия','Бұйым қалыңдығы','Product thickness'):tr('Масса изделия','Бұйым массасы','Product weight')]),el('dd',{},[s[0]+' '+(C.getLang()==='en'?s[2]:s[1])])]));});box.appendChild(facts);
  if(p.id==='soundfiber')box.appendChild(el('p',{class:'technical-note'},[tr('В журнале значения плотности в описании и на плашке различаются. Плотность нужной модификации уточняйте у специалиста.','Журналдағы сипаттама мен плашкадағы тығыздық мәндері әртүрлі. Қажетті нұсқаны маманнан нақтылаңыз.','The journal lists different density values in the description and specification strip. Confirm the required variant with a specialist.')]));
  box.appendChild(el('p',{class:'technical-note'},[t('paramsNote')]));box.appendChild(sourceButton(p.page));
  box.appendChild(el('a',{class:'btn btn--primary',href:'contacts.html?system='+encodeURIComponent(p.id),'data-analytics':'consultation_product','data-analytics-value':p.id},[t('cta')]));return box;
 }
 function card(p){
  var box=el('article',{class:'product27-card','data-product':p.id});
  var media=el('div',{class:'product27-visual'+(p.back?' product27-visual--pair':'')});
  var open=el('button',{type:'button',class:'product27-image-button','aria-label':t('detail')+': '+p.title},[el('img',{src:p.img,alt:p.title,loading:'lazy',decoding:'async',draggable:'false'})]);
  if(p.back)open.appendChild(el('img',{src:p.back,alt:'',loading:'lazy',decoding:'async',draggable:'false'}));
  open.addEventListener('click',function(){if(Date.now()<(box._suppressClick||0))return;openProduct(p);});media.appendChild(open);
  var body=el('div',{class:'product27-body'},[el('p',{class:'product27-category'},[t(p.family)]),el('h3',{},[p.title]),el('p',{class:'product27-description'},[txt(p.desc)])]);
  var specs=el('div',{class:'product27-specs'});p.stats.forEach(function(s){specs.appendChild(el('span',{},[s[0]+' '+(C.getLang()==='en'?s[2]:s[1])]));});body.appendChild(specs);
  var more=el('button',{type:'button',class:'text-link'},[t('detail'),el('span',{'aria-hidden':'true'},['↗'])]);more.addEventListener('click',function(){openProduct(p);});body.appendChild(more);
  box.appendChild(media);box.appendChild(body);return box;
 }
 function materialSection(node){
  if(node._cleanup)node._cleanup();node.innerHTML='';
  var group=node._group||'isolation',wrap=el('div',{class:'container materials27'});
  wrap.appendChild(heading('02',t('matTitle'),t('matLead'),el('a',{class:'text-link section27-all',href:'catalog.html'},[t('catalogLink')+' ↗'])));
  var tabs=el('div',{class:'segment27',role:'tablist','aria-label':t('matTitle')});
  var rail=el('div',{class:'material27-track',id:'material27-panel',role:'tabpanel',tabindex:'0','aria-label':t(group)});
  var nav=el('div',{class:'material27-nav'}),prev=el('button',{type:'button',class:'rail27-control','data-rail-prev':''},[t('prev')]),next=el('button',{type:'button',class:'rail27-control','data-rail-next':''},[t('next')]),counter=el('span',{class:'rail27-counter','aria-live':'polite','data-rail-count':''});
  var tabButtons=[],cards=[],items=[],resize=null,timer=null;
  function visibleIndices(){var rr=rail.getBoundingClientRect(),v=[];cards.forEach(function(c,i){var r=c.getBoundingClientRect();if(Math.min(r.right,rr.right)-Math.max(r.left,rr.left)>r.width*.48)v.push(i);});return v;}
  function update(){var max=rail.scrollWidth-rail.clientWidth;prev.disabled=rail.scrollLeft<=2;next.disabled=max<3||rail.scrollLeft>=max-2;var vis=visibleIndices();if(!vis.length)vis=[0];counter.textContent=(vis[0]+1)+(vis.length>1?'–'+(vis[vis.length-1]+1):'')+' '+t('of')+' '+items.length;}
  function move(dir){var step=cards[0]?cards[0].getBoundingClientRect().width+(parseFloat(getComputedStyle(rail).gap)||0):rail.clientWidth;rail.scrollTo({left:Math.max(0,Math.min(rail.scrollWidth-rail.clientWidth,rail.scrollLeft+dir*step)),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
  function draw(){items=D.products.filter(function(p){return p.family===group;});rail.innerHTML='';cards=items.map(function(p){var c=card(p);rail.appendChild(c);return c;});rail.scrollLeft=0;rail.setAttribute('aria-labelledby','material-tab-'+group);tabButtons.forEach(function(b){var active=b.dataset.group===group;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});g.requestAnimationFrame(update);}
  ['isolation','acoustics'].forEach(function(key){var b=el('button',{type:'button',role:'tab',id:'material-tab-'+key,'data-group':key,'aria-controls':'material27-panel',class:'segment27-button'},[t(key)]);b.addEventListener('click',function(){group=key;node._group=key;draw();track('materials_category',key);});tabs.appendChild(b);tabButtons.push(b);});
  tabs.addEventListener('keydown',function(e){if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();var i=tabButtons.indexOf(document.activeElement),n=e.key==='Home'?0:e.key==='End'?1:1-i;tabButtons[n].click();tabButtons[n].focus();});
  prev.addEventListener('click',function(){move(-1);});next.addEventListener('click',function(){move(1);});
  rail.addEventListener('scroll',function(){g.clearTimeout(timer);timer=g.setTimeout(update,60);},{passive:true});
  rail.addEventListener('keydown',function(e){if(e.target!==rail)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}if(e.key==='End'||e.key==='Home'){e.preventDefault();rail.scrollTo({left:e.key==='End'?rail.scrollWidth:0,behavior:'auto'});}});
  var pointer=null;
  rail.addEventListener('pointerdown',function(e){pointer={x:e.clientX,y:e.clientY};},{passive:true});
  rail.addEventListener('pointermove',function(e){if(pointer&&(Math.abs(e.clientX-pointer.x)>8||Math.abs(e.clientY-pointer.y)>8))cards.forEach(function(c){c._suppressClick=Date.now()+500;});},{passive:true});rail.addEventListener('pointercancel',function(){cards.forEach(function(c){c._suppressClick=Date.now()+500;});pointer=null;},{passive:true});rail.addEventListener('pointerup',function(){pointer=null;},{passive:true});
  // Invisible edge navigation remains available; the visible text controls do not depend on it.
  rail.addEventListener('click',function(e){var media=e.target.closest('.product27-visual');if(!media)return;var r=media.getBoundingClientRect(),x=e.clientX-r.left;if(e.detail&& (x<28||x>r.width-28)){e.preventDefault();e.stopPropagation();var box=media.closest('.product27-card');if(Date.now()>(box._suppressClick||0))move(x<28?-1:1);}},true);
  nav.appendChild(prev);nav.appendChild(counter);nav.appendChild(next);wrap.appendChild(tabs);wrap.appendChild(rail);wrap.appendChild(nav);node.appendChild(wrap);draw();
  if(g.ResizeObserver){resize=new ResizeObserver(update);resize.observe(rail);}node._cleanup=function(){if(resize)resize.disconnect();g.clearTimeout(timer);};
 }
 function projects(node,full){
  node.innerHTML='';var wrap=el('div',{class:'container projects27'});
  if(full){wrap.appendChild(el('h1',{},[t('projectTitle')]));wrap.appendChild(el('p',{class:'lead'},[t('projectLead')]));}
  else wrap.appendChild(heading('03',t('projectTitle'),t('projectLead'),el('a',{class:'text-link section27-all',href:'projects.html'},[t('allProjects')+' ↗'])));
  var grid=el('div',{class:'projects27-grid'}),items=full?D.projects:D.projects.slice(0,3);
  items.forEach(function(p){var btn=el('button',{type:'button',class:'project27-media','aria-label':tr('Увеличить: ','Үлкейту: ','Enlarge: ')+p.title},[el('img',{src:p.img,alt:p.title,width:p.width,height:p.height,loading:'lazy',decoding:'async'})]);btn.addEventListener('click',function(){C.openGalleryViewer([p.img],0,[p.title+' · '+p.city]);});
   grid.appendChild(el('article',{class:'project27-card'},[btn,el('div',{class:'project27-body'},[el('p',{class:'eyebrow'},[p.city]),el('h3',{},[p.title]),el('a',{class:'text-link',href:'contacts.html?project='+encodeURIComponent(p.title)},[t('projectContact')])])]));});
  wrap.appendChild(grid);wrap.appendChild(el('p',{class:'source27-note'},[t('projectNote')]));node.appendChild(wrap);
 }
 function process(node){node.innerHTML='';var wrap=el('div',{class:'container'});wrap.appendChild(heading('05',t('workTitle'),t('workLead')));var grid=el('div',{class:'steps27'});D.steps.forEach(function(s,i){grid.appendChild(el('article',{class:'step27'},[el('span',{class:'step27-index'},['0'+(i+1)]),el('h3',{},[txt(s[0])]),el('p',{},[txt(s[1])])]));});wrap.appendChild(grid);node.appendChild(wrap);}
 function company(node){node.innerHTML='';var wrap=el('div',{class:'container company27'});var copy=el('div',{class:'company27-copy'},[el('p',{class:'eyebrow'},['SILENCE']),el('h2',{},[t('companyTitle')]),el('p',{class:'lead'},[t('companyLead')]),el('p',{class:'source27-note'},[t('companySource')])]);var docs=el('div',{class:'docs27'},[el('h3',{},[t('docsTitle')])]);[[t('docMaterials'),6],[t('docSystems'),25]].forEach(function(r){var b=el('button',{type:'button',class:'document27'},[el('span',{},[r[0]]),el('span',{'aria-hidden':'true'},['↗'])]);b.addEventListener('click',function(){C.openAlbumViewer(r[1]);});docs.appendChild(b);});docs.appendChild(el('a',{class:'document27',href:'contacts.html?topic=protocol'},[el('span',{},[t('docProtocol')]),el('span',{'aria-hidden':'true'},['↗'])]));docs.appendChild(el('p',{class:'source27-note'},[t('docNote')]));wrap.appendChild(copy);wrap.appendChild(docs);node.appendChild(wrap);}
 function faq(node){node.innerHTML='';var wrap=el('div',{class:'container faq27'});wrap.appendChild(el('h2',{},[t('faqTitle')]));var list=el('div',{class:'faq27-list'});D.faq.forEach(function(q){list.appendChild(el('details',{},[el('summary',{},[txt(q[0])]),el('p',{},[txt(q[1])])]));});wrap.appendChild(list);node.appendChild(wrap);}
 // Keep complete technical detail components, but lead with factual web text, not generated poster claims.
 var original=C.renderCardBody;
 C.renderCardBody=function(item,lang){var product=D.products.find(function(p){return p.id===item.id;});if(product)return productDetail(product);var body=original(item,lang);
  if(item.layers){var image=body.querySelector('img');if(image){image.style.cursor='zoom-in';image.addEventListener('click',function(){C.openGalleryViewer([item.img],0,[item.name]);});}var source=el('p',{class:'technical-note'},[t('source')+' '+item.page+'. '+t('notGuarantee')]);var title=body.querySelector('h2');if(title)title.after(source);}
  body.querySelectorAll('.overlay-card__quote').forEach(function(a){a.textContent=t('cta');});return body;};
 function staticCopy(){document.querySelectorAll('[data-v27]').forEach(function(n){n.textContent=t(n.dataset.v27);});}
 document.addEventListener('DOMContentLoaded',staticCopy);document.addEventListener('silence:lang',staticCopy);
 g.SILENCE_V27_UI={t:t,txt:txt,card:card,openProduct:openProduct,heading:heading};
 g.SILENCE_PAGES['materials27']=materialSection;g.SILENCE_PAGES['projects-teaser']=function(n){projects(n,false);};g.SILENCE_PAGES.projects=function(n){projects(n,true);};g.SILENCE_PAGES.process=process;g.SILENCE_PAGES.company27=company;g.SILENCE_PAGES.faq=faq;
}(window));
