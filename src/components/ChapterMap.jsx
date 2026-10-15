import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DATA, PK_OUTLINE } from '../data/data.js';
import { Arrow } from './Icons.jsx';
import Reveal from './Reveal.jsx';
import Counter from './Counter.jsx';

const W = 640, H = 590;
const STEP_MS = 5200;
// simple equirectangular projection tuned to Pakistan's bounding box
const px = (lon) => (lon - 60.4) * 36;
const py = (lat) => (37.3 - lat) * 41;
const pts = PK_OUTLINE.map(([lo, la]) => [px(lo), py(la)]);

/** Closed Catmull-Rom spline through the outline so the border looks organic, not blocky. */
const smoothPath = (p, k = 0.8) => {
  const n = p.length;
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    const c1 = [p1[0] + ((p2[0] - p0[0]) / 6) * k, p1[1] + ((p2[1] - p0[1]) / 6) * k];
    const c2 = [p2[0] - ((p3[0] - p1[0]) / 6) * k, p2[1] - ((p3[1] - p1[1]) / 6) * k];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d}Z`;
};
const LAND = smoothPath(pts);

/** Gentle arc between two chapters, bowed upwards. */
const arc = (a, b) => {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(len * 0.28, 70);
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${(mx + (dy / len) * bow).toFixed(1)} ${(my - (dx / len) * bow).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

const LEFT = ['quetta', 'karachi', 'hyderabad', 'peshawar', 'faisalabad'];
const pad = (n) => String(n).padStart(2, '0');

/** Interactive chapters map: auto-cycles, links the active city to every other one. */
export default function ChapterMap() {
  const chapters = DATA.chapters;
  const n = chapters.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef(null);
  const c = chapters[i];

  const nodes = useMemo(() => chapters.map((ch) => ({ slug: ch.slug, x: px(ch.lon), y: py(ch.lat), r: 5 + Math.sqrt(ch.members) / 18 })), [chapters]);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    if (paused || !inView || reduce) return undefined;
    const t = setTimeout(() => setI((v) => (v + 1) % n), STEP_MS);
    return () => clearTimeout(t);
  }, [i, paused, inView, reduce, n]);

  const go = (d) => setI((v) => (v + d + n) % n);
  const active = nodes[i];

  return (
    <div
      className="cm"
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Reveal className="cm__map">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of IxDF Pakistan city chapters">
          <defs>
            <clipPath id="cm-land"><path d={LAND} /></clipPath>
            <pattern id="cm-dots" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="1.05" fill="rgba(160,148,255,.5)" />
            </pattern>
            <linearGradient id="cm-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(109,94,252,.34)" />
              <stop offset="1" stopColor="rgba(45,227,192,.1)" />
            </linearGradient>
            <linearGradient id="cm-scan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(45,227,192,0)" />
              <stop offset=".5" stopColor="rgba(45,227,192,.28)" />
              <stop offset="1" stopColor="rgba(45,227,192,0)" />
            </linearGradient>
          </defs>

          <path d={LAND} fill="url(#cm-fill)" />
          <rect width={W} height={H} fill="url(#cm-dots)" clipPath="url(#cm-land)" />
          <g clipPath="url(#cm-land)"><rect className="cm__scan" x="-160" y="0" width="160" height={H} fill="url(#cm-scan)" /></g>
          <path d={LAND} className="cm__edge" />

          {/* links from the active chapter to all the others */}
          <g key={c.slug} className="cm__arcs">
            {nodes.map((nd, k) => (k === i ? null : (
              <g key={nd.slug}>
                <path d={arc(active, nd)} className="cm__dash" />
                <path d={arc(active, nd)} className="cm__draw" pathLength="100" style={{ animationDelay: `${(k % n) * 0.05}s` }} />
              </g>
            )))}
          </g>

          {chapters.map((ch, k) => {
            const nd = nodes[k];
            const left = LEFT.includes(ch.slug);
            const on = k === i;
            return (
              <g
                key={ch.slug}
                className={`cm__pin ${on ? 'on' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`${ch.name}, ${ch.members} members`}
                aria-pressed={on}
                onMouseEnter={() => setI(k)}
                onFocus={() => setI(k)}
                onClick={() => setI(k)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setI(k); } }}
              >
                {on && <circle className="cm__ring" cx={nd.x} cy={nd.y} r={nd.r + 2} />}
                <circle className="cm__halo" cx={nd.x} cy={nd.y} r={nd.r + 7} />
                <circle className="cm__dot" cx={nd.x} cy={nd.y} r={on ? nd.r + 2 : nd.r} />
                <text x={left ? nd.x - nd.r - 10 : nd.x + nd.r + 10} y={nd.y + 4.5} textAnchor={left ? 'end' : 'start'}>{ch.name}</text>
              </g>
            );
          })}
        </svg>
        <div className="cm__legend"><i /> Larger dot = bigger chapter</div>
      </Reveal>

      <Reveal className="cm__side" delay={0.12}>
        <article className="cp" aria-live="polite">
          <div className="cp__bg"><img key={c.slug} src={c.photo} alt="" /></div>
          <div className="cp__top">
            <span className="cp__idx">{pad(i + 1)}<small> / {pad(n)}</small></span>
            <div className="cp__nav">
              <button type="button" onClick={() => go(-1)} aria-label="Previous chapter"><Arrow className="arrow flip" /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next chapter"><Arrow /></button>
            </div>
          </div>
          <div className="cp__body" key={c.slug}>
            <span className="cp__tag">{c.focus}</span>
            <h3>{c.name}</h3>
            <p>{c.blurb}</p>
            <div className="cp__s">
              <div><Counter to={c.members} /><span>Members</span></div>
              <div><Counter to={c.unis} /><span>Universities</span></div>
            </div>
            <Link to={`/chapters/${c.slug}`} className="btn btn--amber">Explore {c.name} chapter <Arrow /></Link>
          </div>
          <span className="cp__prog" aria-hidden="true">
            <i key={`${c.slug}-${paused}`} className={paused || reduce ? 'off' : ''} style={{ animationDuration: `${STEP_MS}ms` }} />
          </span>
        </article>
        <div className="chips" role="group" aria-label="Choose a chapter">
          {chapters.map((ch, k) => (
            <button key={ch.slug} type="button" className={`pill ${k === i ? 'on' : ''}`} aria-pressed={k === i} onClick={() => setI(k)}>{ch.name}</button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
