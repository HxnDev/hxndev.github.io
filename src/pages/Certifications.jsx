import { useMemo, useState } from 'react';
import { IconCertificate, IconArrowUpRight, IconSearch } from '@tabler/icons-react';
import { CERTIFICATIONS } from '../data/certifications';

const issuerKey = issuer => issuer.split('·')[0].trim();

const Certifications = () => {
  const [search, setSearch] = useState('');
  const [issuer, setIssuer] = useState('all');

  const issuers = useMemo(() => {
    const set = new Set(CERTIFICATIONS.map(c => issuerKey(c.issuer)));
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CERTIFICATIONS.filter(c => {
      const matchIssuer = issuer === 'all' || issuerKey(c.issuer) === issuer;
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.issuer.toLowerCase().includes(q);
      return matchIssuer && matchSearch;
    });
  }, [search, issuer]);

  return (
    <>
      <div className="aurora" aria-hidden="true" />

      <section className="section container page-top">
        <div className="page-head">
          <span className="eyebrow" data-reveal>
            Always learning — {CERTIFICATIONS.length} credentials
          </span>
          <h1 className="page-title display" data-reveal data-reveal-delay={80}>
            <span className="gradient-text">Certifications</span>
          </h1>
          <p className="page-lead" data-reveal data-reveal-delay={140}>
            Verified courses and specializations spanning machine learning, cloud, and full-stack
            engineering. Every card links to its official credential.
          </p>
        </div>

        <div className="filters" data-reveal>
          <div className="filters__cats">
            {issuers.map(name => (
              <button
                key={name}
                className={`chip ${issuer === name ? 'is-active' : ''}`}
                onClick={() => setIssuer(name)}
              >
                {name === 'all' ? 'All issuers' : name}
              </button>
            ))}
          </div>
          <div className="filters__search">
            <IconSearch size={18} />
            <input
              type="text"
              placeholder="Search certifications…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="certs">
            {filtered.map((cert, i) => {
              const Tag = cert.url ? 'a' : 'div';
              const linkProps = cert.url
                ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              return (
                <Tag
                  key={cert.title + i}
                  {...linkProps}
                  className={`cert ${cert.url ? '' : 'cert--static'}`}
                  data-reveal
                  data-reveal-delay={(i % 3) * 60}
                >
                  <span className="cert__icon">
                    <IconCertificate size={22} />
                  </span>
                  <span className="cert__body">
                    <span className="cert__title">{cert.title}</span>
                    <span className="cert__meta">
                      {cert.issuer} · {cert.date}
                    </span>
                  </span>
                  {cert.url && <IconArrowUpRight size={18} className="cert__go" />}
                </Tag>
              );
            })}
          </div>
        ) : (
          <div className="empty">
            <p>No certifications match your search.</p>
            <button
              className="btn btn--ghost"
              onClick={() => {
                setSearch('');
                setIssuer('all');
              }}
            >
              <span>Reset</span>
            </button>
          </div>
        )}
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
        .filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .filters__cats { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .chip {
          padding: 0.55rem 1.1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          color: var(--ink-dim);
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .chip:hover { color: var(--ink); border-color: var(--line-strong); }
        .chip.is-active { background: var(--ink); color: #07080d; border-color: var(--ink); }
        .filters__search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          color: var(--ink-mute);
          min-width: 240px;
        }
        .filters__search:focus-within { border-color: var(--cyan); color: var(--cyan); }
        .filters__search input {
          background: none; border: none; outline: none;
          color: var(--ink); font-family: var(--font-body); font-size: 0.92rem; width: 100%;
        }
        .certs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .cert {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 1.3rem;
          border-radius: var(--radius);
          border: 1px solid var(--line);
          background: var(--bg-elev);
          transition: border-color 0.3s ease, transform 0.3s var(--ease-out), background 0.3s ease;
        }
        .cert:hover {
          border-color: var(--line-strong);
          transform: translateY(-3px);
          background: rgba(91, 233, 255, 0.04);
        }
        .cert--static { cursor: default; }
        .cert__icon {
          display: grid; place-items: center;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--grad-soft);
          color: var(--cyan);
          flex-shrink: 0;
        }
        .cert__body { display: flex; flex-direction: column; gap: 0.2rem; flex: 1; min-width: 0; }
        .cert__title { font-weight: 600; font-size: 0.98rem; line-height: 1.3; }
        .cert__meta { font-family: var(--font-mono); font-size: 0.76rem; color: var(--ink-mute); }
        .cert__go { color: var(--ink-mute); flex-shrink: 0; transition: color 0.25s ease, transform 0.25s ease; }
        .cert:hover .cert__go { color: var(--cyan); transform: translate(2px, -2px); }
        .empty {
          display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
          padding: 5rem 0; color: var(--ink-mute);
        }
        @media (max-width: 720px) {
          .certs { grid-template-columns: 1fr; }
          .filters__search { width: 100%; }
        }
      `}</style>
    </>
  );
};

export default Certifications;
