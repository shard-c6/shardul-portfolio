import { useEffect, useRef } from 'react';
import { TIMELINE, RESUME_PATH } from '../constants';

export default function Timeline() {
  const sectionRef = useRef(null);
  const spineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !spineRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section has been scrolled through
      const scrolledPast = viewportHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolledPast / (sectionHeight + viewportHeight * 0.5)));

      spineRef.current.style.height = `${progress * 100}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cards on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = sectionRef.current?.querySelectorAll('.timeline-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="section" ref={sectionRef}>
      <span className="section-number">04</span>
      <span className="section-label">Experience & Education</span>
      <h2 className="section-title">Journey</h2>

      <div className="timeline" style={{ marginTop: 'var(--space-2xl)' }}>
        {/* Spine */}
        <div className="timeline-spine">
          <div className="timeline-spine-bg" />
          <div ref={spineRef} className="timeline-spine-progress" />
        </div>

        {/* Entries */}
        <div className="timeline-entries">
          {TIMELINE.map((entry, i) => (
            <div key={i} className="timeline-entry">
              <div className="timeline-dot" />
              <div
                className="timeline-card"
                style={{
                  opacity: 0,
                  transform: `translateX(${entry.side === 'left' ? '-60px' : '60px'})`,
                  transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="timeline-date">{entry.date}</div>
                <div className="timeline-card-title">{entry.title}</div>
                <p className="timeline-description">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume CTA */}
      <div className="timeline-cta">
        <div className="timeline-cta-card">
          <div className="timeline-cta-text">Want the full picture?</div>
          <a
            href={RESUME_PATH}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="cta"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download Resume PDF
          </a>
        </div>
      </div>
    </section>
  );
}
