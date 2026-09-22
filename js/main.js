/* GG Lab — taslak site etkileşimleri */
(function () {
  'use strict';

  /* i18n köprüsü: i18n.js yüklenmemişse Türkçe yedeğe düşer */
  var FALLBACK = {
    'a11y.menuOpen': 'Menüyü aç',
    'a11y.menuClose': 'Menüyü kapat',
    'form.err': 'Lütfen ad, geçerli bir e-posta ve mesaj alanlarını doldur.',
    'form.ok': 'Teşekkürler! (Taslak site — mesaj henüz bir yere gönderilmiyor.)'
  };
  function tr(key) {
    return (window.I18N && window.I18N.t(key)) || FALLBACK[key] || '';
  }

  /* --- yıl --- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* --- header scroll durumu --- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- mobil menü --- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', tr(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* --- aktif menü bağlantısı --- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a:not(.btn)'));
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { spy.observe(s); });

  /* --- scroll reveal ---
     IntersectionObserver yerine scroll tabanlı kontrol: sayfa büyük adımlarla
     (jump scroll, anchor, yenileme sonrası konum) kaydığında atlanan öğeler
     görünmez kalmasın. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var ticking = false;
    function checkReveals() {
      ticking = false;
      var vh = window.innerHeight;
      var batch = 0;
      for (var i = reveals.length - 1; i >= 0; i--) {
        var el = reveals[i];
        var top = el.getBoundingClientRect().top;
        if (top < vh * 0.92) {
          (function (node, delay) {
            setTimeout(function () { node.classList.add('in'); }, delay);
          })(el, batch * 70);
          batch++;
          reveals.splice(i, 1);
        }
      }
    }
    function requestCheck() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkReveals);
    }
    checkReveals();
    window.addEventListener('scroll', requestCheck, { passive: true });
    window.addEventListener('resize', requestCheck);
    window.addEventListener('load', requestCheck);
  }

  /* --- galeri lightbox --- */
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var idx = 0;
  var lastFocus = null;

  function show(i) {
    idx = (i + shots.length) % shots.length;
    var s = shots[idx];
    lbImg.src = s.dataset.full;
    lbImg.alt = s.dataset.caption || '';
    lbCap.textContent = s.dataset.caption || '';
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }
  function close() {
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  shots.forEach(function (s, i) {
    s.addEventListener('click', function () { open(i); });
  });
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function () { show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { show(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  /* --- iletişim formu (taslak: sunucuya gitmez) --- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['name', 'email', 'message'].forEach(function (id) {
      var el = document.getElementById(id);
      var bad = !el.value.trim() || (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
      el.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    if (!ok) {
      note.textContent = tr('form.err');
      note.className = 'form-note err';
      return;
    }
    note.textContent = tr('form.ok');
    note.className = 'form-note ok';
    form.reset();
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- scroll ilerleme çubuğu --- */
  var bar = document.getElementById('scrollProgress');
  if (bar && !reduceMotion) {
    var barTicking = false;
    function drawBar() {
      barTicking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
    }
    function requestBar() {
      if (barTicking) return;
      barTicking = true;
      requestAnimationFrame(drawBar);
    }
    drawBar();
    window.addEventListener('scroll', requestBar, { passive: true });
    window.addEventListener('resize', requestBar);
  }

  /* --- sayı sayaçları: görünür olunca hedefe kadar say --- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    if (reduceMotion) {
      counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
    } else {
      counters.forEach(function (el) { el.textContent = '0'; });
      var countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          countObs.unobserve(e.target);
          var el = e.target;
          var target = parseInt(el.getAttribute('data-count'), 10) || 0;
          var dur = 1100;
          var t0 = 0;
          function step(now) {
            if (!t0) t0 = now;
            var k = Math.min(1, (now - t0) / dur);
            /* ease-out: sona doğru yavaşlar */
            el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { countObs.observe(el); });
    }
  }

  /* --- hero hafif parallax --- */
  var hero = document.querySelector('.hud-hero');
  if (hero && !reduceMotion) {
    var heroTicking = false;
    var nextHeroX = 0;
    var nextHeroY = 0;

    function drawHeroParallax() {
      heroTicking = false;
      hero.style.setProperty('--hero-x', nextHeroX.toFixed(2) + 'px');
      hero.style.setProperty('--hero-y', nextHeroY.toFixed(2) + 'px');
    }

    function requestHeroParallax(e) {
      var rect = hero.getBoundingClientRect();
      nextHeroX = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      nextHeroY = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
      if (heroTicking) return;
      heroTicking = true;
      requestAnimationFrame(drawHeroParallax);
    }

    function resetHeroParallax() {
      nextHeroX = 0;
      nextHeroY = 0;
      requestAnimationFrame(drawHeroParallax);
    }

    hero.addEventListener('pointermove', requestHeroParallax, { passive: true });
    hero.addEventListener('pointerleave', resetHeroParallax);
  }
})();
