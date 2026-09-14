/* SILENCE — data.pricing.js
   В исходных материалах нет ни одной цены. Ничего не выдумываю: структура
   тарифов заполнена заглушками (null), ready: false. Блок калькулятора
   (ui.pricing.js) при таком состоянии файла НЕ рендерится вообще — секция
   остаётся скрытой (node.hidden = true), а не показывает нули или "---".

   Чтобы включить блок «Сколько это стоит»:
   1) заполнить хотя бы один диапазон в perSqm парой [мин, макс] тенге за м²;
   2) выставить ready: true.
   Калькулятор сразу же появится и начнёт считать. */
window.PRICING = {
  ready: false,
  currency: '\u20B8', // тенге
  /* диапазон [мин, макс] тенге за м² по месту применения — те же значения
     place, что и в CATALOG.systems (wall/ceiling/partition). Декор
     (place отсутствует) в этот калькулятор не входит — там штучный расчёт
     по количеству и формату панелей, не по площади стены. */
  perSqm: {
    partition: null, // {{ЗАПОЛНИТЬ: диапазон тг/м² для перегородок}}
    ceiling: null,   // {{ЗАПОЛНИТЬ: диапазон тг/м² для потолка}}
    floor: null,     // {{ЗАПОЛНИТЬ: диапазон тг/м² для пола}}
    wall: null       // {{ЗАПОЛНИТЬ: диапазон тг/м² для стен}}
  }
};

/* Чистая функция расчёта — не зависит от DOM, поэтому легко проверяется
   отдельно. Возвращает null, если по месту нет данных или блок выключен. */
window.SILENCE_CALC_PRICE = function (place, area) {
  var cfg = window.PRICING;
  if (!cfg || !cfg.ready) return null;
  var range = cfg.perSqm[place];
  if (!range || range[0] == null || range[1] == null) return null;
  var a = Number(area);
  if (!a || a <= 0) return null;
  return { lo: Math.round(range[0] * a), hi: Math.round(range[1] * a), currency: cfg.currency };
};
