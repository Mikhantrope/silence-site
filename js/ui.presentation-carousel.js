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

    function getLeft(i) {
      return slides[i] ? slides[i].offsetLeft - track.offsetLeft : 0;
    }

    function renderDots() {
      if (!dotsHost) return;
      Array.prototype.forEach.call(dotsHost.children, function (dot, idx) {
        var active = idx === index;
        dot.classList.toggle('presentation-carousel__dot--active', active);
        dot.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    function show(i, behavior) {
      index = (i + slides.length) % slides.length;
      track.scrollTo({ left: getLeft(index), behavior: behavior || 'smooth' });
      renderDots();
      if (global.SILENCE_TRACK) global.SILENCE_TRACK('presentation_slide_view', { value: String(index + 1) });
    }

    function stop() {
      if (timer) { global.clearInterval(timer); timer = null; }
    }

    function start() {
      stop();
      if (reduceMotion || slides.length < 2) return;
      timer = global.setInterval(function () { show(index + 1, 'smooth'); }, 5000);
    }

    function findClosestIndex() {
      var current = track.scrollLeft;
      var best = 0;
      var bestDelta = Infinity;
      slides.forEach(function (slide, idx) {
        var delta = Math.abs(getLeft(idx) - current);
        if (delta < bestDelta) {
          bestDelta = delta;
          best = idx;
        }
      });
      index = best;
      renderDots();
    }

    if (dotsHost) {
      dotsHost.innerHTML = '';
      slides.forEach(function (_, idx) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'presentation-carousel__dot' + (idx === 0 ? ' presentation-carousel__dot--active' : '');
        dot.setAttribute('aria-label', 'Слайд ' + (idx + 1));
        dot.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
        dot.addEventListener('click', function () { show(idx, 'smooth'); start(); });
        dotsHost.appendChild(dot);
      });
    }

    if (prev) prev.addEventListener('click', function () { show(index - 1, 'smooth'); start(); });
    if (next) next.addEventListener('click', function () { show(index + 1, 'smooth'); start(); });

    var scrollTimer = null;
    track.addEventListener('scroll', function () {
      if (scrollTimer) global.clearTimeout(scrollTimer);
      scrollTimer = global.setTimeout(findClosestIndex, 80);
    }, { passive: true });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    show(0, 'auto');
    start();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCarousel(document.querySelector('[data-presentation-carousel]'));
  });
}(window));
