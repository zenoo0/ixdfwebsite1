import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DATA } from '../data/data.js';
import { fmtDate } from '../lib/format.js';
import { PageHero, NewsCard, Art } from '../components/Bits.jsx';
import Reveal from '../components/Reveal.jsx';
import { Arrow } from '../components/Icons.jsx';

export default function News() {
  const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(DATA.news.map((n) => n.cat))];
  const [feat, ...rest] = DATA.news;
  const list = useMemo(() => (cat === 'All' ? rest : DATA.news.filter((n) => n.cat === cat)), [cat]);

  return (
    <>
      <PageHero bg="/img/design-system.jpg" crumbs={[['News']]} title="News & insights" lead="Announcements, research and stories from the IxDF Pakistan community." />
      <section className="sec sec--paper" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="chips" style={{ marginTop: 0, marginBottom: 32 }} role="group" aria-label="Category">
            {cats.map((c) => <button key={c} className={`pill ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          {cat === 'All' && (
            <Reveal>
              <Link to={`/news/${feat.slug}`} className="feat">
                <Art hue={feat.hue} img={feat.img} />
                <div className="feat__b">
                  <span className="cat">{feat.cat} · Featured</span>
                  <h2>{feat.title}</h2>
                  <p>{feat.excerpt}</p>
                  <div className="meta" style={{ margin: '14px 0 20px' }}><span>{fmtDate(feat.date)}</span><span>{feat.read} read</span></div>
                  <span className="link-arrow">Read story <Arrow /></span>
                </div>
              </Link>
            </Reveal>
          )}
          <div className="ngrid">{list.map((a, i) => <NewsCard key={a.slug} a={a} delay={(i % 3) * 0.08} />)}</div>
        </div>
      </section>
    </>
  );
}
