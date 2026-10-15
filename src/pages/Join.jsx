import { useLocation, useNavigate } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { PageHero, LeadForm } from '../components/Bits.jsx';
import Reveal from '../components/Reveal.jsx';

const CITIES = DATA.chapters.map((c) => c.name).concat('Other');

const TABS = {
  join: {
    label: 'Join the community',
    title: 'Join the community',
    text: 'Free to join. Get chapter meetups, members-only webinars, mentors and opportunities.',
    benefits: [['Chapter meetups', 'Meet designers and researchers in your city every month.'], ['Mentorship', 'Get matched with a mentor from the industry network.'], ['Webinars & recordings', 'Live sessions on careers, AI and craft, plus on-demand replays.'], ['Jobs & opportunities', 'Early access to roles, internships and freelance briefs.']],
    cta: 'Join now',
    fields: [
      [{ name: 'name', label: 'Full name' }, { name: 'email', label: 'Email address', type: 'email' }],
      [{ name: 'city', label: 'Your city', type: 'select', options: CITIES }, { name: 'role', label: 'I am a…', type: 'select', options: ['Student', 'Designer', 'Researcher', 'Developer', 'Product / business', 'Educator', 'Other'] }],
      { name: 'interest', label: 'What would you like to learn or do? (optional)', type: 'textarea' }
    ],
    success: { title: 'Welcome aboard!', text: 'Check your inbox for next steps and your nearest chapter meetup.' }
  },
  collaborate: {
    label: 'Collaborate',
    title: 'Collaborate with us',
    text: 'Research, talent, public-interest design or campus programs: tell us what you have in mind.',
    benefits: [['Joint research', 'Run studies with university and industry teams and publish open findings.'], ['Talent pipeline', 'Meet and hire from showcases, sprints and portfolio clinics.'], ['Public-interest sprints', 'Design with communities, in local languages, for real services.'], ['Campus programs', 'Co-create clubs, labs and internships.']],
    cta: 'Start the conversation',
    fields: [
      [{ name: 'name', label: 'Your name' }, { name: 'email', label: 'Work email', type: 'email' }],
      [{ name: 'org', label: 'Organisation' }, { name: 'type', label: 'Type', type: 'select', options: ['Company', 'University', 'Government / public sector', 'NGO / community group', 'Other'] }],
      { name: 'idea', label: 'What would you like to collaborate on?', type: 'textarea' }
    ],
    success: { title: 'Thanks for reaching out', text: 'Our partnerships team will get back to you within three working days.' }
  },
  sponsor: {
    label: 'Sponsor',
    title: 'Sponsor the ecosystem',
    text: 'Back national summits, a city chapter or a campus program and reach Pakistan’s design and tech talent.',
    benefits: [['Summit Partner', 'Headline visibility, keynote or workshop slot, career-fair booth.'], ['Chapter Partner', 'Presenting sponsor of a city chapter, co-branded meetups.'], ['Campus Partner', 'Fund design clubs and sprints, meet student talent early.'], ['Impact reporting', 'A quarterly report on reach, outcomes and community feedback.']],
    cta: 'Request sponsorship deck',
    fields: [
      [{ name: 'name', label: 'Your name' }, { name: 'email', label: 'Work email', type: 'email' }],
      [{ name: 'org', label: 'Company' }, { name: 'tier', label: 'Package of interest', type: 'select', options: DATA.tiers.map((t) => t.name).concat('Not sure yet') }],
      { name: 'goals', label: 'What are your goals? (optional)', type: 'textarea' }
    ],
    success: { title: 'Request received', text: 'We’ll send the sponsorship deck and set up a call this week.' }
  }
};

export default function Join() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const key = TABS[hash.slice(1)] ? hash.slice(1) : 'join';
  const t = TABS[key];

  return (
    <>
      <PageHero
        bg="/img/sticky.jpg"
        crumbs={[['Get involved']]}
        title="Join. Collaborate. Sponsor."
        lead="Three ways to be part of Pakistan’s design and technology community. Pick yours."
      />
      <section className="sec" id={key} style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="toolbar" style={{ justifyContent: 'center' }}>
            <div className="tabs" role="tablist" aria-label="How would you like to get involved?">
              {Object.entries(TABS).map(([k, v]) => (
                <button key={k} role="tab" aria-selected={key === k} className={key === k ? 'on' : ''} onClick={() => navigate({ hash: `#${k}` }, { replace: true })}>{v.label}</button>
              ))}
            </div>
          </div>
          <div className="two" key={key} style={{ gridTemplateColumns: '1fr 1.1fr', alignItems: 'start' }}>
            <Reveal className="joinform">
              <h2>{t.title}</h2>
              <p>{t.text}</p>
              <LeadForm cta={t.cta} fields={t.fields} success={t.success} />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="benefits">
                {t.benefits.map(([h, d], i) => (
                  <div className="benefit" key={h}>
                    <span className="n">{i + 1}</span>
                    <div><h3>{h}</h3><p>{d}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
