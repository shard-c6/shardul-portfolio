# shardul-portfolio

Personal portfolio — data engineering. Built with Vite, GSAP (ScrollTrigger) and Lenis.

## Run it

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # static site in dist/
    npm run preview    # serve the build

## Where things live

    index.html                 page markup, section by section
    src/content.js             all copy and links: projects, stack, posts, reviews
    src/styles.css             design tokens, layout, reduced-motion + mobile rules
    src/modules/gate.js        lanyard entry (drag the card down)
    src/modules/hero.js        walk-in character + typed line
    src/modules/scenes.js      pinned scroll scenes (pipelines, models, work, dehelpers, philosophy)
    src/modules/pong.js        Neural Pong (placeholder AI — swap policy() for the trained model)
    src/modules/sections.js    renders content.js into the page, contact letter
    public/assets/             portrait and résumé (drop a new PDF in at the same filename to update it)

Visitors with "reduce motion" turned on get a static, fully readable version with no pinning.

## Deploy

GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.
One-time setup: repo Settings → Pages → Source: **GitHub Actions**.

## Notes

- Teammate review quotes are placeholders against real names, pending collection.
- The previous single-file "Nocturne" build lives in git history.
