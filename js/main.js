/* =============================================
   RESILIENCE ESTHETIC & SPA — MAIN JS
   ============================================= */

(function () {
  'use strict';

  /* ---- Language Toggle ---- */
  function setLanguage(lang) {
    const body = document.body;
    const enBtns = document.querySelectorAll('.lang-btn-en');
    const esBtns = document.querySelectorAll('.lang-btn-es');

    if (lang === 'es') {
      body.classList.add('is-es');
      esBtns.forEach(b => b.classList.add('active'));
      enBtns.forEach(b => b.classList.remove('active'));
    } else {
      body.classList.remove('is-es');
      enBtns.forEach(b => b.classList.add('active'));
      esBtns.forEach(b => b.classList.remove('active'));
    }
    localStorage.setItem('resilience-lang', lang);
  }

  document.querySelectorAll('.lang-btn-en').forEach(b =>
    b.addEventListener('click', () => setLanguage('en'))
  );
  document.querySelectorAll('.lang-btn-es').forEach(b =>
    b.addEventListener('click', () => setLanguage('es'))
  );

  // Restore saved language
  const saved = localStorage.getItem('resilience-lang') || 'en';
  setLanguage(saved);

  /* ---- Sticky Nav ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ---- Mobile Nav ---- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const navClose  = document.getElementById('navClose');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      navMobile.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (navClose && navMobile) {
    navClose.addEventListener('click', () => {
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  // Close mobile nav on link click
  if (navMobile) {
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Smooth active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Gallery filter (decorative for demo) ---- */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ---- Scroll reveal (lightweight) ---- */
  const revealEls = document.querySelectorAll(
    '.diff-card, .service-card, .testimonial-card, .value-card, .service-item, .gallery-item'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  /* ---- Form submit (demo — prevent default) ---- */
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = '✓ Sent!';
        btn.style.background = '#5a8a5a';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          form.reset();
        }, 2800);
      }
    });
  });

})();
