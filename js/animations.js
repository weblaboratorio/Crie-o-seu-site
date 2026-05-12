/* ============================================
   WEBLAB — ANIMATIONS
   Intersection Observer reveals, counters
   ============================================ */

// --- Reveal on Scroll ---
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// --- Staggered children reveal ---
document.querySelectorAll('[data-stagger]').forEach((parent) => {
  const children = parent.children;
  Array.from(children).forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = `${i * 100}ms`;
    revealObserver.observe(child);
  });
});

// --- Number Counter Animation ---
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach((el) => {
  counterObserver.observe(el);
});

// --- Subtle mouse parallax on hero background grid ---
const heroGrid = document.querySelector('.hero__grid-bg');
if (heroGrid) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroGrid.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  });
}
