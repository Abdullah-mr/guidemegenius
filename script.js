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
/* =========================================================
   UNIFIED PROJECT FILTER — Homepage + projects.html
   Adds support for 7 categories with tab counts
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.project-tabs .tab');
  const cards = document.querySelectorAll('.project-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update active state
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);

        // Re-trigger reveal animation for visible cards
        if (match) {
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => card.classList.add('visible'));
          });
        }
      });
    });
  });
});

/* =========================================================
   URL HASH FILTER — Support deep links like
   projects.html#filter=engineering
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (!hash || !hash.includes('filter=')) return;

  const category = hash.replace('#filter=', '');
  const targetTab = document.querySelector(`.project-tabs .tab[data-filter="${category}"]`);
  if (targetTab) targetTab.click();
});

/* =========================================================
   LAZY REVEAL FOR LARGE LISTS
   Uses IntersectionObserver to only reveal cards in view.
   Improves performance with 100+ project cards.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  // Skip if IntersectionObserver is not supported
  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach((el) => observer.observe(el));
});

/* =========================================================
   AUTO-REFRESH FOOTER YEAR (already exists in main, kept
   here to be safe for projects.html which has its own footer)
   ========================================================= */
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* =========================================================
   SCROLL TO TOP ON TAB CHANGE
   Keeps user oriented when clicking filters on projects.html
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const tabsContainer = document.querySelector('.project-tabs');
  if (!tabsContainer) return;

  tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab')) {
      // Only smooth-scroll on projects.html (long page)
      if (document.querySelectorAll('.project-card').length > 30) {
        window.scrollTo({
          top: tabsContainer.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  });
});