// All copy and links live here so the page can be updated without touching markup or animation code.

export const links = {
  email: 'shardulchogale1983@gmail.com',
  github: 'https://github.com/shard-c6',
  linkedin: 'https://www.linkedin.com/in/shardul-c-6a3b73273',
  x: 'https://x.com/ShardC008',
  resume: './assets/shardul-chogale-resume.pdf',
};

export const projects = [
  {
    name: 'APIx',
    tag: 'VegaBytes · SIH 2026',
    role: 'Scraping lead + system architect',
    blurb: 'Real-time Airfare Price Index for the NSO: scrape, validate, index.',
    href: 'https://github.com/shard-c6/VegaBytes_25056',
  },
  {
    name: 'dehelpers',
    tag: 'Open source · PyPI',
    role: 'Author and maintainer',
    blurb: "Resilient HTTP, safe Postgres, logs that can't leak a secret.",
    href: 'https://github.com/shard-c6/dehelpers',
  },
  {
    name: 'EVNet Sentinel',
    tag: 'Research · CICEVSE2024',
    role: 'ML pipelining + model evaluation',
    blurb: 'Intrusion detection for EV charging, static vs online learning.',
    href: 'https://github.com/Mukta01/EVNet_Sentinel',
  },
  {
    name: 'GreenGuard',
    tag: 'Backend + AI',
    role: 'Backend + AI integration',
    blurb: '25+ REST endpoints on Supabase, PostGIS and pgvector.',
    href: 'https://github.com/shard-c6/GreenGuard',
  },
];

export const stats = [
  { n: 4, label: 'Shipped systems' },
  { n: 2.4, label: 'GB dataset benchmarked' },
  { n: 25, suffix: '+', label: 'REST endpoints' },
];

export const stack = {
  Languages: ['Python', 'SQL', 'Java', 'C++'],
  'Data engineering': ['ETL / ELT', 'Data modeling', 'SQL optimisation', 'Real-time', 'Contracts'],
  'Cloud & big data': ['Azure', 'Kafka', 'Spark'],
  Storage: ['PostgreSQL', 'PostGIS', 'pgvector', 'S3'],
  Backend: ['FastAPI', 'Supabase', 'Docker', 'Git', 'REST', 'Linux', 'pytest', 'CI'],
  'AI / ML': ['scikit-learn', 'PyTorch', 'River', 'XGBoost', 'Pandas', 'NumPy', 'LLM APIs'],
};

const medium = 'https://medium.com/@shardulchogale1983/';
export const posts = [
  { kicker: 'dehelpers · 01', title: 'The hook, the story, the problem', desc: 'The boilerplate every pipeline rewrites badly.', href: medium + 'part-1-the-hook-the-story-the-problem-a5df69f0a1fd' },
  { kicker: 'dehelpers · 02', title: 'Engineering decisions over features', desc: 'What the package is, and what it refuses to be.', href: medium + 'part-2-designing-dehelpers-engineering-decisions-over-features-e794157df6b7' },
  { kicker: 'dehelpers · 03', title: 'From design to implementation', desc: 'Retries, pooling and redaction, as code.', href: medium + 'part-3-from-design-to-implementation-4f109dc1edc8' },
  { kicker: 'dehelpers · 04', title: "Packaging, lessons, what's next", desc: 'Publishing to PyPI.', href: medium + 'part-4-beyond-the-code-packaging-lessons-learned-whats-next-474b7e9de08a' },
  { kicker: 'Essay', title: 'Sahyadri: monsoon and memory', desc: 'Away from the terminal.', href: medium + 'sahyadri-the-mountain-range-monsoon-and-its-historical-significance-1c8e4bbfbee6' },
];

// Quotes are placeholders against real names until teammates send theirs.
export const reviews = [
  ['Mukta Varak', 'Cloud infra — VegaBytes, EVNet Sentinel'],
  ['Shubham Vaidya', 'Backend lead — VegaBytes'],
  ['Ankita', 'Index math — VegaBytes'],
  ['Mufeed Rajapkar', 'Data validation — VegaBytes'],
  ['Shruti Chaurasiya', 'Data viz — EVNet Sentinel'],
  ['Neha Chavhan', 'Frontend — EVNet Sentinel'],
  ['Rahul', 'Scrapers — VegaBytes'],
].map(([name, role]) => ({
  name,
  role,
  quote: `Quote pending: ${name.split(' ')[0]} has been asked for a few honest lines.`,
}));
