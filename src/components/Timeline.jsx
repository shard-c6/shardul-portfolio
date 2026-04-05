import { useEffect, useRef } from 'react';
import { TIMELINE, RESUME_PATH } from '../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef(null);
  const spineProgressRef = useRef(null);

  useEffect(() => {
    // GSAP context for safe component cleanup
    let ctx = gsap.context(() => {
      // 1. Spine Progress Animation
      gsap.to(spineProgressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      // 2. Timeline Card Staggered Animations
      const entries = gsap.utils.toArray('.timeline-entry');
      entries.forEach((entry) => {
        const card = entry.querySelector('.timeline-card');
        const dot = entry.querySelector('.timeline-dot');
        const side = card.dataset.side;

        gsap.fromTo(card, 
          { 
            opacity: 0, 
            x: side === 'left' ? -60 : 60 
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Dot animation
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
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
          <div ref={spineProgressRef} className="timeline-spine-progress" />
        </div>

        {/* Entries */}
        <div className="timeline-entries">
          {TIMELINE.map((entry, i) => (
            <div key={i} className="timeline-entry">
              <div className="timeline-dot" />
              <div
                className="timeline-card"
                data-side={entry.side}
                style={{
                  opacity: 0, // Initial state before GSAP
                  willChange: 'transform, opacity'
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
