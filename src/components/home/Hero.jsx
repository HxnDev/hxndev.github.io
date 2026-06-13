import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react';
import Magnetic from '../core/Magnetic';

const HeroScene = lazy(() => import('../three/HeroScene'));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const rise = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const Hero = () => {
  return (
    <section className="hero">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <div className="hero__vignette" aria-hidden="true" />

      <div className="container hero__content">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={rise} className="eyebrow hero__eyebrow">
            Full Stack Developer&nbsp;&nbsp;/&nbsp;&nbsp;ML Engineer
          </motion.p>

          <motion.h1 variants={rise} className="hero__title display">
            Crafting <span className="gradient-text">intelligent</span>
            <br />
            digital experiences.
          </motion.h1>

          <motion.p variants={rise} className="hero__sub">
            I&rsquo;m Hassan Shahzad — I design and engineer performant, immersive software,
            from AWS-scale data pipelines to interactive web worlds.
          </motion.p>

          <motion.div variants={rise} className="hero__actions">
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
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="eyebrow">Scroll</span>
        <IconArrowDown size={16} />
      </motion.div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero__vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
              130% 90% at 50% 10%,
              transparent 40%,
              rgba(6, 7, 11, 0.7) 100%
            );
        }
        .hero__content {
          position: relative;
          z-index: 2;
        }
        .hero__eyebrow {
          margin-bottom: 1.6rem;
        }
        .hero__title {
          font-size: clamp(2.8rem, 9.5vw, 8rem);
          letter-spacing: -0.035em;
          margin-bottom: 1.8rem;
          max-width: 14ch;
        }
        .hero__sub {
          max-width: 46ch;
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: var(--ink-dim);
          margin-bottom: 2.6rem;
        }
        .hero__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero__scroll {
          position: absolute;
          bottom: 2.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--ink-mute);
        }
        .hero__scroll svg {
          animation: bob 1.8s ease-in-out infinite;
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
