import { Link } from 'react-router-dom';
import {
  IconSchool,
  IconMapPin,
  IconCertificate,
  IconQuote,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { resolveAssetPath } from '@/components/utils/paths';
import { BIO } from '@/data/profile';
import { SKILLS } from '@/data/skills';
import { EXPERIENCE, EDUCATION } from '@/data/experience';
import { RECOMMENDATIONS } from '@/data/recommendations';
import { CERTIFICATIONS } from '@/data/certifications';

const About = () => {
  return (
    <>
      <div className="aurora" aria-hidden="true" />

      <section className="section container page-top">
        <div className="about-head">
          <div className="about-head__text">
            <span className="eyebrow" data-reveal>
              About me
            </span>
            <h1 className="page-title display" data-reveal data-reveal-delay={80}>
              Engineer.
              <br />
              <span className="gradient-text">Builder.</span> Problem-solver.
            </h1>
          </div>
          <div className="about-portrait" data-reveal data-reveal-delay={160}>
            <img
              src={resolveAssetPath('images/profile.jpg')}
              alt="Hassan Shahzad"
              decoding="async"
            />
            <div className="about-portrait__glow" />
          </div>
        </div>

        <div className="about-bio">
          {BIO.map((p, i) => (
            <p key={i} className="about-bio__p" data-reveal data-reveal-delay={i * 80}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-index" data-reveal>
              Capabilities
            </span>
            <h2 className="section-title" data-reveal data-reveal-delay={80}>
              Skills &amp; tools
            </h2>
          </div>
        </div>

        <div className="skills">
          {SKILLS.map((s, i) => (
            <div
              className="skill"
              key={s.name}
              data-reveal
              data-reveal-delay={(i % 3) * 90}
              style={{ '--lvl': `${s.level}%` }}
            >
              <div className="skill__row">
                <span className="skill__name">{s.name}</span>
                <span className="skill__pct">{s.level}%</span>
              </div>
              <div className="skill__bar">
                <span className="skill__fill" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-index" data-reveal>
              Journey
            </span>
            <h2 className="section-title" data-reveal data-reveal-delay={80}>
              Experience
            </h2>
          </div>
        </div>

        <div className="timeline">
          {EXPERIENCE.map((exp, i) => (
            <div className="tl-item" key={exp.company} data-reveal data-reveal-delay={i * 60}>
              <div className="tl-item__marker">
                <span />
              </div>
              <div className="tl-item__content">
                <div className="tl-item__head">
                  <h3 className="tl-item__role">{exp.role}</h3>
                  <span className="tl-item__date">{exp.date}</span>
                </div>
                <p className="tl-item__company">
                  <span className="gradient-text">{exp.company}</span>
                  <span className="tl-item__loc">· {exp.location}</span>
                </p>
                <ul className="tl-item__points">
                  {exp.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credentials CTA */}
      <section className="section container">
        <div className="creds">
          <Link to="/recommendations" className="cred" data-reveal data-cursor-label="View">
            <span className="cred__icon">
              <IconQuote size={26} />
            </span>
            <span className="cred__body">
              <span className="cred__count display gradient-text">{RECOMMENDATIONS.length}</span>
              <span className="cred__label">Recommendations</span>
              <span className="cred__sub">What people say about working with me</span>
            </span>
            <IconArrowUpRight size={22} className="cred__go" />
          </Link>

          <Link
            to="/certifications"
            className="cred"
            data-reveal
            data-reveal-delay={100}
            data-cursor-label="View"
          >
            <span className="cred__icon">
              <IconCertificate size={26} />
            </span>
            <span className="cred__body">
              <span className="cred__count display gradient-text">{CERTIFICATIONS.length}</span>
              <span className="cred__label">Certifications</span>
              <span className="cred__sub">Verified courses &amp; specializations</span>
            </span>
            <IconArrowUpRight size={22} className="cred__go" />
          </Link>
        </div>
      </section>

      {/* Education */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-index" data-reveal>
              Foundation
            </span>
            <h2 className="section-title" data-reveal data-reveal-delay={80}>
              Education
            </h2>
          </div>
        </div>

        <div className="edu">
          {EDUCATION.map(e => (
            <div className="edu__item" key={e.school} data-reveal>
              <span className="edu__icon">
                <IconSchool size={24} />
              </span>
              <div className="edu__body">
                <h3 className="edu__degree">{e.degree}</h3>
                <p className="edu__school">{e.school}</p>
                <p className="edu__meta">
                  <IconMapPin size={14} /> {e.location} &nbsp;·&nbsp; {e.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .about-head {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr;
          gap: clamp(2rem, 6vw, 4rem);
          align-items: center;
          margin-bottom: 3.5rem;
        }
        .page-title {
          font-size: clamp(2.6rem, 8vw, 6rem);
          letter-spacing: -0.04em;
          line-height: 0.98;
          margin-top: 1rem;
        }
        .about-portrait {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--line);
        }
        .about-portrait img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0.2) contrast(1.05);
        }
        .about-portrait__glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(111, 168, 255, 0.4));
          mix-blend-mode: screen;
        }
        .about-bio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1000px;
        }
        .about-bio__p {
          color: var(--ink-dim);
          font-size: 0.98rem;
          line-height: 1.7;
        }
        .skills {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem 3rem;
        }
        .skill__row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.6rem;
        }
        .skill__name {
          font-weight: 500;
          font-size: 0.95rem;
        }
        .skill__pct {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--ink-mute);
        }
        .skill__bar {
          height: 4px;
          border-radius: 99px;
          background: var(--line);
          overflow: hidden;
        }
        .skill__fill {
          display: block;
          height: 100%;
          width: 0;
          border-radius: 99px;
          background: var(--grad-ice);
          transition: width 1.2s var(--ease-out) 0.1s;
        }
        .skill.is-visible .skill__fill {
          width: var(--lvl);
        }
        .timeline {
          position: relative;
          padding-left: 1.5rem;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: linear-gradient(var(--violet), var(--cyan), transparent);
        }
        .tl-item {
          position: relative;
          padding-left: 2rem;
          padding-bottom: 2.8rem;
        }
        .tl-item:last-child {
          padding-bottom: 0;
        }
        .tl-item__marker {
          position: absolute;
          left: -1.5rem;
          top: 6px;
        }
        .tl-item__marker span {
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--cyan);
          box-shadow: var(--glow-cyan);
        }
        .tl-item__head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .tl-item__role {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
        }
        .tl-item__date {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--ink-mute);
          white-space: nowrap;
        }
        .tl-item__company {
          font-weight: 600;
          margin-block: 0.2rem 0.8rem;
        }
        .tl-item__loc {
          color: var(--ink-mute);
          font-weight: 400;
          font-size: 0.9rem;
          margin-left: 0.45rem;
        }
        .tl-item__points {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .tl-item__points li {
          position: relative;
          padding-left: 1.1rem;
          color: var(--ink-dim);
          font-size: 0.94rem;
          line-height: 1.6;
        }
        .tl-item__points li::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--cyan);
        }
        .creds {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.6rem;
        }
        .cred {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1.3rem;
          padding: clamp(1.6rem, 3vw, 2.2rem);
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          background: var(--bg-elev);
          overflow: hidden;
          transition: border-color 0.3s ease, transform 0.3s var(--ease-out), background 0.3s ease;
        }
        .cred:hover {
          border-color: var(--line-strong);
          transform: translateY(-4px);
          background: rgba(91, 233, 255, 0.04);
        }
        .cred__icon {
          display: grid;
          place-items: center;
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: var(--grad-soft);
          color: var(--cyan);
          flex-shrink: 0;
        }
        .cred__body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .cred__count {
          font-size: 2.4rem;
          line-height: 1;
        }
        .cred__label {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.1rem;
          margin-top: 0.2rem;
        }
        .cred__sub {
          font-size: 0.85rem;
          color: var(--ink-mute);
          margin-top: 0.15rem;
        }
        .cred__go {
          color: var(--ink-mute);
          flex-shrink: 0;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .cred:hover .cred__go {
          color: var(--cyan);
          transform: translate(3px, -3px);
        }
        .edu__item {
          display: flex;
          gap: 1.2rem;
          padding: 1.6rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          background: var(--bg-elev);
          max-width: 720px;
        }
        .edu__icon {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--grad-soft);
          color: var(--violet);
          flex-shrink: 0;
        }
        .edu__degree {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
        }
        .edu__school {
          color: var(--ink-dim);
          margin-block: 0.3rem;
        }
        .edu__meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--ink-mute);
        }
        @media (max-width: 900px) {
          .about-head { grid-template-columns: 1fr; }
          .about-portrait { max-width: 320px; }
          .about-bio { grid-template-columns: 1fr; gap: 1.2rem; max-width: 640px; }
          .skills { grid-template-columns: 1fr; }
          .creds { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default About;
