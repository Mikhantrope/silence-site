/* v31: BIART client-supplied exterior image. All other v30 integration unchanged. */
(function (g) {
 'use strict';
 var C=g.SILENCE_CORE, pages=g.SILENCE_PAGES;
 if(!C||!pages)return;
 function tr(ru,kz,en){var l=C.getLang();return l==='kz'?kz:l==='en'?en:ru;}
 function highlight(){
  return C.el('article',{class:'school30-highlight','data-school-case':'biart'},[
   C.el('div',{class:'school30-highlight__media'},[
    C.el('img',{src:'assets/projects/biart-exterior.webp',srcset:'assets/projects/biart-exterior-960.webp 960w, assets/projects/biart-exterior.webp 2048w',sizes:'(max-width:600px) 100vw, 50vw',width:'2048',height:'1152',loading:'lazy',decoding:'async',alt:tr('Здание BIART в Астане — вид фасада','Астанадағы BIART ғимаратының қасбеті','BIART building in Astana — exterior view')}),
    C.el('span',{},[tr('BIART, Астана · Изображение предоставлено заказчиком','BIART, Астана · Кескінді тапсырыс беруші ұсынған','BIART, Astana · Image supplied by the client')])
   ]),
   C.el('div',{class:'school30-highlight__body'},[
    C.el('p',{class:'eyebrow'},[tr('Образовательный объект · Астана','Білім беру нысаны · Астана','Educational facility · Astana')]),
    C.el('h3',{},['BIART']),
    C.el('p',{},[tr('Звукоизоляция музыкальных кабинетов. По информации SILENCE, в BIART применены решения компании.','Музыкалық кабинеттерді дыбыс оқшаулау. SILENCE ақпараты бойынша BIART-та компания шешімдері қолданылған.','Sound insulation for music classrooms. According to SILENCE, the company’s solutions were used at BIART.')]),
    C.el('a',{class:'text-link',href:'projects/biart-astana.html','data-analytics':'biart_project_open'},[tr('Подробнее об объекте ↗','Нысан туралы ↗','View project ↗')])
   ])
  ]);
 }
 ['projects-teaser','projects'].forEach(function(key){var original=pages[key];if(typeof original!=='function')return;pages[key]=function(node){original(node);var grid=node.querySelector('.projects27-grid');if(grid)grid.before(highlight());};});
 function labels(){document.querySelectorAll('[data-journal-nav]').forEach(function(a){a.textContent=tr('Статьи','Мақалалар','Articles');});}
 document.addEventListener('DOMContentLoaded',labels);document.addEventListener('silence:lang',labels);
}(window));
