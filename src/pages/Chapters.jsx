import { Link } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { PageHero } from '../components/Bits.jsx';
import ChapterMap from '../components/ChapterMap.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';

export default function Chapters() {
  return (
    <>
      <PageHero
        bg="/img/karachi-night.jpg"
        crumbs={[['Chapters']]}
        title="Ten cities. One network."
        lead="Local chapters run meetups, mentorship and campus programs, supported by a national team and shared playbooks."
      />
      <section className="sec sec--bg2" style={{ paddingTop: 70 }}>
        <div className="wrap"><ChapterMap /></div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="cgrid">
            {DATA.chapters.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.07}>
                <Link to={`/chapters/${c.slug}`} className="ccard">
                  <h3>{c.name}</h3>
                  <div className="f">{c.focus}</div>
                  <p>{c.blurb}</p>
                  <div className="ccard__s">
                    <div><b>{c.members.toLocaleString('en-US')}</b><small>Members</small></div>
                    <div><b>{c.unis}</b><small>Universities</small></div>
                  </div>
                  <span className="link-arrow" style={{ marginTop: 18 }}>Open chapter <Arrow /></span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="center" style={{ marginTop: 56 }}>
            <p className="lead" style={{ marginBottom: 20 }}>Don’t see your city? We’re always opening new chapters.</p>
            <Link to="/join#join" className="btn btn--amber btn--lg">Start a chapter <Arrow /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
