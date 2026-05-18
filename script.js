/* ============================================================
   SAFI REHMAN PORTFOLIO — script.js
   ============================================================ */

'use strict';

/* ============================================================
   1. AOS INIT
   ============================================================ */
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-cubic',
  offset: 80
});

/* ============================================================
   2. NAVBAR — scroll effect & active link
   ============================================================ */
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  if (window.scrollY > 50) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  // Scroll-top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // Skill bar animation on scroll
  animateSkillBars();

  // Counter animation on scroll
  animateCounters();
});

/* ============================================================
   3. SMOOTH SCROLL (for nav links)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    }
  });
});

/* ============================================================
   4. TYPING ANIMATION
   ============================================================ */
const typedEl = document.getElementById('typed-text');
const phrases = [
  'Laravel Developer',
  'PHP Developer',
  'Learning Vue.js',
  'Full Stack Learner'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 90;

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 45;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 90;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    typingSpeed = 1800; // pause before delete
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeWriter, typingSpeed);
}

setTimeout(typeWriter, 600);

/* ============================================================
   5. SKILL BARS
   ============================================================ */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 100) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 200);
    });
  }
}

/* ============================================================
   6. COUNTER ANIMATION
   ============================================================ */
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 80) {
    countersStarted = true;
    document.querySelectorAll('.stat-counter').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    });
  }
}

/* ============================================================
   7. PROJECT MODAL DATA
   ============================================================ */
const projects = [
  {
    title: 'Ecommerce Vendor System',
    description: 'A complete multi-vendor ecommerce platform built with Laravel and MySQL. Vendors can register, manage their products, view orders, and track their dashboard metrics. Users can browse products, add to cart, and complete purchases. An admin panel provides full control over vendors, users, and orders.',
    technologies: [
      { label: 'Laravel', cls: 'badge-laravel' },
      { label: 'MySQL', cls: 'badge-mysql' },
      { label: 'Bootstrap', cls: 'badge-bootstrap' }
    ],
    features: [
      'Multi Vendor System with vendor registration & approval',
      'Vendor Dashboard with sales analytics',
      'Product Management with images & inventory',
      'Secure Authentication & Role Management',
      'Complete Order System with status tracking',
      'Admin Panel for full platform control'
    ],
    slides: [
      { title: 'Dashboard View', color: '#00e5ff', icon: '🛍️', subtitle: 'Vendor Dashboard' },
      { title: 'Product Management', color: '#7c3aed', icon: '📦', subtitle: 'Product Listing & CRUD' },
      { title: 'Order System', color: '#34d399', icon: '🧾', subtitle: 'Order Tracking Panel' },
      { title: 'Admin Panel', color: '#fbbf24', icon: '⚙️', subtitle: 'Full Admin Control' }
    ]
  },
  {
    title: 'Learning Management System (LMS)',
    description: 'A complete LMS platform featuring a React.js frontend powered by a Laravel REST API backend. Students access courses, watch video lessons, and take quizzes. Teachers manage course content and track student progress. The system includes a clean dashboard for each role with real-time updates.',
    technologies: [
      { label: 'Laravel', cls: 'badge-laravel' },
      { label: 'React JS', cls: 'badge-react' },
      { label: 'MySQL', cls: 'badge-mysql' }
    ],
    features: [
      'Course Management with categories and enrollment',
      'Student Dashboard with progress tracking',
      'Teacher Panel for content creation',
      'Secure JWT Authentication',
      'Video Lessons with progress saving',
      'Interactive Quiz System with scoring'
    ],
    slides: [
      { title: 'Student Dashboard', color: '#7c3aed', icon: '🎓', subtitle: 'Course Overview' },
      { title: 'Video Lessons', color: '#00e5ff', icon: '📹', subtitle: 'Video Player Interface' },
      { title: 'Quiz System', color: '#fbbf24', icon: '📝', subtitle: 'Interactive Quizzes' },
      { title: 'Teacher Panel', color: '#34d399', icon: '👨‍🏫', subtitle: 'Content Management' }
    ]
  },
  {
    title: 'CMS Based Project',
    description: 'A powerful content management system built with Laravel that allows website administrators to manage all content dynamically without touching code. Features include dynamic page builder, media management, SEO optimization per page, and a role-based admin panel for multiple editors.',
    technologies: [
      { label: 'Laravel', cls: 'badge-laravel' },
      { label: 'MySQL', cls: 'badge-mysql' },
      { label: 'Bootstrap', cls: 'badge-bootstrap' }
    ],
    features: [
      'Dynamic Pages with drag-and-drop builder',
      'Comprehensive Admin Panel',
      'Full Content Management system',
      'Secure Authentication with roles',
      'SEO Management per page (meta, OG, sitemap)',
      'Media Library with image optimization'
    ],
    slides: [
      { title: 'CMS Dashboard', color: '#34d399', icon: '📄', subtitle: 'Content Overview' },
      { title: 'Page Builder', color: '#00e5ff', icon: '🔧', subtitle: 'Dynamic Page Editor' },
      { title: 'SEO Manager', color: '#fbbf24', icon: '🔍', subtitle: 'SEO Settings Panel' },
      { title: 'Media Library', color: '#7c3aed', icon: '🖼️', subtitle: 'File Management' }
    ]
  }
];

let currentSlide = 0;
let totalSlides = 0;

function openProjectModal(index) {
  const project = projects[index];
  currentSlide = 0;

  // Set title
  document.getElementById('modalProjectTitle').textContent = project.title;

  // Tech badges
  const badgesEl = document.getElementById('modalTechBadges');
  badgesEl.innerHTML = project.technologies.map(t =>
    `<span class="tech-badge ${t.cls}">${t.label}</span>`
  ).join(' ');

  // Description
  document.getElementById('modalDescription').textContent = project.description;

  // Features
  const featuresEl = document.getElementById('modalFeatures');
  featuresEl.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');

  // Slides
  const slidesEl = document.getElementById('modalSlides');
  totalSlides = project.slides.length;
  slidesEl.innerHTML = project.slides.map((slide, i) => `
    <div class="modal-slide" data-index="${i}">
      <svg viewBox="0 0 700 394" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="700" height="394" fill="#060d1f"/>
        <!-- Header bar -->
        <rect width="700" height="48" fill="#0a1528"/>
        <rect x="16" y="16" width="16" height="16" rx="8" fill="#ff5f57"/>
        <rect x="40" y="16" width="16" height="16" rx="8" fill="#febc2e"/>
        <rect x="64" y="16" width="16" height="16" rx="8" fill="#28c840"/>
        <rect x="100" y="12" width="500" height="24" rx="12" fill="#0f1f3d"/>
        <text x="200" y="28" font-size="11" fill="#7a99c0" font-family="monospace">localhost:8000/${project.title.toLowerCase().replace(/\s+/g, '-')}</text>
        <!-- Main content area -->
        <rect x="0" y="48" width="160" height="346" fill="#0a1528"/>
        <!-- Sidebar items -->
        <rect x="10" y="68" width="140" height="28" rx="6" fill="${slide.color}22" stroke="${slide.color}44" stroke-width="1"/>
        <text x="22" y="86" font-size="11" fill="${slide.color}" font-family="monospace">${slide.icon} ${slide.title}</text>
        <rect x="10" y="104" width="140" height="26" rx="6" fill="transparent"/>
        <text x="22" y="121" font-size="10" fill="#7a99c0" font-family="monospace">📊 Analytics</text>
        <rect x="10" y="137" width="140" height="26" rx="6" fill="transparent"/>
        <text x="22" y="154" font-size="10" fill="#7a99c0" font-family="monospace">👥 Users</text>
        <rect x="10" y="170" width="140" height="26" rx="6" fill="transparent"/>
        <text x="22" y="187" font-size="10" fill="#7a99c0" font-family="monospace">⚙️ Settings</text>
        <rect x="10" y="203" width="140" height="26" rx="6" fill="transparent"/>
        <text x="22" y="220" font-size="10" fill="#7a99c0" font-family="monospace">🚪 Logout</text>
        <!-- Main panel -->
        <rect x="170" y="58" width="520" height="326" rx="8" fill="#0f1f3d"/>
        <!-- Panel title -->
        <text x="188" y="88" font-size="18" font-weight="bold" fill="#f0f6ff" font-family="sans-serif">${slide.title}</text>
        <text x="188" y="108" font-size="12" fill="#7a99c0" font-family="monospace">${slide.subtitle}</text>
        <!-- Content cards -->
        <rect x="188" y="122" width="145" height="80" rx="8" fill="#1a2845"/>
        <rect x="188" y="122" width="145" height="20" rx="8" fill="${slide.color}22"/>
        <text x="200" y="136" font-size="10" fill="${slide.color}" font-family="monospace">METRIC 01</text>
        <text x="200" y="168" font-size="28" fill="#f0f6ff" font-family="sans-serif" font-weight="bold">1,284</text>
        <text x="200" y="188" font-size="10" fill="#7a99c0" font-family="monospace">↑ 12% this month</text>
        <rect x="343" y="122" width="145" height="80" rx="8" fill="#1a2845"/>
        <rect x="343" y="122" width="145" height="20" rx="8" fill="#7c3aed22"/>
        <text x="355" y="136" font-size="10" fill="#a78bfa" font-family="monospace">METRIC 02</text>
        <text x="355" y="168" font-size="28" fill="#f0f6ff" font-family="sans-serif" font-weight="bold">856</text>
        <text x="355" y="188" font-size="10" fill="#7a99c0" font-family="monospace">↑ 8% this month</text>
        <rect x="498" y="122" width="172" height="80" rx="8" fill="#1a2845"/>
        <rect x="498" y="122" width="172" height="20" rx="8" fill="#34d39922"/>
        <text x="510" y="136" font-size="10" fill="#34d399" font-family="monospace">METRIC 03</text>
        <text x="510" y="168" font-size="28" fill="#f0f6ff" font-family="sans-serif" font-weight="bold">$24K</text>
        <text x="510" y="188" font-size="10" fill="#7a99c0" font-family="monospace">↑ 22% revenue</text>
        <!-- Table -->
        <rect x="188" y="214" width="482" height="30" rx="6" fill="#1a2845"/>
        <text x="200" y="233" font-size="10" fill="#7a99c0" font-family="monospace">ID    Name              Status      Action</text>
        <rect x="188" y="250" width="482" height="26" rx="4" fill="${slide.color}10"/>
        <text x="200" y="267" font-size="10" fill="#f0f6ff" font-family="monospace">#001  Sample Entry 1    ✅ Active    Edit</text>
        <rect x="188" y="280" width="482" height="26" rx="4" fill="transparent"/>
        <text x="200" y="297" font-size="10" fill="#f0f6ff" font-family="monospace">#002  Sample Entry 2    ✅ Active    Edit</text>
        <rect x="188" y="310" width="482" height="26" rx="4" fill="${slide.color}10"/>
        <text x="200" y="327" font-size="10" fill="#f0f6ff" font-family="monospace">#003  Sample Entry 3    ⏸ Inactive  Edit</text>
        <!-- Slide number -->
        <text x="640" y="375" font-size="10" fill="#7a99c0" font-family="monospace">${i + 1}/${totalSlides}</text>
      </svg>
    </div>
  `).join('');

  // Dots
  const dotsEl = document.getElementById('sliderDots');
  dotsEl.innerHTML = project.slides.map((_, i) =>
    `<div class="slider-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`
  ).join('');

  updateSlider();
  new bootstrap.Modal(document.getElementById('projectModal')).show();
}

function updateSlider() {
  document.getElementById('modalSlides').style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function slideModal(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

/* ============================================================
   8. CONTRIBUTION GRID
   ============================================================ */
function buildContribGrid() {
  const grid = document.getElementById('contribGrid');
  if (!grid) return;

  const levels = [0, 0, 0, 1, 1, 2, 2, 3, 3, 4]; // weighted random
  const totalCells = 52 * 7;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'contrib-cell';
    const rand = Math.random();
    if (rand > 0.55) {
      const level = levels[Math.floor(Math.random() * levels.length)];
      if (level > 0) cell.classList.add('l' + level);
    }
    grid.appendChild(cell);
  }
}

buildContribGrid();

/* ============================================================
   9. CONTACT FORM
   ============================================================ */
function submitContactForm() {
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    // Shake empty fields
    [document.getElementById('contactName'),
     document.getElementById('contactEmail'),
     document.getElementById('contactMessage')].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff4757';
        field.style.animation = 'shake 0.4s ease';
        setTimeout(() => {
          field.style.borderColor = '';
          field.style.animation = '';
        }, 600);
      }
    });
    return;
  }

  // Show success
  const successEl = document.getElementById('formSuccess');
  successEl.classList.remove('d-none');
  document.getElementById('contactName').value = '';
  document.getElementById('contactEmail').value = '';
  document.getElementById('contactSubject').value = '';
  document.getElementById('contactMessage').value = '';

  setTimeout(() => {
    successEl.classList.add('d-none');
  }, 5000);
}

/* ============================================================
   10. SCROLL TO TOP
   ============================================================ */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   11. FOOTER YEAR
   ============================================================ */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ============================================================
   12. SHAKE ANIMATION (CSS injected)
   ============================================================ */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-6px)}
    40%{transform:translateX(6px)}
    60%{transform:translateX(-4px)}
    80%{transform:translateX(4px)}
  }
`;
document.head.appendChild(shakeStyle);

/* ============================================================
   13. NAVBAR CLOSE ON OUTSIDE CLICK (mobile)
   ============================================================ */
document.addEventListener('click', function(e) {
  const navMenu = document.getElementById('navMenu');
  const toggler = document.querySelector('.navbar-toggler');
  if (navMenu.classList.contains('show') &&
      !navMenu.contains(e.target) &&
      !toggler.contains(e.target)) {
    new bootstrap.Collapse(navMenu).hide();
  }
});

/* ============================================================
   14. INITIAL TRIGGER (in case user loads scrolled)
   ============================================================ */
window.dispatchEvent(new Event('scroll'));