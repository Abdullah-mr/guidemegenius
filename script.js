/* =========================================================
   ASSIGNMENT EXPERTS — script.js
   Handles: scroll reveal, WhatsApp form, footer year
   ========================================================= */

// ---- 1. Scroll Reveal Animation ----
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealEls.forEach((el) => observer.observe(el));
});

// ---- 2. Contact Form -> WhatsApp ----
const form = document.getElementById('quoteForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name     = (data.get('name') || '').trim();
    const email    = (data.get('email') || '').trim();
    const subject  = (data.get('subject') || '').trim();
    const deadline = (data.get('deadline') || '').trim();
    const details  = (data.get('details') || '').trim();

    // Basic validation
    if (!name || !email || !subject || !details) {
      alert('Please fill in all required fields.');
      return;
    }

    // Build WhatsApp message
    const message =
      `*New Assignment Quote Request*%0A%0A` +
      `*Name:* ${encodeURIComponent(name)}%0A` +
      `*Email:* ${encodeURIComponent(email)}%0A` +
      `*Subject:* ${encodeURIComponent(subject)}%0A` +
      `*Deadline:* ${encodeURIComponent(deadline || 'Not specified')}%0A%0A` +
      `*Details:*%0A${encodeURIComponent(details)}`;

    // Your WhatsApp number (country code + number, no + or spaces)
    const phone = '9477552388';
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, '_blank');
    form.reset();
  });
}

// ---- 3. Auto-update Footer Year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();