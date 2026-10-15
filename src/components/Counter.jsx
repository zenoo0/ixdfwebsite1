import { useEffect, useRef, useState } from 'react';

/** Counts up to `to` when scrolled into view. */
export default function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const run = () => {
      if (reduce) {
        setVal(to);
        return;
      }
      const t0 = performance.now();
      const dur = 1800;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <b ref={ref}>
      {val.toLocaleString('en-US')}
      {suffix && <i>{suffix}</i>}
    </b>
  );
}
