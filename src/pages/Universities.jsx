import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { PageHero, SectionHeading, LeadForm } from '../components/Bits.jsx';
import Reveal from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
import { Arrow } from '../components/Icons.jsx';

export default function Universities() {
  const [city, setCity] = useState('All');
  const cities = ['All', ...new Set(DATA.universities.map((u) => u[1]))];
  const list = useMemo(() => DATA.universities.filter((u) => city === 'All' || u[1] === city), [city]);

  return (
    <>
      <PageHero
        bg="/img/students.jpg"
        crumbs={[['Universities']]}
        title="From classroom to career"
        lead="Student chapters, design clubs and research labs across 60+ universities, connected to industry through showcases, sprints and internships."
      >
        <div className="facts">
          <div className="fact"><small>Universities</small><b>60+</b></div>
          <div className="fact"><small>Student members</small><b>12,000+</b></div>
          <div className="fact"><small>Research labs</small><b>4</b></div>
          <div className="fact"><small>Cities</small><b>10</b></div>
        </div>
      </PageHero>

      <section className="sec sec--bg2" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <SectionHeading title="What we offer" tag="Campus programs" tagTone="amber" sub="Four ways universities and students plug into the national network." />
          <div className="campus">
            {DATA.campus.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div style={{ height: '100%' }}><div className="n">{String(i + 1).padStart(2, '0')}</div><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--paper">
        <div className="wrap">
          <SectionHeading title="Our campuses" tag="Partner network" tagTone="violet" />
          <div className="chips" style={{ justifyContent: 'center', marginTop: -20, marginBottom: 36 }} role="group" aria-label="Filter by city">
            {cities.map((c) => <button key={c} className={`pill ${city === c ? 'on' : ''}`} onClick={() => setCity(c)}>{c}</button>)}
          </div>
          <div className="ugrid">
            {list.map(([n, c, r], i) => (
              <Reveal key={n} delay={(i % 4) * 0.05}><div className="ucard"><b>{n}</b><span>{c} · <i>{r}</i></span></div></Reveal>
            ))}
          </div>
          <p className="center muted" style={{ marginTop: 28, fontSize: '.95rem' }}>Showing a selection: we work with 60+ institutions in total.</p>
        </div>
      </section>

      <section className="sec" id="campus">
        <div className="wrap two" style={{ alignItems: 'center' }}>
          <Reveal>
            <h2 className="display" style={{ fontSize: 'clamp(2.4rem,5vw,4.4rem)' }}>Bring IxDF to your campus</h2>
            <p className="lead" style={{ marginTop: 18 }}>Faculty, department heads and student leaders: tell us about your campus and we’ll match you with your city chapter.</p>
            <p style={{ marginTop: 18 }}><Link to="/chapters" className="link-arrow">Find your chapter <Arrow /></Link></p>
          </Reveal>
          <Reveal className="joinform" delay={0.1}>
            <LeadForm
              cta="Send request"
              fields={[
                { name: 'name', label: 'Your name' },
                { name: 'email', label: 'University email', type: 'email' },
                { name: 'uni', label: 'University' },
                { name: 'role', label: 'Your role', type: 'select', options: ['Student leader', 'Faculty', 'Department head', 'Other'] }
              ]}
              success={{ title: 'Request received', text: 'Your city chapter lead will reach out within a week.' }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
