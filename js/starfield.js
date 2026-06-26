/* js/starfield.js — ambient particle canvas */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [], bokeh = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function initStars() {
    stars = [];
    bokeh = [];
    const N = Math.floor((W * H) / 3500);
    for (let i = 0; i < N; i++) {
      stars.push({
        x: rand(0, W), y: rand(0, H),
        r: rand(0.3, 1.5),
        a: rand(0, 1),
        speed: rand(0.0003, 0.001),
        phase: rand(0, Math.PI * 2),
      });
    }
    for (let i = 0; i < 18; i++) {
      bokeh.push({
        x: rand(0, W), y: rand(0, H),
        r: rand(20, 80),
        a: rand(0.015, 0.06),
        hue: Math.random() < 0.6 ? '37,99,235' : '201,168,76',
        speed: rand(0.00015, 0.0005),
        phase: rand(0, Math.PI * 2),
        dx: rand(-0.08, 0.08),
        dy: rand(-0.04, 0.04),
      });
    }
  }

  let t = 0;
  function draw() {
    t += 0.016;
    ctx.clearRect(0, 0, W, H);

    // Bokeh blobs
    bokeh.forEach(b => {
      b.x += b.dx;
      b.y += b.dy;
      if (b.x < -b.r) b.x = W + b.r;
      if (b.x > W + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = H + b.r;
      if (b.y > H + b.r) b.y = -b.r;

      const alpha = b.a * (0.6 + 0.4 * Math.sin(t * b.speed * 1000 + b.phase));
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      g.addColorStop(0, `rgba(${b.hue},${alpha})`);
      g.addColorStop(1, `rgba(${b.hue},0)`);
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    });

    // Stars
    stars.forEach(s => {
      const alpha = s.a * (0.5 + 0.5 * Math.sin(t * s.speed * 1000 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,238,248,${alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  draw();
})();
