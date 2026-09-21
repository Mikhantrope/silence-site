(function(){'use strict';
var root=document.querySelector('[data-game36]');if(!root)return;
var overlay=root.querySelector('[data-game36-overlay]'),boundary=root.querySelector('[data-game36-boundary]'),svg=root.querySelector('[data-game36-wave]');
var before=svg.querySelector('[data-wave-before]'),after=svg.querySelector('[data-wave-after]'),impact=svg.querySelector('[data-wave-impact]');
var beforeA=svg.querySelector('[data-wave-before-a]'),beforeB=svg.querySelector('[data-wave-before-b]'),afterA=svg.querySelector('[data-wave-after-a]'),afterB=svg.querySelector('[data-wave-after-b]');
var sourceTitle=root.querySelector('[data-game36-source-title]'),sourceMeta=root.querySelector('[data-game36-source-meta]'),wallTitle=root.querySelector('[data-game36-wall-title]'),meterText=root.querySelector('[data-game36-meter-text]'),strength=root.querySelector('[data-game36-strength]'),audioBtn=root.querySelector('[data-game36-audio]'),compareBtn=root.querySelector('[data-game36-compare]');
var roomBtns=[].slice.call(root.querySelectorAll('[data-game36-room]')),wallBtns=[].slice.call(root.querySelectorAll('[data-game36-wall]')),sourcePills=[].slice.call(root.querySelectorAll('[data-game36-source-pill]'));
var sources={
 top:{id:'top',label:'Ремонт сверху',meta:'Перфоратор и удары',side:'top',tone:'repair'},
 left:{id:'left',label:'Бытовой шум слева',meta:'Разговоры, лай, пылесос',side:'left',tone:'household'},
 right:{id:'right',label:'Музыка справа',meta:'Музыка и бас',side:'right',tone:'music'},
 bottom:{id:'bottom',label:'Кино снизу',meta:'Телевизор и низкие частоты',side:'bottom',tone:'cinema'}
};
var walls={
 gas:{title:'Газоблок',residual:100,status:'Шум проходит почти без изменений',sub:'Базовая стена'},
 gsp:{title:'Газоблок + ГСП',residual:76,status:'Шум становится тише',sub:'Дополнительный слой'},
 brick:{title:'Кирпичная стена',residual:60,status:'Шум заметно тише',sub:'Плотная кладка'},
 concrete:{title:'Бетонная стена',residual:46,status:'Шум сильно ослаблен',sub:'Массивная стена'},
 silence:{title:'Стена + SILENCE',residual:10,status:'90% поглощения',sub:'Система SILENCE'},
 base:{title:'Стена без SILENCE',residual:100,status:'Шум проходит в комнату',sub:'Без системы SILENCE'}
};
var routes={
 right:{
  ba:'M86 46 C82 43 77 44 71 48',bb:'M86 54 C82 57 77 56 71 51',
  aa:'M71 48 C65 46 59 46 53 48',ab:'M71 51 C65 54 59 54 53 52',impact:[71,49.5]
 },
 left:{
  ba:'M14 46 C18 43 23 44 29 48',bb:'M14 54 C18 57 23 56 29 51',
  aa:'M29 48 C35 46 41 46 47 48',ab:'M29 51 C35 54 41 54 47 52',impact:[29,49.5]
 },
 top:{
  ba:'M47 14 C45 19 45 25 48 30',bb:'M53 14 C55 19 55 25 52 30',
  aa:'M48 30 C47 36 48 41 49 46',ab:'M52 30 C53 36 52 41 51 46',impact:[50,30]
 },
 bottom:{
  ba:'M47 86 C45 81 45 74 48 68',bb:'M53 86 C55 81 55 74 52 68',
  aa:'M48 68 C47 63 48 58 49 54',ab:'M52 68 C53 63 52 58 51 54',impact:[50,68]
 }
};
var state={source:'right',wall:'gas',compare:false,audio:false};
function applyRoutes(){var r=routes[state.source];beforeA.setAttribute('d',r.ba);beforeB.setAttribute('d',r.bb);afterA.setAttribute('d',r.aa);afterB.setAttribute('d',r.ab);impact.setAttribute('transform','translate('+r.impact[0]+' '+r.impact[1]+')');}
function render(){var s=sources[state.source],chosen=walls[state.wall],eff=state.compare?walls.base:chosen;
 roomBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36Room===s.id));});
 sourcePills.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36SourcePill===s.id));});
 overlay.classList.add('has-source');boundary.dataset.side=s.side;boundary.dataset.wall=state.compare?'base':state.wall;boundary.classList.add('is-visible');
 sourceTitle.textContent=s.label;sourceMeta.textContent=s.meta;wallTitle.textContent=eff.title;meterText.textContent=eff.status;
 strength.style.setProperty('--sound-left',eff.residual+'%');strength.classList.toggle('is-silence',!state.compare&&state.wall==='silence');
 applyRoutes();
 var t=Math.max(0.05,eff.residual/100);after.style.setProperty('--wave-opacity',(0.1+0.78*t).toFixed(2));after.style.setProperty('--wave-gap',(10+28*(1-t)).toFixed(1));
 after.classList.toggle('is-silence',!state.compare&&state.wall==='silence');impact.classList.toggle('is-silence',!state.compare&&state.wall==='silence');impact.classList.add('show');
 wallBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36Wall===state.wall&&!state.compare));});
 var canCompare=state.wall==='silence';compareBtn.disabled=!canCompare;compareBtn.textContent=!canCompare?'Выберите SILENCE для сравнения':(state.compare?'Вернуть SILENCE':'Показать без SILENCE');
 if(audio&&state.audio)applyAudioGain();
}
function sourceChanged(id){state.source=id;state.compare=false;if(state.audio){stopNodes();state.audio=false;startSound();}render();}
roomBtns.forEach(function(b){b.addEventListener('click',function(){sourceChanged(b.dataset.game36Room);});});
sourcePills.forEach(function(b){b.addEventListener('click',function(){sourceChanged(b.dataset.game36SourcePill);});});
wallBtns.forEach(function(b){b.addEventListener('click',function(){state.wall=b.dataset.game36Wall;state.compare=false;render();});});
compareBtn.addEventListener('click',function(){if(state.wall!=='silence')return;state.compare=!state.compare;render();});
var AC=window.AudioContext||window.webkitAudioContext,audio=null,master=null,nodes=[];
function stopNodes(){nodes.forEach(function(n){try{n.stop&&n.stop();n.disconnect&&n.disconnect();}catch(e){}});nodes=[];}
function makeNoise(ctx){var len=ctx.sampleRate*2,buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);for(var i=0;i<len;i++)d[i]=Math.random()*2-1;var n=ctx.createBufferSource();n.buffer=buf;n.loop=true;return n;}
function startSound(){if(!AC)return;audio=audio||new AC();if(audio.state==='suspended')audio.resume();stopNodes();master=audio.createGain();master.gain.value=.18;master.connect(audio.destination);var s=sources[state.source];
 if(s.tone==='music'){[110,165,220].forEach(function(f){var o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.09;o.connect(g).connect(master);o.start();nodes.push(o,g);});}
 else if(s.tone==='cinema'){[55,82.5].forEach(function(f){var o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.13;o.connect(g).connect(master);o.start();nodes.push(o,g);});}
 else {var n=makeNoise(audio),f=audio.createBiquadFilter(),g=audio.createGain();f.type=s.tone==='repair'?'bandpass':'lowpass';f.frequency.value=s.tone==='repair'?850:700;f.Q.value=s.tone==='repair'?1.2:.5;g.gain.value=.13;n.connect(f).connect(g).connect(master);n.start();nodes.push(n,f,g);if(s.tone==='repair'){var o=audio.createOscillator(),og=audio.createGain();o.frequency.value=42;og.gain.value=.07;o.connect(og).connect(master);o.start();nodes.push(o,og);}}
 state.audio=true;audioBtn.setAttribute('aria-pressed','true');audioBtn.textContent='Выключить звук';applyAudioGain();}
function applyAudioGain(){if(!audio||!master)return;var eff=state.compare?walls.base:walls[state.wall],target=.18*(eff.residual/100),now=audio.currentTime;master.gain.cancelScheduledValues(now);master.gain.setValueAtTime(Math.max(master.gain.value,.0001),now);master.gain.exponentialRampToValueAtTime(Math.max(target,.0001),now+.22);}
audioBtn.addEventListener('click',function(){if(state.audio){stopNodes();if(audio)audio.suspend();state.audio=false;audioBtn.setAttribute('aria-pressed','false');audioBtn.textContent='Включить звук';}else startSound();});
document.addEventListener('visibilitychange',function(){if(document.hidden&&state.audio){stopNodes();if(audio)audio.suspend();state.audio=false;audioBtn.setAttribute('aria-pressed','false');audioBtn.textContent='Включить звук';}});
render();
})();
