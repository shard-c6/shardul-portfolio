/**
 * ═══════════════════════════════════════════════════════════
 * SHARDUL CHOGALE — PORTFOLIO CONSTANTS
 * ═══════════════════════════════════════════════════════════
 * 📌 Edit this file to update all personal content.
 *    You should NEVER need to edit component files.
 * ═══════════════════════════════════════════════════════════
 */

export const PERSONAL = {
  name: 'Shardul Chogale',
  initials: 'SC',
  role: 'Aspiring Data Engineer | Student',
  tagline: 'Building real-life scalable systems that make real change.',

  // Roles that cycle in the hero typewriter
  roles: [
    'Aspiring Data Engineer',
    'ML & AI Builder',
    'Systems Thinker',
  ],

  // About section bio — 3 paragraphs
  // TODO: Replace with your actual bio
  bio: [
    "I'm a student driven by a deep curiosity for how data flows through systems at scale. From writing my first Python script to training ML models, every step has been about understanding how information becomes insight — and how that insight can power real-world decisions.",
    "I think in pipelines, schemas, and system boundaries. For me, great engineering isn't just about writing clever code — it's about designing scalable, resilient architectures that serve real people. Whether it's a data warehouse, an ETL pipeline, or an AI-powered application, I'm drawn to problems that demand both rigorous thinking and creative solutions.",
    "Outside of tech, I'm someone who values intentionality — in work, learning, and life. I believe the best systems (and the best engineers) are built through consistent, focused effort over time. When I'm not coding, you'll find me exploring new ideas, reading about distributed systems, or sketching architecture diagrams on napkins.",
  ],

  // Stats displayed in About section
  stats: [
    { number: '1+', label: 'Years Learning' },
    { number: '3+', label: 'Projects Built' },
    { number: '7+', label: 'Technologies' },
  ],
};

export const TECH_STACK = [
  { name: 'Python', category: 'Language', proficiency: 90, description: 'Core language for writing data pipelines, ML scripts, and scalable backends. Used extensively for data processing.' },
  { name: 'Machine Learning', category: 'AI / ML', proficiency: 70, description: 'Built and benchmarked models for real-time predictions using TensorFlow, PyTorch, and scikit-learn.' },
  { name: 'LLMs & AI', category: 'AI / ML', proficiency: 70, description: 'Integrating large language models and vision APIs into production applications with proper fallbacks.' },
  { name: 'SQL', category: 'Database', proficiency: 85, description: 'Writing efficient queries and designing normalized schema for PostgreSQL & analytical databases.' },
  { name: 'DSA', category: 'CS Core', proficiency: 85, description: 'Strong foundation in algorithms and data structures, enabling optimized and highly scalable system designs.' },
  { name: 'C', category: 'Language', proficiency: 90, description: 'Low-level systems programming and memory management for highly performant embedded processes.' },
  { name: 'Java', category: 'Language', proficiency: 80, description: 'Object-oriented application development and enterprise architecture patterns.' },
];

// Hero pill labels (short versions for pills)
export const STACK_PILLS = ['Python', 'ML', 'SQL', 'LLMs & AI', 'C', 'Java'];

// Learning roadmap — technologies currently exploring
export const LEARNING = [
  'Data Engineering Pipelines',
  'Apache Spark',
  'Airflow',
  'dbt',
  'Cloud (AWS/GCP)',
];

/**
 * PROJECTS — Currently "Coming Soon" placeholder cards.
 * When ready to add real projects, uncomment and fill in the structure below.
 *
 * Each project object:
 * {
 *   id: 'project-01',
 *   title: 'Project Name',
 *   description: 'Brief description of the project.',
 *   tags: ['Python', 'FastAPI', 'React'],
 *   thumbnail: '/projects/project-01.webp',    // place in public/projects/
 *   github: 'https://github.com/shardul/...',
 *   live: 'https://project.vercel.app',
 *   status: 'live',  // 'live' | 'coming-soon'
 * }
 */
export const PROJECTS = [
  // TODO: Replace these placeholder cards with real project data
  {
    id: 'papertrail',
    title: 'PaperTrail — Government Form Digitisation Pipeline',
    description: 'Built a full-stack OCR and ML pipeline to digitise government forms using FastAPI, OpenCV, and Google Cloud Vision. Implemented uncertainty scoring and human verification to reduce extraction errors, with Firebase-based audit logging for complete traceability.',
    tags: ['FastAPI', 'OpenCV', 'Google Cloud Vision', 'Firebase', 'Machine Learning'],
    thumbnail: '/images/project_pipeline.png',
    github: 'https://github.com/shard-c6',
    live: '',
    status: 'live'
  },
  {
    id: 'greenguard',
    title: 'GreenGuard — Plant Adoption Platform Backend',
    description: 'Developed a scalable FastAPI backend for a plant adoption platform with 25+ REST endpoints including authentication, adoption workflows, and AI-based plant identification using PlantNet API with caching and fallback mechanisms.',
    tags: ['FastAPI', 'Supabase', 'REST APIs', 'PlantNet API', 'Backend Development'],
    thumbnail: '/images/project_plant.png',
    github: 'https://github.com/shard-c6',
    live: '',
    status: 'live'
  },
  {
    id: 'memory-forecaster',
    title: 'AI-Based Memory Usage Forecaster',
    description: 'Built a real-time ML system to predict application memory usage and dynamically adjust OS-level allocation. Benchmarked multiple models using scikit-learn, TensorFlow, and PyTorch, deployed via FastAPI.',
    tags: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'FastAPI', 'psutil'],
    thumbnail: '/images/project_memory.png',
    github: 'https://github.com/shard-c6',
    live: '',
    status: 'active-development'
  },
];

/**
 * TIMELINE — Education + milestones
 * TODO: Replace placeholder entries with real dates and details
 */
export const TIMELINE = [
  {
    date: '2024 — Present',
    title: 'B.Tech Computer Engineering', // TODO: Replace with actual degree & university
    description: 'Studying Computer Science & Engineering. Building systems between lectures.',
    side: 'left',
  },
  {
    date: '2024',
    title: 'Started Learning Programming and logic building',
    description: 'Wrote the first script. Fell in love with automation and data.',
    side: 'right',
  },
  {
    date: '2025',
    title: 'First ML Model Trained',
    description: 'Built a classification model from scratch. Understood the power of data-driven decisions.',
    side: 'left',
  },
  {
    date: '2026',
    title: 'Attended first 24Hr hackathon',
    description: 'Participated in a 24-hour hackathon and built a functional prototype.',
    side: 'right',
  },
];

/**
 * BLOG POSTS — Placeholder editorial cards
 * TODO: Connect to CMS (Notion API / Hashnode / Dev.to RSS) for live posts
 */
export const BLOG_POSTS = [
  {
    category: 'Data Engineering',
    title: 'Why Every Data Engineer Should Think Like an Architect',
    date: 'Coming Soon',
    link: '#',
  },
  {
    category: 'AI',
    title: 'The Gap Between Training a Model and Deploying One',
    date: 'Coming Soon',
    link: '#',
  },
  {
    category: 'Systems',
    title: 'Lessons From Building My First End-to-End Pipeline',
    date: 'Coming Soon',
    link: '#',
  },
];

/**
 * CURRENTLY / OPEN TO
 */
export const CURRENTLY = {
  currently: 'Building scalable systems & learning Data Engineering',
  openTo: 'Internships, Collaborations, Open Source',
  learning: 'Apache Spark, dbt, Cloud Platforms',
};

/**
 * SOCIAL / CONTACT LINKS
 * TODO: Replace with your actual links
 */
export const SOCIAL = {
  email: 'shardulchogale1983@gmail.com',      // TODO: Replace with real email
  github: 'https://github.com/shard-c6',   // TODO: Replace with real GitHub URL
  linkedin: 'https://www.linkedin.com/in/shardul-c-6a3b73273/', // TODO: Replace with real LinkedIn URL
};

/**
 * RESUME
 * Place your resume PDF in /public/resume.pdf
 */
export const RESUME_PATH = '/resume.pdf';

/**
 * NAV LINKS
 */
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

/**
 * SPLINE 3D CHARACTER
 */
export const SPLINE_SCENE = 'https://prod.spline.design/Bya4D0RD1pEorA90/scene.splinecode';
