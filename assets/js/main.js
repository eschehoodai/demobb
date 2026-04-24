/* ==========================================================================
   Hotel Bahnhof Bertsdorf – main.js
   ========================================================================== */

// ── Nav data (all hrefs relative to site root) ────────────────────────────
const NAV = [
  { label: 'Home', href: 'index.html' },
  { label: 'Hotel', href: 'hotel/unser-hotel.html', children: [
    { label: 'Unser Hotel',   href: 'hotel/unser-hotel.html'  },
    { label: 'Restaurant',   href: 'hotel/restaurant.html'   },
    { label: 'Historik',     href: 'hotel/historik.html'     },
    { label: 'Lage & Anreise', href: 'hotel/lage-anreise.html' },
    { label: 'Webcams',      href: 'hotel/webcams.html'      },
  ]},
  { label: 'Zimmer', href: 'zimmer/zimmeruebersicht.html', children: [
    { label: 'Zimmerübersicht',  href: 'zimmer/zimmeruebersicht.html'      },
    { label: 'Verfügbarkeit',    href: 'zimmer/verfuegbarkeitskalender.html' },
    { label: 'Galerie',          href: 'zimmer/galerie.html'               },
  ]},
  { label: 'Angebote', href: 'angebote.html' },
  { label: 'Aktivurlaub', href: 'aktivurlaub/bimmelbahn.html', children: [
    { label: 'Bimmelbahn',            href: 'aktivurlaub/bimmelbahn.html'             },
    { label: 'Tagesfahrten',          href: 'aktivurlaub/tagesfahrten.html'           },
    { label: 'Skizentrum',            href: 'aktivurlaub/skizentrum.html'             },
    { label: 'Freizeit & Sport',      href: 'aktivurlaub/freizeit-und-sport.html'     },
    { label: 'Natur erleben',         href: 'aktivurlaub/natur-erleben.html'          },
    { label: 'Ausflugsmöglichkeiten', href: 'aktivurlaub/ausflugsmoeglichkeiten.html' },
    { label: 'Kulturelle Angebote',   href: 'aktivurlaub/kulturelle-angebote.html'    },
  ]},
  { label: 'Gutscheine', href: 'gutscheine.html' },
  { label: 'Kontakt',    href: 'kontakt.html'    },
];

const LEGAL = [
  { label: 'Impressum',   href: 'impressum.html'   },
  { label: 'Datenschutz', href: 'datenschutz.html' },
  { label: 'Disclaimer',  href: 'disclaimer.html'  },
];

// ── Depth + base path ─────────────────────────────────────────────────────
const _depth = parseInt(document.documentElement.dataset.depth ?? '0', 10);
const _base  = '../'.repeat(_depth);
const r = (href) => _base + href;       // resolve from root

// ── Build desktop + mobile header ────────────────────────────────────────
function buildHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;

  const hasHero = !!document.querySelector('.hero');
  el.className = hasHero ? 'transparent' : 'solid';

  const desktopItems = NAV.map(item => {
    if (item.children) {
      const drops = item.children.map(c => `<a href="${r(c.href)}">${c.label}</a>`).join('');
      return `<li class="nav-item">
        <a href="${r(item.href)}" class="nav-link">${item.label} <span style="font-size:.65em;opacity:.7">▾</span></a>
        <div class="dropdown-menu">${drops}</div>
      </li>`;
    }
    return `<li class="nav-item"><a href="${r(item.href)}" class="nav-link">${item.label}</a></li>`;
  }).join('');

  el.innerHTML = `
    <div class="header-inner">
      <a href="${r('index.html')}" class="site-logo">
        <span class="logo-main">Hotel Bahnhof Bertsdorf</span>
        <span class="logo-sub">Am Bahnhof · Zittauer Gebirge</span>
      </a>
      <nav class="site-nav" aria-label="Hauptnavigation">
        <ul class="nav-list">${desktopItems}</ul>
        <a href="${r('zimmer/verfuegbarkeitskalender.html')}" class="btn btn-primary btn-sm nav-cta">Jetzt buchen</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Menü öffnen" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>`;
}

// ── Build mobile nav ──────────────────────────────────────────────────────
function buildMobileNav() {
  const el = document.getElementById('mobile-nav');
  if (!el) return;
  let html = '';
  NAV.forEach(item => {
    html += `<a href="${r(item.href)}">${item.label}</a>`;
    (item.children || []).forEach(c => {
      html += `<a href="${r(c.href)}" class="sub">${c.label}</a>`;
    });
  });
  html += `<div class="mob-cta">
    <a href="${r('zimmer/verfuegbarkeitskalender.html')}" class="btn btn-primary">Jetzt buchen</a>
  </div>`;
  el.innerHTML = html;
}

// ── Build footer ──────────────────────────────────────────────────────────
function buildFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  const legalHtml = LEGAL.map(l => `<a href="${r(l.href)}">${l.label}</a>`).join('');

  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">Hotel Bahnhof Bertsdorf</div>
          <div class="footer-sub">Am Bahnhof · Zittauer Gebirge</div>
          <p>Das traditionsreiche Gründerzeithotel im Herzen des Zittauer Gebirges –
             direkt an der berühmten Zittauer Schmalspurbahn.</p>
          <div class="footer-social">
            <a href="https://www.instagram.com/hotelbahnhofbertsdorf/" target="_blank" rel="noopener" title="Instagram @hotelbahnhofbertsdorf">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Hotel</h4>
          <ul>
            <li><a href="${r('hotel/unser-hotel.html')}">Unser Hotel</a></li>
            <li><a href="${r('hotel/restaurant.html')}">Restaurant</a></li>
            <li><a href="${r('hotel/historik.html')}">Historik</a></li>
            <li><a href="${r('hotel/lage-anreise.html')}">Lage &amp; Anreise</a></li>
            <li><a href="${r('hotel/webcams.html')}">Webcams</a></li>
            <li><a href="${r('zimmer/zimmeruebersicht.html')}">Zimmer</a></li>
            <li><a href="${r('angebote.html')}">Angebote</a></li>
            <li><a href="${r('gutscheine.html')}">Gutscheine</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Aktivurlaub</h4>
          <ul>
            <li><a href="${r('aktivurlaub/bimmelbahn.html')}">Bimmelbahn</a></li>
            <li><a href="${r('aktivurlaub/tagesfahrten.html')}">Tagesfahrten</a></li>
            <li><a href="${r('aktivurlaub/skizentrum.html')}">Skizentrum</a></li>
            <li><a href="${r('aktivurlaub/freizeit-und-sport.html')}">Freizeit &amp; Sport</a></li>
            <li><a href="${r('aktivurlaub/natur-erleben.html')}">Natur erleben</a></li>
            <li><a href="${r('aktivurlaub/ausflugsmoeglichkeiten.html')}">Ausflugsmöglichkeiten</a></li>
            <li><a href="${r('aktivurlaub/kulturelle-angebote.html')}">Kulturelle Angebote</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Kontakt</h4>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">📍</span>
            <div class="footer-contact-text">Am Bahnhof 1<br>02785 Olbersdorf<br>Sachsen, Deutschland</div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">📞</span>
            <div class="footer-contact-text"><a href="tel:+4935836980">+49 3583 69800</a></div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">✉</span>
            <div class="footer-contact-text"><a href="mailto:info@hotel-bb.de">info@hotel-bb.de</a></div>
          </div>
          <div class="footer-contact-item">
            <span class="footer-contact-icon">🕐</span>
            <div class="footer-contact-text">Check-in ab 15:00 Uhr<br>Check-out bis 11:00 Uhr</div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2026 Hotel Bahnhof Bertsdorf – Andre Al-Obeidi e. K.</p>
        <nav class="footer-legal" aria-label="Rechtliches">${legalHtml}</nav>
      </div>
    </div>`;
}

// ── Hamburger toggle ──────────────────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── Header scroll behaviour ───────────────────────────────────────────────
function initHeaderScroll() {
  const hdr = document.getElementById('site-header');
  if (!hdr || !hdr.classList.contains('transparent')) return;
  const onScroll = () => {
    if (window.scrollY > 80) {
      hdr.classList.replace('transparent', 'scrolled');
    } else {
      hdr.classList.replace('scrolled', 'transparent');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Hero slider ───────────────────────────────────────────────────────────
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let cur = 0, timer;

  function goTo(idx) {
    slides[cur].classList.remove('active');
    dots[cur]?.classList.remove('active');
    cur = (idx + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur]?.classList.add('active');
  }

  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); goTo(i); timer = setInterval(() => goTo(cur + 1), 5500); }));
  timer = setInterval(() => goTo(cur + 1), 5500);
}

// ── Scroll animations ─────────────────────────────────────────────────────
function initScrollAnim() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ── Gallery lightbox ──────────────────────────────────────────────────────
function initLightbox() {
  const lb    = document.getElementById('lightbox');
  const lbImg = lb?.querySelector('.lightbox-img');
  const lbCap = lb?.querySelector('.lightbox-caption');
  const items = document.querySelectorAll('.gallery-item, .hist-item');
  if (!lb || !items.length) return;

  let cur  = 0;
  const data = [...items].map(el => ({
    src: el.dataset.src || el.querySelector('img')?.getAttribute('src') || '',
    alt: el.dataset.alt || el.querySelector('img')?.alt || '',
  }));

  function open(i) {
    cur = i;
    lbImg.src = data[cur].src;
    if (lbCap) lbCap.textContent = data[cur].alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  function prev()  { open((cur - 1 + data.length) % data.length); }
  function next()  { open((cur + 1) % data.length); }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  lb.querySelector('.lightbox-close')?.addEventListener('click', close);
  lb.querySelector('.lightbox-prev')?.addEventListener('click', prev);
  lb.querySelector('.lightbox-next')?.addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}

// ── Back-to-top ───────────────────────────────────────────────────────────
function initBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Active nav link ───────────────────────────────────────────────────────
function setActiveNav() {
  const cur = window.location.pathname;
  document.querySelectorAll('#site-header .nav-link, #site-header .dropdown-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const stripped = href.replace(/^(\.\.\/)+/, '');
    if (stripped && cur.endsWith(stripped)) a.classList.add('active');
  });
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildHeader();
  buildMobileNav();
  buildFooter();
  initHamburger();
  initHeaderScroll();
  initHeroSlider();
  initScrollAnim();
  initLightbox();
  initBackTop();
  setActiveNav();
});
