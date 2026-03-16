document.addEventListener('DOMContentLoaded', () => {
  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) {
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // Subtle light particles in hero
  const hero = document.querySelector('.hero-bg');
  if (hero) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const s = Math.random() * 4 + 2;
      p.style.cssText = `position:absolute;width:${s}px;height:${s}px;background:rgba(16,185,129,${Math.random()*.2+.06});border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;box-shadow:0 0 ${s*3}px rgba(16,185,129,${Math.random()*.1+.03});animation:particleDrift ${Math.random()*20+12}s ease-in-out ${Math.random()*8}s infinite;pointer-events:none;z-index:1;`;
      hero.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes particleDrift{0%,100%{transform:translate(0,0)}25%{transform:translate(${Math.random()*50-25}px,${Math.random()*-60-15}px)}50%{transform:translate(${Math.random()*40-20}px,${Math.random()*30-15}px)}75%{transform:translate(${Math.random()*-40+20}px,${Math.random()*-40-10}px)}}`;
    document.head.appendChild(style);
  }

  // Showcase drag-scroll
  const strip = document.querySelector('.showcase-strip');
  if (strip) {
    let isDown = false, startX, scrollLeft;
    strip.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - strip.offsetLeft; scrollLeft = strip.scrollLeft; strip.style.cursor = 'grabbing'; });
    strip.addEventListener('mouseleave', () => { isDown = false; strip.style.cursor = 'grab'; });
    strip.addEventListener('mouseup', () => { isDown = false; strip.style.cursor = 'grab'; });
    strip.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); strip.scrollLeft = scrollLeft - (e.pageX - strip.offsetLeft - startX) * 1.5; });
    strip.style.cursor = 'grab';
  }
});
