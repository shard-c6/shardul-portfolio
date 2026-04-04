import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { PERSONAL, STACK_PILLS, RESUME_PATH } from '../constants';
import { Typewriter } from '../utils/typewriter';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const taglineRef = useRef(null);
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
      span.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`;
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
        setTimeout(() => setNameRevealed(true), text.length * 40 + 400);
      });
    });
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;

    const tw = new Typewriter(el, PERSONAL.roles, {
      typeSpeed: 70,
      deleteSpeed: 35,
      pauseDuration: 2200,
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
            Hello, I'm<span className="cursor-blink" />
          </div>

          <h1 className="hero-name" ref={nameRef}>
            {PERSONAL.name}
          </h1>

          <div className="hero-role">
            <span ref={roleRef}></span>
            <span className="cursor">|</span>
          </div>

          <p
            className="hero-tagline"
            style={{
              opacity: nameRevealed ? 1 : 0,
              transform: nameRevealed ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            {PERSONAL.tagline}
          </p>

          <div
            className="hero-buttons"
            style={{
              opacity: nameRevealed ? 1 : 0,
              transform: nameRevealed ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
            }}
          >
            <a href="#projects" className="btn btn-primary" data-cursor="cta">
              View My Work <span>↓</span>
            </a>
            <a
              href={RESUME_PATH}
              className="btn btn-secondary"
              data-cursor="cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </div>

          <div
            className="hero-stack"
            style={{
              opacity: nameRevealed ? 1 : 0,
              transform: nameRevealed ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
            }}
          >
            {STACK_PILLS.map((tech) => (
              <span key={tech} className="pill">{tech}</span>
            ))}
          </div>
        </div>

        {/* Right side — 3D Canvas */}
        <div className="hero-canvas">
          <Suspense fallback={<div style={{ width: '100%', height: '100%' }} />}>
            <HeroScene />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-indicator-line" />
        <span className="scroll-indicator-text">scroll</span>
      </div>
    </section>
  );
}
