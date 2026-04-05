import { useEffect, useRef, useCallback } from 'react';
import { TECH_STACK, LEARNING } from '../constants';

import { SiPython, SiTensorflow, SiOpenai, SiMysql, SiLeetcode, SiC } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

// SVG icons for each technology
const SKILL_ICONS = {
  'Python': <SiPython style={{ width: '100%', height: '100%' }} />,
  'Machine Learning': <SiTensorflow style={{ width: '100%', height: '100%' }} />,
  'LLMs & AI': <SiOpenai style={{ width: '100%', height: '100%' }} />,
  'SQL': <SiMysql style={{ width: '100%', height: '100%' }} />,
  'DSA': <SiLeetcode style={{ width: '100%', height: '100%' }} />,
  'C': <SiC style={{ width: '100%', height: '100%' }} />,
  'Java': <FaJava style={{ width: '100%', height: '100%' }} />,
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
