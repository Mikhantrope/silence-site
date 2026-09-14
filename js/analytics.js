/* SILENCE — analytics.js
   Vendor adapters + attribution. Configure IDs in js/config.js.
   With empty IDs nothing external is loaded, but dataLayer/events and
   attribution still work locally. */
(function (global) {
  'use strict';

  var cfg = (global.SILENCE_CONFIG && global.SILENCE_CONFIG.analytics) || {};
  var DNT = String(global.navigator.doNotTrack || global.doNotTrack || '') === '1';
  var disabled = cfg.respectDoNotTrack !== false && DNT;

  global.dataLayer = global.dataLayer || [];

  function addScript(src, attrs) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    if (attrs) Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    document.head.appendChild(s);
    return s;
  }

  function valid(prefix, value) {
    return typeof value === 'string' && value.indexOf(prefix) === 0 && value.length > prefix.length + 3;
  }

  var useGtm = !disabled && valid('GTM-', cfg.gtmId || '');
  var useGa4 = !useGtm && !disabled && valid('G-', cfg.ga4Id || '');
  var ymId = !disabled && /^\d{4,12}$/.test(String(cfg.yandexMetrikaId || '')) ? Number(cfg.yandexMetrikaId) : null;

  if (useGtm) {
    global.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    addScript('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(cfg.gtmId));
  } else if (useGa4) {
    addScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4Id));
    global.gtag = global.gtag || function () { global.dataLayer.push(arguments); };
    global.gtag('js', new Date());
    global.gtag('config', cfg.ga4Id, { send_page_view: false, anonymize_ip: true });
  }

  if (ymId) {
    global.ym = global.ym || function () { (global.ym.a = global.ym.a || []).push(arguments); };
    global.ym.l = Date.now();
    addScript('https://mc.yandex.ru/metrika/tag.js');
    global.ym(ymId, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: cfg.yandexWebvisor === true
    });
  }

  function cleanParams(obj) {
    var out = {};
    Object.keys(obj || {}).forEach(function (k) {
      var v = obj[k];
      if (v !== undefined && v !== null && v !== '') out[k] = v;
    });
    return out;
  }

  function track(name, detail) {
    var payload = cleanParams(detail || {});
    payload.page_location = payload.page_location || global.location.href;
    payload.page_path = payload.page_path || (global.location.pathname + global.location.search);
    payload.page_title = payload.page_title || document.title;
    payload.event = name;
    global.dataLayer.push(payload);

    if (useGa4 && typeof global.gtag === 'function') {
      var ga = {};
      Object.keys(payload).forEach(function (k) { if (k !== 'event') ga[k] = payload[k]; });
      global.gtag('event', name, ga);
    }
    if (ymId && typeof global.ym === 'function') {
      global.ym(ymId, 'reachGoal', name, payload);
    }
    if (cfg.debug && global.console) console.info('[SILENCE analytics]', name, payload);
  }

  var ATTR_KEY = 'silence_attribution_v2';
  var LEGACY_KEY = 'silence_attribution';
  var campaignKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','yclid','fbclid'];

  function readAttr() {
    try { return JSON.parse(global.localStorage.getItem(ATTR_KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function writeAttr(v) {
    try { global.localStorage.setItem(ATTR_KEY, JSON.stringify(v)); } catch (e) {}
  }
  function campaignFromUrl() {
    var q = new URLSearchParams(global.location.search);
    var out = {};
    campaignKeys.forEach(function (k) { if (q.get(k)) out[k] = q.get(k).slice(0, 500); });
    return out;
  }
  function capture() {
    var now = new Date().toISOString();
    var current = campaignFromUrl();
    var hasCampaign = Object.keys(current).length > 0;
    var state = readAttr();

    if (!state.first) {
      state.first = Object.assign({
        captured_at: now,
        landing_page: global.location.href,
        referrer: document.referrer || ''
      }, current);
    }
    if (hasCampaign || !state.last) {
      state.last = Object.assign({
        captured_at: now,
        landing_page: global.location.href,
        referrer: document.referrer || ''
      }, current);
    }
    state.session_landing = state.session_landing || global.location.href;
    writeAttr(state);

    /* Keep the old compact key for compatibility with older v14 code. */
    try {
      var legacy = {};
      campaignKeys.slice(0, 5).forEach(function (k) {
        if (state.last && state.last[k]) legacy[k] = state.last[k];
      });
      global.localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy));
    } catch (e) {}
    return state;
  }
  function leadFields() {
    var state = readAttr();
    var out = [];
    function add(prefix, obj) {
      if (!obj) return;
      campaignKeys.forEach(function (k) { if (obj[k]) out.push([prefix + k, obj[k]]); });
      if (obj.landing_page) out.push([prefix + 'landing_page', obj.landing_page]);
      if (obj.referrer) out.push([prefix + 'referrer', obj.referrer]);
      if (obj.captured_at) out.push([prefix + 'captured_at', obj.captured_at]);
    }
    add('first_', state.first);
    add('last_', state.last);
    return out;
  }

  global.SILENCE_ANALYTICS = {
    track: track,
    captureAttribution: capture,
    getAttribution: readAttr,
    leadFields: leadFields,
    enabled: { gtm: useGtm, ga4: useGa4, yandex: Boolean(ymId) }
  };

  capture();
}(window));
