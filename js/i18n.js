/* ============================================================
   GG Lab — TR / EN dil katmanı
   - Türkçe metinler HTML'in içinde durur (JS kapalıyken de görünür).
   - Sayfa açılırken Türkçe değerler DOM'dan okunup saklanır.
   - Aşağıdaki sözlükte yalnızca İngilizce karşılıklar tutulur.
   Yeni metin eklerken: HTML'e data-i18n="anahtar" yaz, buraya EN karşılığını ekle.
   ============================================================ */
(function (w) {
  'use strict';

  /* İngilizce şimdilik kapalı: site yalnızca TR gösteriliyor, dil düğmesi
     gizleniyor. EN sözlüğü ve değiştirme mantığı korunuyor — ileride
     yeniden açmak için bu satırı true yapmak yeterli. */
  var EN_ENABLED = false;

  var EN = {
    /* --- meta / a11y --- */
    'meta.title': 'GG Lab — Games &amp; Gamification Community, Akdeniz University',
    'meta.desc': 'Akdeniz University Games and Gamification Community (GG Lab). Game development workshops, game jams, indie talks and board game days.',
    'a11y.skip': 'Skip to content',
    'a11y.nav': 'Main menu',
    'a11y.footNav': 'Footer menu',
    'a11y.lang': 'Switch to Turkish',
    'a11y.social': 'Social media',
    'a11y.menuOpen': 'Open menu',
    'a11y.menuClose': 'Close menu',
    'a11y.lightbox': 'Image preview',
    'a11y.close': 'Close',
    'a11y.prev': 'Previous',
    'a11y.next': 'Next',

    /* --- nav --- */
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.vision': 'Vision',
    'nav.what': 'What We Do',
    'nav.jam': 'Game Jam',
    'nav.events': 'Events',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'nav.cta': 'JOIN US',
    'nav.ctaShort': 'JOIN <i>&#8594;</i>',

    /* --- hero --- */
    'hero.eyebrow': 'Akdeniz University · Antalya',
    /* Tüzük md.3: uluslararası ad "Games & Gamification Lab (GG Lab)" */
    'hero.title': 'GAMES &amp;<br><span class="grad">GAMIFICATION</span><br>COMMUNITY.',
    'hero.lead': 'Games are not just entertainment. At GG Lab you turn your ideas into real projects, design and build them together with your team. Your department, your skill level or your experience does not matter — everyone\'s contribution counts here.',
    'hero.cta1': '<i>&#8592;</i> Join us',
    'hero.cta2': 'What we do',
    'hero.partners': 'PARTNERS',

    /* --- biz kimiz --- */
    'about.eyebrow': '01 — About Us',
    'about.head': 'A campus crew turning ideas into <span class="accent">playable things</span>.',
    'about.p1': 'GG Lab is the production space for Akdeniz University students who gather around game development, gamification and board game culture.',
    'about.p2': 'We learn in workshops, experiment in jams, and meet each other and the industry through events. Whatever your experience level, ideas come to the table here and take shape together.',
    'about.panelAria': 'GG Lab focus areas',
    'about.s1k': 'BUILD',
    'about.s1h': 'Game prototypes',
    'about.s1p': 'From idea to playable experiment.',
    'about.s2k': 'LEARN',
    'about.s2h': 'Workshops and meetups',
    'about.s2p': 'Design, code, art and narrative.',
    'about.s3k': 'SHARE',
    'about.s3h': 'Open community spirit',
    'about.s3p': 'Open to every department and every level.',

    /* --- vizyon --- */
    'vision.eyebrow': '02 — Vision &amp; Mission',
    'vision.head': 'Where are we headed?',
    'vision.v': 'Our Vision',
    'vision.vp': 'To turn Akdeniz University into a place where students do not only play games but design, develop and apply them across different fields. To become an internationally visible community contributing to Türkiye\'s game development ecosystem through student projects.',
    'vision.m': 'Our Mission',
    'vision.mp': 'To grow students\' knowledge, skills and production capacity in game design and gamification through trainings, workshops, game jams and industry meet-ups; and to build an open, inclusive production environment that supports teamwork and creative thinking.',
    'vision.n1h': 'Volunteering',
    'vision.n1p': 'Taking part is never an obligation — you come because you want to.',
    'vision.n2h': 'Equality',
    'vision.n2p': 'Department, talent or level does not matter; every contribution counts.',
    'vision.n3h': 'Transparency',
    'vision.n3p': 'Decisions and finances are documented and run in the open.',
    'vision.n4h': 'Production Focus',
    'vision.n4p': 'We don\'t just talk about it — we ship finished work.',

    /* --- faaliyet --- */
    'act.eyebrow': '03 — What We Do',
    'act.head': 'Our fields of activity',
    'act.lead': 'The fields of activity defined in our charter.',
    'act.f1h': 'Game Development Trainings',
    'act.f1p': 'We run trainings and workshops with Unity, Unreal Engine and similar engines.',
    'act.f2h': 'Design &amp; Art Programmes',
    'act.f2p': 'Training programmes on game design, game art, storytelling and user experience.',
    'act.f3h': 'Game Jams &amp; Projects',
    'act.f3p': 'Team-based game development projects, board game events and game analysis sessions.',
    'act.f4h': 'Gamification Projects',
    'act.f4p': 'We develop academic and social projects on gamification applications.',
    'act.f5h': 'Industry Meet-ups',
    'act.f5p': 'Conferences, panels and talks with game industry professionals.',
    'act.f6h': 'Social &amp; Cultural Events',
    'act.f6p': 'Gatherings and community nights that strengthen communication between members.',

    /* --- game jam --- */
    'jam.eyebrow': '04 — Our Flagship',
    'jam.head': 'Game Jam Akdeniz',
    'jam.when': '2–4 May 2026 · Antalya',
    'jam.p1': 'The <strong>largest event we have run so far</strong>. A 48-hour game development marathon organised together by Akdeniz University, AÜBT and GG Lab, supported by sixteen institutions, studios and brands.',
    'jam.p2': 'Over 48 hours participants formed teams and built playable prototypes from scratch around the announced theme. <span class="todo">The 2027 date is not set yet</span> — we will announce it here and on our social media.',
    'jam.s1': 'hours',
    'jam.s2': 'supporters',
    'jam.s3': 'organising bodies',
    'jam.s4': 'first edition',
    'jam.orgH': 'Organisers',
    'jam.studioH': 'Studios and industry',
    'jam.instH': 'Institutional support',
    'jam.sponsorH': 'Sponsors',
    'jam.unknown': 'full name to be added',
    'jam.logoNote': '<span class="todo">Logo files are added as they arrive</span> — supporters without one are listed by name.',

    /* --- düzenli etkinlikler --- */
    'ev.eyebrow': '05 — Regular Events',
    'ev.head': 'Our regular events',
    'ev.lead': 'We gather around four main formats throughout the year. Dates are announced here and on our social media as they are confirmed.',
    'ev.e1h': 'Board Game Days',
    'ev.e1p': 'Tabletop game events and game analysis sessions. We both play games and take them apart.',
    'ev.e2h': 'Game Development Workshops',
    'ev.e2p': 'Building games from scratch with Unity and Unreal Engine. Beginners welcome.',
    'ev.e3h': 'Indie Talks &amp; Industry Guests',
    'ev.e3p': 'Conferences, panels and talks with indie studios and industry professionals.',
    'ev.e4h': 'Game Jams &amp; Competitions',
    'ev.e4p': 'Team-based game development marathons: from idea to playable prototype.',

    /* --- galeri --- */
    'gal.eyebrow': '06 — Gallery',
    'gal.head': 'Moments from the community',
    'gal.lead': 'Moments from Game Jam Akdeniz. This page will grow as photos from our other events are added.',
    'gal.g1': 'Game Jam Akdeniz — participants',
    'gal.g2': 'Award ceremony',
    'gal.g3': 'Award ceremony',
    'gal.g4': 'Award ceremony',
    'gal.g5': 'The jam floor',
    'gal.g6': 'Building in Unity',
    'gal.g7': 'A moment from jam night',
    'gal.g8': 'Presenting a game on stage',

    /* --- üyelik --- */
    'join.eyebrow': '10 — Membership',
    'join.head': 'Join the community',
    'join.lead': 'GG Lab grows with what the community makes. Whatever your department, talent or level, hop into our Discord to ask questions, find a team, share what you\'re building, or just say hi. Event and Game Jam announcements land there first. You can follow us on the other channels too.',
    'join.dc': 'Join our Discord',

    /* --- paydaşlar --- */
    'part.eyebrow': '08 — Partners',
    'part.head': 'Community partners',
    'part.lead': 'Studios and organizations we work with alongside the community.',

    /* --- iletişim --- */
    'ct.eyebrow': '09 — Contact',
    'ct.head': 'Get in touch',
    'ct.lead': 'Akdeniz University Campus, Antalya · The community space allocated by the Health, Culture and Sports Department.',
    'ct.soon': 'link to be added',
    'ct.mail': 'email address to be added',

    /* --- form --- */
    'form.name': 'Full Name',
    'form.namePh': 'What is your name?',
    'form.email': 'Email',
    'form.emailPh': 'you@example.com',
    'form.topic': 'Subject',
    'form.t1': 'I want to join the community',
    'form.t2': 'Question about an event / workshop',
    'form.t3': 'Game jam participation',
    'form.t4': 'Sponsorship and collaboration',
    'form.t5': 'Other',
    'form.msg': 'Message',
    'form.msgPh': 'Tell us briefly...',
    'form.send': 'Send',
    'form.hint': 'This form is a draft: a service (Formspree, Google Forms etc.) needs to be connected for submissions.',
    'form.err': 'Please fill in your name, a valid email and a message.',
    'form.ok': 'Thank you! (Draft site — the message is not sent anywhere yet.)',

    /* --- footer --- */
    'foot.about': 'Akdeniz University Games and Gamification Community<br>Games &amp; Gamification Lab · Antalya',
    'foot.menu': 'Menu',
    'foot.vision': 'Vision &amp; Mission',
    'foot.community': 'Community',
    'foot.join': 'Join Us',
    'foot.partners': 'Partners',
    'foot.links': 'All Links (Linktree)',
    'foot.copy': 'GG Lab — Akdeniz University Games and Gamification Community. Draft site.',
    'foot.top': 'Top ↑'
  };

  /* main.js'in kullandığı, DOM'da karşılığı olmayan Türkçe metinler */
  var TR_EXTRA = {
    'a11y.lang': 'İngilizceye geç',
    'a11y.menuOpen': 'Menüyü aç',
    'a11y.menuClose': 'Menüyü kapat',
    'form.err': 'Lütfen ad, geçerli bir e-posta ve mesaj alanlarını doldur.',
    'form.ok': 'Teşekkürler! (Taslak site — mesaj henüz bir yere gönderilmiyor.)'
  };

  var TR = {};
  var current = 'tr';
  var STORAGE_KEY = 'gglab-lang';

  /* Sayfadaki Türkçe metinleri anahtarlarına göre topla */
  function captureTurkish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (!(k in TR)) TR[k] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (!(k in TR)) TR[k] = el.getAttribute('placeholder');
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria');
      if (!(k in TR)) TR[k] = el.getAttribute('aria-label');
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-alt');
      if (!(k in TR)) TR[k] = el.getAttribute('alt');
    });
    document.querySelectorAll('[data-i18n-cap]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-cap');
      if (!(k in TR)) TR[k] = el.getAttribute('data-caption');
    });
    document.querySelectorAll('[data-i18n-meta]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-meta');
      if (!(k in TR)) TR[k] = el.getAttribute('content');
    });
    Object.keys(TR_EXTRA).forEach(function (k) { if (!(k in TR)) TR[k] = TR_EXTRA[k]; });
  }

  /* anahtarın karşılığı: EN'de yoksa Türkçeye düşer */
  function t(key) {
    if (current === 'en' && EN[key] != null) return EN[key];
    return TR[key] != null ? TR[key] : '';
  }

  function apply(lang) {
    current = (lang === 'en') ? 'en' : 'tr';
    document.documentElement.lang = current;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (v) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-ph'));
      if (v) el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-aria'));
      if (v) el.setAttribute('aria-label', v);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-alt'));
      if (v) el.setAttribute('alt', v);
    });
    document.querySelectorAll('[data-i18n-cap]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-cap'));
      if (v) el.setAttribute('data-caption', v);
    });
    document.querySelectorAll('[data-i18n-meta]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-meta'));
      if (v) el.setAttribute('content', v);
    });

    /* Tek düğme: üzerinde yalnızca yürürlükteki dil yazar,
       tıklanınca diğerine geçer. Etiket hangi dile geçileceğini söyler. */
    var label = document.querySelector('.lang-current');
    if (label) label.textContent = current.toUpperCase();
    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.setAttribute('aria-label', t('a11y.lang'));

    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) { /* gizli sekme */ }
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
  }

  function init() {
    captureTurkish();
    var toggle = document.getElementById('langToggle');

    if (!EN_ENABLED) {
      /* Dil düğmesini gizle, siteyi hep TR göster. */
      if (toggle) toggle.hidden = true;
      apply('tr');
      return;
    }

    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* yoksay */ }
    /* Varsayılan dil İngilizce; tarayıcı diline bakılmaz.
       Ziyaretçi TR'ye geçerse tercihi localStorage'da saklanır. */
    apply(saved || 'en');

    if (toggle) {
      toggle.addEventListener('click', function () {
        apply(current === 'tr' ? 'en' : 'tr');
      });
    }
  }

  w.I18N = { t: t, apply: apply, get lang() { return current; } };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
