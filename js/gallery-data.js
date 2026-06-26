/**
 * gallery-data.js
 *
 * PERSONALIZA AQUÍ: Edita el array `photos` con tus propias fotos.
 * Puedes usar:
 *   - Rutas locales:  "images/foto1.jpg"
 *   - URLs externas: "https://..."
 *
 * El campo `caption` es opcional.
 */
const photos = [
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "Angie — 2024",
    alt: "Angie sonriendo"
  },
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "Familia unida",
    alt: "Foto familiar"
  },
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "Recuerdos",
    alt: "Flores azules"
  },
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "Cumpleaños 10",
    alt: "Pastel de cumpleaños"
  },
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "Siempre sonriendo",
    alt: "Angie de perfil"
  },
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "La gran noche se acerca",
    alt: "Decoración elegante"
  },
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "Momentos especiales",
    alt: "Luces bokeh"
  },
  {
    src: "{css,js,images}/valeimg1.png",
    caption: "Celebración",
    alt: "Celebración"
  }
];

/* ─── Render gallery ─── */
(function buildGallery() {
  const container = document.getElementById('gallery');
  if (!container) return;

  photos.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'gallery__item reveal';
    item.dataset.index = i;

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt || `Foto ${i + 1}`;
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'gallery__overlay';
    if (photo.caption) {
      const cap = document.createElement('span');
      cap.style.cssText = 'font-family:var(--ff-body);font-size:0.9rem;color:var(--pearl);font-style:italic;';
      cap.textContent = photo.caption;
      overlay.appendChild(cap);
    }

    item.appendChild(img);
    item.appendChild(overlay);
    container.appendChild(item);
  });

  /* Expose photos globally for lightbox */
  window.__galleryPhotos = photos;
})();
