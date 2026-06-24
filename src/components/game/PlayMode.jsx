import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IconX, IconArrowUpRight, IconRefresh, IconDownload } from '@tabler/icons-react';
import { useGame } from '@/components/game/gameContext';

const ORB_COUNT = 12;
const COLLECT_RADIUS = 42; // px from the rocket nose to grab an orb

const isCoarse = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const fmtTime = ms => {
  const total = Math.max(0, ms);
  const s = Math.floor(total / 1000);
  const cs = Math.floor((total % 1000) / 10);
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${m}:${String(ss).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
};

/* ---------- Rocket ---------- */
const Rocket = ({ innerRef }) => (
  <div ref={innerRef} className="rk" aria-hidden="true">
    <svg width="46" height="46" viewBox="0 0 46 46">
      <defs>
        <linearGradient id="rkBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#9fd8ff" />
        </linearGradient>
        <radialGradient id="rkFlame" cx="0.7" cy="0.5" r="0.7">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.5" stopColor="#ffb84d" />
          <stop offset="1" stopColor="#ff6a2e" />
        </radialGradient>
      </defs>
      {/* thruster flame (points left, behind the rocket) */}
      <path className="rk__flame" d="M12 23 L1 18 L6 23 L1 28 Z" fill="url(#rkFlame)" />
      {/* fins */}
      <path d="M16 14 L10 9 L13 17 Z" fill="#4f86ff" />
      <path d="M16 32 L10 37 L13 29 Z" fill="#4f86ff" />
      {/* body (nose to the right) */}
      <path
        d="M12 23 Q12 13 22 13 L28 13 Q40 16 44 23 Q40 30 28 33 L22 33 Q12 33 12 23 Z"
        fill="url(#rkBody)"
        stroke="rgba(91,233,255,0.6)"
        strokeWidth="1"
      />
      {/* window */}
      <circle cx="27" cy="23" r="4.2" fill="#0a1230" stroke="#5be9ff" strokeWidth="1.4" />
    </svg>
  </div>
);

/* ---------- Confetti (canvas, self-contained) ---------- */
const Confetti = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (canvas.width = window.innerWidth * dpr);
    const h = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const colors = ['#5be9ff', '#6fa8ff', '#ffb84d', '#ffffff', '#ff9d2e'];
    const parts = Array.from({ length: 160 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * w * 0.3,
      y: h * 0.35 + (Math.random() - 0.5) * h * 0.2,
      vx: (Math.random() - 0.5) * 14 * dpr,
      vy: (Math.random() - 1.1) * 16 * dpr,
      size: (4 + Math.random() * 6) * dpr,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[(Math.random() * colors.length) | 0],
    }));

    let raf;
    let frame = 0;
    const gravity = 0.42 * dpr;
    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, w, h);
      parts.forEach(p => {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (frame < 220) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="cf" aria-hidden="true" />;
};

/* ---------- Game stage ---------- */
const GameStage = ({ onExit }) => {
  const [orbs, setOrbs] = useState([]);
  const [collected, setCollected] = useState(0);
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0);
  const [resultTime, setResultTime] = useState(0);

  const rocketRef = useRef(null);
  const timerRef = useRef(null);
  const trailRef = useRef([]);
  const orbEls = useRef({});
  const dlgRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const prev = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const history = useRef([]);
  const collectedSet = useRef(new Set());
  const finishedRef = useRef(false);
  const startRef = useRef(0);
  const totalRef = useRef(ORB_COUNT);

  // Mark the body so the default cursor can hide while the rocket is flying.
  useEffect(() => {
    document.body.classList.add('is-playing');
    return () => document.body.classList.remove('is-playing');
  }, []);

  // Drive the native <dialog> from state. showModal() promotes it to the
  // browser's top layer, which is centered by the UA and immune to ancestor
  // transforms / overflow / containing blocks.
  useEffect(() => {
    const d = dlgRef.current;
    if (!d) return;
    if (finished && !d.open) d.showModal();
    else if (!finished && d.open) d.close();
  }, [finished]);

  // Build a fresh field + run the loop for each round.
  useEffect(() => {
    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    prev.current = { ...mouse.current };

    const docH = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      window.innerHeight
    );
    // First orb lives below the fold so the player must scroll to begin.
    const startY = window.innerHeight * 1.05;
    const endY = docH - 260;
    const span = Math.max(endY - startY, window.innerHeight);

    // One orb per vertical band (guarantees a full-page hunt) but fully
    // randomized within the band + random horizontally, so every run differs.
    const list = Array.from({ length: ORB_COUNT }, (_, i) => {
      const bandBase = startY + (span * (i + Math.random())) / ORB_COUNT;
      const y = Math.min(endY, bandBase);
      const xPct = 0.06 + Math.random() * 0.88;
      return {
        id: `${round}-${i}-${Math.random().toString(36).slice(2, 6)}`,
        xPct,
        y,
        amber: Math.random() < 0.5,
        // Gentle independent wander so they feel alive without floating away.
        ampx: 18 + Math.random() * 42,
        ampy: 18 + Math.random() * 42,
        spx: 0.25 + Math.random() * 0.6,
        spy: 0.25 + Math.random() * 0.6,
        phx: Math.random() * Math.PI * 2,
        phy: Math.random() * Math.PI * 2,
      };
    });

    orbEls.current = {};
    collectedSet.current = new Set();
    finishedRef.current = false;
    totalRef.current = list.length;
    startRef.current = performance.now();
    setOrbs(list);
    setCollected(0);
    setFinished(false);

    const onMove = e => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const loop = () => {
      const m = mouse.current;

      // Timer
      if (!finishedRef.current && timerRef.current) {
        timerRef.current.textContent = fmtTime(performance.now() - startRef.current);
      }

      // Rocket orientation from velocity
      const vx = m.x - prev.current.x;
      const vy = m.y - prev.current.y;
      if (Math.hypot(vx, vy) > 1.2) targetAngle.current = (Math.atan2(vy, vx) * 180) / Math.PI;
      let diff = targetAngle.current - angle.current;
      diff = ((diff + 180) % 360 + 360) % 360 - 180;
      angle.current += diff * 0.2;
      prev.current = { x: m.x, y: m.y };

      if (rocketRef.current) {
        rocketRef.current.style.transform = `translate3d(${m.x}px, ${m.y}px, 0) translate(-50%, -50%) rotate(${angle.current}deg)`;
      }

      // Trail
      history.current.unshift({ x: m.x, y: m.y });
      if (history.current.length > 40) history.current.pop();
      trailRef.current.forEach((el, i) => {
        const p = history.current[(i + 1) * 5];
        if (el && p) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
          el.style.opacity = String(0.35 - i * 0.05);
        }
      });

      // Drift + collisions
      const ts = performance.now() / 1000;
      for (const orb of list) {
        if (collectedSet.current.has(orb.id)) continue;
        const el = orbEls.current[orb.id];
        if (!el) continue;

        // Gentle wander around the orb's home position.
        const dx = Math.sin(ts * orb.spx + orb.phx) * orb.ampx;
        const dy = Math.cos(ts * orb.spy + orb.phy) * orb.ampy;
        el.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;

        if (!finishedRef.current) {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          if (Math.hypot(cx - m.x, cy - m.y) < COLLECT_RADIUS) {
            collectedSet.current.add(orb.id);
            el.classList.add('is-pop');
            setCollected(collectedSet.current.size);
            if (collectedSet.current.size >= totalRef.current) {
              finishedRef.current = true;
              setResultTime(performance.now() - startRef.current);
              setFinished(true);
            }
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [round]);

  const playAgain = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRound(r => r + 1);
  };

  return (
    <div className="game">
      {/* Orb field — lives in document space so it scrolls with the page */}
      <div className="game__field">
        {orbs.map(orb => (
          <span
            key={orb.id}
            ref={el => (orbEls.current[orb.id] = el)}
            className={`orb ${orb.amber ? 'orb--amber' : ''}`}
            style={{ left: `${orb.xPct * 100}%`, top: `${orb.y}px` }}
          >
            <span className="orb__core" />
          </span>
        ))}
      </div>

      {/* Trail + rocket (viewport-fixed) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          ref={el => (trailRef.current[i] = el)}
          className="rk-trail"
          aria-hidden="true"
        />
      ))}
      <Rocket innerRef={rocketRef} />

      {/* HUD */}
      <div className="hud" aria-hidden="true">
        <div className="hud__chip">
          <span className="hud__dot" /> {collected}/{ORB_COUNT} orbs
        </div>
        <div className="hud__chip">
          <span ref={timerRef} className="hud__time">
            0:00.00
          </span>
        </div>
      </div>

      {collected === 0 && !finished && (
        <div className="toast" aria-hidden="true">
          Fly the rocket into the orbs — <strong>scroll down</strong> to hunt them all.
        </div>
      )}

      <button className="game__exit" onClick={onExit} aria-label="Exit play mode">
        <IconX size={18} />
        <span>Exit</span>
      </button>

      {/* Win screen — a native <dialog>. showModal() renders it in the browser's
          top layer, which is UA-centered and escapes any ancestor transform /
          overflow / containing block, so it always sits dead-center. */}
      <dialog ref={dlgRef} className="result-dlg" aria-label="Mission complete" onCancel={onExit}>
        {finished && <Confetti />}
        <div className="result__card glass">
          <span className="eyebrow" style={{ color: 'var(--amber)' }}>
            Mission complete
          </span>
          <h2 className="result__title display">
            You caught all {ORB_COUNT} <span className="gradient-text">orbs</span>.
          </h2>
          <div className="result__stats">
            <div className="result__stat">
              <span className="result__val display gradient-text">{fmtTime(resultTime)}</span>
              <span className="result__lbl">Your time</span>
            </div>
            <div className="result__stat">
              <span className="result__val display gradient-text--warm">{ORB_COUNT}</span>
              <span className="result__lbl">Orbs collected</span>
            </div>
          </div>
          <p className="result__msg">
            Thanks for sticking around and actually playing — that curiosity is exactly what I bring
            to building software. If you liked this, you&rsquo;ll probably like working with me.
          </p>
          <div className="result__actions">
            <a
              href="/assets/resume/hassan_resume.pdf"
              download="hassan_resume.pdf"
              className="btn btn--primary btn--lg"
            >
              <span>Download résumé</span>
              <IconDownload size={18} />
            </a>
            <a href="/contact" className="btn btn--ghost btn--lg" onClick={onExit}>
              <span>Get in touch</span>
              <IconArrowUpRight size={18} />
            </a>
          </div>
          <div className="result__foot">
            <button className="result__link" onClick={playAgain}>
              <IconRefresh size={16} />
              <span>Play again</span>
            </button>
            <button className="result__link" onClick={onExit}>
              <span>Exit play mode</span>
            </button>
          </div>
        </div>
      </dialog>

      <style>{`
        body.is-playing .cursor-dot,
        body.is-playing .cursor-ring { opacity: 0 !important; }

        .game__field {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9300;
          pointer-events: none;
        }
        .orb {
          position: absolute;
          width: 28px;
          height: 28px;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .orb__core {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #fff, #5be9ff 55%, rgba(91,233,255,0) 75%);
          box-shadow: 0 0 18px rgba(91, 233, 255, 0.8);
          animation: orb-pulse 1.6s ease-in-out infinite;
        }
        .orb--amber .orb__core {
          background: radial-gradient(circle at 35% 30%, #fff, #ffb84d 55%, rgba(255,184,77,0) 75%);
          box-shadow: 0 0 18px rgba(255, 184, 77, 0.8);
        }
        .orb.is-pop .orb__core { animation: orb-pop 0.4s ease-out forwards; }
        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.18); }
        }
        @keyframes orb-pop {
          to { transform: scale(2.4); opacity: 0; }
        }

        .rk {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9500;
          pointer-events: none;
          will-change: transform;
          filter: drop-shadow(0 0 10px rgba(91, 233, 255, 0.5));
        }
        .rk__flame {
          transform-origin: 12px 23px;
          animation: flame 0.12s steps(2) infinite;
        }
        @keyframes flame {
          0% { transform: scaleX(1) translateX(0); opacity: 1; }
          100% { transform: scaleX(0.7) translateX(2px); opacity: 0.75; }
        }
        .rk-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--cyan);
          z-index: 9490;
          pointer-events: none;
          opacity: 0;
          will-change: transform, opacity;
        }

        .hud {
          position: fixed;
          left: 50%;
          bottom: 1.6rem;
          transform: translateX(-50%);
          z-index: 9400;
          display: flex;
          gap: 0.7rem;
          pointer-events: none;
        }
        .hud__chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.95rem;
          border-radius: 99px;
          background: rgba(10, 12, 20, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line-strong);
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--ink);
        }
        .hud__dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--amber); box-shadow: var(--glow-amber);
        }
        .hud__time { color: var(--cyan); min-width: 64px; display: inline-block; }

        .toast {
          position: fixed;
          left: 50%;
          top: 90px;
          transform: translateX(-50%);
          z-index: 9400;
          padding: 0.7rem 1.2rem;
          border-radius: 99px;
          background: rgba(10, 12, 20, 0.78);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line-strong);
          color: var(--ink-dim);
          font-size: 0.9rem;
          white-space: nowrap;
          pointer-events: none;
          animation: toast-in 0.5s var(--ease-out) both;
        }
        .toast strong { color: var(--cyan); }
        @keyframes toast-in {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .game__exit {
          position: fixed;
          right: 1.2rem;
          top: 88px;
          z-index: 9600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.9rem;
          border-radius: 99px;
          background: rgba(10, 12, 20, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid var(--line-strong);
          color: var(--ink);
          font-size: 0.82rem;
          font-family: var(--font-mono);
        }
        .game__exit:hover { border-color: var(--cyan); color: var(--cyan); }

        .cf {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        /* Native dialog: top-layer, UA-centered. We only style the box. */
        .result-dlg {
          position: fixed;
          margin: auto;
          inset: 0;
          width: min(540px, 92vw);
          max-width: 92vw;
          max-height: 90vh;
          padding: 0;
          border: none;
          background: transparent;
          color: var(--ink);
          overflow: visible;
        }
        .result-dlg:not([open]) { display: none; }
        .result-dlg::backdrop {
          background: rgba(5, 6, 13, 0.62);
          backdrop-filter: blur(8px);
        }
        .result__card {
          position: relative;
          z-index: 1;
          width: 100%;
          border-radius: var(--radius-lg);
          padding: clamp(1.6rem, 4vw, 2.6rem);
          text-align: center;
          animation: result-pop 0.42s var(--ease-out) both;
        }
        @keyframes result-pop {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .result__title {
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          margin: 0.8rem 0 1.4rem;
          line-height: 1.05;
        }
        .result__stats {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 1.4rem;
        }
        .result__stat { display: flex; flex-direction: column; gap: 0.2rem; }
        .result__val { font-size: clamp(1.8rem, 5vw, 2.8rem); line-height: 1; }
        .result__lbl { font-size: 0.78rem; color: var(--ink-mute); font-family: var(--font-mono); }
        .result__msg { color: var(--ink-dim); line-height: 1.6; margin-bottom: 1.6rem; }
        .result__actions {
          display: flex;
          gap: 0.8rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.2rem;
        }
        .result__foot {
          display: flex;
          gap: 1.4rem;
          justify-content: center;
          align-items: center;
          padding-top: 1.1rem;
          border-top: 1px solid var(--line);
        }
        .result__link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--ink-mute);
          font-size: 0.85rem;
          font-family: var(--font-mono);
        }
        .result__link:hover { color: var(--cyan); }

        @media (prefers-reduced-motion: reduce) {
          .orb__core, .rk__flame { animation: none; }
        }
      `}</style>
    </div>
  );
};

/* ---------- Entry: only mounts the heavy stage when active ---------- */
const PlayMode = () => {
  const { active, stop } = useGame();
  const { pathname } = useLocation();

  if (!active || isCoarse()) return null;
  // Key by route so a fresh field is generated per page.
  return <GameStage key={pathname} onExit={stop} />;
};

export default PlayMode;
