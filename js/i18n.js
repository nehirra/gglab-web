/* ============================================================
   GG Lab — TR / EN dil katmanı
   - Türkçe metinler HTML'in içinde durur (JS kapalıyken de görünür).
   - Sayfa açılırken Türkçe değerler DOM'dan okunup saklanır.
   - Aşağıdaki sözlükte yalnızca İngilizce karşılıklar tutulur.
   Yeni metin eklerken: HTML'e data-i18n="anahtar" yaz, buraya EN karşılığını ekle.
   ============================================================ */
(function (w) {
  'use strict';

  var EN = {
    /* --- meta / a11y --- */
    'meta.title': 'GG Lab — Games &amp; Gamification Community, Akdeniz University',
    'meta.desc': 'Akdeniz University Games and Gamification Community (GG Lab). Game development workshops, game jams, indie talks and board game days.',
    'a11y.skip': 'Skip to content',
    'a11y.nav': 'Main menu',
    'a11y.footNav': 'Footer menu',
    'a11y.lang': 'Switch to Turkish',
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
    'about.head': 'Akdeniz University <span class="accent">Games and Gamification Community</span>',
    'about.p1': 'GG Lab is a student community that helps Akdeniz University students build knowledge, skills and production capacity in <strong>game design, digital game development, board game design, game art, storytelling and gamification</strong>.',
    'about.p2': 'By supporting creative thinking, teamwork and project-building skills, we contribute to the game development ecosystem and strengthen academic, cultural and social interaction on campus.',
    'about.p3': 'In international work and projects we use the name <strong>Games &amp; Gamification Lab (GG Lab)</strong>. Our base is the space allocated by the Health, Culture and Sports Department on the Akdeniz University Campus in Antalya.',
    'about.t1': 'We work on the principles of volunteering, equality, transparency, merit and solidarity',
    'about.t2': 'We are production-focused: every workshop a skill, every jam a prototype',
    'about.t3': 'We do not engage in political or ideological propaganda',
    'about.c1h': 'Game Development',
    'about.c1p': 'Want to try making your own game? Turn your idea into a real project with a team.',
    'about.c2h': 'Gamification',
    'about.c2p': 'In education, in health, at work… Discover the power of game design and build solutions that move people.',
    'about.c3h': 'Board Games',
    'about.c3p': 'Board game days, game analysis sessions and tabletop game design.',
    'about.c4h': 'Community Spirit',
    'about.c4p': 'For us games are inclusive. Join us and let\'s build together.',

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
    'jam.p1': 'The <strong>largest event we have run so far</strong>. A 48-hour game development marathon organised together by Akdeniz University, the Akdeniz University Computer Community and GG Lab, supported by sixteen institutions, studios and brands.',
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
    'join.eyebrow': '07 — Membership',
    'join.head': 'Join us',
    'join.lead': 'For us games are inclusive. Your department, your talent or your level does not matter: everyone\'s contribution counts here.',
    'join.reqH': 'Membership requirements',
    'join.req1': 'Being an actively enrolled associate, undergraduate or graduate student at Akdeniz University',
    'join.req2': 'Accepting the community\'s aims and the provisions of its charter',
    'join.reqNote': 'Applications are made through the Community Management System or the membership application form; acceptance is subject to Board approval.',
    'join.rightsH': 'Your rights as a member',
    'join.r1': 'Attending the General Assembly, taking the floor and voting',
    'join.r2': 'Standing for and being elected to the Board and the Audit Committee',
    'join.r3': 'Taking an active role in community activities and projects',
    'join.cta': 'Contact us to apply',

    /* --- paydaşlar --- */
    'part.eyebrow': '08 — Partners',
    'part.head': 'Community partners',
    'part.lead': '<span class="todo">Logo files are added as they arrive</span> — the rest are listed by name.',

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
    'foot.join': 'Membership',
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
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* yoksay */ }
    /* Varsayılan dil İngilizce; tarayıcı diline bakılmaz.
       Ziyaretçi TR'ye geçerse tercihi localStorage'da saklanır. */
    apply(saved || 'en');

    var toggle = document.getElementById('langToggle');
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
