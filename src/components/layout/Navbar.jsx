import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { IconArrowUpRight, IconMenu2, IconX } from '@tabler/icons-react';
import Magnetic from '../core/Magnetic';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/recommendations', label: 'Recommendations' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav__inner container">
          <Link to="/" className="nav__brand" aria-label="Home">
            <span className="nav__mark">HS</span>
            <span className="nav__name">Hassan Shahzad</span>
          </Link>

          <nav className="nav__links">
            {LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav__cta">
            <Magnetic strength={0.4}>
              <a
                href="/assets/resume/hassan_resume.pdf"
                download="hassan_resume.pdf"
                className="btn btn--primary"
              >
                <span>Résumé</span>
                <IconArrowUpRight size={17} />
              </a>
            </Magnetic>
          </div>

          <button
            className="nav__burger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <nav>
          {LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className="mobile-menu__link"
              style={{ transitionDelay: `${0.08 + i * 0.06}s` }}
            >
              <span className="mobile-menu__idx">0{i + 1}</span>
              {link.label}
            </NavLink>
          ))}
          <a
            href="/assets/resume/hassan_resume.pdf"
            download="hassan_resume.pdf"
            className="mobile-menu__link"
            style={{ transitionDelay: `${0.08 + LINKS.length * 0.06}s` }}
          >
            <span className="mobile-menu__idx">↗</span>
            Résumé
          </a>
        </nav>
      </div>

      <style>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9000;
          transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .nav.is-scrolled {
          background: rgba(8, 9, 14, 0.6);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          border-bottom: 1px solid var(--line);
        }
        .nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }
        .nav__brand {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-family: var(--font-display);
          font-weight: 700;
        }
        .nav__mark {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: var(--grad-ice);
          color: #07080d;
          font-size: 0.95rem;
          letter-spacing: -0.03em;
        }
        .nav__name {
          font-size: 1.02rem;
          letter-spacing: -0.01em;
        }
        .nav__links {
          display: flex;
          gap: 0.2rem;
          padding: 0.3rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.02);
        }
        .nav__link {
          position: relative;
          padding: 0.5rem 0.9rem;
          border-radius: 99px;
          font-size: 0.86rem;
          font-weight: 500;
          white-space: nowrap;
          color: var(--ink-dim);
          transition: color 0.3s ease, background 0.3s ease;
        }
        .nav__link:hover {
          color: var(--ink);
        }
        .nav__link.is-active {
          color: #07080d;
          background: var(--ink);
        }
        .nav__burger {
          display: none;
          color: var(--ink);
        }
        @media (max-width: 1080px) {
          .nav__links,
          .nav__cta {
            display: none;
          }
          .nav__burger {
            display: inline-flex;
          }
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 8900;
          background: rgba(6, 7, 11, 0.96);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: circle(0% at calc(100% - 44px) 44px);
          transition: clip-path 0.7s var(--ease-in-out);
          pointer-events: none;
        }
        .mobile-menu.is-open {
          clip-path: circle(150% at calc(100% - 44px) 44px);
          pointer-events: auto;
        }
        .mobile-menu nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: var(--gutter);
        }
        .mobile-menu__link {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(2.2rem, 11vw, 3.6rem);
          color: var(--ink);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease, color 0.3s ease;
          letter-spacing: -0.02em;
        }
        .mobile-menu.is-open .mobile-menu__link {
          opacity: 1;
          transform: none;
        }
        .mobile-menu__link:hover {
          color: var(--cyan);
        }
        .mobile-menu__idx {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--ink-mute);
        }
      `}</style>
    </>
  );
};

export default Navbar;
