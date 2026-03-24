/* ============================================================
   NEXUS GMB — main.js
   Features: FAQ accordion · Scroll reveal · Nav shrink
   ============================================================ */

// ── FAQ ACCORDION ──────────────────────────────────────────
document.querySelectorAll('[data-faq]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach((el) => {
      el.classList.remove('open');
    });

    // Toggle clicked
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ── SCROLL REVEAL ──────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: stop observing once revealed
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ── NAV SHRINK ON SCROLL ────────────────────────────────────
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.padding = '12px 6%';
    nav.style.boxShadow = '0 4px 24px rgba(10,13,20,.08)';
  } else {
    nav.style.padding = '18px 6%';
    nav.style.boxShadow = 'none';
  }
});

// ── SMOOTH ANCHOR CLICKS ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = nav.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
