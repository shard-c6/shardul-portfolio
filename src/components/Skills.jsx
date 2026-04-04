import { useEffect, useRef, useCallback } from 'react';
import { TECH_STACK, LEARNING } from '../constants';

// SVG icons for each technology
const SKILL_ICONS = {
  Python: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 6 4 6 5.5V8h6v1H5.5C3.5 9 2 10.5 2 13s1.5 4 3.5 4H8v-2.5C8 12.5 9.5 11 11.5 11h5c1.5 0 2.5-1 2.5-2.5v-3C19 4 17.5 2 12 2zm-2 2.5a.75.75 0 110 1.5.75.75 0 010-1.5z"/>
      <path d="M12 22c5.5 0 6-2 6-3.5V16h-6v-1h6.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H16v2.5c0 2-1.5 3.5-3.5 3.5h-5c-1.5 0-2.5 1-2.5 2.5v3C5 20 6.5 22 12 22zm2-2.5a.75.75 0 110-1.5.75.75 0 010 1.5z"/>
    </svg>
  ),
  'Machine Learning': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><circle cx="4" cy="8" r="2"/><circle cx="20" cy="8" r="2"/>
      <circle cx="4" cy="16" r="2"/><circle cx="20" cy="16" r="2"/>
      <line x1="6" y1="8" x2="9.5" y2="10.5"/><line x1="18" y1="8" x2="14.5" y2="10.5"/>
      <line x1="6" y1="16" x2="9.5" y2="13.5"/><line x1="18" y1="16" x2="14.5" y2="13.5"/>
    </svg>
  ),
  'LLMs & AI': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 00-7 7c0 2.5 1.5 4.5 3 6 .8.8 1.2 1.8 1.2 2.8V19h5.6v-1.2c0-1 .4-2 1.2-2.8 1.5-1.5 3-3.5 3-6a7 7 0 00-7-7z"/>
      <line x1="9" y1="19" x2="15" y2="19"/><line x1="10" y1="22" x2="14" y2="22"/>
      <line x1="12" y1="2" x2="12" y2="4" opacity="0.5"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34" opacity="0.5"/>
    </svg>
  ),
  SQL: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
    </svg>
  ),
  DSA: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="12" r="2"/>
      <circle cx="4" cy="20" r="2"/><circle cx="10" cy="20" r="2"/><circle cx="18" cy="20" r="2"/>
      <line x1="12" y1="6" x2="6" y2="10"/><line x1="12" y1="6" x2="18" y2="10"/>
      <line x1="6" y1="14" x2="4" y2="18"/><line x1="6" y1="14" x2="10" y2="18"/>
      <line x1="18" y1="14" x2="18" y2="18"/>
    </svg>
  ),
  C: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 9a6 6 0 10-6 6 6 6 0 004.24-1.76"/>
      <text x="10" y="14" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">C</text>
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2s1 4 4 4 4-4 4-4"/><path d="M6 8c0 4 3 6 6 8s6-4 6-8"/>
      <path d="M6 16c0 2 2 4 6 4s6-2 6-4"/>
    </svg>
  ),
};

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 10;
    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="skill-card"
      style={{
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
    >
      <div className="skill-icon">
        {SKILL_ICONS[skill.name] || <div />}
      </div>
      <div className="skill-name">{skill.name}</div>
      <div className="skill-category">{skill.category}</div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          data-proficiency={skill.proficiency}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);

  // Animation is now handled by the global ScrollAnimations engine
  // No local IntersectionObserver needed

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <span className="section-number">02</span>
      <span className="section-label">Technologies I work with</span>
      <h2 className="section-title">Arsenal</h2>

      {/* Primary Skills Grid */}
      <div className="skills-grid">
        {TECH_STACK.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>

      {/* Learning Roadmap */}
      <div className="learning-roadmap">
        <div className="learning-label">
          Currently exploring <span style={{ color: 'var(--accent)' }}>→</span>
        </div>
        <div className="learning-pills">
          {LEARNING.map((tech) => (
            <span key={tech} className="learning-pill">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
