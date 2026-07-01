/* =============================================================
   SAFI REHMAN — LARAVEL BACKEND DEVELOPER PORTFOLIO
   script.js — All interactive behaviour, vanilla JS only
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------
     1. LOADING SCREEN
  ----------------------------------------------------------- */
  const loader = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hide'), 500);
  });

  /* -----------------------------------------------------------
     2. STICKY NAVBAR + SHRINK ON SCROLL + SCROLL PROGRESS BAR
  ----------------------------------------------------------- */
  const navbar = document.getElementById('mainNavbar');
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScrollUI() {
    const scrollY = window.scrollY;
    // Navbar shrink
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 60);
    // Scroll progress bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }
    // Back to top visibility
    if (backToTopBtn) backToTopBtn.classList.toggle('show', scrollY > 500);
  }
  window.addEventListener('scroll', handleScrollUI, { passive: true });
  handleScrollUI();

  /* -----------------------------------------------------------
     3. BACK TO TOP BUTTON
  ----------------------------------------------------------- */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -----------------------------------------------------------
     4. SMOOTH SCROLL FOR ALL ANCHOR LINKS
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });

          // Collapse mobile navbar after click
          const navCollapse = document.getElementById('navbarContent');
          if (navCollapse && navCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navCollapse).hide();
          }
        }
      }
    });
  });

  /* -----------------------------------------------------------
     5. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  function highlightActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 130;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', highlightActiveNav, { passive: true });
  highlightActiveNav();

  /* -----------------------------------------------------------
     6. TYPING ANIMATION (HERO ROLES)
  ----------------------------------------------------------- */
  const typedEl = document.getElementById('typed-text');
  const roles = ['Laravel Backend Developer', 'PHP Developer', 'REST API Developer', 'Backend Engineer'];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      typedEl.textContent = current.substring(0, charIndex);
    } else {
      charIndex++;
      typedEl.textContent = current.substring(0, charIndex);
    }

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === current.length) {
      speed = 1600; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  /* -----------------------------------------------------------
     7. SCROLL REVEAL ANIMATION (IntersectionObserver)
  ----------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* -----------------------------------------------------------
     8. ANIMATED COUNTERS (STATS)
  ----------------------------------------------------------- */
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* -----------------------------------------------------------
     9. SKILL PROGRESS BAR ANIMATION ON SCROLL
  ----------------------------------------------------------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.getAttribute('data-width') + '%';
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });
  skillFills.forEach(fill => skillObserver.observe(fill));

  /* -----------------------------------------------------------
     10. DARK MODE TOGGLE
  ----------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function setTheme(isLight) {
    document.body.classList.toggle('light-mode', isLight);
    if (themeIcon) {
      themeIcon.classList.toggle('bi-moon-stars-fill', !isLight);
      themeIcon.classList.toggle('bi-sun-fill', isLight);
    }
  }

  let savedTheme = 'dark';
  try { savedTheme = window.__portfolioTheme || 'dark'; } catch (e) {}
  setTheme(savedTheme === 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = !document.body.classList.contains('light-mode');
      setTheme(isLight);
      window.__portfolioTheme = isLight ? 'light' : 'dark';
    });
  }

  /* -----------------------------------------------------------
     11. BUTTON RIPPLE EFFECT
  ----------------------------------------------------------- */
  document.querySelectorAll('.btn-custom').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.classList.add('ripple');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* -----------------------------------------------------------
     12. CONTACT FORM VALIDATION + SUCCESS MESSAGE
  ----------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const fields = {
      name: { el: document.getElementById('cf-name'), err: document.getElementById('err-name') },
      email: { el: document.getElementById('cf-email'), err: document.getElementById('err-email') },
      phone: { el: document.getElementById('cf-phone'), err: document.getElementById('err-phone') },
      subject: { el: document.getElementById('cf-subject'), err: document.getElementById('err-subject') },
      message: { el: document.getElementById('cf-message'), err: document.getElementById('err-message') }
    };

    function validateField(key) {
      const { el, err } = fields[key];
      if (!el) return true;
      let valid = true, msg = '';
      const value = el.value.trim();

      if (key === 'name') {
        if (value.length < 2) { valid = false; msg = 'Please enter your full name.'; }
      }
      if (key === 'email') {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(value)) { valid = false; msg = 'Please enter a valid email address.'; }
      }
      if (key === 'phone') {
        const re = /^[0-9+\-\s()]{7,}$/;
        if (!re.test(value)) { valid = false; msg = 'Please enter a valid phone number.'; }
      }
      if (key === 'subject') {
        if (value.length < 3) { valid = false; msg = 'Please enter a subject.'; }
      }
      if (key === 'message') {
        if (value.length < 10) { valid = false; msg = 'Message should be at least 10 characters.'; }
      }

      el.classList.toggle('is-invalid', !valid);
      if (err) err.textContent = valid ? '' : msg;
      return valid;
    }

    Object.keys(fields).forEach(key => {
      const el = fields[key].el;
      if (el) el.addEventListener('blur', () => validateField(key));
      if (el) el.addEventListener('input', () => { if (el.classList.contains('is-invalid')) validateField(key); });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let allValid = true;
      Object.keys(fields).forEach(key => {
        if (!validateField(key)) allValid = false;
      });

      const successBox = document.getElementById('form-success');
      if (allValid) {
        contactForm.reset();
        if (successBox) {
          successBox.classList.add('show');
          setTimeout(() => successBox.classList.remove('show'), 5000);
        }
      }
    });
  }

  /* -----------------------------------------------------------
     13. NEWSLETTER FORM (FOOTER) — SIMPLE VALIDATION
  ----------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (input && re.test(input.value.trim())) {
        input.value = '';
        input.placeholder = 'Subscribed! Thank you.';
        setTimeout(() => { input.placeholder = 'Your email address'; }, 3000);
      }
    });
  }

  /* -----------------------------------------------------------
     14. PROJECT MODAL DATA POPULATION
  ----------------------------------------------------------- */
  const projectModal = document.getElementById('projectDetailsModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', (event) => {
      const trigger = event.relatedTarget;
      if (!trigger) return;
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');
      const img = trigger.getAttribute('data-img');
      const tech = trigger.getAttribute('data-tech');

      projectModal.querySelector('.modal-title').textContent = title || '';
      projectModal.querySelector('.modal-desc').textContent = desc || '';
      projectModal.querySelector('.modal-img').setAttribute('src', img || '');

      const techWrap = projectModal.querySelector('.modal-tech');
      techWrap.innerHTML = '';
      if (tech) {
        tech.split(',').forEach(t => {
          const span = document.createElement('span');
          span.className = 'tech-badge';
          span.textContent = t.trim();
          techWrap.appendChild(span);
        });
      }
    });
  }

  /* -----------------------------------------------------------
     15. CURRENT YEAR IN FOOTER
  ----------------------------------------------------------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
