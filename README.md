# Nathan Butcher | AI & Machine Learning

Personal portfolio with academic projects, work-project overviews, and an interactive neural-network ROI demonstration using simulated campaigns.

## Editing

- `index.html`: background, education, contact details, and page structure.
- `projects.js`: project summaries, visible outcomes, source links, and diagram thumbnails.
- `sales-demo.js`: the synthetic sales-account illustration and interactive filters.
- `learning.js`: the local campaign ROI regression demonstration.
- `styles.css`: typography, color, and responsive layout.
- `assets/`: saved notebook figures and illustrative project artwork.

This site uses plain HTML, CSS, and JavaScript. No installation or build is required. GitHub Pages publishes the root of `main`; `.nojekyll` serves the files directly.

Academic summaries link to their source notebooks. The composer project is currently scoped to data preparation and feature extraction. Work-project overviews use accomplishments described by the owner and documented in their resume. Their diagrams are illustrative and contain no employer data. The ROI visualization is synthetic and makes no real campaign-performance claim.

The sales project illustrates source data flowing through Snowflake and an API to a rep-specific account view. The owner reports 100 sales-rep users and full implementation ownership. The public example contains two fictional reps, six accounts, twelve doctors, and 59 synthetic activity records with per-record counts. Representative switching and account, doctor, and channel filters operate locally; this is an illustration, with no authentication or live Snowflake connection.

Synthetic accounts have distinct activity mixes, dates, assets, and volumes. Channel totals count views, email opens, and clicks from the visible records, respecting the account, doctor, and channel filters. Downloads and video plays remain separate actions in the history.

The campaign ROI case study describes marketing/revenue features from the owner's Snowflake pipeline, regression and tree model ensembles, adjusted comparisons, and owner-reported findings of roughly 3–4× returns and 95% of measured return from accounts below 60% share. `roi-demo.js` provides fictional campaign inputs and revenue/spend arithmetic; it does not run the original models or estimate profit.
