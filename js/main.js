/* ═══════════════════════════════════════
   PORTFOLIO — main.js
═══════════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(10, 22, 40, 0.99)'
    : 'rgba(10, 22, 40, 0.92)';
}, { passive: true });

// ── Modal system ──────────────────────────────
const overlay   = document.getElementById('modal-overlay');
const cards     = document.querySelectorAll('.port-card');
const closebtns = document.querySelectorAll('.modal-close');

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  overlay.classList.add('active');
  modal.classList.add('active');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => modal.querySelector('.modal-close')?.focus(), 50);
}

function closeAllModals() {
  overlay.classList.remove('active');
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (card.dataset.url) {
      window.open(card.dataset.url, '_blank');
    } else {
      openModal(card.dataset.modal);
    }
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (card.dataset.url) window.open(card.dataset.url, '_blank');
      else openModal(card.dataset.modal);
    }
  });
});

closebtns.forEach(btn => btn.addEventListener('click', closeAllModals));
overlay.addEventListener('click', e => { if (e.target === overlay) closeAllModals(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });

// ── Scroll reveal ─────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .reveal { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .revealed { opacity: 1; transform: none; }
`;
document.head.appendChild(style);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.port-card, .about-text p, .about-details').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Contact form → Formspree → nathanbs48@gmail.com ──
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    formStatus.textContent = '';

    const data = {
      name:    form.name.value,
      email:   form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch('https://formspree.io/f/mlgkpvbd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        formStatus.textContent = '✓ Message sent — I\'ll get back to you soon.';
        form.reset();
        btn.textContent = 'Send';
        btn.disabled = false;
      } else {
        throw new Error('Server error');
      }
    } catch {
      formStatus.textContent = 'Something went wrong — please try again or email nathanbs48@gmail.com directly.';
      btn.textContent = 'Send';
      btn.disabled = false;
    }
  });
}
