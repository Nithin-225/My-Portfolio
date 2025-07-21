// Dark mode toggle for Tailwind
const darkToggle = document.getElementById('dark-toggle');
const darkIcon = document.getElementById('dark-icon');
const root = document.documentElement;

function setDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark');
    darkIcon.classList.remove('fa-moon');
    darkIcon.classList.add('fa-sun');
  } else {
    document.body.classList.remove('dark');
    darkIcon.classList.remove('fa-sun');
    darkIcon.classList.add('fa-moon');
  }
}

// Initial mode from localStorage or system
const userPref = localStorage.getItem('theme');
const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
setDarkMode(userPref === 'dark' || (!userPref && systemPref));

darkToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  setDarkMode(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Slide-in animations on scroll
const animationMap = {
  'animate-slide-in-left': 'translate-x-[-60px]',
  'animate-slide-in-right': 'translate-x-[60px]',
  'animate-slide-in-up': 'translate-y-[60px]',
  'animate-slide-in-down': 'translate-y-[-60px]'
};

function animateOnScroll() {
  const animatedEls = document.querySelectorAll('[class*="animate-slide-in-"]');
  animatedEls.forEach(el => {
    el.style.opacity = 0;
    Object.values(animationMap).forEach(cls => el.classList.add(cls));
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.8s, transform 0.8s';
        entry.target.style.opacity = 1;
        if (entry.target.classList.contains('animate-slide-in-left')) {
          entry.target.classList.remove('translate-x-[-60px]');
        }
        if (entry.target.classList.contains('animate-slide-in-right')) {
          entry.target.classList.remove('translate-x-[60px]');
        }
        if (entry.target.classList.contains('animate-slide-in-up')) {
          entry.target.classList.remove('translate-y-[60px]');
        }
        if (entry.target.classList.contains('animate-slide-in-down')) {
          entry.target.classList.remove('translate-y-[-60px]');
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(el => observer.observe(el));
}

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

if (hamburger && mobileMenu && closeMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.style.display = 'flex';
    setTimeout(() => mobileMenu.classList.add('open'), 10);
  });
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    setTimeout(() => mobileMenu.style.display = 'none', 300);
  });
  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      setTimeout(() => mobileMenu.style.display = 'none', 300);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});