import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowUpRight } from '@tabler/icons-react';
import Hero from '../components/home/Hero';
import ProjectCard from '../components/projects/ProjectCard';
import Marquee from '../components/common/Marquee';
import { useGetProjects } from '../hooks/useGetProjects';
import { STATS } from '../data/profile';
import { MARQUEE_TECH } from '../data/skills';

const Home = () => {
  const navigate = useNavigate();
  const { projects } = useGetProjects();

  const featured = useMemo(
    () => projects.filter(p => p.featured).slice(0, 6),
    [projects]
  );

  const openProject = project => {
    navigate(`/projects?project=${project.id}`);
  };

  return (
    <>
      <Hero />

      <Marquee items={MARQUEE_TECH} />

      {/* Intro / stats */}
      <section className="section container">
        <div className="intro">
          <div className="intro__lead" data-reveal>
            <span className="eyebrow">About</span>
            <p className="intro__text">
              I&rsquo;m a results-driven engineer with a passion for the space where
              <span className="gradient-text"> clean architecture meets beautiful interfaces</span>.
              From Fortune-50 microservices to research-grade data platforms, I build things that
              are fast, thoughtful, and a little bit magical.
            </p>
            <Link to="/about" className="intro__more">
              More about me <IconArrowUpRight size={18} />
            </Link>
          </div>

          <div className="intro__stats">
            {STATS.map((s, i) => (
              <div className="stat" key={s.label} data-reveal data-reveal-delay={i * 80}>
                <span className="stat__value display gradient-text">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-index" data-reveal>
              02 — Selected Work
            </span>
            <h2 className="section-title" data-reveal data-reveal-delay={80}>
              Featured projects
            </h2>
          </div>
          <Link to="/projects" className="btn btn--ghost" data-reveal data-reveal-delay={120}>
            <span>All projects</span>
            <IconArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpen={openProject} />
          ))}
        </div>
      </section>

      <style>{`
        .intro {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(2rem, 6vw, 5rem);
          align-items: center;
        }
        .intro__text {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3.4vw, 2.6rem);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-block: 1.4rem 2rem;
        }
        .intro__more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--cyan);
          font-weight: 500;
        }
        .intro__more:hover {
          gap: 0.8rem;
        }
        .intro__stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .stat {
          background: var(--bg-soft);
          padding: clamp(1.4rem, 3vw, 2.2rem);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .stat__value {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          line-height: 1;
        }
        .stat__label {
          color: var(--ink-mute);
          font-size: 0.88rem;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }
        @media (max-width: 980px) {
          .intro {
            grid-template-columns: 1fr;
          }
          .grid-3 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
