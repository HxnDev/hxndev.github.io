import { Link } from 'react-router-dom';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconArrowUpRight,
} from '@tabler/icons-react';
import Magnetic from '../core/Magnetic';

const SOCIALS = [
  { icon: IconBrandGithub, label: 'GitHub', href: 'https://github.com/HxnDev' },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hassan-shahzad-2a6617212/',
  },
  { icon: IconMail, label: 'Email', href: 'mailto:hassanshahzad.dev@gmail.com' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__cta" data-reveal>
          <span className="eyebrow">Have an idea?</span>
          <h2 className="footer__big display">
            Let&rsquo;s build something
            <br />
            <span className="gradient-text">unforgettable.</span>
          </h2>
          <Magnetic strength={0.3}>
            <Link to="/contact" className="btn btn--primary btn--lg">
              <span>Start a conversation</span>
              <IconArrowUpRight size={19} />
            </Link>
          </Magnetic>
        </div>

        <hr className="hr-glow" />

        <div className="footer__bottom">
          <div className="footer__brand">
            <span className="nav__mark" aria-hidden="true">
              HS
            </span>
            <div>
              <p className="footer__name">Hassan Shahzad</p>
              <p className="footer__role">Senior Full Stack Developer</p>
            </div>
          </div>

          <div className="footer__socials">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <p className="footer__copy">© {year} — Built with React, Three.js &amp; caffeine.</p>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          padding-block: clamp(4rem, 10vw, 7rem) 2.5rem;
          margin-top: 4rem;
          border-top: 1px solid var(--line);
          background: linear-gradient(180deg, transparent, rgba(111, 168, 255, 0.05));
        }
        .footer__cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding-block: clamp(2rem, 6vw, 4rem);
        }
        .footer__big {
          font-size: clamp(2.4rem, 8vw, 5.5rem);
          line-height: 0.98;
        }
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 2.5rem;
        }
        .footer__brand {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .footer__name {
          font-family: var(--font-display);
          font-weight: 600;
        }
        .footer__role {
          font-size: 0.85rem;
          color: var(--ink-mute);
        }
        .footer__socials {
          display: flex;
          gap: 0.6rem;
        }
        .footer__social {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--line);
          color: var(--ink-dim);
          transition: all 0.3s var(--ease-out);
        }
        .footer__social:hover {
          color: #07080d;
          background: var(--cyan);
          border-color: var(--cyan);
          transform: translateY(-4px);
        }
        .footer__copy {
          font-size: 0.82rem;
          color: var(--ink-mute);
          font-family: var(--font-mono);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
