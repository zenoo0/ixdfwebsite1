import { Link, useParams } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { fmtDate } from '../lib/format.js';
import { PageHero, NewsCard } from '../components/Bits.jsx';
import { Arrow } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function Article() {
  const { slug } = useParams();
  const a = DATA.news.find((n) => n.slug === slug);
  if (!a) return <NotFound />;
  const more = DATA.news.filter((n) => n.slug !== a.slug).slice(0, 3);

  return (
    <>
      <PageHero bg={a.img} crumbs={[['News', '/news'], [a.cat]]} title={a.title} lead={`${a.cat} · ${fmtDate(a.date)} · ${a.read} read`} />
      <section className="sec sec--paper" style={{ paddingTop: 70 }}>
        <div className="wrap">
          <article className="article">
            {a.body.map((p, i) => <p key={i}>{p}</p>)}
            <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/news" className="btn btn--outline-ink">All stories</Link>
              <Link to="/join#join" className="btn btn--ink">Join the community <Arrow /></Link>
            </div>
          </article>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', marginBottom: 32 }}>Keep reading</h2>
          <div className="ngrid">{more.map((n, i) => <NewsCard key={n.slug} a={n} delay={i * 0.08} />)}</div>
        </div>
      </section>
    </>
  );
}
