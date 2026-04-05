import { useRef } from 'react';
import { SOCIAL } from '../constants';
import { useMagneticHover } from '../hooks/useMagneticHover';

function MagneticContactCard({ href, icon, label, handle }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticHover(10, 80);

  return (
    <a
      ref={ref}
      href={href}
      className="contact-card"
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
    >
      <div className="contact-card-icon">{icon}</div>
      <div className="contact-card-info">
        <div className="contact-card-label">{label}</div>
        <div className="contact-card-handle">{handle}</div>
      </div>
    </a>
  );
}

export default function Contact() {
  const headlineRef = useRef(null);



  return (
    <section id="contact" className="section contact" style={{ position: 'relative', background: 'var(--bg-primary)', zIndex: 1 }}>
      <span className="section-number">06</span>

      <div className="contact-headline" ref={headlineRef}>
        <span className="line1">
          {'Let\'s Build'.split(' ').map((w, i) => (
            <span
              key={i}
              className="word"
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
              }}
            >
              {w}
            </span>
          ))}
        </span>
        <span className="line2">
          <span
            className="word"
            style={{
              display: 'inline-block',
            }}
          >
            Something.
          </span>
        </span>
      </div>

      <p className="contact-subtitle">Have a project in mind? Let's talk.</p>

      <div className="contact-cards">
        <MagneticContactCard
          href={`mailto:${SOCIAL.email}`}
          label="Email"
          handle={SOCIAL.email}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>
            </svg>
          }
        />
        <MagneticContactCard
          href={SOCIAL.linkedin}
          label="LinkedIn"
          handle="Connect →"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
          }
        />
        <MagneticContactCard
          href={SOCIAL.github}
          label="GitHub"
          handle="View Code →"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77 5.44 5.44 0 003.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
          }
        />
      </div>
    </section>
  );
}
