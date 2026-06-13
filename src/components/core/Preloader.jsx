import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ['Initializing', 'Compiling shaders', 'Loading worlds', 'Welcome'];

/**
 * Cinematic intro: a counter races 0 → 100 while status words cycle, then the
 * curtain splits away to reveal the site. Calls onDone when finished.
 */
const Preloader = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const wordIndex = Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length));

  useEffect(() => {
    let cancelled = false;
    let current = 0;
    let timer;

    const tick = () => {
      if (cancelled) return;
      current = Math.min(100, current + (Math.random() * 8 + 2));
      setCount(Math.floor(current));
      if (current < 100) {
        timer = setTimeout(tick, Math.random() * 180 + 80);
      } else {
        timer = setTimeout(() => !cancelled && setDone(true), 550);
      }
    };

    timer = setTimeout(tick, 300);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.div
            className="preloader__panel"
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'top' }}
          />
          <div className="preloader__content">
            <motion.div
              className="preloader__word"
              key={wordIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4 }}
            >
              <span className="eyebrow">{WORDS[wordIndex]}</span>
            </motion.div>
            <div className="preloader__count display">
              {String(count).padStart(3, '0')}
              <span className="preloader__pct">%</span>
            </div>
            <div className="preloader__bar">
              <motion.span style={{ width: `${count}%` }} />
            </div>
          </div>

          <style>{`
            .preloader {
              position: fixed;
              inset: 0;
              z-index: 100000;
              display: grid;
              place-items: center;
              overflow: hidden;
            }
            .preloader__panel {
              position: absolute;
              inset: 0;
              background: var(--bg);
            }
            .preloader__content {
              position: relative;
              z-index: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.1rem;
              width: min(80vw, 420px);
            }
            .preloader__count {
              font-size: clamp(4rem, 16vw, 9rem);
              line-height: 1;
              color: var(--ink);
              display: flex;
              align-items: flex-start;
              letter-spacing: -0.04em;
            }
            .preloader__pct {
              font-size: 0.3em;
              margin-top: 0.6em;
              margin-left: 0.1em;
              color: var(--cyan);
            }
            .preloader__bar {
              width: 100%;
              height: 2px;
              background: var(--line);
              overflow: hidden;
              border-radius: 99px;
            }
            .preloader__bar span {
              display: block;
              height: 100%;
              background: var(--grad-primary);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
