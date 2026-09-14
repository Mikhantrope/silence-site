/* SILENCE — ui.process.js
   index.html, блок «Что входит в работу» (маркетинговое ТЗ, Шаг 5): пять
   этапов замер → расчёт → материалы → монтаж → сдача. Ни один этап не
   называет срок числом — реальных сроков нет в исходных данных, поэтому
   вместо выдуманных цифр — одна честная строка над этапами: сроки зависят
   от площади и объёма, точный график — после замера. */
(function (global) {
  'use strict';

  var STEPS = [
    { titleKey: 'processMeasure', descKey: 'processMeasureDesc' },
    { titleKey: 'processCalc', descKey: 'processCalcDesc' },
    { titleKey: 'processMaterials', descKey: 'processMaterialsDesc' },
    { titleKey: 'processInstall', descKey: 'processInstallDesc' },
    { titleKey: 'processHandover', descKey: 'processHandoverDesc' }
  ];

  function render(node) {
    var C = global.SILENCE_CORE;
    var lang = C.getLang();
    var t = function (k) { return C.t(k, lang); };

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container' });
    wrap.appendChild(C.el('div', { class: 'section-heading' }, [
      C.el('h2', {}, [t('processTitle')]),
      C.el('p', { class: 'lead' }, [t('processLead')])
    ]));

    var list = C.el('ol', { class: 'process-list' });
    STEPS.forEach(function (step, i) {
      list.appendChild(C.el('li', { class: 'process-step' }, [
        C.el('span', { class: 'process-step__num u-accent', 'aria-hidden': 'true' }, [String(i + 1)]),
        C.el('span', { class: 'process-step__title' }, [t(step.titleKey)]),
        C.el('span', { class: 'process-step__desc' }, [t(step.descKey)])
      ]));
    });
    wrap.appendChild(list);
    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.process = render;
}(window));
