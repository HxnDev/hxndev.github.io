import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconX,
  IconBrandGithub,
  IconArrowUpRight,
  IconCheck,
} from '@tabler/icons-react';
import { resolveAssetPath } from '../utils/paths';

const ProjectModal = ({ project, onClose }) => {
  const [err, setErr] = useState(false);

  useEffect(() => {
    setErr(false);
  }, [project]);

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose();
    if (project) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const img = project
    ? err
      ? project.fallbackImage
      : project.image
        ? resolveAssetPath(project.image)
        : project.fallbackImage
    : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="pm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="pm__panel glass"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            <button className="pm__close" onClick={onClose} aria-label="Close">
              <IconX size={22} />
            </button>

            <div className="pm__media">
              <img src={img} alt={project.title} decoding="async" onError={() => setErr(true)} />
            </div>

            <div className="pm__body">
              <div className="pm__tags">
                {project.category && <span className="tag tag--accent">{project.category}</span>}
                {project.date && <span className="tag">{project.date}</span>}
              </div>

              <h2 className="pm__title display">{project.title}</h2>
              <p className="pm__desc">{project.longDescription || project.description}</p>

              {project.features?.length > 0 && (
                <div className="pm__features">
                  <span className="eyebrow">Highlights</span>
                  <ul>
                    {project.features.map(f => (
                      <li key={f}>
                        <IconCheck size={16} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pm__tech">
                {(project.technologies || []).map(t => (
                  <span key={t} className="pcard__chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pm__actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    <span>Live demo</span>
                    <IconArrowUpRight size={17} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                  >
                    <IconBrandGithub size={17} />
                    <span>View code</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <style>{`
            .pm {
              position: fixed;
              inset: 0;
              z-index: 9500;
              display: grid;
              place-items: center;
              padding: 1.2rem;
              background: rgba(4, 5, 8, 0.7);
              backdrop-filter: blur(8px);
            }
            .pm__panel {
              position: relative;
              width: min(860px, 100%);
              max-height: 90vh;
              overflow-y: auto;
              border-radius: var(--radius-lg);
            }
            .pm__panel::-webkit-scrollbar { width: 8px; }
            .pm__close {
              position: absolute;
              top: 1rem;
              right: 1rem;
              z-index: 2;
              width: 42px;
              height: 42px;
              display: grid;
              place-items: center;
              border-radius: 50%;
              background: rgba(6, 7, 11, 0.6);
              color: var(--ink);
              transition: all 0.25s ease;
            }
            .pm__close:hover {
              background: var(--pink);
              color: #07080d;
            }
            .pm__media {
              aspect-ratio: 16 / 8;
              overflow: hidden;
            }
            .pm__media img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .pm__body {
              padding: clamp(1.5rem, 4vw, 2.6rem);
            }
            .pm__tags {
              display: flex;
              gap: 0.5rem;
              margin-bottom: 1rem;
            }
            .pm__title {
              font-size: clamp(2rem, 5vw, 3rem);
              margin-bottom: 1rem;
            }
            .pm__desc {
              color: var(--ink-dim);
              font-size: 1.02rem;
              line-height: 1.7;
              margin-bottom: 1.8rem;
            }
            .pm__features {
              margin-bottom: 1.8rem;
            }
            .pm__features ul {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 0.7rem;
              margin-top: 0.9rem;
            }
            .pm__features li {
              display: flex;
              align-items: flex-start;
              gap: 0.5rem;
              color: var(--ink-dim);
              font-size: 0.92rem;
            }
            .pm__features li svg {
              color: var(--cyan);
              flex-shrink: 0;
              margin-top: 3px;
            }
            .pm__tech {
              display: flex;
              flex-wrap: wrap;
              gap: 0.5rem;
              margin-bottom: 2rem;
            }
            .pm__actions {
              display: flex;
              gap: 0.9rem;
              flex-wrap: wrap;
            }
            @media (max-width: 560px) {
              .pm__features ul {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
