import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { IMG } from '../data/images.js';
import { upcoming, shortRange, initials } from '../lib/format.js';
import HeroCanvas from '../components/HeroCanvas.jsx';
import Skyline from '../components/Skyline.jsx';
import ChapterMap from '../components/ChapterMap.jsx';
import Counter from '../components/Counter.jsx';
import Reveal from '../components/Reveal.jsx';
import Parallax from '../components/Parallax.jsx';
import { Arrow, Spark } from '../components/Icons.jsx';
import { Art, SectionHeading, EventCard, NewsCard, Marquee, Blobs, SplitText, TextStrip, GlowImage, PhotoBanner } from '../components/Bits.jsx';

const FILTERS = [['all', 'All'], ['summit', 'Summits'], ['workshop', 'Workshops'], ['webinar', 'Webinars'], ['meetup', 'Meetups']];

function Hero({ next }) {
  const ticker = DATA.news.slice(0, 4);
  return (
    <section className="hero" aria-labelledby="hero-h">
      <HeroCanvas />
      <Blobs />
      <div className="hero__grid" />
      <div className="hero__veil" />
      <Skyline />
      <div className="wrap hero__inner">
        <Link to={`/events/${next.slug}`} className="chip fx" style={{ '--d': '.1s' }}>
          <span className="dot" /> Next event · {next.title.replace(' 2026', '')} · {next.dateLabel}
        </Link>
        <h1 id="hero-h" className="display">
          <SplitText text="Designing Pakistan’s" active delay={0.25} step={0.022} />
          <br />
          <span className="l2">
            <SplitText text="Digital Future" active delay={0.6} step={0.022} />
            <span className="tag">Nationwide</span>
          </span>
          <span className="script">where design meets Pakistan</span>
        </h1>
        <p className="hero__p fx" style={{ '--d': '1.25s' }}>
          IxDF Pakistan is a nationwide community of designers, researchers and technologists: {DATA.chapters.length} city chapters, 60+ universities and the industry partners shaping what Pakistan builds next.
        </p>
        <div className="hero__cta fx" style={{ '--d': '1.4s' }}>
          <Link to="/join#join" className="btn btn--amber btn--lg">Join the Community</Link>
          <Link to="/events" className="btn btn--outline btn--lg">Explore Events</Link>
        </div>
        <aside className="next fx" style={{ '--d': '1.55s' }} aria-label="Next event">
          <div className="eyebrow">Next event</div>
          <div className="next__d">{shortRange(next)}</div>
          <h3>{next.title}</h3>
          <p>{next.venue} · {next.seats} · {next.mode}</p>
          <div className="next__f">
            <span className="badge">{next.type}</span>
            <Link to={`/events/${next.slug}`} className="link-arrow">Register now <Arrow /></Link>
          </div>
        </aside>
      </div>
      <div className="ticker" aria-label="Latest news">
        <div className="ticker__h"><Spark /><span className="t">Latest news</span></div>
        <div className="ticker__t">
          {[...ticker, ...ticker].map((n, i) => (
            <Link key={i} to={`/news/${n.slug}`} className="ticker__i"><b>{n.cat}</b> {n.title}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const Stats = () => (
  <section className="stats" aria-label="IxDF Pakistan in numbers">
    <div className="stats__ghost" aria-hidden="true">IxDF Pakistan</div>
    <div className="wrap stats__g">
      {DATA.stats.map((s, i) => (
        <Reveal key={s.label} className="stat" delay={i * 0.08}>
          <Counter to={s.n} suffix={s.s} />
          <span>{s.label}</span>
        </Reveal>
      ))}
    </div>
  </section>
);

const ICON = {
  learn: <path d="M3 9l9-5 9 5-9 5-9-5zM7 11.5V16c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.5M21 9v6" />,
  connect: <><circle cx="6" cy="7" r="2.5" /><circle cx="18" cy="7" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 8.5l3 7M16 8.5l-3 7M8.5 7h7" /></>,
  impact: <path d="M12 3l2.2 5.6L20 9.3l-4.4 3.8 1.4 5.9L12 15.8 7 19l1.4-5.9L4 9.3l5.8-.7L12 3z" />
};

const PILLARS = [
  ['learn', 'Learn', 'Practical, project-based workshops and webinars taught by working practitioners, in every city, for every level.'],
  ['connect', 'Connect', 'Ten chapters and 60+ campuses linked into one network where designers, researchers and engineers meet and collaborate.'],
  ['impact', 'Impact', 'Research, sprints and partnerships that put local users first: Urdu and regional languages, low bandwidth, mobile-first, inclusive.']
];

const MOSAIC = [
  [IMG.whiteboard, 'Two designers mapping ideas on a whiteboard', 'Hands-on workshops', 'm1'],
  [IMG.students, 'Students collaborating around a laptop', 'Campus chapters', 'm2'],
  [IMG.sticky, 'Colourful sticky notes from a research sprint', 'Research sprints', 'm3']
];

const Mission = () => (
  <section className="sec" id="mission">
    <div className="wrap">
      <div className="mi">
        <div className="mi__lead">
          <Reveal as="div" className="eyebrow mi__eye">Our mission</Reveal>
          <h2 className="mi__big">
            <SplitText text="To make Pakistan a place where" step={0.014} />
            <span className="hl"><SplitText text="great design" delay={0.25} step={0.03} /></span>
            <SplitText text="is built, taught and valued, in every city, in every language." delay={0.5} step={0.012} />
          </h2>
        </div>
        <Reveal className="mi__side" delay={0.15}>
          <p className="lead">We are volunteers, designers and researchers building the national home for design in Pakistan: open, local-first and welcoming to every level.</p>
          <ul className="principles">
            {['Local-first', 'Open knowledge', 'Inclusive by default', 'Practitioner-led'].map((p) => <li key={p}>{p}</li>)}
          </ul>
          <Link to="/chapters" className="btn btn--amber btn--lg">See the national network <Arrow /></Link>
        </Reveal>
      </div>

      <div className="pcs">
        {PILLARS.map(([k, t, d], i) => (
          <Reveal key={t} className="pc" delay={i * 0.12}>
            <span className="pc__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span className="pc__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICON[k]}</svg></span>
            <h3>{t}</h3>
            <p>{d}</p>
            <span className="pc__bar" aria-hidden="true" />
          </Reveal>
        ))}
      </div>

      <div className="mosaic">
        {MOSAIC.map(([src, alt, cap, cls], i) => (
          <Reveal key={cls} className={`mosaic__i ${cls}`} delay={i * 0.12}>
            <figure className="mosaic__f">
              <img src={src} alt={alt} loading="lazy" />
              <figcaption className="chipcap">{cap}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Impact = () => (
  <section className="sec">
    <GlowImage src={IMG.gradBlue} side="right" top="-8%" size={900} opacity={0.6} />
    <div className="wrap">
      <SectionHeading title="Community" tag="Impact" tagTone="amber" sub="Beyond events: the outcomes we measure and publish every year." />
      <div className="impact">
        {[[300, '+', 'Designers placed in roles', 'Hired through showcases, sprints and portfolio clinics with partner companies.'],
          [12, '', 'Public-interest sprints', 'Design sprints for education, health and public services with local users at the centre.'],
          [4, '', 'Joint research labs', 'Industry and university teams publishing open findings every quarter.']].map(([n, s, t, d], i) => (
          <Reveal key={t} className="icard" delay={i * 0.1}>
            <Counter to={n} suffix={s} />
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const FLAGSHIP = ['karachi', 'lahore', 'islamabad'];
const Chapters = () => (
  <section className="sec" id="chapters">
    <GlowImage src={IMG.gradTeal} side="left" top="18%" size={940} opacity={0.5} />
    <div className="wrap">
      <SectionHeading title="Ten cities" tag="One network" tagTone="violet" sub="From Karachi to Gilgit, local chapters run meetups, mentorship and campus programs, backed by a national team." />
      <div className="cities">
        {FLAGSHIP.map((slug, i) => {
          const c = DATA.chapters.find((x) => x.slug === slug);
          return (
            <Reveal key={slug} delay={i * 0.12}>
              <Link to={`/chapters/${slug}`} className="citycard">
                <img src={c.photo} alt={`${c.name} landmark`} loading="lazy" />
                <div className="citycard__b">
                  <span className="badge">{c.members.toLocaleString('en-US')} members</span>
                  <h3>{c.name}</h3>
                  <p>{c.focus}</p>
                  <span className="link-arrow">Open chapter <Arrow /></span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <ChapterMap />
    </div>
  </section>
);

const Programs = () => (
  <section className="sec">
    <div className="wrap">
      <SectionHeading title="Learn by doing" tag="Workshops · Webinars · Summits" tagTone="ink" sub="Practical formats for every stage of a design career, from first portfolio to leading a team." />
      <div className="progs">
        {DATA.programs.map((p, i) => (
          <Reveal key={p.key} className={`prog prog--${p.color}`} delay={i * 0.1}>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <ul>{p.facts.map((f) => <li key={f}>{f}</li>)}</ul>
            <Link to="/events" className="link-arrow">Browse {p.name.toLowerCase()} <Arrow /></Link>
          </Reveal>
        ))}
      </div>
      <Reveal className="sh" style={{ marginTop: 90, marginBottom: 0 }}>
        <div className="eyebrow">Featuring tracks across</div>
      </Reveal>
      <div className="tracks">
        {DATA.tracks.map(([t, c], i) => (
          <Reveal key={t} className={`track track--${c}`} delay={(i % 5) * 0.05}><em>{String(i + 1).padStart(2, '0')}</em><b>{t}</b></Reveal>
        ))}
      </div>
    </div>
  </section>
);

function Events() {
  const [f, setF] = useState('all');
  const list = useMemo(() => upcoming(DATA.events).filter((e) => f === 'all' || e.type === f).slice(0, 6), [f]);
  return (
    <section className="sec" id="events">
      <GlowImage src={IMG.gradSoft} side="right" top="12%" size={900} opacity={0.5} />
      <div className="wrap">
        <SectionHeading title="Upcoming" tag="Events" tagTone="amber" sub="Reserve your seat: in person in your city, or live online from anywhere." />
        <div className="toolbar" style={{ justifyContent: 'center' }}>
          <div className="tabs" role="tablist" aria-label="Filter events">
            {FILTERS.map(([k, l]) => (
              <button key={k} role="tab" aria-selected={f === k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="egrid egrid--3">
          {list.length ? list.map((e, i) => <EventCard key={e.slug} e={e} delay={(i % 3) * 0.08} />) : <p className="lead">No events in this category right now. Check back soon.</p>}
        </div>
        <div className="center" style={{ marginTop: 44 }}>
          <Link to="/events" className="btn btn--outline btn--lg">View all events <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

const Summit = ({ next }) => (
  <section className="summit" aria-labelledby="summit-h">
    <div className="summit__bg" aria-hidden="true" />
    <div className="wrap" style={{ position: 'relative' }}>
      <Reveal className="summit__txt">
        <div className="eyebrow" style={{ color: '#fff' }}>Flagship event · {next.dateLabel}</div>
        <h2 id="summit-h" style={{ marginTop: 14 }}><SplitText text="The Karachi" /><br /><SplitText text="Design Summit" delay={0.2} /></h2>
        <p className="sub">High-impact dialogues at the intersection of design, AI and Pakistan’s digital economy.</p>
        <hr />
        <div className="summit__g">
          {[['3,000+', 'Attendees'], ['40+', 'Speakers'], ['100+', 'Companies hiring'], ['10', 'Cities represented']].map(([n, l]) => (
            <div key={l}><b>{n}</b><span>{l}</span></div>
          ))}
        </div>
        <div className="summit__c">
          <Link to={`/events/${next.slug}`} className="btn btn--lg" style={{ background: '#fff', color: '#4a0f6b' }}>Learn more <Arrow /></Link>
          <Link to="/join#sponsor" className="btn btn--outline btn--lg">Sponsor the summit</Link>
        </div>
      </Reveal>
      <Parallax speed={0.07} className="summit__shot">
        <div className="summit__frame">
          <img src={IMG.stage} alt="Speaker on stage presenting to a conference audience" loading="lazy" />
          <span className="badge">{next.city} · {next.dateLabel}</span>
        </div>
      </Parallax>
    </div>
  </section>
);

const Universities = () => (
  <section className="sec" style={{ overflow: 'hidden' }}>
    <div className="wrap">
      <SectionHeading title="60+ universities" tag="Campus network" tagTone="violet" sub="Student chapters, design clubs and research labs that turn classrooms into careers." />
      <PhotoBanner src={IMG.students} alt="Diverse group of students working around a laptop in a lecture hall">
        <div className="banner__stats">
          {[['12,000+', 'Student members'], ['4', 'Research labs'], ['300+', 'Placements']].map(([n, l]) => (
            <div key={l}><b>{n}</b><span>{l}</span></div>
          ))}
        </div>
      </PhotoBanner>
    </div>
    <Marquee>
      {DATA.universities.slice(0, 8).map(([n, c, r]) => (
        <div className="ucard" key={n}><b>{n}</b><span>{c} · <i>{r}</i></span></div>
      ))}
    </Marquee>
    <Marquee reverse>
      {DATA.universities.slice(8).map(([n, c, r]) => (
        <div className="ucard" key={n}><b>{n}</b><span>{c} · <i>{r}</i></span></div>
      ))}
    </Marquee>
    <div className="center" style={{ marginTop: 44 }}>
      <Link to="/universities" className="btn btn--amber btn--lg">Bring IxDF to your campus <Arrow /></Link>
    </div>
  </section>
);

const Partners = () => {
  const all = [...DATA.partners['Industry collaborators'], ...DATA.partners.Sponsors];
  return (
    <section className="sec" id="partners" style={{ overflow: 'hidden' }}>
      <GlowImage src={IMG.gradOrange} side="left" top="6%" size={760} opacity={0.5} />
      <div className="wrap">
        <SectionHeading title="Trusted by" tag="Industry leaders" tagTone="teal" sub="Companies, public-sector teams and communities building with us." />
      </div>
      <Marquee>{all.map((n) => <div className="logo-t" key={n}>{n}</div>)}</Marquee>
      <Marquee reverse>{[...all].reverse().map((n) => <div className="logo-t" key={n}>{n}</div>)}</Marquee>
      <div className="wrap">
        <div className="quotes">
          {DATA.quotes.map((q, i) => (
            <Reveal key={q.who + i} className={`qcard qcard--${q.tone}`} delay={i * 0.1}>
              <div className="qmark" aria-hidden="true">“</div>
              <p>{q.text}</p>
              <footer><b>{q.who}</b><small>{q.org}</small></footer>
            </Reveal>
          ))}
        </div>
        <div className="center" style={{ marginTop: 44 }}>
          <Link to="/partners" className="btn btn--outline btn--lg">Meet our partners <Arrow /></Link>
        </div>
      </div>
    </section>
  );
};

const Team = () => (
  <section className="sec">
    <div className="wrap">
      <SectionHeading title="Led by" tag="Community builders" tagTone="amber" sub="A volunteer-powered national team and ten chapter leads." />
      <div className="tgrid">
        {DATA.team.slice(0, 4).map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08}>
            <article className="tcard">
              <Art hue={m.hue}><span>{initials(m.name)}</span></Art>
              <div className="tcard__b"><h3>{m.name}</h3><div className="role">{m.role}</div><p>{m.bio}</p></div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="center" style={{ marginTop: 44 }}>
        <Link to="/team" className="btn btn--amber btn--lg">Meet the full team <Arrow /></Link>
      </div>
    </div>
  </section>
);

const News = () => (
  <section className="sec" id="news">
    <div className="wrap">
      <SectionHeading title="News &" tag="Insights" tagTone="violet" sub="Announcements, research and stories from across the community." />
      <div className="ngrid">{DATA.news.slice(0, 3).map((a, i) => <NewsCard key={a.slug} a={a} delay={i * 0.1} />)}</div>
      <div className="center" style={{ marginTop: 44 }}>
        <Link to="/news" className="btn btn--outline btn--lg">Read all stories <Arrow /></Link>
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="sec">
    <GlowImage src={IMG.gradTeal} side="right" top="8%" size={920} opacity={0.55} />
    <div className="wrap">
      <SectionHeading title="Build with us" tag="Your move" tagTone="amber" sub="There’s a place for every designer, university and company in this community." />
      <div className="cta3">
        {[
          ['a', 'Join', 'Free for everyone who designs, researches or builds digital products.', ['Chapter meetups & mentors', 'Members-only webinars', 'Jobs & opportunities'], '/join#join', 'Join the community', 'btn--amber'],
          ['b', 'Collaborate', 'Partner on research, talent, public-interest design or campus programs.', ['Joint research labs', 'Hiring & talent pipeline', 'Public-interest sprints'], '/join#collaborate', 'Start a collaboration', 'btn--outline'],
          ['c', 'Sponsor', 'Put your brand in front of Pakistan’s design and tech talent.', ['Summit & chapter packages', 'Campus programs', 'Quarterly impact report'], '/join#sponsor', 'Become a sponsor', 'btn--violet']
        ].map(([k, t, d, items, to, label, cls], i) => (
          <Reveal key={t} className={`cta cta--${k}`} delay={i * 0.1}>
            <h3>{t}</h3>
            <p>{d}</p>
            <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
            <Link to={to} className={`btn ${cls} btn--lg`}>{label} <Arrow /></Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  const next = DATA.events.find((e) => e.featured) || upcoming(DATA.events)[0];
  return (
    <>
      <Hero next={next} />
      <Stats />
      <TextStrip words={['Design', 'Research', 'Build', 'Pakistan']} />
      <Mission />
      <Impact />
      <Chapters />
      <Programs />
      <Events />
      <Summit next={next} />
      <Universities />
      <Partners />
      <Team />
      <News />
      <CTA />
    </>
  );
}
