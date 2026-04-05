import { useEffect, useRef } from 'react';
import { CURRENTLY } from '../constants';
import ParallaxTextLayer from './ParallaxTextLayer';

export default function Currently() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.currently-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="currently" ref={sectionRef} style={{ position: 'relative' }}>
      <ParallaxTextLayer text="NOW" speed={1.5} opacity={0.03} />
      
      <div className="currently-grid">
        <div
          className="currently-item"
          style={{
            transform: 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="currently-icon">✦</span>
          <div>
            <div className="currently-label">
              <span className="pulse-dot" />
              Currently
            </div>
            <div className="currently-text">{CURRENTLY.currently}</div>
          </div>
        </div>

        <div
          className="currently-item"
          style={{
            transform: 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="currently-icon">✦</span>
          <div>
            <div className="currently-label">Open to</div>
            <div className="currently-text">{CURRENTLY.openTo}</div>
          </div>
        </div>

        <div
          className="currently-item"
          style={{
            transform: 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="currently-icon">✦</span>
          <div>
            <div className="currently-label">Learning</div>
            <div className="currently-text">{CURRENTLY.learning}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
