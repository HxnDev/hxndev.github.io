import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowUpRight, IconQuote } from '@tabler/icons-react';
import CinematicStage from '../components/home/CinematicStage';
import ProjectCard from '../components/projects/ProjectCard';
import Marquee from '../components/common/Marquee';
import { useGetProjects } from '../hooks/useGetProjects';
import { MARQUEE_TECH } from '../data/skills';
import { RECOMMENDATIONS } from '../data/recommendations';

const Home = () => {
  const navigate = useNavigate();
  const { projects } = useGetProjects();

  const featured = useMemo(() => projects.filter(p => p.featured).slice(0, 6), [projects]);
  const voices = useMemo(() => RECOMMENDATIONS.slice(0, 3), []);

  const openProject = project => {
    navigate(`/projects?project=${project.id}`);
  };

  return (
    <>
      <CinematicStage />

      <Marquee items={MARQUEE_TECH} />

      {/* Featured work */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-index" data-reveal>
              Selected work
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

      {/* Voices */}
      <section className="section container">
        <div className="section-head">
          <div>
            <span className="section-index" data-reveal>
              Voices
            </span>
            <h2 className="section-title" data-reveal data-reveal-delay={80}>
              What colleagues say
            </h2>
          </div>
          <Link to="/recommendations" className="btn btn--ghost" data-reveal data-reveal-delay={120}>
            <span>All 16 recommendations</span>
            <IconArrowUpRight size={17} />
          </Link>
        </div>

        <div className="grid-3">
          {voices.map((rec, i) => (
            <figure className="voice" key={rec.name} data-reveal data-reveal-delay={i * 80}>
              <IconQuote size={26} className="voice__mark" />
              <blockquote className="voice__quote">{rec.quote}</blockquote>
              <figcaption className="voice__who">
                <span className="voice__name">{rec.name}</span>
                <span className="voice__title">{rec.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <style>{`
        .voice {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: clamp(1.4rem, 3vw, 2rem);
          background: var(--bg-elev);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          margin: 0;
          transition: border-color 0.3s ease, transform 0.3s var(--ease-out);
        }
        .voice:hover { border-color: var(--line-strong); transform: translateY(-4px); }
        .voice__mark { color: var(--amber); opacity: 0.8; flex-shrink: 0; }
        .voice__quote {
          margin: 0;
          color: var(--ink-dim);
          font-size: 0.96rem;
          line-height: 1.62;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .voice__who { display: flex; flex-direction: column; gap: 0.15rem; margin-top: auto; }
        .voice__name { font-weight: 600; color: var(--ink); }
        .voice__title { font-family: var(--font-mono); font-size: 0.74rem; color: var(--ink-mute); }

        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
        @media (max-width: 980px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .grid-3 { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
};

export default Home;
