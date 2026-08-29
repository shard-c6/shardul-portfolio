# shardul-portfolio

Personal portfolio — data engineering. No build step and no dependencies: styles,
scripts, fonts and SVGs are inlined into `index.html`. Two binary files stay loose
so they can be swapped without a rebuild:

    index.html
    assets/shardul.png                    # portrait
    assets/shardul-chogale-resume.pdf     # résumé

Keep that folder layout — `index.html` references both by relative path.
Dropping in a new résumé PDF at the same filename is all it takes to update it.

## Run it

Serve the folder (relative paths need a server, not file://):

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
- The old Vite/React source in git history is superseded — this build does not use it.
