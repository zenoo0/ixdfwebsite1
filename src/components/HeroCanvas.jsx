import { useEffect, useRef } from 'react';

/** Palette weights for the light rays: [r, g, b, weight] */
const PALETTE = [
  [255, 255, 255, 0.34],
  [45, 227, 192, 0.22],
  [139, 125, 255, 0.28],
  [255, 183, 49, 0.08],
  [255, 110, 190, 0.08]
];

const pick = () => {
  let r = Math.random();
  for (const c of PALETTE) {
    r -= c[3];
    if (r <= 0) return c;
  }
  return PALETTE[0];
};

/**
 * Still dark "eclipse" core. The light streaks shoot out of it continuously:
 * every ray has a comet that travels from the rim to the edge of the screen.
 */
export default function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, cx = 0, cy = 0, R = 0, raf = 0, visible = true;
    let rays = [], dots = [];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const narrow = w < 820;
      cx = w * (narrow ? 0.64 : 0.72);
      cy = h * (narrow ? 0.2 : 0.44);
      R = Math.min(w, h) * (narrow ? 0.14 : 0.15);
      const n = narrow ? 100 : 190;
      rays = Array.from({ length: n }, () => ({
        a: Math.random() * Math.PI * 2,
        k0: 1.03 + Math.random() * 0.12,
        lk: 1.5 + Math.pow(Math.random(), 1.4) * 11, // max length in core radii
        wid: 0.6 + Math.random() * 2,
        c: pick(),
        alpha: 0.5 + Math.random() * 0.5,
        speed: 0.07 + Math.random() * 0.3, // trips per second
        ph: Math.random(),
        tail: 0.18 + Math.random() * 0.4
      }));
      dots = Array.from({ length: 70 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        ph: Math.random() * 6.28,
        vy: 0.04 + Math.random() * 0.12,
        c: Math.random() > 0.55 ? PALETTE[1] : Math.random() > 0.5 ? PALETTE[2] : PALETTE[3]
      }));
    };

    const frame = (t) => {
      const s = reduce ? 3 : t / 1000;
      const spin = s * 0.012; // the whole burst turns very slowly
      ctx.clearRect(0, 0, w, h);

      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 4.6);
      halo.addColorStop(0, 'rgba(120,96,255,.6)');
      halo.addColorStop(0.45, 'rgba(70,52,200,.24)');
      halo.addColorStop(1, 'rgba(6,8,24,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      ctx.lineCap = 'round';
      for (const r of rays) {
        const a = r.a + spin;
        const ca = Math.cos(a), sa = Math.sin(a);
        const r0 = R * r.k0;
        const len = R * r.lk;
        const [cr, cg, cb] = r.c;

        // faint static guide so the burst always reads as a burst
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${r.alpha * 0.1})`;
        ctx.lineWidth = r.wid * 0.6;
        ctx.beginPath();
        ctx.moveTo(cx + ca * r0, cy + sa * r0);
        ctx.lineTo(cx + ca * (r0 + len), cy + sa * (r0 + len));
        ctx.stroke();

        // the travelling comet
        const p = (s * r.speed + r.ph) % 1;
        const head = r0 + len * p;
        const tail = r0 + len * Math.max(0, p - r.tail);
        const env = Math.pow(1 - p, 0.8) * Math.min(1, p * 12);
        if (env < 0.02) continue;
        const x0 = cx + ca * tail, y0 = cy + sa * tail;
        const x1 = cx + ca * head, y1 = cy + sa * head;
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},${r.alpha * env})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = r.wid;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      for (const d of dots) {
        d.y -= d.vy;
        if (d.y < -4) d.y = h + 4;
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(s * 1.3 + d.ph));
        ctx.fillStyle = `rgba(${d.c[0]},${d.c[1]},${d.c[2]},${a})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, 6.283);
        ctx.fill();
      }

      // the core stays perfectly still
      const rim = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.14);
      rim.addColorStop(0, 'rgba(139,125,255,0)');
      rim.addColorStop(0.55, 'rgba(139,125,255,.6)');
      rim.addColorStop(1, 'rgba(139,125,255,0)');
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.14, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = '#04051a';
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 6.283);
      ctx.fill();

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onResize = () => { build(); start(); };
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
      io.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
