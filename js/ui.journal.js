/* v33: BIART caption and DalaEdge project. Shared v32 image optimization is retained. */
(function (g) {
 'use strict';
 var C=g.SILENCE_CORE, pages=g.SILENCE_PAGES;
 if(!C||!pages)return;
 function tr(ru,kz,en){var l=C.getLang();return l==='kz'?kz:l==='en'?en:ru;}
 function highlight(){
  return C.el('article',{class:'school30-highlight','data-school-case':'biart'},[
   C.el('div',{class:'school30-highlight__media'},[
    C.el('img',{src:'assets/projects/biart-exterior.webp',srcset:'assets/projects/biart-exterior-960.webp 960w, assets/projects/biart-exterior.webp 2048w',sizes:'(max-width:600px) 100vw, 50vw',width:'2048',height:'1152',loading:'lazy',decoding:'async',alt:tr('Здание BIART в Астане — вид фасада','Астанадағы BIART ғимаратының қасбеті','BIART building in Astana — exterior view')}),
    C.el('span',{},[tr('BIART, Астана','BIART, Астана','BIART, Astana')])
   ]),
   C.el('div',{class:'school30-highlight__body'},[
    C.el('p',{class:'eyebrow'},[tr('Образовательный объект · Астана','Білім беру нысаны · Астана','Educational facility · Astana')]),
    C.el('h3',{},['BIART']),
    C.el('p',{},[tr('Звукоизоляция музыкальных кабинетов. По информации SILENCE, в BIART применены решения компании.','Музыкалық кабинеттерді дыбыс оқшаулау. SILENCE ақпараты бойынша BIART-та компания шешімдері қолданылған.','Sound insulation for music classrooms. According to SILENCE, the company’s solutions were used at BIART.')]),
    C.el('a',{class:'text-link',href:'projects/biart-astana.html','data-analytics':'biart_project_open'},[tr('Подробнее об объекте ↗','Нысан туралы ↗','View project ↗')])
   ])
  ]);
 }

 function dalaedgeHighlight(){
  var image=C.el('img',{src:'assets/projects/dalaedge-kaskelen.webp',width:'1224',height:'1530',loading:'lazy',decoding:'async',sizes:'(max-width:600px) 88vw, 344px',alt:tr('DalaEdge, Каскелен — общий вид территории','DalaEdge, Қаскелең — аумақтың жалпы көрінісі','DalaEdge, Kaskelen — overview of the grounds')});
  var media=C.el('button',{type:'button',class:'project33-media-button','aria-label':tr('Увеличить фото DalaEdge','DalaEdge фотосын үлкейту','Enlarge the DalaEdge photo')},[image]);
  media.addEventListener('click',function(){C.openGalleryViewer(['assets/projects/dalaedge-kaskelen.webp'],0,[tr('DalaEdge, Каскелен','DalaEdge, Қаскелең','DalaEdge, Kaskelen')]);});
  return C.el('article',{class:'school30-highlight project33-dalaedge','data-project-case':'dalaedge'},[
   C.el('div',{class:'school30-highlight__media'},[media,C.el('span',{},[tr('DalaEdge, Каскелен','DalaEdge, Қаскелең','DalaEdge, Kaskelen')])]),
   C.el('div',{class:'school30-highlight__body'},[
    C.el('p',{class:'eyebrow'},[tr('Кинопавильон · Каскелен','Кинопавильон · Қаскелең','Film pavilion · Kaskelen')]),
    C.el('h3',{},[tr('Кинопавильон DalaEdge','DalaEdge кинопавильоны','DalaEdge film pavilion')]),
    C.el('p',{},[tr('Полная звуко- и шумоизоляция кинопавильона. Перегородка — 16 м.','Кинопавильонды толық дыбыс пен шудан оқшаулау. Қалқа — 16 м.','Full sound and noise insulation for the film pavilion. Partition — 16 m.')]),
    C.el('div',{class:'project33-facts'},[
     C.el('span',{},[tr('Перегородка — 16 м','Қалқа — 16 м','Partition — 16 m')]),
     C.el('span',{},[tr('Звуко- и шумоизоляция','Дыбыс пен шудан оқшаулау','Sound and noise insulation')])
    ]),
    C.el('a',{class:'text-link',href:'projects/dalaedge-kaskelen.html','data-analytics':'dalaedge_project_open'},[tr('Подробнее об объекте ↗','Нысан туралы ↗','View project ↗')])
   ])
  ]);
 }

 ['projects-teaser','projects'].forEach(function(key){var original=pages[key];if(typeof original!=='function')return;pages[key]=function(node){original(node);var grid=node.querySelector('.projects27-grid');if(grid){grid.before(highlight());grid.before(dalaedgeHighlight());}};});
 function labels(){document.querySelectorAll('[data-journal-nav]').forEach(function(a){a.textContent=tr('Статьи','Мақалалар','Articles');});}
 document.addEventListener('DOMContentLoaded',labels);document.addEventListener('silence:lang',labels);
}(window));
