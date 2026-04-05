import { useEffect, useRef, useState } from 'react';
import { PERSONAL, STACK_PILLS, RESUME_PATH } from '../constants';
import { Typewriter } from '../utils/typewriter';

export default function Hero() {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const [nameRevealed, setNameRevealed] = useState(false);

  // Split text and animate name
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const text = el.textContent;
    el.innerHTML = '';

    // Split into characters, preserving spaces
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(40px)';
      span.style.transition = `opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.02}s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.02}s`;
      el.appendChild(span);
      return span;
    });

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        chars.forEach((span) => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
        // Show tagline after name animation
        setTimeout(() => setNameRevealed(true), text.length * 20 + 200);
      });
    });
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;

    const tw = new Typewriter(el, PERSONAL.roles, {
      typeSpeed: 50,
      deleteSpeed: 25,
      pauseDuration: 1500,
    });
    tw.start();

    return () => tw.stop();
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        {/* Left side — Text */}
        <div className="hero-text">
          <div className="hero-pretitle">
            <span style={{ color: 'var(--syntax-keyword)' }}>def</span> <span style={{ color: 'var(--syntax-function)' }}>init</span>(self):<span className="cursor-blink" />
          </div>

          <h1 className="hero-name" ref={nameRef}>
            {PERSONAL.name}
          </h1>

          <div className="hero-role" style={{ color: 'var(--accent)' }}>
            <span ref={roleRef}></span>
            <span className="cursor">_</span>
          </div>

          <p
            className="hero-tagline"
            style={{
              opacity: nameRevealed ? 1 : 0,
              transform: nameRevealed ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {PERSONAL.tagline}
          </p>

          <div
            className="hero-buttons"
            style={{
              opacity: nameRevealed ? 1 : 0,
              transform: nameRevealed ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
            }}
          >
            <a href="#projects" className="btn btn-primary" data-cursor="cta">
              Deploy_Systems <span>()</span>
            </a>
            <a
              href={RESUME_PATH}
              className="btn btn-secondary"
              data-cursor="cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get_Resume
            </a>
          </div>

          <div
            className="hero-stack"
            style={{
              opacity: nameRevealed ? 1 : 0,
              transform: nameRevealed ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
            }}
          >
            {STACK_PILLS.map((tech) => (
              <span key={tech} className="pill">{tech}</span>
            ))}
          </div>
        </div>

        {/* Right side — Terminal Canvas */}
        <div className="hero-canvas" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            background: 'var(--bg-primary)',
            border: 'var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            lineHeight: '1.7',
            width: '100%',
            maxWidth: '500px',
            boxShadow: 'var(--shadow-lg)',
            opacity: nameRevealed ? 1 : 0,
            transform: nameRevealed ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E' }}></div>
            </div>
            <div>
              <span style={{ color: 'var(--syntax-keyword)' }}>class</span> <span style={{ color: 'var(--syntax-variable)' }}>Developer</span>:
              <div style={{ paddingLeft: '1.5rem' }}>
                <span style={{ color: 'var(--syntax-keyword)' }}>def</span> <span style={{ color: 'var(--syntax-function)' }}>__init__</span>(self):
                <div style={{ paddingLeft: '1.5rem' }}>
                  self.name = <span style={{ color: 'var(--syntax-string)' }}>"{PERSONAL.name}"</span><br />
                  self.focus = <span style={{ color: 'var(--syntax-string)' }}>"Data Engineering"</span><br />
                  self.coffee = <span style={{ color: 'var(--syntax-variable)' }}>True</span>
                </div>
                <br />
                <span style={{ color: 'var(--syntax-keyword)' }}>def</span> <span style={{ color: 'var(--syntax-function)' }}>build</span>(self):
                <div style={{ paddingLeft: '1.5rem' }}>
                  <span style={{ color: 'var(--syntax-keyword)' }}>return</span> <span style={{ color: 'var(--syntax-string)' }}>"Scalable Systems"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-indicator-line" />
        <span className="scroll-indicator-text">&lt;scroll /&gt;</span>
      </div>
    </section>
  );
}
