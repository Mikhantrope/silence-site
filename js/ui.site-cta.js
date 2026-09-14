/* SILENCE — ui.site-cta.js
   Повторный CTA между контентными блоками. */
(function (global) {
  'use strict';

  function render(node) {
    var C = global.SILENCE_CORE;
    if (!C) return;
    var lang = C.getLang();
    var t = function (key) { return C.t(key, lang); };
    node.innerHTML = '';

    var wrap = C.el('div', { class: 'container' });
    var band = C.el('div', { class: 'cta-band cta-band--quiet' }, [
      C.el('div', { class: 'cta-band__copy' }, [
        C.el('p', { class: 'caption u-accent cta-band__eyebrow' }, [t('ctaBandEyebrow')]),
        C.el('h2', {}, [t('ctaBandTitle')]),
        C.el('p', { class: 'lead' }, [t('ctaBandLead')])
      ]),
      C.el('div', { class: 'cta-band__actions' }, [
        C.el('a', { class: 'btn btn--primary', href: 'contacts.html', 'data-analytics': 'cta_mid_click' }, [t('cta')]),
        C.el('a', { class: 'btn btn--secondary', href: 'projects.html', 'data-analytics': 'cta_mid_projects_click' }, [t('galMore')])
      ])
    ]);
    wrap.appendChild(band);
    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES['site-cta'] = render;
}(window));
