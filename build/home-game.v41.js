(function(){'use strict';
var root=document.querySelector('[data-game36]');if(!root)return;
var overlay=root.querySelector('[data-game36-overlay]'),boundary=root.querySelector('[data-game36-boundary]'),canvas=root.querySelector('[data-game39-wave]');
if(!canvas)return;
var ctx=canvas.getContext('2d');
var sourceTitle=root.querySelector('[data-game36-source-title]'),sourceMeta=root.querySelector('[data-game36-source-meta]'),wallTitle=root.querySelector('[data-game36-wall-title]'),meterText=root.querySelector('[data-game36-meter-text]'),strength=root.querySelector('[data-game36-strength]'),audioBtn=root.querySelector('[data-game36-audio]'),compareBtn=root.querySelector('[data-game36-compare]');
var roomBtns=[].slice.call(root.querySelectorAll('[data-game36-room]')),wallBtns=[].slice.call(root.querySelectorAll('[data-game36-wall]')),sourcePills=[].slice.call(root.querySelectorAll('[data-game36-source-pill]'));
var sources={
 top:{id:'top',label:'Ремонт сверху',meta:'Дрель и сверление',side:'top',tone:'repair'},
 left:{id:'left',label:'Пылесос и собака слева',meta:'Пылесос работает, собака лает время от времени',side:'left',tone:'household'},
 right:{id:'right',label:'Музыка справа',meta:'Музыка и бас',side:'right',tone:'music'},
 bottom:{id:'bottom',label:'Концерт снизу',meta:'Концертная музыка у соседей',side:'bottom',tone:'cinema'}
};
var walls={
 gas:{title:'Газоблок',residual:100,status:'Шум проходит почти без изменений',sub:'Базовая стена'},
 gsp:{title:'Газоблок + ГСП',residual:76,status:'Шум становится тише',sub:'Дополнительный слой'},
 brick:{title:'Кирпичная стена',residual:60,status:'Шум заметно тише',sub:'Плотная кладка'},
 concrete:{title:'Бетонная стена',residual:46,status:'Шум сильно ослаблен',sub:'Массивная стена'},
 silence:{title:'Стена + SILENCE',residual:10,status:'90% поглощения',sub:'Система SILENCE'},
 base:{title:'Стена без SILENCE',residual:100,status:'Шум проходит в комнату',sub:'Без системы SILENCE'}
};
/* Exact source / wall / target geometry of the approved “Отражённый фронт” prototype. */
var route={
 top:{x:.48,y:.17,wall:{x:.50,y:.34},target:{x:.50,y:.53}},
 left:{x:.19,y:.50,wall:{x:.31,y:.50},target:{x:.49,y:.53}},
 right:{x:.82,y:.50,wall:{x:.70,y:.50},target:{x:.51,y:.53}},
 bottom:{x:.50,y:.80,wall:{x:.50,y:.68},target:{x:.50,y:.55}}
};
var state={source:'right',wall:'gas',compare:false,audio:false};
var dpr=1,clock=0,last=0,raf=0;
function resizeCanvas(){var r=canvas.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);var w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;ctx.setTransform(dpr,0,0,dpr,0,0);}}
function P(o,W,H){return{x:o.x*W,y:o.y*H};}
function V(a,b){var x=b.x-a.x,y=b.y-a.y,l=Math.hypot(x,y)||1;return{x:x/l,y:y/l,nx:-y/l,ny:x/l,len:l};}
function lerp(a,b,t){return a+(b-a)*t;}
function wallFraction(a,w,t){return Math.hypot(w.x-a.x,w.y-a.y)/Math.hypot(t.x-a.x,t.y-a.y);}
function pulse(src,r,alpha){ctx.beginPath();ctx.arc(src.x,src.y,r,0,Math.PI*2);ctx.strokeStyle='#8ff2d3';ctx.globalAlpha=alpha;ctx.lineWidth=2.1;ctx.stroke();ctx.globalAlpha=1;}
function glow(p,strength){var g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,64);g.addColorStop(0,'rgba(104,240,196,'+(.34*strength)+')');g.addColorStop(1,'rgba(104,240,196,0)');ctx.fillStyle=g;ctx.fillRect(p.x-72,p.y-72,144,144);}
function frontArc(center,dir,r,alpha,color,lw,spread){var tangent={x:-dir.y,y:dir.x};var p1={x:center.x+tangent.x*r*spread,y:center.y+tangent.y*r*spread};var p2={x:center.x-tangent.x*r*spread,y:center.y-tangent.y*r*spread};var ctrl={x:center.x-dir.x*r*.95,y:center.y-dir.y*r*.95};ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.quadraticCurveTo(ctrl.x,ctrl.y,p2.x,p2.y);ctx.strokeStyle=color;ctx.globalAlpha=alpha;ctx.lineWidth=lw;ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowBlur=alpha>.22?5:2;ctx.shadowColor=color;ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=1;}
function waveState(W,H){var s=route[state.source],a=P(s,W,H),wp=P(s.wall,W,H),tp=P(s.target,W,H),dir=V(a,tp),wf=wallFraction(a,wp,tp);var eff=state.compare?walls.base:walls[state.wall];return{a:a,wp:wp,tp:tp,dir:dir,wf:wf,att:Math.max(.10,eff.residual/100),silence:!state.compare&&state.wall==='silence'};}
function drawReflectedFront(W,H){var q=waveState(W,H);
 /* Five slow primary fronts travel from the noisy room all the way toward the centre. */
 for(var i=0;i<5;i++){
   var ph=(clock*.020+i/5)%1;
   var c={x:lerp(q.a.x,q.tp.x,ph),y:lerp(q.a.y,q.tp.y,ph)};
   var passed=ph>q.wf;
   var alpha=(.78*(1-ph)+.08)*(passed?q.att:1);
   frontArc(c,q.dir,20+ph*46,alpha,'#66e0bb',2.5,1.08);
 }
 /* A short reflected front goes back into the source room for ordinary walls only. */
 if(!q.silence){
   var back={x:q.wp.x-q.dir.x*115,y:q.wp.y-q.dir.y*115},rdir=V(q.wp,back);
   for(var j=0;j<2;j++){
     var rp=(clock*.016+j*.35)%1;
     var rc={x:lerp(q.wp.x,back.x,rp),y:lerp(q.wp.y,back.y,rp)};
     frontArc(rc,rdir,18+rp*28,(1-rp)*.28,'#f1bb78',1.8,1);
   }
 }
 var pp=(clock*.026)%1;pulse(q.a,10+17*pp,.34*(1-pp));
 glow(q.wp,q.silence?1:.45);
}
function animate(ts){if(!last)last=ts;var dt=Math.min(40,ts-last);last=ts;clock+=dt/16.67;resizeCanvas();var r=canvas.getBoundingClientRect(),W=r.width,H=r.height;ctx.clearRect(0,0,W,H);drawReflectedFront(W,H);raf=requestAnimationFrame(animate);}
function render(){var s=sources[state.source],chosen=walls[state.wall],eff=state.compare?walls.base:chosen,isSilence=!state.compare&&state.wall==='silence';
 roomBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36Room===s.id));});
 sourcePills.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36SourcePill===s.id));});
 overlay.classList.add('has-source');boundary.dataset.side=s.side;boundary.dataset.wall=state.compare?'base':state.wall;boundary.classList.add('is-visible');
 sourceTitle.textContent=s.label;sourceMeta.textContent=s.meta;wallTitle.textContent=eff.title;meterText.textContent=eff.status;
 strength.style.setProperty('--sound-left',eff.residual+'%');strength.classList.toggle('is-silence',isSilence);
 wallBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36Wall===state.wall&&!state.compare));});
 var canCompare=state.wall==='silence';compareBtn.disabled=!canCompare;compareBtn.textContent=!canCompare?'Выберите SILENCE для сравнения':(state.compare?'Вернуть SILENCE':'Показать без SILENCE');
 if(player)applyAudioGain();
}
function sourceChanged(id){if(!sources[id]||state.source===id)return;state.source=id;state.compare=false;render();if(player&&player.wanted)player.play(id);else if(audioStatus)audioStatus.textContent='Выбрано: '+sources[id].label+'. Нажмите «Включить звук».';}
roomBtns.forEach(function(b){b.addEventListener('click',function(){sourceChanged(b.dataset.game36Room);});});
sourcePills.forEach(function(b){b.addEventListener('click',function(){sourceChanged(b.dataset.game36SourcePill);});});
wallBtns.forEach(function(b){b.addEventListener('click',function(){state.wall=b.dataset.game36Wall;state.compare=false;render();});});
compareBtn.addEventListener('click',function(){if(state.wall!=='silence')return;state.compare=!state.compare;render();});
/* v41: uploaded recordings replace the synthetic oscillators and noise. */
var player=null,audioStatus=root.querySelector('[data-game41-audio-status]'),volumeInput=root.querySelector('[data-game41-volume]'),volumeOutput=root.querySelector('[data-game41-volume-value]');
function audioStateChanged(info){
 state.audio=info.wanted;
 root.setAttribute('data-game41-playback',info.phase);
 audioBtn.setAttribute('aria-pressed',String(info.wanted));
 audioBtn.setAttribute('aria-busy',String(info.phase==='loading'));
 audioBtn.textContent=info.phase==='loading'?'Загружается…':(info.wanted?'Выключить звук':'Включить звук');
 if(!audioStatus)return;
 var name=sources[info.source]?sources[info.source].label:'';
 if(info.phase==='loading')audioStatus.textContent='Загружаем запись: '+name.toLowerCase()+'.';
 else if(info.phase==='playing')audioStatus.textContent='Звучит: '+name+'.';
 else if(info.phase==='error'){
   if(info.code==='local-file')audioStatus.textContent='Для звука откройте сайт через start.bat или на GitHub Pages.';
   else if(info.code==='unsupported')audioStatus.textContent='Этот браузер не поддерживает звук в игре. Попробуйте другой браузер.';
   else audioStatus.textContent='Не удалось загрузить запись. Проверьте интернет и нажмите «Включить звук» ещё раз.';
 } else audioStatus.textContent=info.code==='hidden'?'Звук на паузе. Нажмите «Включить звук», чтобы продолжить.':'Звук выключен. Запись продолжится с того же места.';
}
if(window.SilenceRoomAudio){
 player=new window.SilenceRoomAudio({volume:.35,onState:audioStateChanged});
 // Read-only inspect() is useful when checking a published copy of the site.
 Object.defineProperty(root,'silenceRoomAudio',{value:player,configurable:true});
} else {audioBtn.disabled=true;if(audioStatus)audioStatus.textContent='Не удалось загрузить проигрыватель. Обновите страницу.';}
function applyAudioGain(){if(player){var eff=state.compare?walls.base:walls[state.wall];player.setAttenuation(eff.residual/100);}}
audioBtn.addEventListener('click',function(){if(!player)return;if(player.wanted)player.pause();else{applyAudioGain();player.play(state.source);}});
if(volumeInput)volumeInput.addEventListener('input',function(){var n=Math.max(0,Math.min(100,Number(volumeInput.value)||0));if(volumeOutput)volumeOutput.textContent=n+'%';if(player)player.setVolume(n/100);});
document.addEventListener('visibilitychange',function(){if(document.hidden&&player&&player.wanted)player.pause('hidden');});
window.addEventListener('pagehide',function(){if(player)player.pause('hidden');});
window.addEventListener('resize',resizeCanvas,{passive:true});
render();resizeCanvas();raf=requestAnimationFrame(animate);
})();
