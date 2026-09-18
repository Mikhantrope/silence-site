const fs=require('fs'),path=require('path'),crypto=require('crypto');
const ts=require('typescript');
const postcss=require('postcss');
const vm=require('vm');
const root=path.resolve(__dirname,'..');
const manifestPath=path.join(root,'PERF-BUNDLES-v32.json');
const previous=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')).bundles:{};
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
fs.mkdirSync(path.join(root,'build'),{recursive:true});
function compact(src){const result=ts.transpileModule(src,{compilerOptions:{target:ts.ScriptTarget.ES2020,removeComments:true,newLine:ts.NewLineKind.LineFeed}}).outputText;return result.split('\n').map(l=>l.trim()).filter(Boolean).join('\n');}
function output(name,src,ext='js'){const hash=crypto.createHash('sha256').update(src).digest('hex').slice(0,10);const file=`build/${name}.${hash}.${ext}`;fs.writeFileSync(path.join(root,file),src);return file;}
const sandbox={window:{}};vm.createContext(sandbox);
for(const f of ['data.content.js','data.catalog.js','data.norms.js','data.redesign.js'])vm.runInContext(read('js/'+f),sandbox);

// Each object is serialized after existing source patches, preserving all content and translations.
const serialized=['SITE','CATALOG','SILENCE_NORMS','SILENCE_V27'].map(k=>`window.${k}=${JSON.stringify(sandbox.window[k])};`).join('\n');
const sizes=JSON.parse(read('ASSET-SIZES-v32.json'));for(const key of Object.keys(sizes)){delete sizes[key].originalBytes;for(const v of sizes[key].variants){delete v.bytes;delete v.height;}}
const perf='window.SILENCE_IMAGE_SIZES='+JSON.stringify(sizes)+';\n'+compact(read('js/performance.js'));
const commonCode=[perf,serialized,...['core','config','analytics','ui.redesign','ui.form','ui.contacts','app'].map(f=>compact(read('js/'+f+'.js')))].join('\n;\n');
const bundles={common:output('site',commonCode)};
const perPage={index:['ui.section','ui.solution-zones','ui.journal'],catalog:['ui.catalog'],systems:['ui.systems'],projects:['ui.journal'],pro:['ui.pro']};
for(const [name,files] of Object.entries(perPage))bundles[name]=output('page-'+name,files.map(f=>compact(read('js/'+f+'.js'))).join('\n;\n'));
// Consultation needs no catalogue, product images, project data or system layers.
const W=sandbox.window;
const site={t:W.SITE.t,contacts:W.SITE.contacts};
const contactCopy=['cta','formLead','formConsent','waSubmit','waNote','dataNote','dataText','footerText'];
const D={copy:Object.fromEntries(contactCopy.map(k=>[k,W.SILENCE_V27.copy[k]]))};
// Keep translation keys used by core/app/header; compact object, no catalogue dependencies.
const keys=new Set(['cta','headerAddress','footRights','navCat','navSystems','navPro','navGal','navContacts','skip','close','themeLight','themeDark','slogan','formTitle','formLead']);
for(const lang of Object.keys(site.t))site.t[lang]=Object.fromEntries(Object.entries(site.t[lang]).filter(([key])=>keys.has(key)));
const adapter=`(function(g){var C=g.SILENCE_CORE;function t(k){var o=g.SILENCE_V27.copy[k];return typeof o==='string'?o:(o&&(o[C.getLang()]||o.ru))||k;}function copy(){document.querySelectorAll('[data-v27]').forEach(function(n){n.textContent=t(n.dataset.v27);});document.querySelectorAll('[data-journal-nav]').forEach(function(n){n.textContent=C.getLang()==='kz'?'Мақалалар':C.getLang()==='en'?'Articles':'Статьи';});}g.SILENCE_V27_UI={t:t};document.addEventListener('DOMContentLoaded',copy);document.addEventListener('silence:lang',copy);})(window);`;
let contact='window.SITE='+JSON.stringify(site)+';window.SILENCE_V27='+JSON.stringify(D)+';\n'+['core','config','analytics'].map(f=>compact(read('js/'+f+'.js'))).join('\n;\n')+'\n'+adapter+'\n'+['ui.form','ui.contacts','app'].map(f=>compact(read('js/'+f+'.js'))).join('\n;\n');
bundles.contacts=output('consultation',contact);
bundles.editorial=output('articles',compact(read('js/journal.js')));
// Remove only styles tied to obsolete components which no current page or active module uses.
const obsolete=/\.(?:cutaway(?:__|(?=[\s.#:[>+~]|$))|hero-cutaway\b|hero__(?!eyebrow)|hero-slider\b|hero-slide\b|presentation-carousel\b|presentation-slide\b|presentation-project\b|presentation-projects\b|picker__|picker\b|price-calc\b|problem-picker\b|compare-card\b|compare-grid\b|compare-gal|process-step\b|process-list\b|scenarios-grid\b|scenario-card\b|outcome-card\b|outcomes-grid\b|outcomes__|contacts-page\b)/;
const sources=['tokens','base','layout','components','responsive','redesign','journal','biart'].map(f=>read('css/'+f+'.css'));
const css=postcss.parse(sources.join('\n'));
let removed=0;
css.walkRules(rule=>{if(rule.parent.type==='atrule'&&/keyframes/.test(rule.parent.name))return;const selectors=rule.selectors.filter(s=>!obsolete.test(s));if(!selectors.length){rule.remove();removed++;}else rule.selectors=selectors;});
css.walkComments(c=>c.remove());
css.walkAtRules(at=>{if(at.nodes&&at.nodes.length===0)at.remove();});
// Clear formatting only. Values (calc, strings, custom properties, URLs) stay intact.
css.walk(node=>{node.raws.before='';if('between' in node.raws)node.raws.between=node.type==='decl'?':':'';if('after' in node.raws)node.raws.after='';if('semicolon' in node.raws)node.raws.semicolon=false;});css.raws.after='';
bundles.css=output('site',css.toString(),'css');
fs.writeFileSync(manifestPath,JSON.stringify({bundles,removedRules:removed},null,2));
console.log('Bundles',bundles,'obsolete rules removed',removed);
// Editorial pages have static content and do not need carousel/room/system UI styles.
const editorialFiles=['articles.html',...fs.readdirSync(root+'/articles').filter(x=>x.endsWith('.html')).map(x=>'articles/'+x),...fs.readdirSync(root+'/projects').filter(x=>x.endsWith('.html')).map(x=>'projects/'+x)];
const names=new Set();
for(const f of editorialFiles){for(const m of read(f).matchAll(/class=["']([^"']+)["']/g)){m[1].split(/\s+/).forEach(c=>names.add(c));}}
const editorialCss=css.clone();
editorialCss.walkRules(rule=>{if(rule.parent.type==='atrule'&&/keyframes/.test(rule.parent.name))return;const ss=rule.selectors.filter(s=>{const classes=[...s.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map(m=>m[1]);return !classes.length||classes.some(c=>names.has(c));});if(ss.length)rule.selectors=ss;else rule.remove();});
editorialCss.walkAtRules(a=>{if(a.nodes&&a.nodes.length===0)a.remove();});
bundles.editorialCSS=output('articles',editorialCss.toString(),'css');
fs.writeFileSync(manifestPath,JSON.stringify({bundles,removedRules:removed},null,2));

// Update compiled references only. Never overwrite article text or metadata.
function htmlFiles(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 if(e.name==='node_modules'||e.name==='.git')return[];
 const full=path.join(dir,e.name);return e.isDirectory()?htmlFiles(full):e.name.endsWith('.html')?[full]:[];
});}
for(const file of htmlFiles(root)){
 let html=fs.readFileSync(file,'utf8');
 for(const [role,old] of Object.entries(previous)){
  if(bundles[role])html=html.split(old).join(bundles[role]);
 }
 fs.writeFileSync(file,html);
}
const used=new Set();for(const file of htmlFiles(root))for(const m of fs.readFileSync(file,'utf8').matchAll(/build\/[A-Za-z0-9.-]+\.(?:css|js)/g))used.add(m[0]);
for(const name of fs.readdirSync(path.join(root,'build')))if(/\.(css|js)$/.test(name)&&!used.has('build/'+name))fs.unlinkSync(path.join(root,'build',name));
console.log('Build complete. HTML text is preserved; verify static RU fallback after editing content.');
