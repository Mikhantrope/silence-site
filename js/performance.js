/* v32: responsive derivatives in previews; original images stay in viewers. */
(function(g){
 'use strict';
 var files=g.SILENCE_IMAGE_SIZES||{},observer=null,pending=new Set();
 function entry(src){return files[String(src||'').split('?')[0].replace(/^(\.\.\/|\.\/)+/,'')];}
 function placeholder(w,h){return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"/%3E';}
 function prepare(attrs){
  if(!attrs||attrs.loading!=='lazy'||!attrs.src||!entry(attrs.src))return attrs;
  var a=Object.assign({},attrs),m=entry(a.src),base=String(a.src).match(/^(?:\.\.\/|\.\/)+/),prefix=base?base[0]:'';
  var variants=m.variants,sizes=a.sizes;
  if(!sizes)sizes=/products|schemes|prod\//.test(a.src)?'(max-width: 600px) 80vw, (max-width: 1179px) 45vw, 380px':'(max-width: 600px) 100vw, (max-width: 1179px) 60vw, 680px';
  a.width=m.width;a.height=m.height;a.decoding='async';
  a['data-perf-src']=prefix+variants[variants.length-1].src;
  a['data-perf-srcset']=variants.map(function(v){return prefix+v.src+' '+v.width+'w';}).join(', ');
  a['data-perf-sizes']=sizes;
  a.src=placeholder(m.width,m.height);delete a.srcset;delete a.sizes;
  return a;
 }
 function load(img){
  if(!img||!img.hasAttribute('data-perf-src'))return;
  var src=img.getAttribute('data-perf-src'),set=img.getAttribute('data-perf-srcset'),sizes=img.getAttribute('data-perf-sizes');
  img.removeAttribute('data-perf-src');img.loading='eager';img.decoding='async';
  if(sizes)img.sizes=sizes;if(set)img.srcset=set;img.src=src;
  img.removeAttribute('data-perf-srcset');img.removeAttribute('data-perf-sizes');
 }
 function watch(img){
  if(!img.hasAttribute('data-perf-src'))return;
  if(!g.IntersectionObserver){load(img);return;}
  if(!observer)observer=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){load(e.target);observer.unobserve(e.target);pending.delete(e.target);}});},{rootMargin:'350px 0px',threshold:0.01});
  pending.add(img);observer.observe(img);
 }
 function sweep(){pending.forEach(function(img){if(!img.isConnected){observer.unobserve(img);pending.delete(img);}});}
 function init(){document.querySelectorAll('img[data-perf-src]').forEach(watch);queueMicrotask(sweep);}
 document.addEventListener('silence:lang',function(){queueMicrotask(sweep);});
 document.addEventListener('DOMContentLoaded',init);
 g.SILENCE_PERF={prepareImage:prepare,watchImage:watch,loadImage:load};
}(window));
