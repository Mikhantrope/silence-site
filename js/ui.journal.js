/* v30 integration for the original six pages. BIART is the only school case. */
(function (g) {
 'use strict';
 var C=g.SILENCE_CORE, pages=g.SILENCE_PAGES;
 if(!C||!pages)return;
 function tr(ru,kz,en){var l=C.getLang();return l==='kz'?kz:l==='en'?en:ru;}
 function highlight(){
  return C.el('article',{class:'school30-highlight','data-school-case':'biart'},[
   C.el('div',{class:'school30-highlight__media'},[
    C.el('img',{src:'assets/solutions/concert.webp',width:'1408',height:'1056',loading:'lazy',alt:tr('Иллюстрация музыкального пространства — не фото BIART','Музыкалық кеңістіктің иллюстрациясы — BIART фотосы емес','Illustration of a music space, not a BIART photo')}),
    C.el('span',{},[tr('Иллюстрация, не фото BIART','Иллюстрация, BIART фотосы емес','Illustration, not a BIART photo')])
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
