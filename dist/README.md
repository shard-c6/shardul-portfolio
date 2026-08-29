# shardul-portfolio

Personal portfolio — data engineering. Single self-contained page: no build step, no
dependencies, no network calls at runtime. Every asset (styles, scripts, fonts,
photograph, résumé) is inlined into `index.html`.

## Run it

Open `index.html` in a browser, or serve the folder:

    python -m http.server

## Deploy

Any static host. For GitHub Pages: Settings → Pages → deploy from `main`, root.

## What's on the page

- Lanyard gate — drag the ID card to enter
- Hero with a steppable pipeline diagram
- Selected work: APIx (VegaBytes), dehelpers, EVNet Sentinel, GreenGuard — scroll-stacked case studies
- Writing — the four-part dehelpers build log and one essay
- Working philosophy, tech stack browser, teammate reviews, about, hire-me stepper

## Notes

- Teammate review quotes are placeholders against real names, pending collection.
- Source of truth for the design lives in the Omelette project; this folder is the build output.
