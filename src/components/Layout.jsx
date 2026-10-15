import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SOCIAL, SocialIcon } from './Icons.jsx';

const NAV = [
  ['About', '/#mission'],
  ['Chapters', '/chapters'],
  ['Events', '/events'],
  ['Universities', '/universities'],
  ['Partners', '/partners'],
  ['News', '/news'],
  ['Team', '/team']
];

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);
  return null;
}

const Logo = () => (
  <Link to="/" className="logo" aria-label="IxDF Pakistan home">
    <img src="/logo.png" alt="Interaction Design Foundation Pakistan" width="180" height="60" />
  </Link>
);

/** Primary nav with a pill that glides to the hovered / active link. */
function Nav() {
  const ref = useRef(null);
  const { pathname } = useLocation();
  const [ind, setInd] = useState({ x: 0, w: 0, o: 0 });

  const moveTo = (el) => {
    const nav = ref.current;
    if (!nav || !el) {
      setInd((i) => ({ ...i, o: 0 }));
      return;
    }
    const n = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setInd({ x: r.left - n.left, w: r.width, o: 1 });
  };
  const toActive = () => moveTo(ref.current?.querySelector('a.active'));

  useEffect(() => {
    const t = setTimeout(toActive, 60);
    window.addEventListener('resize', toActive);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', toActive);
    };
  }, [pathname]);

  const hover = { onMouseEnter: (e) => moveTo(e.currentTarget), onFocus: (e) => moveTo(e.currentTarget) };

  return (
    <nav className="nav" aria-label="Primary" ref={ref} onMouseLeave={toActive} onBlur={toActive}>
      <span className="nav__ind" aria-hidden="true" style={{ '--x': `${ind.x}px`, '--w': `${ind.w}px`, '--o': ind.o }} />
      {NAV.map(([label, to]) =>
        to.includes('#') ? (
          <Link key={label} to={to} {...hover}>{label}</Link>
        ) : (
          <NavLink key={label} to={to} className={({ isActive }) => (isActive ? 'active' : undefined)} {...hover}>{label}</NavLink>
        )
      )}
    </nav>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const bar = useRef(null);
  const openRef = useRef(false);
  const { pathname } = useLocation();

  openRef.current = open;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // scroll state: shrink into a pill, hide while scrolling down, show when scrolling up, draw progress
  useEffect(() => {
    let last = window.scrollY, raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      setScrolled(y > 40);
      if (openRef.current || y < 160) setHidden(false);
      else if (y - last > 6) setHidden(true);
      else if (last - y > 6) setHidden(false);
      last = y;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true"><i ref={bar} /></div>
      <header className={`hdr ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
        <div className="wrap hdr__in">
          <Logo />
          <Nav />
          <div className="hdr__cta">
            <Link to="/join#join" className="btn btn--amber btn--sm hdr__pulse">Join Community</Link>
            <Link to="/join#collaborate" className="btn btn--outline btn--sm">Collaborate</Link>
            <Link to="/join#sponsor" className="btn btn--violet btn--sm">Sponsor</Link>
          </div>
          <button className="burger" aria-expanded={open} aria-controls="mnav" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </header>
      <nav id="mnav" className={`mnav ${open ? 'open' : ''}`} aria-label="Mobile">
        {NAV.map(([label, to], i) =>
          to.includes('#') ? (
            <Link key={label} to={to} className="l" style={{ '--i': i }}>{label}</Link>
          ) : (
            <NavLink key={label} to={to} style={{ '--i': i }} className={({ isActive }) => `l ${isActive ? 'active' : ''}`}>{label}</NavLink>
          )
        )}
        <div className="btns">
          <Link to="/join#join" className="btn btn--amber btn--lg">Join Community</Link>
          <Link to="/join#collaborate" className="btn btn--outline btn--lg">Collaborate</Link>
          <Link to="/join#sponsor" className="btn btn--violet btn--lg">Sponsor</Link>
        </div>
      </nav>
    </>
  );
}

const SocialRail = () => (
  <aside className="rail" aria-label="Social media">
    {SOCIAL.map((s) => (
      <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}><SocialIcon s={s} /></a>
    ))}
  </aside>
);

function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="ftr">
      <div className="ftr__ghost" aria-hidden="true">IxDF Pakistan</div>
      <div className="wrap">
        <div className="ftr__g">
          <div className="ftr__brand">
            <Logo />
            <p>A nationwide community of designers, researchers and technologists: designing Pakistan’s digital future, together.</p>
            {done ? (
              <p role="status" style={{ color: 'var(--teal)', fontWeight: 700 }}>Thanks, you’re on the list.</p>
            ) : (
              <form className="nl" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                <input className="input" type="email" required placeholder="Your email address" aria-label="Email address" />
                <button className="btn btn--amber" type="submit">Subscribe</button>
              </form>
            )}
            <div className="ftr__soc">
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}><SocialIcon s={s} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4>Community</h4>
            <ul>
              <li><Link to="/chapters">City chapters</Link></li>
              <li><Link to="/universities">Universities</Link></li>
              <li><Link to="/team">Leadership team</Link></li>
              <li><Link to="/join#join">Join the community</Link></li>
            </ul>
          </div>
          <div>
            <h4>Programs</h4>
            <ul>
              <li><Link to="/events">All events</Link></li>
              <li><Link to="/events/karachi-design-summit-2026">Karachi Design Summit</Link></li>
              <li><Link to="/events">Workshops & webinars</Link></li>
              <li><Link to="/news">News & insights</Link></li>
            </ul>
          </div>
          <div>
            <h4>Work with us</h4>
            <ul>
              <li><Link to="/partners">Partners</Link></li>
              <li><Link to="/join#collaborate">Collaborate</Link></li>
              <li><Link to="/join#sponsor">Sponsor</Link></li>
              <li><a href="mailto:hello@ixdf.pk">hello@ixdf.pk</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr__b">
          <span>© {new Date().getFullYear()} IxDF Pakistan. All rights reserved.</span>
          <span>Made in Pakistan, for Pakistan.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollManager />
      <Header />
      <SocialRail />
      <div className="page">
        <div className="ambient" aria-hidden="true" />
        <main id="main"><Outlet /></main>
        <Footer />
      </div>
    </>
  );
}
