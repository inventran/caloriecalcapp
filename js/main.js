/* ═══════════════════════════════════════════════════════════════
   CalorieCalcApp.com — Interactive JavaScript
   Scroll effects · Particles · Card glow · Smooth nav
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Nav scroll effect ───
  const nav = document.getElementById('nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 60);
      lastScroll = y;
    }, { passive: true });
  }

  // ─── Mobile hamburger menu ───
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }));
  }

  // ─── Intersection Observer — Scroll reveal ───
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || i * 60;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = nav ? nav.offsetHeight + 24 : 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── Hero background particles ───
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const colors = [
      'rgba(4,120,87,',    // emerald (light-friendly)
      'rgba(139,92,246,',  // violet
      'rgba(59,130,246,',  // blue
    ];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.15 + 0.04;
      const dur = Math.random() * 22 + 14;
      const delay = Math.random() * 10;
      p.style.cssText = `
        position:absolute;width:${size}px;height:${size}px;
        background:${color}${opacity});border-radius:50%;
        left:${Math.random()*100}%;top:${Math.random()*100}%;
        box-shadow:0 0 ${size*4}px ${color}${opacity * 0.5});
        animation:particleDrift ${dur}s ease-in-out ${delay}s infinite;
        pointer-events:none;z-index:1;
      `;
      heroBg.appendChild(p);
    }
    // Create the drift keyframes
    const driftStyle = document.createElement('style');
    driftStyle.textContent = `
      @keyframes particleDrift {
        0%,100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${Math.random()*60-30}px, ${Math.random()*-70-20}px) rotate(90deg); }
        50% { transform: translate(${Math.random()*50-25}px, ${Math.random()*40-20}px) rotate(180deg); }
        75% { transform: translate(${Math.random()*-50+25}px, ${Math.random()*-50-15}px) rotate(270deg); }
      }
    `;
    document.head.appendChild(driftStyle);
  }

  // ─── Card mouse glow effect ───
  document.querySelectorAll('.f-card-hero, .af-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100);
      const y = ((e.clientY - rect.top) / rect.height * 100);
      card.style.setProperty('--glow-x', x + '%');
      card.style.setProperty('--glow-y', y + '%');
    });
  });

  // ─── Showcase drag-scroll ───
  const strip = document.querySelector('.showcase-strip');
  if (strip) {
    let isDown = false, startX, scrollLeft;
    strip.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
      strip.style.cursor = 'grabbing';
    });
    strip.addEventListener('mouseleave', () => { isDown = false; strip.style.cursor = 'grab'; });
    strip.addEventListener('mouseup', () => { isDown = false; strip.style.cursor = 'grab'; });
    strip.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      strip.scrollLeft = scrollLeft - (e.pageX - strip.offsetLeft - startX) * 1.5;
    });
    strip.style.cursor = 'grab';
  }

  // ─── Animate counters (trust bar numbers) ───
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count);
    if (!target) return;
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  };

  // Counter observer
  document.querySelectorAll('[data-count]').forEach(el => {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counterObs.observe(el);
  });

  // ─── Tilt effect for pricing cards ───
  document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) ${card.classList.contains('pc-popular') ? 'scale(1.04)' : ''}`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = card.classList.contains('pc-popular') ? 'scale(1.04)' : '';
    });
  });

  // ─── FAQ accordion (if on support page) ───
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ─── Smooth entry for legal pages ───
  const legalCard = document.querySelector('.legal-card');
  if (legalCard) {
    legalCard.style.opacity = '0';
    legalCard.style.transform = 'translateY(30px)';
    setTimeout(() => {
      legalCard.style.transition = 'all .7s cubic-bezier(.4,0,.2,1)';
      legalCard.style.opacity = '1';
      legalCard.style.transform = 'translateY(0)';
    }, 100);
  }

  // ─── Typing effect for hero (optional enhancement) ───
  const heroTitle = document.querySelector('.hero h1 .typing');
  if (heroTitle) {
    const text = heroTitle.dataset.text || heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeInterval = setInterval(() => {
      heroTitle.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(typeInterval);
    }, 60);
  }

});
