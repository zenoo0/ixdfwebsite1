import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <h1>404</h1>
        <p className="lead" style={{ margin: '12px 0 28px' }}>We couldn’t find that page, but there’s plenty more to explore.</p>
        <Link to="/" className="btn btn--amber btn--lg">Back to home</Link>
      </div>
    </section>
  );
}
