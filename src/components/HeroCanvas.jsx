import { useEffect, useRef } from 'react';

/** Palette: [r, g, b, weight] */
const PALETTE = [
  [255, 255, 255, 0.34],
  [45, 227, 192, 0.22],
  [139, 125, 255, 0.28],
  [255, 183, 49, 0.08],
  [255, 110, 190, 0.08]
];

const pickColor = () => {
  let r = Math.random();
  for (let i = 0; i < PALETTE.length; i++) {
    r -= PALETTE[i][3];
    if (r <= 0) return i;
  }
  return 0;
};

const bitmap = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

/**
 * Still dark "eclipse" core; light streaks shoot out of it.
 *
 * Built to be cheap: everything static (halo, faint guide lines, the core) is
 * drawn once into cached bitmaps. Per frame we only blit those and stroke the
 * moving comets with solid colours (no per-frame gradients).
 */
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, cx = 0, cy = 0, R = 0, raf = 0, visible = true;
    let rays = [], dots = [], baseBmp = null, coreBmp = null, resizeRaf = 0;

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w; // 1x is plenty for hairline streaks and keeps fill-rate low
      canvas.height = h;
      const narrow = w < 820;
      cx = w * (narrow ? 0.64 : 0.72);
      cy = h * (narrow ? 0.2 : 0.44);
      R = Math.min(w, h) * (narrow ? 0.14 : 0.15);

      const n = narrow ? 80 : 150;
      rays = Array.from({ length: n }, () => ({
        a: Math.random() * Math.PI * 2,
        k0: 1.03 + Math.random() * 0.12,
        lk: 1.5 + Math.pow(Math.random(), 1.4) * 11,
        wid: 0.7 + Math.random() * 1.8,
        c: pickColor(),
        alpha: 0.55 + Math.random() * 0.45,
        speed: 0.07 + Math.random() * 0.3,
        ph: Math.random(),
        tail: 0.2 + Math.random() * 0.4
      }));
      // group by colour so strokeStyle is set only 5 times a frame
      rays.sort((p, q) => p.c - q.c);

      const dn = narrow ? 18 : 36;
      dots = Array.from({ length: dn }, () => ({
        x: Math.random() * w, y: Math.random() * h, s: 1 + Math.random() * 1.6,
        ph: Math.random() * 6.28, vy: 0.04 + Math.random() * 0.12, c: Math.random() > 0.5 ? 1 : 2
      }));

      // --- cached layer 1: halo + faint static guide lines
      baseBmp = bitmap(w, h);
      const b = baseBmp.getContext('2d');
      const halo = b.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 4.6);
      halo.addColorStop(0, 'rgba(120,96,255,.6)');
      halo.addColorStop(0.45, 'rgba(70,52,200,.24)');
      halo.addColorStop(1, 'rgba(6,8,24,0)');
      b.fillStyle = halo;
      b.fillRect(0, 0, w, h);
      b.lineCap = 'round';
      for (const r of rays) {
        const c = PALETTE[r.c];
        b.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${r.alpha * 0.1})`;
        b.lineWidth = r.wid * 0.6;
        b.beginPath();
        b.moveTo(cx + Math.cos(r.a) * R * r.k0, cy + Math.sin(r.a) * R * r.k0);
        b.lineTo(cx + Math.cos(r.a) * (R * r.k0 + R * r.lk), cy + Math.sin(r.a) * (R * r.k0 + R * r.lk));
        b.stroke();
      }

      // --- cached layer 2: the dark core with its glowing rim
      const size = Math.ceil(R * 2.6);
      coreBmp = bitmap(size, size);
      const k = coreBmp.getContext('2d');
      const m = size / 2;
      const rim = k.createRadialGradient(m, m, R * 0.92, m, m, R * 1.14);
      rim.addColorStop(0, 'rgba(139,125,255,0)');
      rim.addColorStop(0.55, 'rgba(139,125,255,.6)');
      rim.addColorStop(1, 'rgba(139,125,255,0)');
      k.fillStyle = rim;
      k.beginPath();
      k.arc(m, m, R * 1.14, 0, 6.283);
      k.fill();
      k.fillStyle = '#04051a';
      k.beginPath();
      k.arc(m, m, R, 0, 6.283);
      k.fill();
    };

    const LEVELS = [0.25, 0.6, 1];

    const frame = (t) => {
      const s = reduce ? 3 : t / 1000;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.drawImage(baseBmp, 0, 0);

      // comets: three solid sub-segments per ray fake a fading tail
      ctx.lineCap = 'butt';
      let cur = -1;
      for (let i = 0; i < rays.length; i++) {
        const r = rays[i];
        const p = (s * r.speed + r.ph) % 1;
        const env = Math.pow(1 - p, 0.8) * Math.min(1, p * 12);
        if (env < 0.03) continue;
        if (r.c !== cur) {
          cur = r.c;
          const c = PALETTE[cur];
          ctx.strokeStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        }
        const ca = Math.cos(r.a), sa = Math.sin(r.a);
        const r0 = R * r.k0, len = R * r.lk;
        const head = r0 + len * p;
        const tail = r0 + len * Math.max(0, p - r.tail);
        const span = head - tail;
        ctx.lineWidth = r.wid;
        for (let j = 0; j < 3; j++) {
          const a0 = tail + (span * j) / 3, a1 = tail + (span * (j + 1)) / 3;
          ctx.globalAlpha = r.alpha * env * LEVELS[j];
          ctx.beginPath();
          ctx.moveTo(cx + ca * a0, cy + sa * a0);
          ctx.lineTo(cx + ca * a1, cy + sa * a1);
          ctx.stroke();
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.y -= d.vy;
        if (d.y < -4) d.y = h + 4;
        const c = PALETTE[d.c];
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.globalAlpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(s * 1.3 + d.ph));
        ctx.fillRect(d.x, d.y, d.s, d.s);
      }

      ctx.globalAlpha = 1;
      ctx.drawImage(coreBmp, cx - coreBmp.width / 2, cy - coreBmp.height / 2);

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => { build(); start(); });
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });

    build();
    start();
    io.observe(canvas);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
