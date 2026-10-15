import { Link } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { PageHero, SectionHeading } from '../components/Bits.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';

export default function Partners() {
  return (
    <>
      <PageHero
        bg="/img/karachi-city.jpg"
        crumbs={[['Partners']]}
        title="Industry, academia & community"
        lead="We work with companies, universities, public-sector teams and community groups to create real opportunities for Pakistan’s design talent."
      >
        <div className="phero__row">
          <Link to="/join#collaborate" className="btn btn--amber btn--lg">Collaborate with us</Link>
          <Link to="/join#sponsor" className="btn btn--outline btn--lg">Become a sponsor</Link>
        </div>
      </PageHero>

      <section className="sec sec--paper" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <SectionHeading title="How we collaborate" tag="Industry partnerships" tagTone="violet" />
          <div className="collabs">
            {DATA.collabs.map((c, i) => (
              <Reveal key={c.title} className="collab" delay={i * 0.1}>
                <b>{c.stat}</b><h3>{c.title}</h3><p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading title="Our partners" tag="Trusted network" tagTone="teal" />
          {Object.entries(DATA.partners).map(([group, names]) => (
            <Reveal className="group" key={group}>
              <h3>{group}</h3>
              <div className="logos">{names.map((n) => <div className="logo-t" key={n}>{n}</div>)}</div>
            </Reveal>
          ))}
          <p className="muted" style={{ marginTop: 28, fontSize: '.9rem', color: 'var(--muted)' }}>Logos shown are placeholders pending partner approvals.</p>
        </div>
      </section>

      <section className="sec sec--paper" id="sponsorship">
        <div className="wrap">
          <SectionHeading title="Sponsorship" tag="Packages" tagTone="amber" sub="Flexible ways to support the ecosystem, from national summits to a single campus." />
          <div className="tiers">
            {DATA.tiers.map((t, i) => (
              <Reveal key={t.name} className="tier" delay={i * 0.1}>
                <small>{t.tag}</small>
                <h3>{t.name}</h3>
                <ul>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                <Link to="/join#sponsor" className={`btn ${i === 0 ? 'btn--amber' : 'btn--ink'}`} style={{ marginTop: 'auto' }}>Enquire <Arrow /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
