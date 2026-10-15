import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import useInView from './useInView.js';
import Parallax from './Parallax.jsx';
import { Arrow, Pin, Cal, Globe } from './Icons.jsx';
import { fmtDate, shortRange } from '../lib/format.js';

/** Generated cover art driven by a hue */
export const Art = ({ hue = 262, img, className = '', children }) => (
  <div className={`art ${img ? 'art--photo' : ''} ${className}`} style={{ '--h': hue, ...(img ? { '--img': `url(${img})` } : null) }}>
    {children}
  </div>
);

/** A gradient photo used as a soft, masked glow behind a section. Drifts and parallaxes. */
export const GlowImage = ({ src, side = 'left', top = '10%', size = 860, opacity = 0.55, speed = 0.12 }) => (
  <Parallax speed={speed} className={`glow glow--${side}`} style={{ top, width: size, '--s': `${size}px` }}>
    <i style={{ '--src': `url(${src})`, '--o': opacity }} />
  </Parallax>
);

/** Wide rounded photo with a slowly moving image and overlay content. */
export const PhotoBanner = ({ src, alt = '', children }) => (
  <Reveal className="banner">
    <Parallax speed={-0.06} className="banner__bg">
      <img src={src} alt={alt} loading="lazy" />
    </Parallax>
    <div className="banner__in">{children}</div>
  </Reveal>
);

/** Floating, blurred gradient orbs used as a living background. */
export const Blobs = ({ tone = 'dark' }) => (
  <div className={`blobs blobs--${tone}`} aria-hidden="true">
    <i className="b1" /><i className="b2" /><i className="b3" /><i className="b4" />
  </div>
);

/**
 * Splits text into words (and letters) that rise out of a mask.
 * Animates when `active` is true; if omitted it triggers on scroll into view.
 */
export const SplitText = ({ text, active, delay = 0, step = 0.028, className = '' }) => {
  const [ref, seen] = useInView({ threshold: 0.3 });
  const go = active ?? seen;
  let n = 0;
  return (
    <span ref={ref} className={`split ${go ? 'in' : ''} ${className}`} aria-label={text} style={{ '--d': `${delay}s` }}>
      {text.split(' ').map((word, wi) => (
        <span className="w" key={wi} aria-hidden="true">
          {[...word].map((ch, ci) => (
            <span className="c" key={ci} style={{ '--i': n++ * step }}>{ch}</span>
          ))}
          {' '}
        </span>
      ))}
    </span>
  );
};

/** GITEX-style oversized heading with a rotated pill tag */
export const SectionHeading = ({ title, tag, tagTone = 'teal', sub, left = false }) => {
  const [ref, on] = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`sh ${left ? 'sh--left' : ''} ${on ? 'in' : ''}`}>
      <h2><SplitText text={title} active={on} /></h2>
      <span className={`tag tag--${tagTone}`}>{tag}</span>
      {sub && <p className="muted">{sub}</p>}
    </div>
  );
};

export const EventCard = ({ e, delay = 0 }) => (
  <Reveal delay={delay}>
    <Link to={`/events/${e.slug}`} className={`ecard ${e.past ? 'ecard--past' : ''}`}>
      <Art hue={e.hue} img={e.img}>
        <span className={`badge badge--${e.type}`}>{e.type}</span>
        <b>{shortRange(e)}</b>
      </Art>
      <div className="ecard__b">
        <h3>{e.title}</h3>
        <div className="meta">
          <span><Pin />{e.city}</span>
          <span><Globe />{e.mode}</span>
          <span><Cal />{e.price}</span>
        </div>
        <span className="link-arrow">{e.past ? 'View highlights' : 'Details & register'} <Arrow /></span>
      </div>
    </Link>
  </Reveal>
);

export const NewsCard = ({ a, delay = 0 }) => (
  <Reveal delay={delay}>
    <Link to={`/news/${a.slug}`} className="ncard">
      <Art hue={a.hue} img={a.img} />
      <div className="ncard__b">
        <span className="cat">{a.cat}</span>
        <h3>{a.title}</h3>
        <p>{a.excerpt}</p>
        <div className="meta"><span>{fmtDate(a.date)}</span><span>{a.read} read</span></div>
      </div>
    </Link>
  </Reveal>
);

export const Marquee = ({ children, reverse = false }) => (
  <div className={`marq ${reverse ? 'marq--rev' : ''}`}>
    <div className="marq__t">
      {children}
      {children}
    </div>
  </div>
);

/** Big outlined words scrolling across the page */
export const TextStrip = ({ words, reverse = false }) => (
  <div className={`strip ${reverse ? 'strip--rev' : ''}`} aria-hidden="true">
    <div className="strip__t">
      {[0, 1].map((k) => (
        <span key={k}>
          {words.map((w, i) => (
            <span key={w + i}>{w}<em>✦</em></span>
          ))}
        </span>
      ))}
    </div>
  </div>
);

export const PageHero = ({ crumbs = [], title, lead, bg, children }) => (
  <section className="phero">
    {bg && (
      <div className="phero__bgw" aria-hidden="true">
        <div className="phero__bg" style={{ '--bg-img': `url(${bg})` }} />
      </div>
    )}
    <div className="wrap">
      <nav className="crumbs fx" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        {crumbs.map(([label, to]) => (
          <span key={label}>/ {to ? <Link to={to}>{label}</Link> : label}</span>
        ))}
      </nav>
      <h1><SplitText text={title} active delay={0.1} step={0.018} /></h1>
      {lead && <p className="lead fx" style={{ '--d': '.5s' }}>{lead}</p>}
      {children}
    </div>
  </section>
);

/**
 * Lightweight lead form. There is no backend yet: on submit it shows a
 * confirmation. Wire `onSubmit` to your API / form service when ready.
 */
export const LeadForm = ({ fields, cta = 'Submit', success, onSubmit, paper = false }) => {
  const [sent, setSent] = useState(false);
  const cls = paper ? 'paper' : '';

  if (sent) {
    return (
      <div className="ok" role="status">
        <b>{success.title}</b>
        {success.text}
      </div>
    );
  }

  const submit = (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(ev.currentTarget));
    if (onSubmit) onSubmit(data);
    setSent(true);
  };

  const render = (f) => {
    if (f.type === 'select') {
      return (
        <select key={f.name} name={f.name} className={`select ${cls}`} required defaultValue="" aria-label={f.label}>
          <option value="" disabled>{f.label}</option>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      );
    }
    if (f.type === 'textarea') {
      return <textarea key={f.name} name={f.name} className={`textarea ${cls}`} placeholder={f.label} aria-label={f.label} />;
    }
    return <input key={f.name} name={f.name} type={f.type || 'text'} className={`input ${cls}`} placeholder={f.label} aria-label={f.label} required={f.required !== false} />;
  };

  return (
    <form className="form" onSubmit={submit}>
      {fields.map((f) =>
        Array.isArray(f) ? <div className="frow" key={f.map((x) => x.name).join()}>{f.map(render)}</div> : render(f)
      )}
      <button className="btn btn--amber btn--lg" type="submit">{cta} <Arrow /></button>
    </form>
  );
};
