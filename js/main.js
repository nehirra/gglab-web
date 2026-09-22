/* GG Lab — site etkileşimleri
   type="module" olarak yüklenir: kendi kapsamı var, strict mode varsayılan,
   sayfa ayrıştırıldıktan sonra çalışır. */

/* i18n köprüsü: i18n.js yüklenmemişse Türkçe yedeğe düşer */
const FALLBACK = {
  'a11y.menuOpen': 'Menüyü aç',
  'a11y.menuClose': 'Menüyü kapat',
  'form.err': 'Lütfen ad, geçerli bir e-posta ve mesaj alanlarını doldur.',
  'form.ok': 'Teşekkürler! (Taslak site — mesaj henüz bir yere gönderilmiyor.)'
};
const tr = (key) => window.I18N?.t(key) || FALLBACK[key] || '';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Olay başına en fazla bir kare çalıştırır (scroll/resize işleyicileri için) */
function perFrame(fn) {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; fn(); });
  };
}

/* --- yıl --- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/* --- partner bantları ---
   Liste HTML'de tek yerde durur (#partnerList). Diğer bantlar oradan
   kopyalanır: data-marquee-reverse sırayı ters çevirir, data-marquee-plain
   bölüme özgü .partner sınıfını kaldırır (hero şeridi). */
$$('[data-marquee-from]').forEach((m) => {
  const source = document.getElementById(m.dataset.marqueeFrom);
  if (!source) return;
  const track = source.cloneNode(true);
  track.removeAttribute('id');
  const items = [...track.children];
  if (m.hasAttribute('data-marquee-reverse')) track.replaceChildren(...items.reverse());
  if (m.hasAttribute('data-marquee-plain')) items.forEach((li) => li.classList.remove('partner'));
  m.append(track);
});

/* Kesintisiz döngü için her bant, ekran okuyucudan gizli ikinci bir şerit alır:
   ilk şerit translateX(-100%) ile çıkarken kopyası yerine geçer. */
$$('[data-marquee]').forEach((m) => {
  const track = $('.marquee-track', m);
  if (!track) return;
  const copy = track.cloneNode(true);
  copy.removeAttribute('id');
  copy.setAttribute('aria-hidden', 'true');
  m.append(copy);
});

/* --- header scroll durumu --- */
const header = document.getElementById('siteHeader');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --- mobil menü + aktif menü bağlantısı --- */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
if (nav && navToggle) {
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', tr(open ? 'a11y.menuClose' : 'a11y.menuOpen'));
  };
  navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
}
if (nav) {
  const navLinks = $$('a:not(.btn)', nav);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => spy.observe(s));
}

/* --- scroll reveal ---
   IntersectionObserver yerine scroll tabanlı kontrol: sayfa büyük adımlarla
   (jump scroll, anchor, yenileme sonrası konum) kaydığında atlanan öğeler
   görünmez kalmasın. */
const reveals = $$('.reveal');
if (reduceMotion) {
  reveals.forEach((el) => el.classList.add('in'));
} else {
  const checkReveals = () => {
    const vh = window.innerHeight;
    let batch = 0;
    for (let i = reveals.length - 1; i >= 0; i--) {
      const el = reveals[i];
      if (el.getBoundingClientRect().top < vh * 0.92) {
        setTimeout(() => el.classList.add('in'), batch * 70);
        batch++;
        reveals.splice(i, 1);
      }
    }
  };
  const requestCheck = perFrame(checkReveals);
  checkReveals();
  window.addEventListener('scroll', requestCheck, { passive: true });
  window.addEventListener('resize', requestCheck);
  window.addEventListener('load', requestCheck);
}

/* --- galeri lightbox --- */
const shots = $$('.shot');
const lb = document.getElementById('lightbox');
if (lb && shots.length) {
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  let idx = 0;
  let lastFocus = null;

  const show = (i) => {
    idx = (i + shots.length) % shots.length;
    const { full, caption = '' } = shots[idx].dataset;
    lbImg.src = full;
    lbImg.alt = caption;
    lbCap.textContent = caption;
  };
  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };
  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus();
  };

  shots.forEach((s, i) => s.addEventListener('click', () => open(i)));
  lbClose.addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => show(idx - 1));
  document.getElementById('lbNext').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
}

/* --- iletişim formu (taslak: sunucuya gitmez; form şu an gizli) --- */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form && note) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    ['name', 'email', 'message'].forEach((id) => {
      const el = document.getElementById(id);
      const bad = !el.value.trim() || (id === 'email' && !EMAIL_RE.test(el.value));
      el.classList.toggle('invalid', bad);
      if (bad) ok = false;
    });
    note.textContent = tr(ok ? 'form.ok' : 'form.err');
    note.className = 'form-note ' + (ok ? 'ok' : 'err');
    if (ok) form.reset();
  });
}

/* --- scroll ilerleme çubuğu --- */
const bar = document.getElementById('scrollProgress');
if (bar && !reduceMotion) {
  const drawBar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.transform = `scaleX(${p})`;
  };
  const requestBar = perFrame(drawBar);
  drawBar();
  window.addEventListener('scroll', requestBar, { passive: true });
  window.addEventListener('resize', requestBar);
}

/* --- sayı sayaçları: görünür olunca hedefe kadar say --- */
const counters = $$('[data-count]');
if (reduceMotion) {
  counters.forEach((el) => { el.textContent = el.dataset.count; });
} else if (counters.length) {
  counters.forEach((el) => { el.textContent = '0'; });
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target: el }) => {
      if (!isIntersecting) return;
      countObs.unobserve(el);
      const target = parseInt(el.dataset.count, 10) || 0;
      const dur = 1100;
      let t0 = 0;
      const step = (now) => {
        if (!t0) t0 = now;
        const k = Math.min(1, (now - t0) / dur);
        /* ease-out: sona doğru yavaşlar */
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  counters.forEach((el) => countObs.observe(el));
}

/* --- hero hafif parallax --- */
const hero = $('.hud-hero');
if (hero && !reduceMotion) {
  let x = 0;
  let y = 0;
  const draw = perFrame(() => {
    hero.style.setProperty('--hero-x', x.toFixed(2) + 'px');
    hero.style.setProperty('--hero-y', y.toFixed(2) + 'px');
  });
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    draw();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { x = 0; y = 0; draw(); });
}
