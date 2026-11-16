# Nathan Butcher | AI & Machine Learning

Personal portfolio with academic projects, work-project overviews, and an interactive portrait hero.

## Editing

- `index.html`: background, education, contact details, and page structure.
- `projects.js`: project summaries, visible outcomes, source links, and diagram thumbnails.
- `sales-demo.js`: the synthetic sales-account illustration and interactive filters.
- `portrait.js`: portrait contours, scan replay, and pointer-driven depth.
- `styles.css`: typography, color, and responsive layout.
- `assets/`: saved notebook figures and illustrative project artwork.

This site uses plain HTML, CSS, and JavaScript. No installation or build is required. GitHub Pages publishes the root of `main`; `.nojekyll` serves the files directly.

Academic summaries link to their source notebooks. The composer project is currently scoped to data preparation and feature extraction. Work-project overviews use accomplishments described by the owner and documented in their resume. Their diagrams are illustrative and contain no employer data. The portrait hero uses an AI-extracted cutout of the owner's headshot, a scan into a cyan point-and-contour feature view, a manual transformation slider, and pointer-driven depth. Reduced motion disables automatic animation.

The sales project illustrates source data flowing through Snowflake and an API to a rep-specific account view. The owner reports 100 sales-rep users and full implementation ownership. The public example contains two fictional reps, six accounts, twelve doctors, and 59 synthetic activity records with per-record counts. Representative switching and account, doctor, and channel filters operate locally; this is an illustration, with no authentication or live Snowflake connection.

Synthetic accounts have distinct activity mixes, dates, assets, and volumes. Channel totals count views, email opens, and clicks from the visible records, respecting the account, doctor, and channel filters. Downloads and video plays remain separate actions in the history.

The campaign ROI case study describes marketing/revenue features from the owner's Snowflake pipeline, regression and tree model ensembles, adjusted comparisons, and owner-reported findings of roughly 30–40× returns and 95% of measured return from accounts below 60% share. `roi-demo.js` provides a simple visual summary of reported returns and the account-share finding.
