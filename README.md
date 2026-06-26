# 💙 XV Años — Sitio de Invitación

Página de invitación elegante para quinceañero con cuenta regresiva, galería de fotos, formulario RSVP y panel de administración para enviar invitaciones personalizadas.

---

## 📁 Estructura de archivos

```
/
├── index.html          ← Página de invitación (pública)
├── admin.html          ← Panel para enviar invitaciones
├── css/
│   └── style.css
├── js/
│   ├── starfield.js    ← Animación de estrellas
│   ├── gallery-data.js ← Fotos de la galería ← EDITA AQUÍ
│   └── app.js          ← Lógica principal ← CONFIGURA AQUÍ
├── images/             ← Pon tus fotos aquí
└── README.md
```

---

## ⚙️ Personalización paso a paso

### 1. Cambia el nombre de la quinceañera
En `index.html` busca **"Sofía Valentina"** y reemplázalo con el nombre real.

### 2. Cambia la fecha y lugar
En `index.html` edita:
```
19 de julio de 2025 · 7:00 p.m.
Salón Palacio Azul — Bogotá
```

También actualiza `CONFIG.partyDate` en `js/app.js`:
```js
partyDate: '2025-07-19T19:00:00',  // ← Cambia esta fecha
```

### 3. Agrega tus fotos
**Opción A — Fotos locales (recomendado):**
1. Copia tus fotos a la carpeta `/images/`
2. Edita `js/gallery-data.js`:
```js
const photos = [
  { src: "images/foto1.jpg", caption: "Mi cumpleaños 10", alt: "Sofía de niña" },
  { src: "images/foto2.jpg", caption: "Con mis amigas",   alt: "Grupo de amigas" },
  // ...más fotos
];
```

**Opción B — URLs de internet:**
```js
{ src: "https://tuservidor.com/foto.jpg", caption: "Título" }
```

### 4. Configura el formulario RSVP (para recibir confirmaciones)

**Opción gratuita con Formspree:**
1. Ve a [formspree.io](https://formspree.io) y crea una cuenta gratis
2. Crea un nuevo formulario
3. Copia el Action URL (ej: `https://formspree.io/f/abcdefgh`)
4. Pégalo en `js/app.js`:
```js
formspreeUrl: 'https://formspree.io/f/abcdefgh',
```
Las respuestas llegarán por correo electrónico.

---

## 🚀 Publicar en GitHub Pages

1. Crea un repositorio en GitHub (ej: `xv-sofia`)
2. Sube todos los archivos:
```bash
git init
git add .
git commit -m "XV años Sofía Valentina"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/xv-sofia.git
git push -u origin main
```
3. En GitHub → Settings → Pages → Source: **main branch / root**
4. Tu página estará en: `https://TU_USUARIO.github.io/xv-sofia/`

---

## 📲 Usar el panel de invitaciones (`admin.html`)

Abre `admin.html` en tu navegador (o ve a `tudominio.com/admin.html`):

- **Agrega invitados** con nombre, teléfono y/o email
- **Envía por WhatsApp**: abre WhatsApp Web con el mensaje listo
- **Envía por email**: abre tu cliente de correo con el mensaje listo
- **Copia link personalizado**: cada invitado recibe un URL único
- **Exporta CSV**: descarga la lista de invitados o confirmaciones

> 💡 El panel guarda los datos en el navegador (localStorage). Para compartirlo con otra persona o usarlo desde otro dispositivo, exporta el CSV primero.

---

## 🎨 Personalizar los colores

En `css/style.css` edita las variables al inicio:
```css
:root {
  --navy:       #06091E;   /* Fondo oscuro */
  --gold:       #C9A84C;   /* Dorado */
  --blue-royal: #2563EB;   /* Azul real */
  /* ... */
}
```

---

## ✦ Características

- ✅ Diseño 100% responsive (móvil y escritorio)
- ✅ Cuenta regresiva en tiempo real
- ✅ Galería con lightbox
- ✅ Formulario RSVP con validación
- ✅ Panel de administración
- ✅ Envío por WhatsApp (un clic)
- ✅ Envío por email (un clic)
- ✅ Links personalizados por invitado
- ✅ Exportar lista de invitados y confirmaciones como CSV
- ✅ Animación de estrellas/bokeh
- ✅ Compatible con GitHub Pages (sin backend requerido)
- ✅ Accesible (teclado, roles ARIA, reduced-motion)
