/* SILENCE v25 — image-edge navigation. No visible arrows.
   Edge buttons live INSIDE slides so native touch scrolling keeps working. */
(function (global) {
  'use strict';

  var COPY = {
    ru: { prev: 'Предыдущий слайд', next: 'Следующий слайд', slide: 'Слайд', of: 'из', carousel: 'Карусель материалов SILENCE' },
    kz: { prev: 'Алдыңғы слайд', next: 'Келесі слайд', slide: 'Слайд', of: '/', carousel: 'SILENCE материалдар каруселі' },
    en: { prev: 'Previous slide', next: 'Next slide', slide: 'Slide', of: 'of', carousel: 'SILENCE materials carousel' }
  };

  function initCarousel(root) {
    if (!root || root._silenceCarouselReady) return;
    var track = root.querySelector('[data-carousel-track]');
    var slides = track ? Array.prototype.slice.call(track.querySelectorAll('.presentation-slide')) : [];
    if (!track || !slides.length) return;
    root._silenceCarouselReady = true;
    root.setAttribute('data-carousel-version', '25');

    /* Also handles an older index.html that still contains arrow buttons. */
    Array.prototype.forEach.call(root.querySelectorAll('[data-carousel-prev], [data-carousel-next], .presentation-carousel__nav'), function (el) {
      el.remove();
    });
    var dotsHost = root.querySelector('[data-carousel-dots]');
    if (!dotsHost) {
      dotsHost = document.createElement('div');
      dotsHost.className = 'presentation-carousel__dots';
      dotsHost.setAttribute('data-carousel-dots', '');
      root.appendChild(dotsHost);
    }
    dotsHost.innerHTML = '';

    var motionQuery = global.matchMedia('(prefers-reduced-motion: reduce)');
    var index = 0, timer = null, settleTimer = null, resizeFrame = null;
    var hovered = false, focused = false, visible = false, dragging = false;
    var pointerStart = null, suppressClickUntil = 0;
    var controls = [], dots = [];
    var status = document.createElement('span');
    status.className = 'presentation-carousel__sr-only';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    root.appendChild(status);
    track.setAttribute('tabindex', '0');
    track.setAttribute('role', 'group');

    function copy() {
      var lang = global.SILENCE_CORE ? global.SILENCE_CORE.getLang() : 'ru';
      return COPY[lang] || COPY.ru;
    }
    function targetLeft(i) {
      var tr = track.getBoundingClientRect();
      var sr = slides[i].getBoundingClientRect();
      var pad = parseFloat(global.getComputedStyle(track).paddingLeft) || 0;
      var wanted = track.scrollLeft + sr.left - tr.left - track.clientLeft - pad;
      return Math.max(0, Math.min(wanted, track.scrollWidth - track.clientWidth));
    }
    function syncUI(announce) {
      var c = copy();
      root.setAttribute('data-carousel-index', String(index));
      track.setAttribute('aria-label', c.carousel);
      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-label', c.slide + ' ' + (i + 1) + ' ' + c.of + ' ' + slides.length);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        Array.prototype.forEach.call(slide.querySelectorAll('a'), function (a) { a.tabIndex = active ? 0 : -1; });
        controls[i].prev.tabIndex = active ? 0 : -1;
        controls[i].next.tabIndex = active ? 0 : -1;
        controls[i].prev.setAttribute('aria-label', c.prev);
        controls[i].next.setAttribute('aria-label', c.next);
        dots[i].setAttribute('aria-label', c.slide + ' ' + (i + 1));
        dots[i].setAttribute('aria-pressed', active ? 'true' : 'false');
        dots[i].classList.toggle('presentation-carousel__dot--active', active);
      });
      if (announce) status.textContent = c.slide + ' ' + (index + 1) + ' ' + c.of + ' ' + slides.length;
    }
    function stop() {
      if (timer !== null) { global.clearInterval(timer); timer = null; }
    }
    function start() {
      stop();
      if (slides.length < 2 || motionQuery.matches || hovered || focused || !visible || dragging || document.hidden) return;
      timer = global.setInterval(function () { show(index + 1, false, true); }, 5000);
    }
    function show(i, userAction, animate) {
      var focusedEdge = document.activeElement && document.activeElement.getAttribute('data-slide-edge');
      index = (i + slides.length) % slides.length;
      syncUI(userAction);
      if (focusedEdge && controls[index][focusedEdge]) {
        controls[index][focusedEdge].focus({ preventScroll: true });
      }
      var smooth = animate && !motionQuery.matches;
      /* Temporarily override CSS smooth scrolling for initial positioning/resize. */
      if (!smooth) track.style.scrollBehavior = 'auto';
      track.scrollTo({ left: targetLeft(index), behavior: smooth ? 'smooth' : 'auto' });
      if (!smooth) track.style.removeProperty('scroll-behavior');
      if (userAction && global.SILENCE_TRACK) {
        global.SILENCE_TRACK('presentation_slide_view', { value: String(index + 1), source: 'manual' });
      }
    }
    function settled() {
      var closest = 0, best = Infinity;
      slides.forEach(function (_, i) {
        var d = Math.abs(targetLeft(i) - track.scrollLeft);
        if (d < best) { best = d; closest = i; }
      });
      if (closest !== index) { index = closest; syncUI(false); }
    }
    function createEdge(slide, slideIndex, direction) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'presentation-slide__edge presentation-slide__edge--' + direction;
      button.setAttribute('data-slide-edge', direction);
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (Date.now() < suppressClickUntil) return;
        /* A visible edge of the adjacent photo opens THAT slide first. */
        var target = slideIndex === index ? index + (direction === 'next' ? 1 : -1) : slideIndex;
        show(target, true, true);
        start();
      });
      (slide.querySelector('.presentation-slide__media') || slide).appendChild(button);
      return button;
    }
    slides.forEach(function (slide, i) {
      Array.prototype.forEach.call(slide.querySelectorAll('.presentation-slide__edge'), function (el) { el.remove(); });
      Array.prototype.forEach.call(slide.querySelectorAll('img'), function (img) { img.draggable = false; });
      controls.push({ prev: createEdge(slide, i, 'prev'), next: createEdge(slide, i, 'next') });
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'presentation-carousel__dot';
      dot.addEventListener('click', function () { show(i, true, true); start(); });
      dotsHost.appendChild(dot);
      dots.push(dot);
    });
    track.addEventListener('scroll', function () {
      global.clearTimeout(settleTimer);
      settleTimer = global.setTimeout(settled, 140);
    }, { passive: true });
    track.addEventListener('keydown', function (e) {
      var n;
      if (e.key === 'ArrowRight') n = index + 1;
      else if (e.key === 'ArrowLeft') n = index - 1;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = slides.length - 1;
      else return;
      e.preventDefault();
      show(n, true, true);
      start();
    });
    track.addEventListener('pointerdown', function (e) {
      pointerStart = { x: e.clientX, y: e.clientY };
      dragging = true;
      stop();
    }, { passive: true });
    function endPointer(e) {
      if (pointerStart && (e.type === 'pointercancel' || Math.abs(e.clientX - pointerStart.x) > 10 || Math.abs(e.clientY - pointerStart.y) > 10)) {
        suppressClickUntil = Date.now() + 400;
      }
      pointerStart = null;
      dragging = false;
      start();
    }
    global.addEventListener('pointerup', endPointer, { passive: true });
    global.addEventListener('pointercancel', endPointer, { passive: true });
    root.addEventListener('mouseenter', function () { hovered = true; stop(); });
    root.addEventListener('mouseleave', function () { hovered = false; start(); });
    root.addEventListener('focusin', function () { focused = true; stop(); });
    root.addEventListener('focusout', function (e) {
      focused = !!(e.relatedTarget && root.contains(e.relatedTarget));
      start();
    });
    document.addEventListener('visibilitychange', start);
    document.addEventListener('silence:lang', function () { syncUI(false); });
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', start);
    else motionQuery.addListener(start);
    if (global.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        start();
      }, { threshold: 0.15 }).observe(track);
    } else { visible = true; }
    function resized() {
      if (resizeFrame !== null) global.cancelAnimationFrame(resizeFrame);
      resizeFrame = global.requestAnimationFrame(function () { show(index, false, false); });
    }
    if (global.ResizeObserver) new ResizeObserver(resized).observe(track);
    else global.addEventListener('resize', resized);
    syncUI(false);
    show(0, false, false);
    start();
  }
  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-presentation-carousel]'), initCarousel);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}(window));
