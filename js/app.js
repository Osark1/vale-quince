/**
 * app.js — XV Años Sofía Valentina
 * Módulos: Countdown · Lightbox · RSVP form · Scroll reveal
 *
 * ══════════════════════════════════════════
 *  CONFIGURACIÓN — Edita estos valores
 * ══════════════════════════════════════════ */
const CONFIG = {
  /* Fecha y hora de la fiesta (formato ISO) */
  partyDate: '2026-07-18T19:00:00',

  /* Nombre de la quinceañera — aparece en mensajes de confirmación */
  quinceañera: 'Angie Valentina',

  /* Hoja de cálculo para guardar RSVPs (Google Sheets Web App URL)
     Déjalo vacío '' si usas Formspree o cualquier otro backend */
  sheetsUrl: '',

  /* Formspree endpoint (alternativa a Google Sheets)
     Crea un formulario gratuito en https://formspree.io
     y pega aquí el action URL, ej: 'https://formspree.io/f/xkgnbbll'
     Déjalo vacío '' si usas Google Sheets */
  formspreeUrl: 'https://formspree.io/f/XXXXXXXX',
};

/* ══════════════════════════════════════════
   1. COUNTDOWN
   ══════════════════════════════════════════ */
(function initCountdown() {
  const target = new Date(CONFIG.partyDate).getTime();
  const els = {
    days:    document.getElementById('cd-days'),
    hours:   document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      els.days.textContent = els.hours.textContent = '00';
      els.minutes.textContent = els.seconds.textContent = '00';
      return;
    }

    els.days.textContent    = pad(Math.floor(diff / 86400000));
    els.hours.textContent   = pad(Math.floor((diff % 86400000) / 3600000));
    els.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
    els.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  setInterval(tick, 1000);
})();

/* ══════════════════════════════════════════
   2. LIGHTBOX
   ══════════════════════════════════════════ */
(function initLightbox() {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lb-img');
  const btnClose = document.getElementById('lb-close');
  const btnPrev  = document.getElementById('lb-prev');
  const btnNext  = document.getElementById('lb-next');
  let current = 0;

  function open(i) {
    const photos = window.__galleryPhotos || [];
    if (!photos.length) return;
    current = ((i % photos.length) + photos.length) % photos.length;
    lbImg.src = photos[current].src;
    lbImg.alt = photos[current].alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.getElementById('gallery').addEventListener('click', e => {
    const item = e.target.closest('.gallery__item');
    if (item) open(parseInt(item.dataset.index));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => open(current - 1));
  btnNext.addEventListener('click', () => open(current + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') open(current - 1);
    if (e.key === 'ArrowRight') open(current + 1);
  });
})();

/* ══════════════════════════════════════════
   3. GUEST SELECTOR
   ══════════════════════════════════════════ */
(function initGuestSelector() {
  const selector = document.getElementById('guest-selector');
  const hidden   = document.getElementById('f-guests');
  if (!selector) return;

  selector.addEventListener('click', e => {
    const btn = e.target.closest('.guest-btn');
    if (!btn) return;
    selector.querySelectorAll('.guest-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    hidden.value = btn.dataset.val;
  });
})();

/* ══════════════════════════════════════════
   4. RSVP FORM
   ══════════════════════════════════════════ */
(function initRSVP() {
  const form    = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');
  const nameEl  = document.getElementById('success-name');
  const submit  = document.getElementById('rsvp-submit');
  const btnText = submit.querySelector('.btn-text');
  const btnLoad = submit.querySelector('.btn-loader');

  if (!form) return;

  function validate() {
    let ok = true;
    ['f-name','f-phone','f-email','f-guests'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.classList.add('error');
        ok = false;
      } else {
        el.classList.remove('error');
      }
    });
    const email = document.getElementById('f-email');
    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    btnText.classList.add('hidden');
    btnLoad.classList.remove('hidden');
    submit.disabled = true;

    const data = {
      nombre:     document.getElementById('f-name').value.trim(),
      telefono:   document.getElementById('f-phone').value.trim(),
      email:      document.getElementById('f-email').value.trim(),
      asistentes: document.getElementById('f-guests').value,
      mensaje:    document.getElementById('f-message').value.trim(),
      timestamp:  new Date().toISOString(),
    };

    try {
      /* ─ Intentar envío real si hay endpoint configurado ─ */
      const url = CONFIG.formspreeUrl || CONFIG.sheetsUrl;
      if (url && !url.includes('XXXXXXXX')) {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        /* Simulación para demo — en producción configura formspreeUrl */
        await new Promise(r => setTimeout(r, 1200));
        console.log('RSVP data (demo):', data);
      }

      /* Guardar localmente como respaldo */
      saveLocalRSVP(data);

      nameEl.textContent = data.nombre.split(' ')[0];
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (err) {
      console.error('Error al enviar RSVP:', err);
      /* Guardar local de todas formas */
      saveLocalRSVP(data);
      nameEl.textContent = data.nombre.split(' ')[0];
      form.classList.add('hidden');
      success.classList.remove('hidden');
    }
  });

  function saveLocalRSVP(data) {
    try {
      const prev = JSON.parse(localStorage.getItem('rsvps') || '[]');
      prev.push(data);
      localStorage.setItem('rsvps', JSON.stringify(prev));
    } catch (_) {}
  }

  /* Limpiar error al escribir */
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
})();

/* ══════════════════════════════════════════
   5. SCROLL REVEAL
   ══════════════════════════════════════════ */
(function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* Apply reveal class to detail cards and section titles after DOM ready */
  document.querySelectorAll('.detail-card, .countdown-section, .rsvp-inner').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
