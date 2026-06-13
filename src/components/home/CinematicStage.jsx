import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../core/Magnetic';
import { STATS } from '../../data/profile';

const CinematicScene = lazy(() => import('../three/CinematicScene'));

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { org: 'IBM', role: 'Lead Full-Stack Developer', note: 'Microservices · Kafka · CI/CD' },
  { org: 'EPFL', role: 'Senior Full-Stack Developer', note: 'AWS data infra · research platforms' },
  { org: 'AICA', role: 'Frontend Engineer', note: 'Robotics UI · TypeScript · Go' },
];

const ACTS = ['Intro', 'Craft', 'Path', 'Numbers', 'Next'];

// Weighted scroll windows (act start positions, 0..1). The intro lingers a
// touch longer and the middle acts get room to breathe.
const ACT_STARTS = [0, 0.22, 0.42, 0.64, 0.83];

const actFromProgress = p => {
  let idx = 0;
  for (let i = 0; i < ACT_STARTS.length; i++) {
    if (p >= ACT_STARTS[i]) idx = i;
  }
  return idx;
};

const CinematicStage = () => {
  const stageRef = useRef(null);
  const progress = useRef(0);
  const lastIdx = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const st = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: self => {
        progress.current = self.progress;
        const idx = actFromProgress(self.progress);
        if (idx !== lastIdx.current) {
          lastIdx.current = idx;
          setActive(idx);
        }
      },
    });

    ScrollTrigger.refresh();
    return () => st.kill();
  }, []);

  return (
    <section className="stage" ref={stageRef}>
      <div className="stage__pin">
        <Suspense fallback={null}>
          <CinematicScene progress={progress} />
        </Suspense>

        <div className="stage__vignette" aria-hidden="true" />

        {/* Act indicator rail */}
        <div className="stage__rail" aria-hidden="true">
          {ACTS.map((label, i) => (
            <span
              key={label}
              className={`stage__tick ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
            >
              <i />
              <em>{label}</em>
            </span>
          ))}
        </div>

        <div className="stage__acts">
          {/* Act 0 — Intro */}
          <div className={`c-act c-act--left ${active === 0 ? 'is-active' : ''}`}>
            <div className="container">
              <p className="eyebrow">Senior Full-Stack Engineer&nbsp;&nbsp;/&nbsp;&nbsp;Geneva, CH</p>
              <h1 className="c-hero display">
                Software, <span className="gradient-text">engineered</span>
                <br />
                to feel <span className="gradient-text--warm">alive</span>.
              </h1>
              <p className="c-sub">
                I&rsquo;m Hassan Shahzad — a senior full-stack engineer who also designs and ships
                award-grade interfaces. This whole scene is hand-written GLSL, driven by your scroll.
              </p>
              <div className="c-actions">
                <Magnetic strength={0.4}>
                  <Link to="/projects" className="btn btn--primary btn--lg">
                    <span>View my work</span>
                    <IconArrowUpRight size={19} />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <Link to="/contact" className="btn btn--ghost btn--lg">
                    <span>Get in touch</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Act 1 — Craft / manifesto */}
          <div className={`c-act c-act--left ${active === 1 ? 'is-active' : ''}`}>
            <div className="container">
              <span className="c-index">01 — What I do</span>
              <h2 className="c-statement display">
                I turn complex systems into interfaces that feel{' '}
                <span className="gradient-text">inevitable</span>.
              </h2>
            </div>
          </div>

          {/* Act 2 — Path */}
          <div className={`c-act c-act--right ${active === 2 ? 'is-active' : ''}`}>
            <div className="container">
              <span className="c-index">02 — The path</span>
              <h2 className="c-statement display c-statement--sm">A global trajectory.</h2>
              <ul className="c-miles">
                {MILESTONES.map(m => (
                  <li key={m.org} className="c-mile">
                    <span className="c-mile__org gradient-text">{m.org}</span>
                    <span className="c-mile__role">{m.role}</span>
                    <span className="c-mile__note">{m.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Act 3 — Numbers */}
          <div className={`c-act c-act--center ${active === 3 ? 'is-active' : ''}`}>
            <div className="container">
              <span className="c-index">03 — By the numbers</span>
              <div className="c-stats">
                {STATS.map(s => (
                  <div className="c-stat" key={s.label}>
                    <span className="c-stat__value display gradient-text">{s.value}</span>
                    <span className="c-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Act 4 — Next */}
          <div className={`c-act c-act--center ${active === 4 ? 'is-active' : ''}`}>
            <div className="container c-next">
              <span className="c-index">04 — Now the specifics</span>
              <h2 className="c-statement display">
                Let&rsquo;s get <span className="gradient-text--warm">specific</span>.
              </h2>
              <p className="c-sub c-sub--center">Keep scrolling — selected work and voices below.</p>
              <IconArrowDown size={22} className="c-next__arrow" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stage {
          position: relative;
          height: 460vh;
          z-index: 1;
        }
        .stage__pin {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
        }
        .stage__vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(125% 95% at 50% 12%, transparent 42%, rgba(5, 6, 13, 0.82) 100%);
        }
        .stage__acts {
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .stage__rail {
          position: absolute;
          right: clamp(1rem, 3vw, 2.4rem);
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .stage__tick {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          justify-content: flex-end;
        }
        .stage__tick i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          background: transparent;
          transition: all 0.4s var(--ease-out);
        }
        .stage__tick.is-done i { background: var(--ink-mute); border-color: var(--ink-mute); }
        .stage__tick.is-active i {
          background: var(--cyan);
          border-color: var(--cyan);
          box-shadow: var(--glow-cyan);
          transform: scale(1.4);
        }
        .stage__tick em {
          font-family: var(--font-mono);
          font-style: normal;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-mute);
          opacity: 0;
          transform: translateX(6px);
          transition: all 0.4s var(--ease-out);
        }
        .stage__tick.is-active em { opacity: 1; transform: none; color: var(--cyan); }

        .c-act {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
          pointer-events: none;
        }
        .c-act.is-active { opacity: 1; transform: none; pointer-events: auto; }
        .c-act--left .container { text-align: left; margin-right: auto; }
        .c-act--right { justify-content: flex-end; text-align: right; }
        .c-act--right .container { display: flex; flex-direction: column; align-items: flex-end; }
        .c-act--center { justify-content: center; text-align: center; }
        .c-act--center .container { display: flex; flex-direction: column; align-items: center; }

        .c-index {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--amber);
          display: block;
          margin-bottom: 1.2rem;
        }
        .c-hero {
          font-size: clamp(2.6rem, 9vw, 7.5rem);
          letter-spacing: -0.035em;
          margin-bottom: 1.6rem;
          max-width: 16ch;
        }
        .c-statement {
          font-size: clamp(2rem, 6vw, 4.6rem);
          line-height: 1.08;
          letter-spacing: -0.025em;
          max-width: 18ch;
        }
        .c-statement--sm { font-size: clamp(1.8rem, 5vw, 3.4rem); margin-bottom: 2rem; }
        .c-sub {
          max-width: 48ch;
          font-size: clamp(1rem, 2.2vw, 1.18rem);
          color: var(--ink-dim);
          margin-bottom: 2.4rem;
        }
        .c-sub--center { margin-inline: auto; }
        .c-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

        .c-miles { display: flex; flex-direction: column; gap: 1.4rem; }
        .c-mile { display: flex; flex-direction: column; gap: 0.2rem; }
        .c-mile__org { font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.2rem); font-weight: 700; }
        .c-mile__role { color: var(--ink); font-weight: 600; }
        .c-mile__note { font-family: var(--font-mono); font-size: 0.76rem; color: var(--ink-mute); letter-spacing: 0.04em; }

        .c-stats {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: clamp(1.6rem, 5vw, 4rem);
          margin-top: 1rem;
        }
        .c-stat { display: flex; flex-direction: column; gap: 0.3rem; }
        .c-stat__value { font-size: clamp(2.6rem, 7vw, 5rem); line-height: 1; }
        .c-stat__label { color: var(--ink-mute); font-size: 0.85rem; }

        .c-next__arrow { color: var(--ink-mute); margin-top: 1.4rem; animation: cbob 1.8s ease-in-out infinite; }
        @keyframes cbob { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(7px);} }

        @media (max-width: 860px) {
          .stage { height: 400vh; }
          /* Keep vertical centering (align-items lives on the row flex parent);
             only flip the horizontal alignment of right/center acts to the left. */
          .c-act { justify-content: flex-start; text-align: left; }
          .c-act--right { justify-content: flex-start; text-align: left; }
          .c-act--right .container,
          .c-act--center .container { align-items: flex-start; }
          .c-act--center { justify-content: flex-start; text-align: left; }
          .c-sub--center { margin-inline: 0; }
          .c-stats { grid-template-columns: repeat(2, 1fr); }
          .c-next { align-items: flex-start; }
          .stage__rail { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .c-next__arrow { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default CinematicStage;
