import { useEffect, useRef, useState } from 'react';
import { PERSONAL } from '../constants';
import ParallaxTextLayer from './ParallaxTextLayer';

export default function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [countersStarted, setCountersStarted] = useState(false);
  const [statValues, setStatValues] = useState(PERSONAL.stats.map(() => 0));

  // Animate paragraphs and stats on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate paragraphs
            const paragraphs = entry.target.querySelectorAll('.about-paragraph');
            paragraphs.forEach((p, i) => {
              setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateX(0)';
              }, i * 200);
            });

            // Start stat counters
            if (!countersStarted) {
              setCountersStarted(true);
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const animateCounters = () => {
    PERSONAL.stats.forEach((stat, i) => {
      const target = parseInt(stat.number);
      const duration = 1500;
      const start = performance.now();

      const updateCounter = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.floor(eased * target);

        setStatValues((prev) => {
          const next = [...prev];
          next[i] = current;
          return next;
        });

        if (progress < 1) requestAnimationFrame(updateCounter);
      };

      requestAnimationFrame(updateCounter);
    });
  };

  return (
    <section id="about" className="section about" ref={sectionRef} style={{ position: 'relative' }}>
      <ParallaxTextLayer text="SYSTEMS" speed={2} reverse={true} opacity={0.03} />
      
      <span className="section-number">01</span>

      <div className="about-grid">
        {/* Left — Avatar Frame */}
        <div>
          <div className="about-avatar-frame">
            <div className="about-avatar-inner">
              {/* TODO: Replace with real photo or illustrated portrait */}
              <span className="about-avatar-placeholder">SC</span>
            </div>
          </div>

          <div className="about-stats">
            {PERSONAL.stats.map((stat, i) => (
              <div key={stat.label} className="about-stat">
                <div className="about-stat-number">
                  {statValues[i]}+
                </div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Bio */}
        <div className="about-text">
          <span className="section-label">About Me</span>
          <h2 className="section-title">An aspiring engineer who thinks with a systems mindset.</h2>

          {PERSONAL.bio.map((paragraph, i) => (
            <p
              key={i}
              className="about-paragraph"
              style={{
                opacity: 0,
                transform: 'translateX(60px)',
                transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
