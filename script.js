/* =========================================================
   GUIDEMEGENIUS — script.js
   Handles: scroll reveal, WhatsApp form, footer year, filters
   ========================================================= */

// ---- 1. Scroll Reveal Animation ----
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach((el) => observer.observe(el));
});

// ---- 2. Contact Form (native Formspree submission, no JS interception) ----
// Form is submitted directly by the browser via the action="..." attribute in HTML.
// No JS needed — Formspree free plan requires native submission.

// ---- 3. Auto-update Footer Year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- 4. Project + Service Filter Tabs ----
document.addEventListener('DOMContentLoaded', () => {
  // Projects filter
  const projectTabs = document.querySelectorAll('.project-tabs .tab');
  const projectCards = document.querySelectorAll('.project-card');

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      projectTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
        if (match) {
          card.classList.remove('visible');
          requestAnimationFrame(() => card.classList.add('visible'));
        }
      });
    });
  });

  // Services filter — only tabs inside the services section
  const servicesSection = document.querySelector('#services');
  if (servicesSection) {
    const serviceTabs = servicesSection.querySelectorAll('.project-tabs .tab');
    const serviceCards = servicesSection.querySelectorAll('.service-card');

    serviceTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;

        serviceTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        serviceCards.forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-hidden', !match);
          if (match) {
            card.classList.remove('visible');
            requestAnimationFrame(() => card.classList.add('visible'));
          }
        });
      });
    });
  }
});
