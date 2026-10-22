/* ═══════════════════════════════════════════════════════════════
   CalorieCalcApp.com — Interactive JavaScript (2026 Revamp)
   Scroll effects · AI Simulator · Bento Tabs · Pricing Toggle · QR Modal
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. Nav scroll effect ───
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ─── 2. Mobile hamburger menu ───
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

  // ─── 3. Intersection Observer — Scroll reveal ───
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || Math.min(i * 45, 250);
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // ─── 4. Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight + 24 : 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── 5. Hero AI Food Scanner Live Simulator ───
  const simMeals = {
    thali: {
      dish: '🍛 North Indian Balanced Thali',
      conf: '97.4% AI Match',
      cal: '755', pro: '34g', carb: '86g', fat: '28g',
      items: [
        ['✓ 2 Whole Wheat Tandoori Rotis (80g)', '240 kcal'],
        ['✓ Dal Tadka (1 Katori / 150g)', '185 kcal'],
        ['✓ Paneer Tikka Masala (120g)', '265 kcal'],
        ['✓ Cucumber Raita & Salad (100g)', '65 kcal']
      ]
    },
    salmon: {
      dish: '🥗 Mediterranean Grilled Salmon Bowl',
      conf: '98.1% AI Match',
      cal: '610', pro: '46g', carb: '42g', fat: '26g',
      items: [
        ['✓ Wild Grilled Atlantic Salmon (160g)', '330 kcal'],
        ['✓ Steamed Quinoa & Herbs (120g)', '145 kcal'],
        ['✓ Sliced Hass Avocado (50g)', '80 kcal'],
        ['✓ Roasted Chickpeas & Greens (80g)', '55 kcal']
      ]
    },
    dosa: {
      dish: '🥞 South Indian Masala Dosa & Sambar',
      conf: '96.8% AI Match',
      cal: '485', pro: '14g', carb: '72g', fat: '15g',
      items: [
        ['✓ Crispy Fermented Rice-Lentil Crepe (140g)', '250 kcal'],
        ['✓ Spiced Potato Bhaji Filling (80g)', '110 kcal'],
        ['✓ Lentil Vegetable Sambar (1 Katori)', '85 kcal'],
        ['✓ Fresh Coconut Chutney (1 Tbsp)', '40 kcal']
      ]
    },
    burrito: {
      dish: '🌯 High-Protein Grilled Chicken Wrap',
      conf: '97.9% AI Match',
      cal: '540', pro: '48g', carb: '49g', fat: '16g',
      items: [
        ['✓ Grilled Herb Chicken Breast (150g)', '248 kcal'],
        ['✓ Whole Wheat Tortilla Wrap (1 Large)', '170 kcal'],
        ['✓ Black Beans & Fajita Peppers (80g)', '72 kcal'],
        ['✓ Greek Yogurt Chipotle Crema (30g)', '50 kcal']
      ]
    }
  };

  window.switchSimMeal = (key, btn) => {
    const m = simMeals[key];
    if (!m) return;
    document.querySelectorAll('.ai-sim-tab').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const dishEl = document.getElementById('sim-dish');
    const confEl = document.getElementById('sim-conf');
    const itemsEl = document.getElementById('sim-items');
    const calEl = document.getElementById('sim-cal');
    const proEl = document.getElementById('sim-pro');
    const carbEl = document.getElementById('sim-carb');
    const fatEl = document.getElementById('sim-fat');
    if (dishEl) dishEl.textContent = m.dish;
    if (confEl) confEl.textContent = m.conf;
    if (calEl) calEl.textContent = m.cal;
    if (proEl) proEl.textContent = m.pro;
    if (carbEl) carbEl.textContent = m.carb;
    if (fatEl) fatEl.textContent = m.fat;
    if (itemsEl) {
      itemsEl.innerHTML = m.items.map(
        r => `<div class="ai-sim-row"><span>${r[0]}</span><strong>${r[1]}</strong></div>`
      ).join('');
    }
  };

  // ─── 6. Categorized Feature Bento Filter ───
  window.filterFeatureCards = (category, btn) => {
    document.querySelectorAll('.af-filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.af-card[data-cat]').forEach(card => {
      if (category === 'all' || card.dataset.cat === category) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ─── 7. Monthly / Annual Pricing Toggle ───
  window.toggleBillingMode = (mode) => {
    const btnM = document.getElementById('btn-bill-monthly');
    const btnA = document.getElementById('btn-bill-annual');
    if (btnM) btnM.classList.toggle('active', mode === 'monthly');
    if (btnA) btnA.classList.toggle('active', mode === 'annual');

    const pPlus = document.getElementById('pc-price-plus');
    const pPro = document.getElementById('pc-price-pro');
    const pElite = document.getElementById('pc-price-elite');

    if (mode === 'annual') {
      if (pPlus) pPlus.innerHTML = '$2.99 <span>/mo · billed $35.88/yr</span>';
      if (pPro) pPro.innerHTML = '$5.99 <span>/mo · billed $71.88/yr</span>';
      if (pElite) pElite.innerHTML = '$11.99 <span>/mo · billed $143.88/yr</span>';
    } else {
      if (pPlus) pPlus.innerHTML = '$4.99 <span>/mo</span>';
      if (pPro) pPro.innerHTML = '$9.99 <span>/mo</span>';
      if (pElite) pElite.innerHTML = '$19.99 <span>/mo</span>';
    }
  };

  // ─── 8. Card mouse glow effect ───
  document.querySelectorAll('.f-card-hero, .af-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100);
      const y = ((e.clientY - rect.top) / rect.height * 100);
      card.style.setProperty('--glow-x', x + '%');
      card.style.setProperty('--glow-y', y + '%');
    });
  });

  // ─── 9. Showcase drag-scroll ───
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

  // ─── 10. FAQ accordion & Live Search (Support Page) ───
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  const faqSearch = document.getElementById('faqSearchInput');
  if (faqSearch) {
    faqSearch.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.faq-item').forEach(item => {
        const match = item.textContent.toLowerCase().includes(q);
        item.style.display = match ? '' : 'none';
      });
    });
  }

  // ─── 11. Global QR Code Modal & Sticky Mobile Bar Injection ───
  window.openCalorieCalcQR = () => {
    let modal = document.getElementById('ccGlobalQrModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ccGlobalQrModal';
      modal.className = 'cc-qr-backdrop';
      modal.innerHTML = `
        <div class="cc-qr-modal">
          <div style="font-size:.72rem;font-weight:800;color:#047857;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px">Instant Phone Handoff</div>
          <h3 style="font-size:1.45rem;font-weight:900;margin-bottom:8px;color:#0c1b2a">Scan to Install CalorieCalc</h3>
          <p style="font-size:.86rem;color:#475569;margin-bottom:20px;line-height:1.55">Point your phone camera at the QR code to get CalorieCalc free on Google Play.</p>
          <div style="width:168px;height:168px;margin:0 auto 20px;padding:12px;border:2px solid #059669;border-radius:18px;background:#fff;display:flex;align-items:center;justify-content:center">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=064e3b&data=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.caloriecalc.calorie_tracker_app" alt="Scan QR Code to Download CalorieCalc" width="144" height="144" style="border-radius:8px">
          </div>
          <a href="https://play.google.com/store/apps/details?id=com.caloriecalc.calorie_tracker_app" target="_blank" rel="noopener" class="btn-glow" style="width:100%;justify-content:center;padding:14px 20px;font-size:.92rem;margin-bottom:12px">
            Open Google Play Store ↗
          </a>
          <button type="button" onclick="document.getElementById('ccGlobalQrModal').classList.remove('open')" style="background:none;border:none;color:#64748b;font-weight:700;font-size:.82rem;cursor:pointer;font-family:inherit">Close Window</button>
        </div>
      `;
      modal.addEventListener('click', (ev) => {
        if (ev.target === modal) modal.classList.remove('open');
      });
      document.body.appendChild(modal);
    }
    modal.classList.add('open');
  };

  // Inject mobile sticky install bar on all pages
  if (!document.querySelector('.cc-mobile-sticky')) {
    const stickyBar = document.createElement('div');
    stickyBar.className = 'cc-mobile-sticky';
    stickyBar.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:36px;height:36px;border-radius:9px;background:#047857;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1rem">🥗</div>
        <div>
          <strong style="display:block;font-size:.84rem;color:#0c1b2a;line-height:1.2">CalorieCalc AI</strong>
          <span style="font-size:.7rem;color:#059669;font-weight:700">★ 4.8 · Free on Google Play</span>
        </div>
      </div>
      <a href="https://play.google.com/store/apps/details?id=com.caloriecalc.calorie_tracker_app" target="_blank" rel="noopener" style="background:linear-gradient(135deg,#047857,#10b981);color:#fff;font-weight:700;font-size:.8rem;padding:9px 18px;border-radius:100px;box-shadow:0 4px 12px rgba(4,120,87,.25)">Install Free</a>
    `;
    document.body.appendChild(stickyBar);
  }

});
