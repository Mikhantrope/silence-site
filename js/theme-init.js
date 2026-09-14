/* SILENCE — theme-init.js
   Подключается в <head> ДО css, синхронно (без defer/async), чтобы тема
   применилась раньше первой отрисовки и не было мигания. В прототипе это
   было инлайн-скриптом — под CSP script-src 'self' инлайн без хеша не
   выполнится, поэтому вынесено в отдельный файл. */
(function () {
  'use strict';
  var KEY = 'silence.theme';
  var stored = null;
  try { stored = window.localStorage.getItem(KEY); } catch (e) { /* приватный режим */ }
  var theme = stored === 'light' || stored === 'dark'
    ? stored
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
})();
