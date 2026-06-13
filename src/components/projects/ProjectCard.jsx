import { useRef, useState } from 'react';
import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react';
import { resolveAssetPath } from '../utils/paths';

const ProjectCard = ({ project, index = 0, onOpen }) => {
  const ref = useRef(null);
  const [err, setErr] = useState(false);

  const img = err
    ? project.fallbackImage || 'https://placehold.co/800x600/0f121c/4af0ff?text=Project'
    : project.image
      ? resolveAssetPath(project.image)
      : project.fallbackImage;

  const handleMove = e => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${-py * 8}deg`);
    el.style.setProperty('--ry', `${px * 10}deg`);
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      className="pcard"
      data-reveal
      data-reveal-delay={(index % 3) * 90}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => onOpen?.(project)}
    >
      <div className="pcard__inner">
        <div className="pcard__media">
          <img src={img} alt={project.title} loading="lazy" onError={() => setErr(true)} />
          <div className="pcard__shine" />
          <div className="pcard__badges">
            {project.featured && <span className="tag tag--accent">Featured</span>}
            {project.date && <span className="tag">{project.date}</span>}
          </div>
          <div className="pcard__open">
            <IconArrowUpRight size={22} />
          </div>
        </div>

        <div className="pcard__body">
          <h3 className="pcard__title">{project.title}</h3>
          <p className="pcard__desc">{project.description}</p>

          <div className="pcard__tech">
            {(project.technologies || []).slice(0, 4).map(t => (
              <span key={t} className="pcard__chip">
                {t}
              </span>
            ))}
          </div>

          <div className="pcard__foot">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pcard__link"
                onClick={e => e.stopPropagation()}
                aria-label="GitHub repository"
              >
                <IconBrandGithub size={18} /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pcard__link pcard__link--accent"
                onClick={e => e.stopPropagation()}
              >
                Live <IconArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .pcard {
          --rx: 0deg;
          --ry: 0deg;
          --mx: 50%;
          --my: 50%;
          perspective: 1000px;
          cursor: pointer;
        }
        .pcard__inner {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          background: var(--bg-elev);
          overflow: hidden;
          transform: rotateX(var(--rx)) rotateY(var(--ry));
          transform-style: preserve-3d;
          transition: transform 0.4s var(--ease-out), border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .pcard:hover .pcard__inner {
          border-color: var(--line-strong);
          box-shadow: 0 30px 60px -25px rgba(74, 240, 255, 0.25);
        }
        .pcard__media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }
        .pcard__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s var(--ease-out);
        }
        .pcard:hover .pcard__media img {
          transform: scale(1.07);
        }
        .pcard__shine {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mx) var(--my),
            rgba(74, 240, 255, 0.22),
            transparent 45%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
        }
        .pcard:hover .pcard__shine {
          opacity: 1;
        }
        .pcard__badges {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          gap: 0.5rem;
        }
        .pcard__open {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(6, 7, 11, 0.6);
          backdrop-filter: blur(6px);
          color: var(--ink);
          transform: translateY(-8px) scale(0.8);
          opacity: 0;
          transition: all 0.4s var(--ease-out);
        }
        .pcard:hover .pcard__open {
          transform: none;
          opacity: 1;
          color: var(--cyan);
        }
        .pcard__body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.5rem;
          flex: 1;
        }
        .pcard__title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .pcard__desc {
          color: var(--ink-dim);
          font-size: 0.92rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pcard__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
        }
        .pcard__chip {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-mute);
          padding: 0.25rem 0.55rem;
          border-radius: 7px;
          border: 1px solid var(--line);
        }
        .pcard__foot {
          display: flex;
          gap: 1.2rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--line);
          margin-top: 0.4rem;
        }
        .pcard__link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--ink-dim);
          padding-top: 0.8rem;
          transition: color 0.25s ease;
        }
        .pcard__link:hover {
          color: var(--ink);
        }
        .pcard__link--accent:hover {
          color: var(--cyan);
        }
      `}</style>
    </article>
  );
};

export default ProjectCard;
