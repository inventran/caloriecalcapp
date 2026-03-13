/* ═══════════════════════════════════════════════════════════════
   CalorieCalcApp.com — Main JavaScript
   Handles navbar scroll, reveal animations, and mobile menu
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar Scroll Effect ────────────────────────────────────
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ─── Mobile Menu Toggle ──────────────────────────────────────
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // ─── Scroll Reveal Animation ─────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for elements in the same section
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Smooth Scroll for Anchor Links ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── Typing Effect for Hero (optional subtle effect) ─────────
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    setTimeout(() => {
      heroTitle.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  // ─── Counter Animation for Stats ─────────────────────────────
  const animateCounter = (element, target, suffix = '') => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (target >= 1000) {
        element.textContent = Math.floor(current / 1000) + 'K+';
      } else if (target >= 1000000) {
        element.textContent = (current / 1000000).toFixed(0) + 'M+';
      } else {
        element.textContent = current.toFixed(1) + suffix;
      }
    }, 16);
  };

  // Observe stats for counter animation
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statValues = entry.target.querySelectorAll('.hero-stat-value');
          statValues.forEach(stat => {
            const text = stat.textContent;
            if (text.includes('K')) {
              const num = parseInt(text) * 1000;
              animateCounter(stat, num);
            }
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // ─── Add mobile menu styles dynamically ──────────────────────
  const mobileStyles = document.createElement('style');
  mobileStyles.textContent = `
    @media (max-width: 768px) {
      .nav-links.mobile-open {
        display: flex !important;
        flex-direction: column;
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.97);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 24px;
        gap: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        animation: slideDown 0.3s ease;
        border-bottom: 1px solid rgba(16, 185, 129, 0.1);
        z-index: 999;
      }

      .nav-links.mobile-open a {
        font-size: 1.1rem;
        padding: 8px 0;
      }

      .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }
      .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
      }
      .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }

      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    }
  `;
  document.head.appendChild(mobileStyles);
});
