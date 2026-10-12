(function(){
  'use strict';
  var path=window.location.pathname || '/';
  var lang = path.indexOf('/kk/')===0 || path==='/kk' ? 'kz' : (path.indexOf('/en/')===0 || path==='/en' ? 'en' : 'ru');
  try { localStorage.setItem('silence.lang', lang); } catch(e) {}

  var CORE = {'/':1,'/index.html':1,'/catalog.html':1,'/systems.html':1,'/pro.html':1,'/projects.html':1,'/gallery.html':1,'/contacts.html':1};

  function pageName(){
    var p=window.location.pathname.replace(/\/+$/,'');
    var last=p.split('/').pop() || 'index.html';
    return last.indexOf('.html')>-1 ? last : 'index.html';
  }
  function targetFor(v){
    var pg=pageName();
    var suffix=pg==='index.html' ? '/' : '/'+pg;
    var target = v==='kz' ? '/kk'+suffix : (v==='en' ? '/en'+suffix : (pg==='index.html' ? '/' : '/'+pg));
    return target + window.location.search + window.location.hash;
  }
  function localizedPath(rootPath){
    var p=rootPath==='/' || rootPath==='/index.html' ? '/' : rootPath;
    if(lang==='kz') return p==='/' ? '/kk/' : '/kk'+p;
    if(lang==='en') return p==='/' ? '/en/' : '/en'+p;
    return p;
  }
  function localizeLinks(scope){
    if(lang==='ru') return;
    var links=(scope || document).querySelectorAll ? (scope || document).querySelectorAll('a[href]') : [];
    for(var i=0;i<links.length;i++){
      var a=links[i], raw=a.getAttribute('href');
      if(!raw || raw.charAt(0)==='#' || /^(?:tel:|mailto:|javascript:)/i.test(raw)) continue;
      try {
        var u=new URL(raw, window.location.origin + '/');
        if(u.origin!==window.location.origin) continue;
        var rootPath=u.pathname;
        if(rootPath.indexOf('/kk/')===0) rootPath=rootPath.slice(3) || '/';
        if(rootPath.indexOf('/en/')===0) rootPath=rootPath.slice(3) || '/';
        if(!CORE[rootPath]) continue;
        a.setAttribute('href', localizedPath(rootPath) + u.search + u.hash);
      } catch(e) {}
    }
  }
  function markCurrent(){
    var here=window.location.pathname.replace(/index\.html$/,'').replace(/\/+$/,'/') || '/';
    var links=document.querySelectorAll('.site-nav__list a, .mobile-menu__list a');
    for(var i=0;i<links.length;i++){
      try {
        var p=new URL(links[i].getAttribute('href'),window.location.origin).pathname.replace(/index\.html$/,'').replace(/\/+$/,'/') || '/';
        if(p===here) links[i].setAttribute('aria-current','page');
      } catch(e) {}
    }
  }

  document.addEventListener('change',function(e){
    var el=e.target;
    if(!el || !el.matches || !el.matches('[data-language]')) return;
    var url=targetFor(el.value);
    if(window.location.pathname + window.location.search + window.location.hash !== url){
      e.preventDefault(); e.stopImmediatePropagation();
      if(window.SILENCE_TRACK) window.SILENCE_TRACK('language_switch',{from_lang:lang,to_lang:el.value});
      else { window.dataLayer=window.dataLayer||[]; window.dataLayer.push({event:'language_switch',from_lang:lang,to_lang:el.value}); }
      window.location.assign(url);
    }
  },true);

  document.addEventListener('DOMContentLoaded',function(){
    localizeLinks(document);
    markCurrent();
    if(window.MutationObserver && lang!=='ru'){
      var obs=new MutationObserver(function(muts){
        for(var i=0;i<muts.length;i++){
          for(var j=0;j<muts[i].addedNodes.length;j++){
            var n=muts[i].addedNodes[j];
            if(n && n.nodeType===1){ localizeLinks(n); }
          }
        }
      });
      obs.observe(document.body,{childList:true,subtree:true});
    }
  });
})();
