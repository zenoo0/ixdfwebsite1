import { useEffect, useRef } from 'react';

/**
 * Moves its children at a different speed to the scroll, eased with a lerp so it
 * glides instead of jumping. Position is measured from the (untransformed) parent.
 */
export default function Parallax({ speed = 0.1, className = '', style, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0, visible = false, cur = 0, target = 0;
    const measure = () => {
      const r = host.getBoundingClientRect();
      target = -(r.top + r.height / 2 - window.innerHeight / 2) * speed;
    };
    const tick = () => {
      cur += (target - cur) * 0.1;
      el.style.transform = `translate3d(0, ${cur.toFixed(2)}px, 0)`;
      raf = Math.abs(target - cur) > 0.15 && visible ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!visible) return;
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    }, { rootMargin: '300px' });
    io.observe(host);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </div>
  );
}
