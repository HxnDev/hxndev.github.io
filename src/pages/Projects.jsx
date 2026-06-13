import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconSearch } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';
import { useGetProjects } from '../hooks/useGetProjects';

const CATEGORY_LABELS = {
  all: 'All',
  web: 'Web',
  ai: 'AI / ML',
  mobile: 'Mobile',
  game: 'Games',
  tool: 'Tools',
};

const Projects = () => {
  const { projects } = useGetProjects();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState(null);
  const [params, setParams] = useSearchParams();

  const categories = useMemo(() => {
    const set = new Set(projects.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter(p => {
      const matchCat = category === 'all' || p.category === category;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.technologies || []).some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [projects, category, search]);

  // Deep-link support: ?project=id opens the modal.
  useEffect(() => {
    const id = params.get('project');
    if (id && projects.length) {
      const found = projects.find(p => p.id === id);
      if (found) setActive(found);
    }
  }, [params, projects]);

  const openProject = project => {
    setActive(project);
    setParams({ project: project.id }, { replace: true });
  };

  const closeProject = () => {
    setActive(null);
    setParams({}, { replace: true });
  };

  return (
    <>
      <div className="aurora" aria-hidden="true" />

      <section className="section container page-top">
        <div className="page-head">
          <span className="eyebrow" data-reveal>
            Portfolio — {projects.length} projects
          </span>
          <h1 className="page-title display" data-reveal data-reveal-delay={80}>
            Selected <span className="gradient-text">work</span>
          </h1>
          <p className="page-lead" data-reveal data-reveal-delay={140}>
            A collection of things I&rsquo;ve designed, engineered, and shipped — spanning AI,
            full-stack web, computer vision, and playful experiments.
          </p>
        </div>

        <div className="filters" data-reveal>
          <div className="filters__cats">
            {categories.map(cat => (
              <button
                key={cat}
                className={`chip ${category === cat ? 'is-active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
          <div className="filters__search">
            <IconSearch size={18} />
            <input
              type="text"
              placeholder="Search projects…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.div layout className="grid-3">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onOpen={openProject} />
            ))}
          </motion.div>
        ) : (
          <div className="empty">
            <p>No projects match your filters.</p>
            <button
              className="btn btn--ghost"
              onClick={() => {
                setSearch('');
                setCategory('all');
              }}
            >
              <span>Reset filters</span>
            </button>
          </div>
        )}
      </section>

      <ProjectModal project={active} onClose={closeProject} />

      <style>{`
        .page-top {
          padding-top: clamp(7rem, 14vh, 11rem);
        }
        .page-head {
          max-width: 720px;
          margin-bottom: 3rem;
        }
        .page-title {
          font-size: clamp(3rem, 11vw, 7rem);
          letter-spacing: -0.04em;
          margin-block: 1rem 1.4rem;
          line-height: 0.95;
        }
        .page-lead {
          color: var(--ink-dim);
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          max-width: 56ch;
        }
        .filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .filters__cats {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .chip {
          padding: 0.55rem 1.1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          color: var(--ink-dim);
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .chip:hover {
          color: var(--ink);
          border-color: var(--line-strong);
        }
        .chip.is-active {
          background: var(--ink);
          color: #07080d;
          border-color: var(--ink);
        }
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
        .filters__search:focus-within {
          border-color: var(--cyan);
          color: var(--cyan);
        }
        .filters__search input {
          background: none;
          border: none;
          outline: none;
          color: var(--ink);
          font-family: var(--font-body);
          font-size: 0.92rem;
          width: 100%;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.6rem;
        }
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding: 5rem 0;
          color: var(--ink-mute);
        }
        @media (max-width: 980px) {
          .grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr; }
          .filters__search { width: 100%; }
        }
      `}</style>
    </>
  );
};

export default Projects;
