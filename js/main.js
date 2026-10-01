/* GG Lab — site etkileşimleri
   type="module" olarak yüklenir: kendi kapsamı var, strict mode varsayılan,
   sayfa ayrıştırıldıktan sonra çalışır. */

/* i18n köprüsü: i18n.js yüklenmemişse Türkçe yedeğe düşer */
const FALLBACK = {
  'a11y.menuOpen': 'Menüyü aç',
  'a11y.menuClose': 'Menüyü kapat',
  'form.err': 'Lütfen ad, geçerli bir e-posta ve mesaj alanlarını doldur.',
  'form.ok': 'Teşekkürler! (Taslak site — mesaj henüz bir yere gönderilmiyor.)',
  'nl.err': 'Geçerli bir e-posta adresi yaz.',
  'nl.ok': 'Kaydın alındı, teşekkürler!',
  'nl.fail': 'Bir sorun oldu, biraz sonra tekrar dene.',
  'nl.soon': 'Bülten çok yakında açılıyor! O zamana kadar duyurular Discord\'da.'
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

/* --- partner bandı ---
   Kesintisiz döngü için şerit en az bant genişliği kadar olmalı: liste kısa
   kalırsa (geniş ekran, az logo) öğeler ekran okuyucudan gizli kopyalarla
   çoğaltılır, yoksa şeridin sonunda boşluk kalır. Ardından bant, gizli ikinci
   bir şerit alır: ilki translateX(-100%) ile çıkarken kopyası yerine geçer.
   Tur süresi şerit genişliğinden hesaplanır: bant her ekranda aynı hızda akar. */
const MARQUEE_SPEED = 20; /* px/sn — yavaşlatmak için küçült */
$$('[data-marquee]').forEach((m) => {
  const track = $('.marquee-track', m);
  if (!track) return;
  const originals = [...track.children];
  const copy = track.cloneNode(true);
  copy.setAttribute('aria-hidden', 'true');
  m.append(copy);

  const fill = () => {
    const need = m.clientWidth;
    for (const t of [track, copy]) {
      /* ölçüm min-width:100%'den etkilenmesin diye geçici olarak kapatılır */
      t.style.minWidth = '0';
      let guard = 0;
      while (t.scrollWidth < need && guard++ < 10) {
        originals.forEach((li) => {
          const extra = li.cloneNode(true);
          extra.setAttribute('aria-hidden', 'true');
          t.append(extra);
        });
      }
      t.style.minWidth = '';
    }
    m.style.setProperty('--marquee-dur', (track.scrollWidth / MARQUEE_SPEED).toFixed(1) + 's');
  };
  fill();
  window.addEventListener('resize', perFrame(fill));
  /* logolar yüklenince genişlik değişir */
  $$('img', track).forEach((img) => { if (!img.complete) img.addEventListener('load', fill, { once: true }); });
});

/* --- üyelik arka planı: bölüme ~1 ekran kala yüklenir --- */
const joinSec = document.getElementById('uyelik');
if (joinSec) {
  const bgObs = new IntersectionObserver((entries) => {
    if (!entries.some((en) => en.isIntersecting)) return;
    joinSec.classList.add('bg-in');
    bgObs.disconnect();
  }, { rootMargin: '100% 0px' });
  bgObs.observe(joinSec);
}

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
  /* Game Jam ekran görüntüleri galerideki aynı fotoğrafı açar; JS yoksa bağlantı fotoğrafın kendisine gider */
  $$('[data-shot]').forEach((a) => a.addEventListener('click', (e) => {
    const i = shots.findIndex((s) => s.dataset.full.endsWith('/' + a.dataset.shot + '.webp'));
    if (i < 0) return;
    e.preventDefault();
    open(i);
  }));
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

/* --- bülten ---
   action yoksa servis henüz bağlı değil: e-posta toplanmaz, "yakında" notu çıkar.
   action verilince form verisi oraya POST edilir (Formspree, kendi sunucumuz vb.). */
const nlForm = document.getElementById('newsletterForm');
const nlNote = document.getElementById('nlNote');
if (nlForm && nlNote) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const input = nlForm.elements.email;
  const say = (key, ok) => {
    nlNote.textContent = tr(key);
    nlNote.className = 'form-note ' + (ok ? 'ok' : 'err');
  };
  nlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bad = !EMAIL_RE.test(input.value.trim());
    input.classList.toggle('invalid', bad);
    if (bad) { say('nl.err', false); input.focus(); return; }
    const endpoint = nlForm.getAttribute('action');
    if (!endpoint) { say('nl.soon', true); return; }
    try {
      const res = await fetch(endpoint, {
        method: 'POST', body: new FormData(nlForm), headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error(res.status);
      say('nl.ok', true);
      nlForm.reset();
    } catch {
      say('nl.fail', false);
    }
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

/* --- kart spotlight: imleci takip eden ışık halkası ---
   Her .spotlight kartı kendi --mx/--my'sini tutar; CSS'teki radial-gradient
   bu konumu okuyup ışığı fareyle birlikte kaydırır. */
const spotlights = $$('.spotlight');
if (spotlights.length && !reduceMotion) {
  spotlights.forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
      el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
    }, { passive: true });
  });
}

/* --- hero mini oyunu: düşen tuşları yakala, puan topla ---
   Tuşa tıklamak/dokunmak, klavyede A/B/X/Y'ye ya da bağlı bir Xbox
   kumandasında aynı tuşlara basmak, ekrandaki eşleşen tuşu patlatır. */
const xbs = $$('.hud-hero .xb');
const scoreBox = document.getElementById('xbScore');
if (hero && xbs.length && scoreBox) {
  const scoreVal = $('.xb-score-val', scoreBox);
  const POINTS = 10;
  let score = 0;

  const inView = (el) => {
    const r = el.getBoundingClientRect();
    const h = hero.getBoundingClientRect();
    return r.bottom > Math.max(0, h.top) && r.top < Math.min(window.innerHeight, h.bottom);
  };

  const popup = (x, y) => {
    const h = hero.getBoundingClientRect();
    const fx = document.createElement('span');
    fx.className = 'xb-plus';
    fx.textContent = '+' + POINTS;
    fx.style.left = (x - h.left) + 'px';
    fx.style.top = (y - h.top) + 'px';
    hero.append(fx);
    fx.addEventListener('animationend', () => fx.remove());
    if (reduceMotion) setTimeout(() => fx.remove(), 700);
  };

  const hit = (el, x, y) => {
    if (el.classList.contains('xb-hit')) return;
    if (x == null) {
      const r = el.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    el.classList.add('xb-hit');
    /* tuş bir sonraki düşüşünde (döngü başında) geri gelir */
    const back = () => el.classList.remove('xb-hit');
    if (reduceMotion) setTimeout(back, 1500);
    else el.addEventListener('animationiteration', back, { once: true });

    score += POINTS;
    scoreVal.textContent = String(score).padStart(4, '0');
    scoreBox.hidden = false;
    scoreBox.classList.remove('bump');
    void scoreBox.offsetWidth; /* animasyonu yeniden başlat */
    scoreBox.classList.add('bump');
    popup(x, y);
  };

  xbs.forEach((el) => el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    hit(el, e.clientX, e.clientY);
  }));

  /* ekranda görünen, eşleşen ilk tuşu patlatır */
  const press = (k) => {
    const el = xbs.find((b) => b.dataset.k === k && !b.classList.contains('xb-hit') && inView(b));
    if (el) hit(el);
  };

  document.addEventListener('keydown', (e) => {
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable]')) return;
    const k = e.key.toLowerCase();
    if ('abxy'.includes(k) && k.length === 1) press(k);
  });

  /* Gamepad API: standart düzende 0=A 1=B 2=X 3=Y */
  const PAD_KEYS = ['a', 'b', 'x', 'y'];
  const prev = {};
  let polling = false;
  const poll = () => {
    const pads = [...(navigator.getGamepads?.() || [])].filter(Boolean);
    if (!pads.length) { polling = false; return; }
    pads.forEach((pad) => {
      PAD_KEYS.forEach((k, i) => {
        const down = !!pad.buttons[i]?.pressed;
        const id = pad.index + ':' + i;
        if (down && !prev[id]) press(k);
        prev[id] = down;
      });
    });
    requestAnimationFrame(poll);
  };
  window.addEventListener('gamepadconnected', () => {
    if (polling) return;
    polling = true;
    requestAnimationFrame(poll);
  });
}
