# Shardul Chogale — Personal Portfolio

A production-grade, single-page portfolio built with **React (Vite)**, **Three.js**, **GSAP ScrollTrigger**, and **Lenis** smooth scrolling.

## Design

**Earthy Minimalist 3D Premium** — warm beige backgrounds, charcoal typography, sage green accents. Like a premium print magazine translated into an interactive 3D web experience.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Update Content

**All personal content is in `src/constants.js`** — you never need to edit component files.

| What | Where |
|------|-------|
| Name, tagline, bio | `PERSONAL` object |
| Tech stack & proficiency | `TECH_STACK` array |
| Projects | `PROJECTS` array |
| Timeline | `TIMELINE` array |
| Blog posts | `BLOG_POSTS` array |
| Social links | `SOCIAL` object |
| Currently / Open to | `CURRENTLY` object |

## How to Add Real Projects

1. Open `src/constants.js`
2. Replace placeholder entries in `PROJECTS` with:

```js
{
  id: 'project-01',
  title: 'My Cool Project',
  description: 'Brief description of the project.',
  tags: ['Python', 'FastAPI', 'React'],
  thumbnail: '/projects/project-01.webp',  // place image in public/projects/
  github: 'https://github.com/you/project',
  live: 'https://project.vercel.app',
  status: 'live',  // change from 'coming-soon' to 'live'
}
```

3. Place project thumbnails in `public/projects/` as WebP images.

## How to Replace the 3D Avatar with Spline

1. Install Spline React: `npm install @splinetool/react-spline`
2. Open `src/components/HeroScene.jsx`
3. Replace the Three.js code with:

```jsx
import Spline from '@splinetool/react-spline';

export default function HeroScene() {
  return <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />;
}
```

## Where to Put Files

| File | Location |
|------|----------|
| Resume PDF | `public/resume.pdf` |
| Avatar image (mobile fallback) | `public/avatar-static.webp` |
| Project thumbnails | `public/projects/` |

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect this repo to [vercel.com](https://vercel.com) for automatic CI/CD.

## Tech Stack

- **React 18** — UI components
- **Vite 6** — build tool
- **Three.js** — 3D hero scene
- **GSAP + ScrollTrigger** — scroll animations & horizontal pin
- **Lenis** — buttery smooth scrolling
- **Vanilla CSS** — design system with custom properties
- **Google Fonts** — Playfair Display, DM Sans, JetBrains Mono

## Performance

- Three.js is lazy-loaded and pauses when off-screen
- GSAP + Three.js are code-split into separate chunks
- All animations respect `prefers-reduced-motion`
- Font loading uses `font-display: swap`
