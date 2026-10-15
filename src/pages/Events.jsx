import { useMemo, useState } from 'react';
import { DATA } from '../data/data.js';
import { upcoming } from '../lib/format.js';
import { PageHero, EventCard } from '../components/Bits.jsx';

const TYPES = [['all', 'All formats'], ['summit', 'Summits'], ['workshop', 'Workshops'], ['webinar', 'Webinars'], ['meetup', 'Meetups']];

export default function Events() {
  const [type, setType] = useState('all');
  const [city, setCity] = useState('All');
  const [past, setPast] = useState(false);

  const cities = ['All', 'Online', ...DATA.chapters.map((c) => c.name)];
  const list = useMemo(() => {
    const base = past ? DATA.events.filter((e) => e.past) : upcoming(DATA.events);
    return base.filter((e) => (type === 'all' || e.type === type) && (city === 'All' || e.city === city));
  }, [type, city, past]);

  return (
    <>
      <PageHero
        bg="/img/stage.jpg"
        crumbs={[['Events']]}
        title="Workshops, webinars & summits"
        lead="Practical learning and national gatherings, in your city or live online. Filter by format and location, then reserve your seat."
      />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="toolbar">
            <div className="tabs" role="tablist" aria-label="Event format">
              {TYPES.map(([k, l]) => (
                <button key={k} role="tab" aria-selected={type === k} className={type === k ? 'on' : ''} onClick={() => setType(k)}>{l}</button>
              ))}
            </div>
            <div className="tabs" role="tablist" aria-label="Upcoming or past">
              <button role="tab" aria-selected={!past} className={!past ? 'on' : ''} onClick={() => setPast(false)}>Upcoming</button>
              <button role="tab" aria-selected={past} className={past ? 'on' : ''} onClick={() => setPast(true)}>Past</button>
            </div>
          </div>
          <div className="chips" style={{ marginTop: -8, marginBottom: 36 }} role="group" aria-label="City">
            {cities.map((c) => <button key={c} className={`pill ${city === c ? 'on' : ''}`} onClick={() => setCity(c)}>{c}</button>)}
          </div>
          <div className="egrid">
            {list.length ? list.map((e, i) => <EventCard key={e.slug} e={e} delay={(i % 3) * 0.06} />) : (
              <p className="lead">No events match these filters yet. Try another city or format.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
