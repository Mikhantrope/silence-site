(function(){'use strict';
var root=document.querySelector('[data-game36]');if(!root)return;
var overlay=root.querySelector('[data-game36-overlay]'),boundary=root.querySelector('[data-game36-boundary]'),svg=root.querySelector('[data-game36-wave]');
var before=svg.querySelector('[data-wave-before]'),after=svg.querySelector('[data-wave-after]'),impact=svg.querySelector('[data-wave-impact]');
var sourceTitle=root.querySelector('[data-game36-source-title]'),sourceMeta=root.querySelector('[data-game36-source-meta]'),wallTitle=root.querySelector('[data-game36-wall-title]'),meter=root.querySelector('[data-game36-meter]'),meterText=root.querySelector('[data-game36-meter-text]'),audioBtn=root.querySelector('[data-game36-audio]'),compareBtn=root.querySelector('[data-game36-compare]');
var roomBtns=[].slice.call(root.querySelectorAll('[data-game36-room]')),wallBtns=[].slice.call(root.querySelectorAll('[data-game36-wall]')),sourcePills=[].slice.call(root.querySelectorAll('[data-game36-source-pill]'));
var sources={
 top:{id:'top',label:'Ремонт сверху',meta:'Перфоратор и удары',point:[50,15],boundary:[50,30],side:'top',tone:'repair'},
 left:{id:'left',label:'Бытовой шум слева',meta:'Разговоры, лай, пылесос',point:[14.5,49],boundary:[29,49],side:'left',tone:'household'},
 right:{id:'right',label:'Музыка справа',meta:'Музыка и бас',point:[85.5,49],boundary:[71,49],side:'right',tone:'music'},
 bottom:{id:'bottom',label:'Кино снизу',meta:'Телевизор и низкие частоты',point:[50,84],boundary:[50,68],side:'bottom',tone:'cinema'}
};
var walls={
 gas:{title:'Газоблок',residual:100,sub:'Исходная стена'},
 gsp:{title:'Газоблок + ГСП',residual:78,sub:'Условная облицовка'},
 brick:{title:'Кирпичная стена',residual:62,sub:'Условный профиль игры'},
 concrete:{title:'Бетонная стена',residual:48,sub:'Условный профиль игры'},
 silence:{title:'Газоблок + SILENCE',residual:10,sub:'Условная демонстрация: 90% меньше демосигнала'}
};
var state={source:'right',wall:'gas',compare:false,audio:false};
function setPath(path,a,b){path.setAttribute('d','M'+a[0]+' '+a[1]+' L'+b[0]+' '+b[1]);}
function render(){var s=sources[state.source],w=walls[state.wall];
 roomBtns.forEach(function(b){var on=b.dataset.game36Room===s.id;b.setAttribute('aria-pressed',String(on));});sourcePills.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36SourcePill===s.id));});overlay.classList.add('has-source');
 boundary.dataset.side=s.side;boundary.dataset.wall=state.compare?'gas':state.wall;boundary.classList.add('is-visible');
 sourceTitle.textContent=s.label;sourceMeta.textContent=s.meta;wallTitle.textContent=state.compare?'Газоблок — до':w.title;
 var eff=state.compare?walls.gas:w;meter.style.width=eff.residual+'%';meterText.textContent=(!state.compare&&state.wall==='silence')?'Условная демонстрация: 90% меньше демосигнала':(eff.residual===100?'Исходный демосигнал':'Остаток демосигнала: '+eff.residual+'%');
 setPath(before,s.point,s.boundary);setPath(after,s.boundary,[50,49]);after.classList.toggle('silence',!state.compare&&state.wall==='silence');impact.setAttribute('cx',s.boundary[0]);impact.setAttribute('cy',s.boundary[1]);impact.classList.add('show');
 wallBtns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.game36Wall===state.wall&&!state.compare));});compareBtn.disabled=state.wall==='gas';compareBtn.textContent=state.compare?'Вернуться к выбранной стене':'Сравнить с обычным газоблоком';
 if(audio&&state.audio)applyAudioGain();
}
function sourceChanged(id){state.source=id;state.compare=false;if(state.audio){stopNodes();state.audio=false;startSound();}render();}
roomBtns.forEach(function(b){b.addEventListener('click',function(){sourceChanged(b.dataset.game36Room);});});sourcePills.forEach(function(b){b.addEventListener('click',function(){sourceChanged(b.dataset.game36SourcePill);root.querySelector('[data-game36-figure]').scrollIntoView({behavior:'smooth',block:'nearest'});});});wallBtns.forEach(function(b){b.addEventListener('click',function(){state.wall=b.dataset.game36Wall;state.compare=false;render();});});compareBtn.addEventListener('click',function(){if(state.wall==='gas')return;state.compare=!state.compare;render();});
var AC=window.AudioContext||window.webkitAudioContext,audio=null,master=null,nodes=[];
function stopNodes(){nodes.forEach(function(n){try{n.stop&&n.stop();}catch(e){}try{n.disconnect&&n.disconnect();}catch(e){}});nodes=[];}
function makeNoise(ctx){var len=ctx.sampleRate*2,buf=ctx.createBuffer(1,len,ctx.sampleRate),d=buf.getChannelData(0);for(var i=0;i<len;i++)d[i]=Math.random()*2-1;var n=ctx.createBufferSource();n.buffer=buf;n.loop=true;return n;}
function startSound(){if(!AC)return;audio=audio||new AC();if(audio.state==='suspended')audio.resume();stopNodes();master=audio.createGain();master.gain.value=.18;master.connect(audio.destination);var s=sources[state.source],t=audio.currentTime;
 if(s.tone==='music'){[110,165,220].forEach(function(f){var o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.09;o.connect(g).connect(master);o.start();nodes.push(o,g);});}
 else if(s.tone==='cinema'){[55,82.5].forEach(function(f){var o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.13;o.connect(g).connect(master);o.start();nodes.push(o,g);});}
 else {var n=makeNoise(audio),f=audio.createBiquadFilter(),g=audio.createGain();f.type=s.tone==='repair'?'bandpass':'lowpass';f.frequency.value=s.tone==='repair'?850:700;f.Q.value=s.tone==='repair'?1.2:.5;g.gain.value=.13;n.connect(f).connect(g).connect(master);n.start();nodes.push(n,f,g);if(s.tone==='repair'){var o=audio.createOscillator(),og=audio.createGain();o.frequency.value=42;og.gain.value=.07;o.connect(og).connect(master);o.start();nodes.push(o,og);}}
 state.audio=true;audioBtn.setAttribute('aria-pressed','true');audioBtn.textContent='Выключить демозвук';applyAudioGain();}
function applyAudioGain(){if(!audio||!master)return;var eff=state.compare?walls.gas:walls[state.wall],target=.18*(eff.residual/100),now=audio.currentTime;master.gain.cancelScheduledValues(now);master.gain.setValueAtTime(Math.max(master.gain.value,.0001),now);master.gain.exponentialRampToValueAtTime(Math.max(target,.0001),now+.18);}
audioBtn.addEventListener('click',function(){if(state.audio){stopNodes();if(audio)audio.suspend();state.audio=false;audioBtn.setAttribute('aria-pressed','false');audioBtn.textContent='Включить демозвук';}else startSound();});document.addEventListener('visibilitychange',function(){if(document.hidden&&state.audio){stopNodes();if(audio)audio.suspend();state.audio=false;audioBtn.setAttribute('aria-pressed','false');audioBtn.textContent='Включить демозвук';}});
render();
})();
