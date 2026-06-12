/* ═══════════════════════════════════
   PORTFOLIO — main.js
═══════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(10, 22, 40, 0.98)'
    : 'rgba(10, 22, 40, 0.9)';
}, { passive: true });

// ── Active nav link on scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Modal system ──────────────────────────────
const overlay   = document.getElementById('modal-overlay');
const cards     = document.querySelectorAll('.port-card[data-modal]');
const closebtns = document.querySelectorAll('.modal-close');

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  overlay.classList.add('active');
  modal.classList.add('active');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  // focus the close button for accessibility
  setTimeout(() => modal.querySelector('.modal-close')?.focus(), 50);
}

function closeAllModals() {
  overlay.classList.remove('active');
  document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cards.forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.modal));
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openModal(card.dataset.modal);
  });
});

closebtns.forEach(btn => btn.addEventListener('click', closeAllModals));

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeAllModals();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

// ── Scroll reveal ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.port-card, .about-block, .about-bio').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Inject reveal CSS dynamically to avoid FOUC
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .revealed {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);

// ── Contact form feedback ─────────────────────
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const action = form.getAttribute('action');

      if (action.includes('YOUR_FORM_ID')) {
        // Demo mode — no real submission
        await new Promise(r => setTimeout(r, 800));
        btn.textContent = 'Message sent ✓';
        btn.style.background = '#4a7c5a';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
        return;
      }

      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.textContent = 'Message sent ✓';
        btn.style.background = '#4a7c5a';
        form.reset();
      } else {
        btn.textContent = 'Error — try again';
        btn.style.background = '#7c2a2a';
      }
    } catch {
      btn.textContent = 'Error — try again';
      btn.style.background = '#7c2a2a';
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}
