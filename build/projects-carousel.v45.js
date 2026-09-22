(function (g) {
  'use strict';

  var DATA = [
    {id:'museum', type:'image', img:'assets/projects/museum.webp', fast:'assets/fast/projects-museum-853.webp', srcset:'assets/fast/projects-museum-320.webp 320w, assets/fast/projects-museum-640.webp 640w, assets/fast/projects-museum-853.webp 853w', title:{ru:'Музей современного искусства',kz:'Заманауи өнер музейі',en:'Museum of Contemporary Art'}, meta:{ru:'Алматы',kz:'Алматы',en:'Almaty'}},
    {id:'resident', type:'image', img:'assets/projects/resident.webp', fast:'assets/fast/projects-resident-856.webp', srcset:'assets/fast/projects-resident-320.webp 320w, assets/fast/projects-resident-640.webp 640w, assets/fast/projects-resident-856.webp 856w', title:{ru:'Resident Hotel Abay',kz:'Resident Hotel Abay',en:'Resident Hotel Abay'}, meta:{ru:'Алматы',kz:'Алматы',en:'Almaty'}},
    {id:'golden', type:'image', img:'assets/projects/golden.webp', fast:'assets/fast/projects-golden-750.webp', srcset:'assets/fast/projects-golden-320.webp 320w, assets/fast/projects-golden-640.webp 640w, assets/fast/projects-golden-750.webp 750w', title:{ru:'ЖК Golden Residence',kz:'Golden Residence ТК',en:'Golden Residence residential complex'}, meta:{ru:'Астана',kz:'Астана',en:'Astana'}},
    {id:'aiwa', type:'video', video:'assets/videos/aiwa-partitions.mp4', poster:'assets/posters/aiwa-partitions.webp', title:{ru:'ЖК Aiwa · перегородки',kz:'Aiwa ТК · қалқалар',en:'Aiwa residential complex · partitions'}, meta:{ru:'Видео объекта',kz:'Нысан видеосы',en:'Project video'}},
    {id:'intercontinental', type:'image', img:'assets/projects/intercontinental.webp', fast:'assets/fast/projects-intercontinental-670.webp', srcset:'assets/fast/projects-intercontinental-320.webp 320w, assets/fast/projects-intercontinental-640.webp 640w, assets/fast/projects-intercontinental-670.webp 670w', title:{ru:'InterContinental',kz:'InterContinental',en:'InterContinental'}, meta:{ru:'Ташкент',kz:'Ташкент',en:'Tashkent'}},
    {id:'hilton', type:'image', img:'assets/projects/hilton.webp', fast:'assets/fast/projects-hilton-960.webp', srcset:'assets/fast/projects-hilton-320.webp 320w, assets/fast/projects-hilton-640.webp 640w, assets/fast/projects-hilton-960.webp 960w', title:{ru:'DoubleTree by Hilton',kz:'DoubleTree by Hilton',en:'DoubleTree by Hilton'}, meta:{ru:'Алматы',kz:'Алматы',en:'Almaty'}},
    {id:'radisson', type:'image', img:'assets/projects/radisson.webp', fast:'assets/fast/projects-radisson-500.webp', srcset:'assets/fast/projects-radisson-320.webp 320w, assets/fast/projects-radisson-500.webp 500w', title:{ru:'Radisson Blu Hotel',kz:'Radisson Blu Hotel',en:'Radisson Blu Hotel'}, meta:{ru:'Алматы',kz:'Алматы',en:'Almaty'}},
    {id:'aport', type:'image', img:'assets/projects/aport.webp', fast:'assets/fast/projects-aport-960.webp', srcset:'assets/fast/projects-aport-320.webp 320w, assets/fast/projects-aport-640.webp 640w, assets/fast/projects-aport-960.webp 960w', title:{ru:'ТЦ Апорт',kz:'Aport сауда орталығы',en:'Aport shopping mall'}, meta:{ru:'Алматы',kz:'Алматы',en:'Almaty'}},
    {id:'qamaqor', type:'image', img:'assets/projects/qamaqor.webp', fast:'assets/fast/projects-qamaqor-290.webp', srcset:'assets/fast/projects-qamaqor-290.webp 290w', title:{ru:'ЖК QAMQOR QALA',kz:'QAMQOR QALA ТК',en:'QAMQOR QALA residential complex'}, meta:{ru:'Алматы',kz:'Алматы',en:'Almaty'}},
    {id:'ab-residence', type:'image', img:'assets/projects/ab-residence.webp', fast:'assets/fast/projects-ab-residence-741.webp', srcset:'assets/fast/projects-ab-residence-320.webp 320w, assets/fast/projects-ab-residence-640.webp 640w, assets/fast/projects-ab-residence-741.webp 741w', title:{ru:'ЖК АВ Residence',kz:'AB Residence ТК',en:'AB Residence residential complex'}, meta:{ru:'Усть-Каменогорск',kz:'Өскемен',en:'Oskemen'}},
    {id:'kaspi', type:'image', img:'assets/projects/kaspi.webp', fast:'assets/fast/projects-kaspi-960.webp', srcset:'assets/fast/projects-kaspi-320.webp 320w, assets/fast/projects-kaspi-640.webp 640w, assets/fast/projects-kaspi-960.webp 960w', title:{ru:'ЖК Каспий',kz:'Каспий ТК',en:'Kaspi residential complex'}, meta:{ru:'Алматы',kz:'Алматы',en:'Almaty'}},
    {id:'hammam-01', type:'video', video:'assets/videos/hammam-01.mp4', poster:'assets/posters/hammam-01.webp', title:{ru:'Хаммам · видео 1',kz:'Хаммам · видео 1',en:'Hammam · video 1'}, meta:{ru:'Видео объекта',kz:'Нысан видеосы',en:'Project video'}},
    {id:'hammam-02', type:'video', video:'assets/videos/hammam-02.mp4', poster:'assets/posters/hammam-02.webp', title:{ru:'Хаммам · видео 2',kz:'Хаммам · видео 2',en:'Hammam · video 2'}, meta:{ru:'Видео объекта',kz:'Нысан видеосы',en:'Project video'}},
    {id:'hammam-03', type:'video', video:'assets/videos/hammam-03.mp4', poster:'assets/posters/hammam-03.webp', title:{ru:'Хаммам · видео 3',kz:'Хаммам · видео 3',en:'Hammam · video 3'}, meta:{ru:'Видео объекта',kz:'Нысан видеосы',en:'Project video'}}
  ];

  var COPY = {
    ru:{eyebrow:'Все объекты',title:'Другие объекты',prev:'Назад',next:'Далее',hint:'Листайте карточки или используйте стрелки. Фото и видео открываются здесь, без перехода на отдельную страницу.',openImage:'Увеличить',openVideo:'Открыть видео',contact:'Обсудить похожий объект',close:'Закрыть видео'},
    kz:{eyebrow:'Барлық нысандар',title:'Басқа нысандар',prev:'Артқа',next:'Келесі',hint:'Карточкаларды сырғытыңыз немесе көрсеткілерді пайдаланыңыз. Фото мен видео бөлек бетке өтпей осында ашылады.',openImage:'Үлкейту',openVideo:'Видеоны ашу',contact:'Ұқсас нысанды талқылау',close:'Видеоны жабу'},
    en:{eyebrow:'All projects',title:'More projects',prev:'Previous',next:'Next',hint:'Swipe the cards or use the arrows. Photos and videos open here without leaving the page.',openImage:'Enlarge',openVideo:'Open video',contact:'Discuss a similar project',close:'Close video'}
  };

  function lang(){
    return g.SILENCE_CORE && g.SILENCE_CORE.getLang ? g.SILENCE_CORE.getLang() : ((document.documentElement.lang || 'ru').slice(0,2) === 'kk' ? 'kz' : (document.documentElement.lang || 'ru').slice(0,2));
  }
  function tx(obj,l){ return (obj && (obj[l] || obj.ru || obj.en)) || ''; }
  function mk(tag,attrs,children){
    var e=document.createElement(tag),k;
    attrs=attrs||{};
    for(k in attrs){
      if(k==='class')e.className=attrs[k];
      else if(k==='text')e.textContent=attrs[k];
      else if(attrs[k]!==null&&attrs[k]!==undefined)e.setAttribute(k,attrs[k]);
    }
    (children||[]).forEach(function(c){ if(c)e.appendChild(c); });
    return e;
  }

  var modal=null,lastFocus=null;
  function ensureModal(){
    if(modal)return modal;
    var video=mk('video',{controls:'',playsinline:'',preload:'metadata'}),frame=mk('div',{class:'projects45-video-modal__frame'},[video]),title=mk('p',{class:'projects45-video-modal__title'}),close=mk('button',{type:'button',class:'projects45-video-modal__close','aria-label':'Close',text:'×'}),dialog=mk('div',{class:'projects45-video-modal__dialog',role:'document'},[close,frame,title]);
    modal=mk('div',{class:'projects45-video-modal',hidden:'',role:'dialog','aria-modal':'true'},[dialog]);
    modal._video=video;modal._title=title;modal._close=close;
    document.body.appendChild(modal);
    function shut(){
      video.pause();video.removeAttribute('src');while(video.firstChild)video.removeChild(video.firstChild);video.load();modal.hidden=true;document.body.classList.remove('projects45-modal-open');if(lastFocus&&document.contains(lastFocus))lastFocus.focus({preventScroll:true});
    }
    close.addEventListener('click',shut);
    modal.addEventListener('click',function(e){if(e.target===modal)shut();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden){e.preventDefault();shut();}});
    modal._shut=shut;
    return modal;
  }
  function openVideo(item,l){
    var m=ensureModal(),source=mk('source',{src:item.video,type:'video/mp4'});lastFocus=document.activeElement;m._video.appendChild(source);m._video.poster=item.poster;m._video.setAttribute('aria-label',tx(item.title,l));m._video.load();m._title.textContent=tx(item.title,l);m._close.setAttribute('aria-label',COPY[l].close);m.hidden=false;document.body.classList.add('projects45-modal-open');m._close.focus({preventScroll:true});
  }

  function buildCard(item,l){
    var copy=COPY[l],title=tx(item.title,l),meta=tx(item.meta,l),media,img;
    if(item.type==='video'){
      img=mk('img',{src:item.poster,alt:'',loading:'lazy',decoding:'async'});
      media=mk('button',{type:'button',class:'project27-media','aria-label':copy.openVideo+': '+title},[img,mk('span',{class:'projects45-card__play','aria-hidden':'true'})]);
      media.addEventListener('click',function(){openVideo(item,l);});
    }else{
      img=mk('img',{src:item.fast||item.img,srcset:item.srcset||'',sizes:'(max-width:600px) 82vw, (max-width:900px) 46vw, 360px',alt:title,loading:'lazy',decoding:'async'});
      media=mk('button',{type:'button',class:'project27-media','aria-label':copy.openImage+': '+title},[img]);
      media.addEventListener('click',function(){if(g.SILENCE_CORE&&g.SILENCE_CORE.openGalleryViewer)g.SILENCE_CORE.openGalleryViewer([item.img],0,[title+' · '+meta]);});
    }
    var bodyChildren=[mk('p',{class:'eyebrow projects45-card__meta',text:meta}),mk('h3',{text:title})];
    if(item.type==='image')bodyChildren.push(mk('a',{class:'text-link',href:'contacts.html?project='+encodeURIComponent(tx(item.title,'ru')),text:copy.contact}));
    var body=mk('div',{class:'project27-body'},bodyChildren);
    return mk('article',{class:'project27-card projects45-card'+(item.type==='video'?' projects45-card__video':'')},[media,body]);
  }

  function enhance(){
    var section=document.querySelector('[data-mount="projects-teaser"]');
    if(!section)return;
    var old=section.querySelector('.projects27-grid');
    if(!old||old.dataset.carousel45==='done')return;
    var l=lang();if(!COPY[l])l='ru';var copy=COPY[l];
    var block=mk('div',{class:'projects45-carousel','data-projects45':''});
    var headCopy=mk('div',{class:'projects45-carousel__head-copy'},[mk('p',{class:'projects45-carousel__eyebrow',text:copy.eyebrow}),mk('h3',{class:'projects45-carousel__title',text:copy.title})]);
    var prev=mk('button',{type:'button',class:'projects45-carousel__arrow','aria-label':copy.prev},[mk('span',{'aria-hidden':'true',text:'←'})]);
    var count=mk('span',{class:'projects45-carousel__counter','aria-live':'polite'});
    var next=mk('button',{type:'button',class:'projects45-carousel__arrow','aria-label':copy.next},[mk('span',{'aria-hidden':'true',text:'→'})]);
    var controls=mk('div',{class:'projects45-carousel__controls'},[prev,count,next]);
    var head=mk('div',{class:'projects45-carousel__head'},[headCopy,controls]);
    var track=mk('div',{class:'projects45-carousel__track',tabindex:'0','aria-label':copy.eyebrow});
    DATA.forEach(function(item){track.appendChild(buildCard(item,l));});
    var viewport=mk('div',{class:'projects45-carousel__viewport'},[track]);
    var hint=mk('p',{class:'projects45-carousel__hint',text:copy.hint});
    block.appendChild(head);block.appendChild(viewport);block.appendChild(hint);
    old.dataset.carousel45='done';old.replaceWith(block);

    function visibleCount(){
      var w=track.clientWidth;if(w<=600)return 1;if(w<=900)return 2;return 3;
    }
    function nearestIndex(){
      var cards=track.children;if(!cards.length)return 0;var x=track.scrollLeft,best=0,d=Infinity;for(var i=0;i<cards.length;i++){var q=Math.abs(cards[i].offsetLeft-x);if(q<d){d=q;best=i;}}return best;
    }
    function update(){
      var idx=nearestIndex(),vis=visibleCount(),end=Math.min(DATA.length,idx+vis);count.textContent=(idx+1)+(end>idx+1?'–'+end:'')+' / '+DATA.length;prev.disabled=track.scrollLeft<=3;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-3;
    }
    function move(dir){
      var cards=track.children,idx=nearestIndex(),vis=visibleCount(),target=Math.max(0,Math.min(cards.length-1,idx+dir*vis));if(cards[target])cards[target].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest',inline:'start'});
    }
    prev.addEventListener('click',function(){move(-1);});next.addEventListener('click',function(){move(1);});
    track.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}});
    var timer;track.addEventListener('scroll',function(){clearTimeout(timer);timer=setTimeout(update,45);},{passive:true});
    if(g.ResizeObserver){var ro=new ResizeObserver(update);ro.observe(track);}g.requestAnimationFrame(update);
  }

  document.addEventListener('DOMContentLoaded',function(){g.requestAnimationFrame(enhance);});
  document.addEventListener('silence:lang',function(){g.requestAnimationFrame(enhance);});
}(window));
