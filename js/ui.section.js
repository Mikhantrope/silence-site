/* SILENCE v29: selected-room callout and local room shading.
   Four independent masks never cover the central apartment.
   Selecting a room does not scroll; the callout action is the only scroll trigger. */
(function (g) {
 'use strict';
 var zones = [
  {id:'top',n:'1',x:0,y:0,w:100,h:30},
  {id:'left',n:'2',x:0,y:30,w:29,h:38},
  {id:'right',n:'3',x:71,y:30,w:29,h:38},
  {id:'bottom',n:'4',x:0,y:68,w:100,h:32}
 ];
 function render(node) {
  var C=g.SILENCE_CORE,D=g.SILENCE_V27,U=g.SILENCE_V27_UI,lang=C.getLang();
  function t(k){return U.t(k);}
  function tr(r,k,e){return lang==='kz'?k:lang==='en'?e:r;}
  var overlay=node.querySelector('[data-cutaway-overlay]');
  var host=node.querySelector('[data-cutaway-content]');
  var choices=node.querySelector('[data-room-choices]');
  if(!overlay||!host||!choices)return;
  if(node._room29Cleanup)node._room29Cleanup();
  overlay.innerHTML='';host.innerHTML='';choices.innerHTML='';
  node.dataset.roomUiVersion='29';
  var entries=[
   {id:'top',short:tr('Сверху','Жоғарыдан','Above'),title:tr('Сверлят и стучат сверху','Жоғарыдан бұрғылау мен соққы','Drilling and impacts above'),desc:tr('Для потолка рассматриваем систему с виброразвязкой. При ударах и ремонте сначала проверяем, как звук передаётся через перекрытие и примыкания.','Төбе үшін дірілді ажырататын жүйе қарастырылады. Алдымен дыбыстың жабын мен түйіспелер арқылы таралуын тексереміз.','Consider an isolated ceiling assembly. First assess how impacts and drilling travel through the slab and adjoining junctions.'),place:'ceiling',systems:['c-apex','c-comfort','c-premium']},
   {id:'left',short:tr('Слева','Сол жақтан','Left'),title:tr('Разговоры и бытовой шум за стеной','Қабырға артындағы әңгіме мен тұрмыстық шу','Speech and household noise behind the wall'),desc:tr('Дополнительная облицовка существующей стены. Конструкцию выбирают с учётом основания, розеток, щелей и примыканий.','Бар қабырғаның қосымша қаптамасы. Негіз, розеткалар, саңылаулар мен түйіспелер ескеріледі.','Additional lining for an existing wall. Selection depends on the base, sockets, gaps and junctions.'),place:'wall',systems:['wf-standart','w-comfort','w-premium']},
   {id:'right',short:tr('Справа','Оң жақтан','Right'),title:tr('Музыка через стену справа','Оң жақ қабырға арқылы музыка','Music through the right wall'),desc:tr('Для музыки и баса особенно важны исходная стена и обходные пути передачи. Ниже — варианты стеновых конструкций для обсуждения со специалистом.','Музыка мен бас үшін қабырға мен жанама берілу жолдары маңызды. Төменде маманмен талқылауға арналған қабырға жүйелері.','For music and bass, the existing wall and flanking paths matter. These wall assemblies are starting points for a specialist assessment.'),place:'wall',systems:['w-comfort','w-premium','w-business']},
   {id:'bottom',short:tr('Снизу','Төменнен','Below'),title:tr('Басы и разговоры снизу','Төменнен бас пен әңгіме','Bass and speech from below'),desc:tr('Звук может идти через перекрытие, стены и примыкания. Напольную систему против вашего топота нельзя автоматически назначать для шума, приходящего снизу.','Дыбыс жабын, қабырға және түйіспелер арқылы келуі мүмкін. Өз қадамыңызға арналған еден жүйесін төменнен келетін шуға автоматты түрде ұсынуға болмайды.','Sound may travel through the floor slab, walls and junctions. A floor system for your own footsteps is not automatically a solution for incoming noise from below.'),diagnostic:true},
   {id:'impact-down',short:tr('Мой топот слышат снизу','Қадамымды төменнен естиді','My footsteps disturb downstairs'),title:tr('Системы звукоизоляции пола','Еденді дыбыстан оқшаулау жүйелері','Floor sound-insulating assemblies'),desc:tr('Задача — снизить передачу ударного шума от вашего пола вниз. Выбор зависит от основания, покрытия и допустимой высоты конструкции.','Мақсат — еденнен төменге берілетін соққы шуды азайту. Таңдау негізге, жабынға және рұқсат етілген биіктікке байланысты.','Reduce impact-noise transmission from your floor downwards. Selection depends on the base, finish and available build-up height.'),place:'floor',systems:['f-antistomp','f-sfgb','f-sf']},
   {id:'echo',short:tr('Эхо в комнате','Бөлмедегі жаңғырық','Echo in the room'),title:tr('Акустика внутри помещения','Бөлме ішіндегі акустика','Room acoustics'),desc:tr('Для работы с отражениями и эхом нужны интерьерные звукопоглощающие панели. Это отдельная задача, не замена звукоизоляции от соседей.','Шағылу мен жаңғырық үшін интерьерлік дыбыс жұтқыш панельдер қажет. Бұл көршілерден дыбыс оқшаулауды алмастырмайтын бөлек міндет.','Interior sound-absorbing panels address reflections and reverberation. This is a separate task, not a substitute for insulation from neighbours.'),echo:true}
  ];

  var shortCopy={
   top:{title:tr('Сверлят и стучат сверху','Жоғарыдан бұрғылау мен соққы','Drilling and impacts above'),note:tr('Варианты потолочных конструкций.','Төбе конструкцияларының нұсқалары.','Explore ceiling assemblies.')},
   left:{title:tr('Разговоры за стеной слева','Сол жақ қабырға артындағы әңгіме','Speech through the left wall'),note:tr('Варианты дополнительной облицовки.','Қосымша қаптама нұсқалары.','Explore additional wall linings.')},
   right:{title:tr('Музыка через стену справа','Оң жақ қабырға арқылы музыка','Music through the right wall'),note:tr('Посмотрите варианты стеновых систем.','Қабырға жүйелерін қараңыз.','Explore wall assemblies.')},
   bottom:{title:tr('Басы и разговоры снизу','Төменнен бас пен әңгіме','Bass and speech from below'),note:tr('Сначала определим путь передачи шума.','Алдымен шудың берілу жолын анықтаймыз.','First identify the transmission path.')}
  };
  var hits=[],buttons=[],cleanups=[],positionFrame=0,focusTimer=0;
  var figure=overlay.parentElement,lastTrigger=null;
  var motion=g.matchMedia('(prefers-reduced-motion: reduce)');
  function on(target,event,handler,options){target.addEventListener(event,handler,options);cleanups.push(function(){target.removeEventListener(event,handler,options);});}
  function clamp(n,a,b){return Math.max(a,Math.min(b,n));}
  function area(a,b){return Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y));}
  function safeFocus(el){if(el&&el.isConnected)el.focus({preventScroll:true});}

  /* A persistent disclosure with an action, not a hover-only ARIA tooltip.
     It is a sibling of the room buttons, never an interactive child of one. */
  var title=C.el('h3',{id:'room29-caption-title',class:'room29-caption__title'});
  var note=C.el('p',{id:'room29-caption-note',class:'room29-caption__note'});
  var close=C.el('button',{type:'button',class:'room29-caption__close','aria-label':tr('Скрыть подсказку','Кеңесті жабу','Dismiss room details')},[C.el('span',{'aria-hidden':'true'},['×'])]);
  var more=C.el('button',{type:'button',class:'room29-caption__more','aria-controls':'room27-result'},[
   C.el('span',{},[tr('Показать решения','Шешімдерді көрсету','Show solutions')]),C.el('span',{'aria-hidden':'true'},['↓'])
  ]);
  var caption=C.el('aside',{id:'room29-caption',class:'room29-caption',hidden:'',role:'region','aria-labelledby':'room29-caption-title'},[
   C.el('div',{class:'room29-caption__heading'},[title,close]),note,more
  ]);
  var live=C.el('span',{class:'room29-sr-only','aria-live':'polite','aria-atomic':'true'});
  var ns='http://www.w3.org/2000/svg';
  var leader=document.createElementNS(ns,'svg');
  leader.setAttribute('class','room29-leader');leader.setAttribute('aria-hidden','true');
  var leaderLine=document.createElementNS(ns,'path');leader.appendChild(leaderLine);
  overlay.appendChild(leader);overlay.appendChild(caption);overlay.appendChild(live);

  function captionState(){
   hits.forEach(function(b){b.setAttribute('aria-expanded',String(!caption.hidden&&b.dataset.room===node._selectedProblem));});
  }
  function hideCaption(returnFocus){
   var focused=caption.contains(document.activeElement);
   caption.hidden=true;leader.style.display='none';node._room29CaptionOpen=false;captionState();
   if(returnFocus||focused)safeFocus(lastTrigger);
  }

  /* Choose a nearby position inside the photo AND visible part of the viewport.
     Other numbered markers are treated as protected hit targets.
     The natural image size and hit-map rectangles are never changed. */
  function positionCaption(){
   positionFrame=0;if(caption.hidden)return;
   var active=hits.find(function(b){return b.dataset.room===node._selectedProblem;});
   if(!active)return;
   var box=overlay.getBoundingClientRect(),pin=active.querySelector('.room27-pin').getBoundingClientRect();
   if(box.width<1||box.height<1)return;
   caption.classList.toggle('room29-caption--compact',box.width<420);
   caption.classList.toggle('room29-caption--narrow',box.width<310);
   var w=caption.offsetWidth,h=caption.offsetHeight,pad=8,gap=box.width<400?6:10;
   var anchor={x:pin.left-box.left,y:pin.top-box.top,w:pin.width,h:pin.height};
   var cx=anchor.x+anchor.w/2,cy=anchor.y+anchor.h/2;
   var header=document.querySelector('.header27'),headerBottom=header?header.getBoundingClientRect().bottom:0;
   var vv=g.visualViewport,vtop=vv?vv.offsetTop:0,vbottom=vtop+(vv?vv.height:g.innerHeight);
   var ymin=pad,ymax=Math.max(pad,box.height-h-pad);
   // Keep the callout visible when a room is selected near a sticky header.
   var vymin=Math.max(pad,headerBottom-box.top+pad,vtop-box.top+pad);
   var vymax=Math.min(ymax,vbottom-box.top-h-pad);
   if(vymax>=vymin){ymin=vymin;ymax=vymax;}
   var xmax=Math.max(pad,box.width-w-pad);
   var guard=box.width<400?3:7;
   var targets=hits.map(function(b){var r=b.querySelector('.room27-pin').getBoundingClientRect();return {x:r.left-box.left-guard,y:r.top-box.top-guard,w:r.width+2*guard,h:r.height+2*guard};});
   var center={x:box.width*.29,y:box.height*.30,w:box.width*.42,h:box.height*.38};
   var candidates=[
    {x:anchor.x+anchor.w+gap,y:cy-h/2},
    {x:anchor.x-w-gap,y:cy-h/2},
    {x:cx-w/2,y:anchor.y+anchor.h+gap},
    {x:cx-w/2,y:anchor.y-h-gap},
    {x:pad,y:pad},{x:xmax,y:pad},
    {x:pad,y:box.height*.30-h-pad},{x:xmax,y:box.height*.30-h-pad},
    {x:pad,y:box.height*.68+pad},{x:xmax,y:box.height*.68+pad},
    {x:pad,y:box.height-h-pad},{x:xmax,y:box.height-h-pad},
    {x:cx-w/2,y:ymin},{x:cx-w/2,y:ymax}
   ];
   var best=null;
   candidates.forEach(function(c){
    var r={x:clamp(c.x,pad,xmax),y:clamp(c.y,ymin,ymax),w:w,h:h};
    var dx=Math.max(r.x-cx,0,cx-(r.x+w)),dy=Math.max(r.y-cy,0,cy-(r.y+h));
    var covered=targets.reduce(function(sum,t){return sum+area(r,t);},0);
    // Avoid markers first, then keep the central apartment clear where possible.
    var score=covered*10000+area(r,center)*.9+(dx*dx+dy*dy)*.15;
    if(!best||score<best.score)best={x:r.x,y:r.y,score:score};
   });
   caption.style.left=Math.round(best.x)+'px';caption.style.top=Math.round(best.y)+'px';
   // A fine leader associates an above/below placement with the selected room.
   var ex=clamp(cx,best.x,best.x+w),ey=clamp(cy,best.y,best.y+h);
   var lx=ex-cx,ly=ey-cy,length=Math.hypot(lx,ly),radius=anchor.w/2+4;
   if(length>radius+6){
    leader.style.display='block';leader.setAttribute('viewBox','0 0 '+box.width+' '+box.height);
    var sx=cx+lx/length*radius,sy=cy+ly/length*radius;
    leaderLine.setAttribute('d','M '+sx+' '+sy+' L '+ex+' '+ey);
   }else leader.style.display='none';
  }
  function queuePosition(){if(!caption.hidden&&!positionFrame)positionFrame=g.requestAnimationFrame(positionCaption);}
  function showCaption(id,trigger){
   var text=shortCopy[id];if(!text){hideCaption(false);return;}
   title.textContent=text.title;note.textContent=text.note;caption.dataset.room=id;
   lastTrigger=trigger||hits.find(function(b){return b.dataset.room===id;});
   caption.hidden=false;node._room29CaptionOpen=true;
   captionState();positionCaption();
   live.textContent=text.title+'. '+tr('Кнопка «Показать решения» откроет описание ниже.','«Шешімдерді көрсету» түймесі төмендегі сипаттаманы ашады.','Use Show solutions to move to the detailed description.');
  }

  function select(id,user,trigger){
   var e=entries.find(function(x){return x.id===id;});if(!e)return;
   g.clearTimeout(focusTimer);
   node._selectedProblem=id;node.dataset.activeRoom=id;
   g.SILENCE_CONSULTATION_CONTEXT={problem:id,label:e.title};
   document.dispatchEvent(new CustomEvent('silence:problem',{detail:g.SILENCE_CONSULTATION_CONTEXT}));
   var isMap=zones.some(function(z){return z.id===id;});
   buttons.concat(hits).forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.room===id));});
   hits.forEach(function(b){b.classList.toggle('room29-hotspot--dimmed',isMap&&b.dataset.room!==id);});
   host.innerHTML='';host.className='room27-result';
   var q='contacts.html?problem='+encodeURIComponent(id)+(e.place?'&surface='+e.place:'');
   var heading=C.el('h2',{id:'room29-result-title',tabindex:'-1'},[e.title]);
   host.setAttribute('aria-labelledby','room29-result-title');
   var copy=C.el('div',{class:'room27-result__copy'},[
    C.el('p',{class:'eyebrow'},[t('selection')]),heading,C.el('p',{},[e.desc]),
    C.el('a',{class:'btn btn--primary',href:q,'data-analytics':'consultation_scenario','data-analytics-value':id},[t('cta')])
   ]);
   host.appendChild(copy);
   var rec=C.el('div',{class:'room27-recommendations'});
   if(e.systems){
    rec.appendChild(C.el('p',{class:'eyebrow'},[t('options')]));
    e.systems.forEach(function(sid){
     var s=g.CATALOG.systems.find(function(x){return x.id===sid;});if(!s)return;
     var b=C.el('button',{type:'button',class:'room27-system','data-system':s.id},[
      C.el('span',{},[s.name]),C.el('span',{class:'room27-system__rating'},[
       s.ix+' '+s.from+(s.to!==s.from?'–'+s.to:'')+' '+tr('дБ','дБ','dB'),C.el('span',{'aria-hidden':'true'},[' ↗'])
      ])
     ]);
     b.addEventListener('click',function(){C.openCardOverlay(C.renderCardBody(s,lang));});rec.appendChild(b);
    });
    rec.appendChild(C.el('p',{class:'source27-note'},[t('notGuarantee')]));
   }else if(e.echo){
    ['acousticwood','reverboard','acousticloft'].forEach(function(parent){
     var p=D.products.find(function(x){return x.parent===parent;});
     var b=C.el('button',{type:'button',class:'room27-system'},[C.el('span',{},[parent==='acousticwood'?'AcousticWood':parent==='reverboard'?'ReverBoard':'AcousticLoft']),C.el('span',{'aria-hidden':'true'},['↗'])]);
     b.addEventListener('click',function(){U.openProduct(p);});rec.appendChild(b);
    });
   }else{
    rec.appendChild(C.el('div',{class:'diagnostic27'},[
     C.el('span',{class:'diagnostic27-symbol','aria-hidden':'true'},['↗']),C.el('h3',{},[tr('Сначала — диагностика','Алдымен — диагностика','Assessment first')]),
     C.el('p',{},[tr('Опишите шум и конструкцию помещения. По одному направлению звука нельзя выбрать готовую систему.','Шуды және бөлме конструкциясын сипаттаңыз. Бір бағыт бойынша дайын жүйені таңдау мүмкін емес.','Describe the noise and construction. The direction alone is not enough to prescribe an assembly.')])
    ]));
   }
   host.appendChild(rec);
   // The row below the photo already has its answer nearby; never scroll on selection.
   if(isMap&&(trigger&&trigger.classList.contains('room27-hotspot')||node._room29CaptionOpen))showCaption(id,trigger);
   else hideCaption(false);
   if(user&&g.SILENCE_TRACK)g.SILENCE_TRACK('room_selection',{value:id});
  }

  zones.forEach(function(z){
   var e=entries.find(function(x){return x.id===z.id;});
   var b=C.el('button',{type:'button',class:'room27-hotspot room27-hotspot--'+z.id,'data-room':z.id,'aria-label':e.title,'aria-pressed':'false','aria-expanded':'false','aria-controls':'room29-caption room27-result'},[C.el('span',{class:'room27-pin','aria-hidden':'true'},[z.n])]);
   b.style.left=z.x+'%';b.style.top=z.y+'%';b.style.width=z.w+'%';b.style.height=z.h+'%';
   var start=null,suppressUntil=0;
   on(b,'pointerdown',function(ev){start={x:ev.clientX,y:ev.clientY};},{passive:true});
   on(b,'pointermove',function(ev){if(start&&(Math.abs(ev.clientX-start.x)>9||Math.abs(ev.clientY-start.y)>9))suppressUntil=Date.now()+600;},{passive:true});
   on(b,'pointercancel',function(){start=null;suppressUntil=Date.now()+600;},{passive:true});
   on(b,'pointerup',function(){start=null;},{passive:true});
   on(b,'click',function(ev){if(ev.detail!==0&&Date.now()<suppressUntil)return;select(z.id,true,b);});
   // Tab from the selected marker enters its action without hiding other markers.
   on(b,'keydown',function(ev){if(ev.key==='Tab'&&!ev.shiftKey&&!caption.hidden&&node._selectedProblem===z.id){ev.preventDefault();safeFocus(more);}});
   overlay.appendChild(b);hits.push(b);
  });
  entries.forEach(function(e,i){
   var b=C.el('button',{type:'button',class:'room27-choice','data-room':e.id,'aria-pressed':'false','aria-controls':'room27-result'},[i<4?C.el('span',{class:'room27-choice__num','aria-hidden':'true'},[String(i+1)]):null,e.short]);
   on(b,'click',function(){select(e.id,true,b);});choices.appendChild(b);buttons.push(b);
  });
  // Put disclosure controls after the room controls in the reading order.
  overlay.appendChild(leader);overlay.appendChild(caption);overlay.appendChild(live);
  on(close,'click',function(){hideCaption(true);});
  on(node,'keydown',function(ev){
   if(ev.key==='Escape'&&!caption.hidden){ev.preventDefault();ev.stopPropagation();hideCaption(caption.contains(document.activeElement));}
  });
  on(more,'keydown',function(ev){if(ev.key==='Tab'&&ev.shiftKey){ev.preventDefault();safeFocus(lastTrigger);}});
  on(more,'click',function(){
   var heading=host.querySelector('h2');if(!heading)return;
   hideCaption(false);
   var header=document.querySelector('.header27'),offset=(header?header.getBoundingClientRect().height:0)+16;
   // window.scrollTo avoids adding HTML scroll-padding and scroll-margin twice.
   var target=Math.max(0,g.scrollY+host.getBoundingClientRect().top-offset);
   if(motion.matches){
    var previous=document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior='auto';g.scrollTo({top:target,behavior:'instant'});
    document.documentElement.style.scrollBehavior=previous;safeFocus(heading);
   }else{
    g.scrollTo({top:target,behavior:'smooth'});
    focusTimer=g.setTimeout(function(){safeFocus(heading);},500);
   }
   if(g.SILENCE_TRACK)g.SILENCE_TRACK('room_show_solutions',{value:node._selectedProblem});
  });
  on(g,'resize',queuePosition,{passive:true});on(g,'scroll',queuePosition,{passive:true});
  if(g.visualViewport){on(g.visualViewport,'resize',queuePosition,{passive:true});on(g.visualViewport,'scroll',queuePosition,{passive:true});}
  var ro=null;if(g.ResizeObserver){ro=new ResizeObserver(queuePosition);ro.observe(figure);ro.observe(caption);}
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(caption.isConnected)queuePosition();});
  node._room29Cleanup=function(){cleanups.forEach(function(f){f();});if(ro)ro.disconnect();g.cancelAnimationFrame(positionFrame);g.clearTimeout(focusTimer);};
  if(node._selectedProblem)select(node._selectedProblem,false);
  else{
   host.className='room27-result room27-result--empty';host.removeAttribute('aria-labelledby');
   host.appendChild(C.el('div',{},[C.el('p',{class:'eyebrow'},[t('selection')]),C.el('h2',{},[t('resultTitle')]),C.el('p',{},[t('resultIntro')])]));
  }
 }
 g.SILENCE_PAGES=g.SILENCE_PAGES||{};g.SILENCE_PAGES['section-cutaway']=render;g.SILENCE_SECTION={ZONES:zones};
}(window));
