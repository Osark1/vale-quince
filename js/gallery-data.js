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
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    caption: "Sofía — 2024",
    alt: "Sofía sonriendo"
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
    caption: "Familia unida",
    alt: "Foto familiar"
  },
  {
    src: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=800&q=80",
    caption: "Recuerdos",
    alt: "Flores azules"
  },
  {
    src: "https://images.unsplash.com/photo-1533777419517-3e3b17b95285?w=800&q=80",
    caption: "Cumpleaños 10",
    alt: "Pastel de cumpleaños"
  },
  {
    src: "https://images.unsplash.com/photo-1515372261803-71e74e41f41b?w=800&q=80",
    caption: "Siempre sonriendo",
    alt: "Sofía de perfil"
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80",
    caption: "La gran noche se acerca",
    alt: "Decoración elegante"
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    caption: "Momentos especiales",
    alt: "Luces bokeh"
  },
  {
    src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80",
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
