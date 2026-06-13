import { IconQuote, IconBrandLinkedin } from '@tabler/icons-react';
import { RECOMMENDATIONS } from '../data/recommendations';

const initials = name =>
  name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('');

const Recommendations = () => {
  return (
    <>
      <div className="aurora" aria-hidden="true" />

      <section className="section container page-top">
        <div className="page-head">
          <span className="eyebrow" data-reveal>
            Kind words — {RECOMMENDATIONS.length} recommendations
          </span>
          <h1 className="page-title display" data-reveal data-reveal-delay={80}>
            <span className="gradient-text">Recommendations</span>
          </h1>
          <p className="page-lead" data-reveal data-reveal-delay={140}>
            What colleagues, leads, and teammates have said about working with me.
          </p>
        </div>

        <div className="recs">
          {RECOMMENDATIONS.map((rec, i) => (
            <figure className="rec" key={rec.name + i} data-reveal data-reveal-delay={(i % 2) * 80}>
              <IconQuote className="rec__mark" size={34} />
              <blockquote className="rec__quote">{rec.quote}</blockquote>
              <figcaption className="rec__by">
                <span className="rec__avatar">{initials(rec.name)}</span>
                <span className="rec__meta">
                  {rec.url ? (
                    <a
                      href={rec.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rec__name"
                    >
                      {rec.name}
                      <IconBrandLinkedin size={15} />
                    </a>
                  ) : (
                    <span className="rec__name">{rec.name}</span>
                  )}
                  {rec.title && <span className="rec__title">{rec.title}</span>}
                  {rec.relation && <span className="rec__relation">{rec.relation}</span>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <style>{`
        .page-top { padding-top: clamp(7rem, 14vh, 11rem); }
        .page-head { max-width: 720px; margin-bottom: 2.5rem; }
        .page-title {
          font-size: clamp(3rem, 11vw, 7rem);
          letter-spacing: -0.04em;
          margin-block: 1rem 1.4rem;
          line-height: 0.95;
        }
        .page-lead { color: var(--ink-dim); font-size: clamp(1rem, 2.2vw, 1.2rem); max-width: 56ch; }
        .recs {
          columns: 3;
          column-gap: 1.4rem;
        }
        @media (max-width: 1100px) {
          .recs { columns: 2; }
        }
        .rec {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding: clamp(1.5rem, 2.6vw, 2rem);
          margin-bottom: 1.4rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          background: var(--bg-elev);
          overflow: hidden;
          break-inside: avoid;
        }
        .rec::before {
          content: '';
          position: absolute;
          inset: 0 0 auto 0;
          height: 3px;
          background: var(--grad-primary);
          opacity: 0.8;
        }
        .rec__mark { color: var(--violet); opacity: 0.5; }
        .rec__quote { color: var(--ink-dim); font-size: 0.94rem; line-height: 1.65; flex: 1; }
        .rec__by {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding-top: 0.4rem;
          border-top: 1px solid var(--line);
        }
        .rec__avatar {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: var(--grad-ice);
          color: #07080d;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        .rec__meta { display: flex; flex-direction: column; }
        .rec__name {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-display);
          font-weight: 600;
          transition: color 0.25s ease;
        }
        .rec__name:hover { color: var(--cyan); }
        .rec__name svg { color: var(--ink-mute); }
        .rec__title { font-size: 0.8rem; color: var(--ink-dim); margin-top: 0.1rem; }
        .rec__relation {
          font-size: 0.72rem;
          color: var(--ink-mute);
          font-family: var(--font-mono);
          margin-top: 0.2rem;
        }
        @media (max-width: 720px) {
          .recs { columns: 1; }
        }
      `}</style>
    </>
  );
};

export default Recommendations;
