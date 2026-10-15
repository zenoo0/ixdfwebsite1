import { Link, useParams } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { initials, upcoming } from '../lib/format.js';
import { PageHero, EventCard, LeadForm } from '../components/Bits.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';

export default function EventDetail() {
  const { slug } = useParams();
  const e = DATA.events.find((x) => x.slug === slug);
  if (!e) return <NotFound />;

  const related = upcoming(DATA.events).filter((x) => x.slug !== e.slug && (x.type === e.type || x.city === e.city)).slice(0, 3);

  return (
    <>
      <PageHero bg={e.img} crumbs={[['Events', '/events'], [e.title]]} title={e.title} lead={e.blurb}>
        <div className="facts">
          {[['Date', e.dateLabel], ['Location', `${e.city} · ${e.venue}`], ['Format', e.mode], ['Price', e.price], ['Capacity', e.seats]].map(([k, v]) => (
            <div className="fact" key={k}><small>{k}</small><b>{v}</b></div>
          ))}
        </div>
      </PageHero>

      <section className="sec sec--paper" style={{ paddingTop: 70 }}>
        <div className="wrap two">
          <div className="prose">
            <Reveal><h2>About this {e.type}</h2><p className="big">{e.about}</p></Reveal>
            {e.agenda.length > 0 && (
              <Reveal>
                <h2>Agenda</h2>
                <div className="timeline">
                  {e.agenda.map(([t, h, d]) => (
                    <div className="tl" key={t}><b>{t}</b><div><h3>{h}</h3><p>{d}</p></div></div>
                  ))}
                </div>
              </Reveal>
            )}
            {e.speakers.length > 0 && (
              <Reveal>
                <h2>Speakers & hosts</h2>
                <div className="speakers">
                  {e.speakers.map(([role, who]) => (
                    <div className="spk" key={role + who}>
                      <span className="av">{initials(who)}</span>
                      <div><b>{role}</b><small>{who}</small></div>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: 16, fontSize: '.95rem' }}>Full speaker line-up is announced on our channels as confirmations come in.</p>
              </Reveal>
            )}
          </div>

          <aside className="aside">
            {e.past ? (
              <>
                <h3>This event has ended</h3>
                <p>Join the community to get recordings, slides and first access to the next edition.</p>
                <Link to="/join#join" className="btn btn--amber btn--lg">Join the community</Link>
              </>
            ) : (
              <>
                <h3>Reserve your seat</h3>
                <p>{e.price}. We’ll email your confirmation and joining details.</p>
                <LeadForm
                  cta="Register"
                  fields={[
                    { name: 'name', label: 'Full name' },
                    { name: 'email', label: 'Email address', type: 'email' },
                    { name: 'chapter', label: 'Your city chapter', type: 'select', options: DATA.chapters.map((c) => c.name).concat('Other') }
                  ]}
                  success={{ title: 'You’re registered!', text: `We’ve saved your seat for ${e.title}. Check your inbox for details.` }}
                />
              </>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', marginBottom: 32 }}>You might also like</h2>
            <div className="egrid">{related.map((r, i) => <EventCard key={r.slug} e={r} delay={i * 0.08} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
