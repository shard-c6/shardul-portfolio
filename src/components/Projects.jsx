import { useEffect, useRef, useCallback } from 'react';
import { PROJECTS } from '../constants';

/**
 * Projects section — Vertical card grid with GSAP scroll reveals.
 *
 * Each project object in constants.js:
 * {
 *   id: 'project-01',
 *   title: 'Project Name',
 *   description: 'Brief description.',
 *   tags: ['Python', 'FastAPI'],
 *   thumbnail: '/projects/project-01.webp',
 *   github: 'https://github.com/...',
 *   live: 'https://...',
 *   status: 'live' | 'coming-soon' | 'active-development',
 * }
 */

/* ── SVG Icons ── */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 6;
    const rotateY = (x - 0.5) * 6;
    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  }, []);

  const num = String(index + 1).padStart(2, '0');

  /* ── Coming Soon placeholder ── */
  if (project.status === 'coming-soon') {
    return (
      <div
        ref={cardRef}
        className="project-card project-card--placeholder"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="hover"
      >
        <div className="project-card__number">{num}</div>
        <div className="project-card__glyph">✦</div>
        <div className="project-card__title">Project {num}</div>
        <div className="project-card__desc">In progress — coming soon</div>
      </div>
    );
  }

  /* ── Status badge ── */
  const statusLabel = project.status === 'active-development' ? 'In Development' : 'Live';
  const statusClass = project.status === 'active-development' ? 'badge--dev' : 'badge--live';

  /* ── Real project card ── */
  return (
    <div
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
    >
      {/* Thumbnail */}
      <div className="project-card__thumbnail">
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
          />
        )}
        <div className="project-card__overlay">
          <span className="project-card__number">{num}</span>
        </div>
        <span className={`project-card__badge ${statusClass}`}>{statusLabel}</span>
      </div>

      {/* Content */}
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        {/* Tags */}
        {project.tags && (
          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-card__tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="project-card__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link"
              data-cursor="hover"
            >
              <GithubIcon /> Source Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__link project-card__link--primary"
              data-cursor="hover"
            >
              <ExternalIcon /> View Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <span className="section-number">03</span>
      <span className="section-label">Selected Work</span>
      <h2 className="section-title">Work</h2>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
