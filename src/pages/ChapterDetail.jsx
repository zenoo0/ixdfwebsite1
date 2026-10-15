import { Link, useParams } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { upcoming } from '../lib/format.js';
import { PageHero, EventCard } from '../components/Bits.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function ChapterDetail() {
  const { slug } = useParams();
  const c = DATA.chapters.find((x) => x.slug === slug);
  if (!c) return <NotFound />;

  const events = upcoming(DATA.events).filter((e) => e.city === c.name);
  const unis = DATA.universities.filter(([, city]) => city === c.name);

  return (
    <>
      <PageHero bg={c.photo} crumbs={[['Chapters', '/chapters'], [c.name]]} title={`IxDF ${c.name}`} lead={c.blurb}>
        <div className="facts">
          <div className="fact"><small>Members</small><b>{c.members.toLocaleString('en-US')}</b></div>
          <div className="fact"><small>Universities</small><b>{c.unis}</b></div>
          <div className="fact"><small>Focus</small><b>{c.focus}</b></div>
        </div>
        <div className="phero__row">
          <Link to="/join#join" className="btn btn--amber btn--lg">Join the {c.name} chapter</Link>
          <Link to="/join#collaborate" className="btn btn--outline btn--lg">Partner with this chapter</Link>
        </div>
      </PageHero>

      <section className="sec">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', marginBottom: 32 }}>Upcoming in {c.name}</h2>
          {events.length ? (
            <div className="egrid">{events.map((e, i) => <EventCard key={e.slug} e={e} delay={i * 0.08} />)}</div>
          ) : (
            <p className="lead">No events scheduled in {c.name} yet. Online events are open to every chapter; <Link to="/events" className="link-arrow" style={{ display: 'inline-flex' }}>browse all events <Arrow /></Link></p>
          )}
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', marginBottom: 32 }}>Campuses in {c.name}</h2>
          {unis.length ? (
            <div className="ugrid">
              {unis.map(([n, , r], i) => (
                <Reveal key={n} delay={i * 0.06}><div className="ucard"><b>{n}</b><span><i>{r}</i></span></div></Reveal>
              ))}
            </div>
          ) : (
            <p className="lead">We’re growing our campus network in {c.name}. <Link to="/universities" className="link-arrow" style={{ display: 'inline-flex' }}>Bring IxDF to your campus <Arrow /></Link></p>
          )}
        </div>
      </section>
    </>
  );
}
