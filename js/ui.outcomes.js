/* SILENCE — ui.outcomes.js
   Главная: блок «что изменится после монтажа».
   Это не обещание абсолютной тишины, а четыре понятных результата,
   которые помогают клиенту перейти от проблемы к расчёту. */
(function (global) {
  'use strict';

  var ITEMS = [
    { num: '01', titleKey: 'outcomeNoDemo', descKey: 'outcomeNoDemoDesc' },
    { num: '02', titleKey: 'outcomeFit', descKey: 'outcomeFitDesc' },
    { num: '03', titleKey: 'outcomeInstall', descKey: 'outcomeInstallDesc' },
    { num: '04', titleKey: 'outcomeDocs', descKey: 'outcomeDocsDesc' }
  ];

  function render(node) {
    var C = global.SILENCE_CORE;
    if (!C) return;

    var lang = C.getLang();
    var t = function (key) { return C.t(key, lang); };

    node.innerHTML = '';

    var wrap = C.el('div', { class: 'container outcomes' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [t('outcomesTitle')]),
      C.el('p', { class: 'lead' }, [t('outcomesLead')])
    ]));

    var grid = C.el('div', { class: 'outcomes-grid' });
    ITEMS.forEach(function (item) {
      grid.appendChild(C.el('article', { class: 'outcome-card' }, [
        C.el('span', { class: 'outcome-card__num u-accent', 'aria-hidden': 'true' }, [item.num]),
        C.el('h3', { class: 'outcome-card__title' }, [t(item.titleKey)]),
        C.el('p', { class: 'outcome-card__desc' }, [t(item.descKey)])
      ]));
    });
    wrap.appendChild(grid);

    wrap.appendChild(C.el('a', {
      class: 'btn btn--secondary outcomes__cta',
      href: 'contacts.html',
      'data-analytics': 'outcomes_cta_click'
    }, [t('cta')]));

    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.outcomes = render;
}(window));
