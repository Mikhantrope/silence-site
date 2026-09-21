(function(){'use strict';
var root=document.querySelector('[data-game36]');if(!root)return;
var overlay=root.querySelector('[data-game36-overlay]'),boundary=root.querySelector('[data-game36-boundary]'),svg=root.querySelector('[data-game36-wave]');
var before=svg.querySelector('[data-wave-before]'),after=svg.querySelector('[data-wave-after]'),reflect=svg.querySelector('[data-wave-reflection]'),impact=svg.querySelector('[data-wave-impact]'),sourcePulse=svg.querySelector('[data-wave-source-pulse]');
var beforePaths=[1,2,3,4].map(function(i){return svg.querySelector('[data-wave-before-'+i+']');});
var afterPaths=[1,2,3].map(function(i){return svg.querySelector('[data-wave-after-'+i+']');});
var reflectPaths=[1,2].map(function(i){return svg.querySelector('[data-wave-reflect-'+i+']');});
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
 right:{src:[85,49],impact:[71,49.5],dir:[120,240],back:[-60,60],beforeR:[4.4,7.5,10.5,13.5],afterR:[3.0,6.2,9.8]},
 left:{src:[15,49],impact:[29,49.5],dir:[-60,60],back:[120,240],beforeR:[4.4,7.5,10.5,13.5],afterR:[3.0,6.2,9.8]},
 top:{src:[50,17],impact:[50,30],dir:[30,150],back:[210,330],beforeR:[4.0,7.0,10.0,13.0],afterR:[3.0,5.8,8.8]},
 bottom:{src:[50,84],impact:[50,68],dir:[210,330],back:[30,150],beforeR:[5.0,8.7,12.4,16.0],afterR:[3.0,6.0,9.5]}
};
var state={source:'right',wall:'gas',compare:false,audio:false};
function polar(cx,cy,r,deg){var a=deg*Math.PI/180;return[cx+r*Math.cos(a),cy+r*Math.sin(a)];}
function arcPath(cx,cy,r,start,end){var p1=polar(cx,cy,r,start),p2=polar(cx,cy,r,end),delta=((end-start)%360+360)%360,large=delta>180?1:0;return'M '+p1[0].toFixed(2)+' '+p1[1].toFixed(2)+' A '+r+' '+r+' 0 '+large+' 1 '+p2[0].toFixed(2)+' '+p2[1].toFixed(2);}
function setArc(path,cx,cy,r,start,end,delay){path.setAttribute('d',arcPath(cx,cy,r,start,end));path.style.transformOrigin=cx+'px '+cy+'px';path.style.transformBox='view-box';path.style.animationDelay=delay+'s';}
function applyRoutes(){var r=routes[state.source],sx=r.src[0],sy=r.src[1],ix=r.impact[0],iy=r.impact[1];
 sourcePulse.setAttribute('transform','translate('+sx+' '+sy+')');impact.setAttribute('transform','translate('+ix+' '+iy+')');
 beforePaths.forEach(function(p,i){setArc(p,sx,sy,r.beforeR[i],r.dir[0],r.dir[1],(i*.17).toFixed(2));});
 afterPaths.forEach(function(p,i){setArc(p,ix,iy,r.afterR[i],r.dir[0],r.dir[1],(.16+i*.20).toFixed(2));});
 reflectPaths.forEach(function(p,i){setArc(p,ix,iy,2.4+i*2.1,r.back[0],r.back[1],(.38+i*.22).toFixed(2));});
}
function render(){var s=sources[state.source],chosen=walls[state.wall],eff=state.compare?walls.base:chosen,isSilence=!state.compare&&state.wall==='silence';
 roomBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36Room===s.id));});
 sourcePills.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36SourcePill===s.id));});
 overlay.classList.add('has-source');boundary.dataset.side=s.side;boundary.dataset.wall=state.compare?'base':state.wall;boundary.classList.add('is-visible');
 sourceTitle.textContent=s.label;sourceMeta.textContent=s.meta;wallTitle.textContent=eff.title;meterText.textContent=eff.status;
 strength.style.setProperty('--sound-left',eff.residual+'%');strength.classList.toggle('is-silence',isSilence);
 applyRoutes();
 before.style.setProperty('--before-opacity','1');
 after.style.setProperty('--after-opacity',isSilence?'0.10':Math.max(.22,eff.residual/100).toFixed(2));
 after.classList.toggle('is-silence',isSilence);
 reflect.classList.toggle('is-silence',isSilence);
 impact.classList.toggle('is-silence',isSilence);impact.classList.add('show');
 sourcePulse.classList.toggle('is-active',true);
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
