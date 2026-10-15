import { Link } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { initials } from '../lib/format.js';
import { PageHero, Art } from '../components/Bits.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';

export default function Team() {
  return (
    <>
      <PageHero
        bg="/img/whiteboard.jpg"
        crumbs={[['Team']]}
        title="The people behind the community"
        lead="A volunteer-powered national team, working with ten city chapter leads and hundreds of campus ambassadors."
      />
      <section className="sec sec--paper" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="tgrid">
            {DATA.team.map((m, i) => (
              <Reveal key={m.name} delay={(i % 4) * 0.08}>
                <article className="tcard">
                  <Art hue={m.hue}><span>{initials(m.name)}</span></Art>
                  <div className="tcard__b"><h3>{m.name}</h3><div className="role">{m.role}</div><p>{m.bio}</p></div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap center">
          <h2 className="display" style={{ fontSize: 'clamp(2.4rem,6vw,5rem)' }}>Want to lead with us?</h2>
          <p className="lead" style={{ margin: '18px auto 30px', maxWidth: '34em' }}>Chapter leads, campus ambassadors and volunteers shape everything we do. Tell us where you’d like to help.</p>
          <Link to="/join#join" className="btn btn--amber btn--lg">Volunteer with IxDF Pakistan <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
