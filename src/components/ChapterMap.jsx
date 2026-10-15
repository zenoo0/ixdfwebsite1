import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DATA, PK_OUTLINE } from '../data/data.js';
import { Arrow } from './Icons.jsx';
import Reveal from './Reveal.jsx';

const W = 640, H = 590;
// simple equirectangular projection tuned to Pakistan's bounding box
const px = (lon) => (lon - 60.4) * 36;
const py = (lat) => (37.3 - lat) * 41;
const outline = PK_OUTLINE.map(([lo, la]) => `${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join(' ');

/** Interactive map of chapters with a detail panel. */
export default function ChapterMap() {
  const [active, setActive] = useState('karachi');
  const c = DATA.chapters.find((x) => x.slug === active);

  return (
    <div className="cmap">
      <Reveal className="map">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of IxDF Pakistan city chapters">
          <polygon className="map__land" points={outline} />
          {DATA.chapters.map((ch) => {
            const x = px(ch.lon), y = py(ch.lat);
            const left = ['quetta', 'karachi', 'hyderabad', 'peshawar', 'faisalabad'].includes(ch.slug);
            return (
              <g
                key={ch.slug}
                className={`map__pin ${active === ch.slug ? 'on' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={ch.name}
                onMouseEnter={() => setActive(ch.slug)}
                onFocus={() => setActive(ch.slug)}
                onClick={() => setActive(ch.slug)}
              >
                <circle className="p" cx={x} cy={y} r="8" />
                <circle className="c" cx={x} cy={y} r={active === ch.slug ? 8 : 5.5} />
                <text x={left ? x - 14 : x + 14} y={y + 4} textAnchor={left ? 'end' : 'start'}>{ch.name}</text>
              </g>
            );
          })}
        </svg>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="cpanel" aria-live="polite">
          <h3>{c.name}</h3>
          <div className="f">{c.focus}</div>
          <p>{c.blurb}</p>
          <div className="cpanel__s">
            <div><b>{c.members.toLocaleString('en-US')}</b><span>Members</span></div>
            <div><b>{c.unis}</b><span>Universities</span></div>
          </div>
          <Link to={`/chapters/${c.slug}`} className="link-arrow">Explore {c.name} chapter <Arrow /></Link>
        </div>
        <div className="chips">
          {DATA.chapters.map((ch) => (
            <button key={ch.slug} className={`pill ${active === ch.slug ? 'on' : ''}`} onClick={() => setActive(ch.slug)}>{ch.name}</button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
