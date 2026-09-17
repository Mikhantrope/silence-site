/* v30 editorial UI. Article text remains readable without JavaScript. */
(function () {
  'use strict';
  function init() {
    var header=document.querySelector('.journal30-header');
    var button=document.querySelector('[data-journal-menu]');
    var panel=document.getElementById('mobile-site-menu');
    if(header && button && panel) {
      function close(focus) { panel.hidden=true;button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Открыть меню');if(focus)button.focus({preventScroll:true}); }
      button.addEventListener('click',function(){ panel.hidden=!panel.hidden;button.setAttribute('aria-expanded',String(!panel.hidden));button.setAttribute('aria-label',panel.hidden?'Открыть меню':'Закрыть меню'); });
      panel.addEventListener('click',function(e){if(e.target.closest('a'))close(false);});
      document.addEventListener('click',function(e){if(!panel.hidden&&!header.contains(e.target))close(false);});
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden){e.preventDefault();close(true);}});
      window.addEventListener('resize',function(){if(window.innerWidth>=1180)close(false);});
    }
    var theme=document.querySelector('[data-journal-theme]');
    if(theme) {
      function themeState(){theme.setAttribute('aria-pressed',String(document.documentElement.dataset.theme==='dark'));}
      theme.addEventListener('click',function(){var t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('silence.theme',t);}catch(ignore){}themeState();});
      themeState();
    }
    var controls=document.querySelector('[data-article-controls]');
    if(controls) {
      var input=document.querySelector('[data-article-search]'), buttons=Array.from(document.querySelectorAll('[data-article-filter]'));
      var cards=Array.from(document.querySelectorAll('[data-article-card]')),empty=document.querySelector('[data-article-empty]'),count=document.querySelector('[data-article-count]'),active='';
      function normalize(v){return String(v||'').toLocaleLowerCase('ru').replace(/ё/g,'е').trim();}
      function apply(){var q=normalize(input.value),n=0;cards.forEach(function(c){var visible=(!active||c.dataset.category===active)&&(!q||normalize(c.textContent).includes(q));c.hidden=!visible;if(visible)n++;});buttons.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.articleFilter===active));});empty.hidden=n!==0;count.textContent='Показано: '+n+' из '+cards.length;}
      input.addEventListener('input',apply);buttons.forEach(function(b){b.addEventListener('click',function(){active=b.dataset.articleFilter;apply();});});
      var reset=document.querySelector('[data-article-reset]');if(reset)reset.addEventListener('click',function(){active='';input.value='';apply();input.focus();});
      controls.hidden=false;apply();
    }
    // Horizontal movement is local to the comparison table, not the whole article.
    document.querySelectorAll('.article30-table-wrap').forEach(function(w){w.tabIndex=0;w.setAttribute('role','region');w.setAttribute('aria-label','Таблица: при необходимости прокрутите вбок');});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
}());
