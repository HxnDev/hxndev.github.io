import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconMail,
  IconMapPin,
  IconBrandGithub,
  IconBrandLinkedin,
  IconArrowUpRight,
  IconCheck,
  IconLoader2,
} from '@tabler/icons-react';
import Magnetic from '@/components/core/Magnetic';

const DETAILS = [
  { icon: IconMail, label: 'Email', value: 'hassanshahzad.dev@gmail.com', href: 'mailto:hassanshahzad.dev@gmail.com' },
  { icon: IconMapPin, label: 'Based in', value: 'Geneva, Switzerland' },
];

const SOCIALS = [
  { icon: IconBrandGithub, label: 'GitHub', href: 'https://github.com/HxnDev' },
  {
    icon: IconBrandLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hassan-shahzad-2a6617212/',
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    setStatus('sending');
    // No backend — hand off to the user's mail client and show confirmation.
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name}`);
    setTimeout(() => {
      window.location.href = `mailto:hassanshahzad.dev@gmail.com?subject=${subject}&body=${body}`;
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  return (
    <>
      <div className="aurora" aria-hidden="true" />

      <section className="section container page-top">
        <div className="contact">
          <div className="contact__intro">
            <span className="eyebrow" data-reveal>
              Contact
            </span>
            <h1 className="page-title display" data-reveal data-reveal-delay={80}>
              Let&rsquo;s make
              <br />
              <span className="gradient-text">something great.</span>
            </h1>
            <p className="contact__lead" data-reveal data-reveal-delay={140}>
              Got a project, a role, or a wild idea? I&rsquo;m always up for a good conversation.
            </p>

            <div className="contact__details">
              {DETAILS.map(({ icon: Icon, label, value, href }) => (
                <div className="contact__detail" key={label} data-reveal>
                  <span className="contact__detail-icon">
                    <Icon size={20} />
                  </span>
                  <div>
                    <span className="contact__detail-label">{label}</span>
                    {href ? (
                      <a href={href} className="contact__detail-value">
                        {value}
                      </a>
                    ) : (
                      <span className="contact__detail-value">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__socials">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <Magnetic key={label} strength={0.3}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                    <IconArrowUpRight size={15} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="contact__form-wrap glass" data-reveal data-reveal-delay={120}>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="contact__success-icon">
                    <IconCheck size={34} />
                  </span>
                  <h3>Message ready!</h3>
                  <p>Your mail client should be open. Thanks for reaching out — talk soon.</p>
                  <button className="btn btn--ghost" onClick={() => setStatus('idle')}>
                    <span>Send another</span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="contact__form-title">Send a message</h3>
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={form.name} onChange={update} required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={update}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={update}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn--primary btn--lg contact__submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <IconLoader2 size={18} className="spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send message</span>
                        <IconArrowUpRight size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <style>{`
        .contact {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 5rem);
          align-items: start;
        }
        .page-title {
          font-size: clamp(2.6rem, 8vw, 5.5rem);
          letter-spacing: -0.04em;
          line-height: 0.98;
          margin-block: 1rem 1.4rem;
        }
        .contact__lead {
          color: var(--ink-dim);
          font-size: 1.1rem;
          max-width: 42ch;
          margin-bottom: 2.5rem;
        }
        .contact__details {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
          margin-bottom: 2.2rem;
        }
        .contact__detail {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .contact__detail-icon {
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 1px solid var(--line);
          color: var(--cyan);
          flex-shrink: 0;
        }
        .contact__detail-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-mute);
        }
        .contact__detail-value {
          font-size: 1.02rem;
          font-weight: 500;
        }
        a.contact__detail-value:hover {
          color: var(--cyan);
        }
        .contact__socials {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .contact__social {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.1rem;
          border-radius: 99px;
          border: 1px solid var(--line);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }
        .contact__social:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }
        .contact__form-wrap {
          border-radius: var(--radius-lg);
          padding: clamp(1.6rem, 4vw, 2.6rem);
        }
        .contact__form-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          margin-bottom: 1.6rem;
        }
        .contact__submit {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }
        .contact__submit:disabled {
          opacity: 0.7;
          cursor: wait;
        }
        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .contact__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          padding: 2rem 0;
        }
        .contact__success-icon {
          display: grid;
          place-items: center;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--grad-ice);
          color: #07080d;
          box-shadow: var(--glow-cyan);
        }
        .contact__success h3 {
          font-family: var(--font-display);
          font-size: 1.6rem;
        }
        .contact__success p {
          color: var(--ink-dim);
          max-width: 36ch;
        }
        @media (max-width: 880px) {
          .contact { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
};

export default Contact;
