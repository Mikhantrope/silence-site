(function (global) {
  'use strict';

  function initCarousel(root) {
    if (!root || root._silenceCarouselReady) return;
    root._silenceCarouselReady = true;

    var track = root.querySelector('[data-carousel-track]');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.presentation-slide'));
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    var dotsHost = root.querySelector('[data-carousel-dots]');
    if (!track || !slides.length) return;

    var index = 0;
    var timer = null;
    var reduceMotion = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      index = (i + slides.length) % slides.length;
      var viewport = root.querySelector('.presentation-carousel__viewport');
      var target = slides[index].offsetLeft;
      var maxShift = Math.max(0, track.scrollWidth - (viewport ? viewport.clientWidth : 0));
      target = Math.min(target, maxShift);
      track.style.transform = 'translateX(' + (-target) + 'px)';
      if (dotsHost) {
        Array.prototype.forEach.call(dotsHost.children, function (dot, idx) {
          var active = idx === index;
          dot.classList.toggle('presentation-carousel__dot--active', active);
          dot.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      }
      if (global.SILENCE_TRACK) global.SILENCE_TRACK('presentation_slide_view', { value: String(index + 1) });
    }

    function stop() {
      if (timer) { global.clearInterval(timer); timer = null; }
    }
    function start() {
      stop();
      if (reduceMotion) return;
      timer = global.setInterval(function () { show(index + 1); }, 6000);
    }

    if (dotsHost) {
      dotsHost.innerHTML = '';
      slides.forEach(function (slide, idx) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'presentation-carousel__dot' + (idx === 0 ? ' presentation-carousel__dot--active' : '');
        dot.setAttribute('aria-label', 'Слайд ' + (idx + 1));
        dot.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
        dot.addEventListener('click', function () { show(idx); start(); });
        dotsHost.appendChild(dot);
      });
    }

    if (prev) prev.addEventListener('click', function () { show(index - 1); start(); });
    if (next) next.addEventListener('click', function () { show(index + 1); start(); });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    show(0);
    start();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('[data-presentation-carousel]');
    initCarousel(root);
  });
}(window));
