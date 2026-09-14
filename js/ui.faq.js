/* SILENCE — ui.faq.js
   index.html, блок «Возможно, вы думаете» (маркетинговое ТЗ, Шаг 9): 8
   вопросов-ответов из SITE.faq аккордеоном (нативные <details>/<summary> —
   доступно без лишнего JS). Разметка FAQPage (JSON-LD) статична в <head>
   index.html и генерируется из тех же данных — см. Проверку шага. */
(function (global) {
  'use strict';

  function render(node) {
    var C = global.SILENCE_CORE, SITE = global.SITE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [t('faqTitle')]),
      C.el('p', { class: 'lead' }, [t('faqLead')])
    ]));

    var list = C.el('div', { class: 'faq-list' });
    SITE.faq.forEach(function (item, i) {
      var copy = item[lang] || item.ru;
      list.appendChild(C.el('details', { class: 'faq-item' }, [
        C.el('summary', { class: 'faq-item__q', 'data-analytics': 'faq_toggle', 'data-analytics-value': String(i) }, [copy.q]),
        C.el('p', { class: 'faq-item__a' }, [copy.a])
      ]));
    });
    wrap.appendChild(list);
    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.faq = render;
}(window));
