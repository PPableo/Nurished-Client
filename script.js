/* ============================================
   1. STICKY NAVBAR — adds class on scroll
============================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ============================================
   2. MOBILE HAMBURGER MENU
============================================ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const spans     = hamburger.querySelectorAll('span');

function openMenu() {
  navLinks.classList.add('open');
  spans[0].style.transform  = 'translateY(7px) rotate(45deg)';
  spans[1].style.opacity    = '0';
  spans[2].style.transform  = 'translateY(-7px) rotate(-45deg)';
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  navLinks.classList.remove('open');
  spans[0].style.transform  = '';
  spans[1].style.opacity    = '';
  spans[2].style.transform  = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeMenu() : openMenu();
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ============================================
   3. SCROLL REVEAL — fade-in on scroll
============================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid children
        entry.target.style.transitionDelay = `${i * 0.07}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

/* ============================================
   4. SMOOTH ACTIVE NAV HIGHLIGHT
============================================ */
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));