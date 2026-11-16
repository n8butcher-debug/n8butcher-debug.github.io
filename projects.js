// Project summaries and artwork. Inline SVGs are concept illustrations; image assets are saved notebook outputs.
const visuals = {
  signals: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative signal traces"><rect width="700" height="400" fill="#e1e8f6"/><defs><pattern id="sg" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#c8d2e8" stroke-width=".6"/></pattern></defs><rect width="700" height="400" fill="url(#sg)"/><g fill="none" stroke-linejoin="round"><path d="M60 210L95 210 110 190 120 240 140 110 152 290 169 172 182 219 200 200 230 205 250 190 265 235 279 160 294 260 309 185 329 215 350 200 375 203 391 198 405 210 419 190 435 220 450 195 466 205 490 200 640 200" stroke="#8d9dbb" stroke-width="1.5"/><path d="M60 205C120 205 120 150 160 150S200 265 240 265 290 170 330 170 380 225 420 225 460 190 500 190 570 205 640 205" stroke="#2849dc" stroke-width="3"/></g><g font-family="Arial, sans-serif" font-size="9" fill="#657492"><text x="60" y="335">00:00</text><text x="330" y="335">Time</text><text x="604" y="335">00:60</text><text x="60" y="65">Input / response</text><text x="522" y="65">Synthetic signal</text></g><circle cx="330" cy="170" r="6" fill="#2849dc" stroke="#e1e8f6" stroke-width="3"/></svg>`,
  structure: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative search network"><rect width="700" height="400" fill="#dce5f5"/><g stroke="#9eafd0" stroke-width="2" fill="none"><path d="M100 240 220 115 340 205 470 100 600 190 490 300 340 205 240 310 100 240M220 115 240 310M220 115 470 100M240 310 490 300M340 205 600 190"/></g><g stroke="#2849dc" stroke-width="3" fill="none"><path d="M100 240 220 115 340 205 600 190" stroke-dasharray="6 5"/></g><g fill="#f9fbff" stroke="#6e86b5" stroke-width="2"><circle cx="100" cy="240" r="17"/><circle cx="220" cy="115" r="17"/><circle cx="340" cy="205" r="17"/><circle cx="470" cy="100" r="17"/><circle cx="600" cy="190" r="17"/><circle cx="490" cy="300" r="17"/><circle cx="240" cy="310" r="17"/></g><g font-family="Arial,sans-serif" font-size="12" text-anchor="middle" fill="#526a92"><text x="100" y="245">A</text><text x="220" y="120">B</text><text x="340" y="210">C</text><text x="470" y="105">D</text><text x="600" y="195">E</text><text x="490" y="305">F</text><text x="240" y="315">G</text></g><g font-family="Arial,sans-serif" font-size="10" fill="#657492"><text x="40" y="55">Generated network concept</text><text x="40" y="365">Illustrative connections only</text></g></svg>`,
  thermal: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decorative classification matrix, not computed results"><rect width="700" height="400" fill="#e5e3ed"/><g transform="translate(234 63)"><g fill="#d5d9ee"><rect x="0" y="0" width="55" height="55" rx="3"/><rect x="60" y="60" width="55" height="55" rx="3"/><rect x="120" y="120" width="55" height="55" rx="3"/><rect x="180" y="180" width="55" height="55" rx="3"/></g><g fill="#798cce"><rect x="0" y="0" width="55" height="55" rx="3"/><rect x="60" y="60" width="55" height="55" rx="3"/><rect x="120" y="120" width="55" height="55" rx="3"/><rect x="180" y="180" width="55" height="55" rx="3"/></g><g fill="#c9cbe1"><rect x="60" y="0" width="55" height="55" rx="3"/><rect x="120" y="0" width="55" height="55" rx="3"/><rect x="180" y="0" width="55" height="55" rx="3"/><rect x="0" y="60" width="55" height="55" rx="3"/><rect x="120" y="60" width="55" height="55" rx="3"/><rect x="180" y="60" width="55" height="55" rx="3"/><rect x="0" y="120" width="55" height="55" rx="3"/><rect x="60" y="120" width="55" height="55" rx="3"/><rect x="180" y="120" width="55" height="55" rx="3"/><rect x="0" y="180" width="55" height="55" rx="3"/><rect x="60" y="180" width="55" height="55" rx="3"/><rect x="120" y="180" width="55" height="55" rx="3"/></g><g font-family="Arial,sans-serif" font-size="11" fill="#657492" text-anchor="middle"><text x="27" y="258">A</text><text x="87" y="258">B</text><text x="147" y="258">C</text><text x="207" y="258">D</text><text x="-17" y="32">A</text><text x="-17" y="92">B</text><text x="-17" y="152">C</text><text x="-17" y="212">D</text></g></g><g font-family="Arial,sans-serif" font-size="10" fill="#657492"><text x="40" y="45">Classification concept</text><text x="40" y="365">Decorative matrix / no model results</text></g></svg>`,
  data: `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative content workflow"><rect width="700" height="400" fill="#e2e9f6"/><g stroke="#a8b9d8" stroke-width="1.5" fill="none"><path d="M155 202H220M290 202H355M425 202H490"/><path d="m211 197 9 5-9 5m135-10 9 5-9 5m135-10 9 5-9 5"/></g><g fill="#f9fbff" stroke="#c4d2e9"><rect x="65" y="145" width="90" height="114" rx="7"/><rect x="220" y="145" width="90" height="114" rx="7"/><rect x="375" y="145" width="90" height="114" rx="7"/><rect x="530" y="145" width="90" height="114" rx="7"/></g><g stroke="#a5b7d9" stroke-width="3"><path d="M84 168h48m-48 12h39m-39 12h46M239 168h48m-48 12h39m-39 12h46M394 168h48m-48 12h39m-39 12h46M549 168h48m-48 12h39m-39 12h46"/></g><g fill="#2849dc"><circle cx="132" cy="236" r="7"/><circle cx="287" cy="236" r="7"/><circle cx="442" cy="236" r="7"/><circle cx="597" cy="236" r="7"/></g><g font-family="Arial,sans-serif" fill="#536b93" font-size="12" text-anchor="middle"><text x="110" y="290">Sample input</text><text x="265" y="290">Draft</text><text x="420" y="290">Checks</text><text x="575" y="290">Human review</text></g><g font-family="Arial,sans-serif" font-size="10" fill="#657492"><text x="40" y="55">Illustrative content workflow</text><text x="40" y="365">Illustration only / no internal content</text></g></svg>`
};

// Academic entries use published notebooks. Work illustrations use synthetic records.
visuals.composerCover = `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Stylized piano-roll diagram illustrating music as model inputs"><rect width="700" height="400" fill="#dce5f5"/><defs><pattern id="notesgrid" width="35" height="23" patternUnits="userSpaceOnUse"><path d="M35 0H0V23" stroke="#bdcce5" fill="none" stroke-width=".6"/></pattern></defs><rect x="124" y="85" width="498" height="235" fill="url(#notesgrid)"/><g stroke="#9db0d0" fill="none"><path d="M124 85V320H622"/></g><g fill="#8fa8d0"><path d="M134 260h55v12h-55ZM194 237h40v12h-40ZM243 214h65v12h-65ZM318 191h40v12h-40ZM366 168h55v12h-55ZM431 191h40v12h-40ZM480 214h60v12h-60ZM548 191h48v12h-48Z"/></g><g fill="#2849dc"><path d="M140 191h33v12h-33ZM183 168h54v12h-54ZM246 145h33v12h-33ZM289 168h49v12h-49ZM347 145h38v12h-38ZM394 122h54v12h-54ZM458 145h38v12h-38ZM506 168h30v12h-30ZM547 145h56v12h-56Z"/></g><g fill="#f7faff" stroke="#acbfdd"><rect x="76" y="85" width="40" height="23"/><rect x="76" y="108" width="40" height="23"/><rect x="76" y="131" width="40" height="23"/><rect x="76" y="154" width="40" height="23"/><rect x="76" y="177" width="40" height="23"/><rect x="76" y="200" width="40" height="23"/><rect x="76" y="223" width="40" height="23"/><rect x="76" y="246" width="40" height="23"/><rect x="76" y="269" width="40" height="23"/><rect x="76" y="292" width="40" height="28"/></g><g fill="#657ea9"><path d="M76 101h24v13H76ZM76 124h24v13H76ZM76 170h24v13H76ZM76 193h24v13H76ZM76 216h24v13H76ZM76 262h24v13H76ZM76 285h24v13H76Z"/></g><g font-family="Arial,sans-serif" font-size="10" fill="#657492"><text x="76" y="53">Music as model inputs</text><text x="351" y="351">Time</text><text transform="translate(48 219) rotate(-90)">Pitch</text></g></svg>`;
visuals.advertisingCover = `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrative ad-click classification diagram"><rect width="700" height="400" fill="#e1e8f6"/><defs><pattern id="clickgrid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" fill="none" stroke="#c6d2e7" stroke-width=".6"/></pattern></defs><rect x="90" y="85" width="520" height="230" fill="url(#clickgrid)"/><path d="M90 290C210 300 230 190 335 200S470 135 610 100" fill="none" stroke="#2849dc" stroke-width="2.5"/><path d="M90 310C210 320 230 210 335 220S470 155 610 120" fill="none" stroke="#a3b4d5"/><g fill="#2849dc"><circle cx="138" cy="251" r="5"/><circle cx="179" cy="212" r="5"/><circle cx="221" cy="233" r="5"/><circle cx="245" cy="172" r="5"/><circle cx="290" cy="141" r="5"/><circle cx="328" cy="177" r="5"/><circle cx="377" cy="152" r="5"/><circle cx="413" cy="110" r="5"/><circle cx="465" cy="120" r="5"/><circle cx="515" cy="99" r="5"/><circle cx="559" cy="91" r="5"/></g><g fill="#91a8ce"><circle cx="142" cy="308" r="5"/><circle cx="211" cy="283" r="5"/><circle cx="255" cy="274" r="5"/><circle cx="307" cy="252" r="5"/><circle cx="347" cy="289" r="5"/><circle cx="389" cy="235" r="5"/><circle cx="438" cy="260" r="5"/><circle cx="473" cy="204" r="5"/><circle cx="514" cy="242" r="5"/><circle cx="555" cy="186" r="5"/><circle cx="591" cy="219" r="5"/></g><g font-family="Arial,sans-serif" font-size="10" fill="#657492"><text x="90" y="53">Click prediction</text><text x="90" y="350">Illustrative feature space</text></g></svg>`;
visuals.plantCover = `<svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of a leaf image passing through CNN features to species predictions"><rect width="700" height="400" fill="#dce5f5"/><path d="M114 283C60 212 94 126 207 97 236 202 210 280 114 283Z" fill="#bccde8" stroke="#718dbb" stroke-width="1.5"/><g stroke="#718dbb" fill="none" stroke-width="1.3"><path d="M101 310 190 123M125 263l-28-31M139 233l-34-43M152 205l-22-44M126 263l55-9M139 233l62-13M153 204l51-11"/></g><g fill="none" stroke="#9fb4d6"><path d="M239 205H296M444 205H490M286 198l10 7-10 7M480 198l10 7-10 7"/></g><g fill="#f1f5fd" stroke="#a8bcdd"><rect x="311" y="132" width="95" height="119" rx="3"/><rect x="322" y="143" width="95" height="119" rx="3"/><rect x="333" y="154" width="95" height="119" rx="3"/></g><g fill="#b6c8e5"><path d="M346 168h19v19h-19ZM370 168h19v19h-19ZM394 168h19v19h-19ZM346 192h19v19h-19ZM394 192h19v19h-19ZM346 216h19v19h-19ZM370 216h19v19h-19ZM394 216h19v19h-19ZM370 240h19v19h-19Z"/></g><g fill="#2849dc"><path d="M370 192h19v19h-19ZM346 240h19v19h-19Z"/><rect x="514" y="153" width="84" height="15" rx="2"/></g><g fill="#9bb2d7"><rect x="514" y="183" width="51" height="15" rx="2"/><rect x="514" y="213" width="31" height="15" rx="2"/><rect x="514" y="243" width="17" height="15" rx="2"/></g><g font-family="Arial,sans-serif" font-size="10" fill="#657492"><text x="91" y="53">From image to classification</text><text x="118" y="347">Leaf image</text><text x="330" y="347">CNN features</text><text x="518" y="347">Species</text></g></svg>`;

const projects = [
  {
    "id": "composer-classification",
    "title": "Deep Learning for Music Composer Prediction",
    "category": "school",
    "kind": "Academic",
    "featured": true,
    "tags": [
      "MIDI feature extraction",
      "Piece-level splits",
      "LSTM / CNN inputs"
    ],
    "image": "assets/composer-piano-rolls.png",
    "imageAlt": "Saved notebook figure showing piano-roll inputs for Bach, Beethoven, Chopin, and Mozart.",
    "imageCaption": "Sample piano-roll inputs from the published notebook.",
    "description": "A data pipeline for predicting Bach, Beethoven, Chopin, and Mozart from MIDI music, using note sequences and piano-roll images.",
    "repo": "https://github.com/n8butcher-debug/aai511-composer-classification",
    "sections": [
      [
        "Goal",
        "Predict the composer of a classical MIDI score using an LSTM for note sequences and a CNN for piano-roll images."
      ],
      [
        "Completed pipeline",
        "The notebook parses 1,653 MIDI pieces, splits them by piece before segmentation, and builds 100-note sequences and 88-key piano rolls. Pitch transposition augments the under-represented Chopin training examples."
      ],
      [
        "Current stage",
        "Data collection, preparation, and feature extraction have saved outputs. LSTM/CNN model construction, training, and final evaluation remain a roadmap in the published notebook."
      ]
    ],
    "provenance": "The published notebook includes the preparation pipeline and saved feature outputs.",
    "thumbnail": "composerCover",
    "outcome": {
      "headline": "1,653 MIDI pieces prepared",
      "detail": "Two input formats for four composers. Model training is next."
    }
  },
  {
    "id": "ad-click-prediction",
    "title": "Neural Networks for Ad-Click Prediction",
    "category": "school",
    "kind": "Academic",
    "tags": [
      "TensorFlow",
      "Classification",
      "Model comparison"
    ],
    "image": "assets/ad-click-features.png",
    "imageAlt": "Saved feature importance chart showing daily internet usage and time on site as the strongest features in this notebook.",
    "imageCaption": "Permutation feature importance from the saved notebook run.",
    "description": "Neural-network classifiers compared with logistic regression and a random forest on 1,000 advertising records.",
    "repo": "https://github.com/n8butcher-debug/NN-for-Advertising-Data",
    "sections": [
      [
        "Goal",
        "Can browsing and visitor attributes help predict an ad click? The dataset has 1,000 rows, with an equal balance of clicks and non-clicks."
      ],
      [
        "Method",
        "The notebook creates eight input features, uses a stratified 80/20 train/test split, and fits scaling on the training rows. Three neural-network configurations are compared with logistic regression and a random forest."
      ],
      [
        "Results",
        "The selected ANN reaches 97% accuracy and 0.9927 ROC AUC on 200 test rows. Logistic regression reaches 98% accuracy, so the neural network does not outperform the simpler model on this split."
      ],
      [
        "Evaluation limits",
        "Several configurations are compared on the same test split. A separate model-selection process and a fresh holdout would give a stronger estimate of generalization."
      ]
    ],
    "provenance": "Results and the feature-importance figure are saved outputs in the linked notebook.",
    "thumbnail": "advertisingCover",
    "outcome": {
      "headline": "97% neural-network test accuracy",
      "detail": "200 test records; logistic regression reached 98%."
    }
  },
  {
    "id": "sales-dashboard",
    "title": "Snowflake Sales Engagement Dashboard",
    "category": "work",
    "kind": "Work project",
    "tags": [
      "Snowflake",
      "Data streams",
      "API integration"
    ],
    "image": "assets/sales-dashboard.svg",
    "imageAlt": "Separate account, doctor, and channel data flowing through Snowflake and an API into a sales dashboard.",
    "description": "Streamed separate data sources into Snowflake and built an API-fed dashboard for account, doctor, channel, and asset activity.",
    "outcome": {
      "headline": "Used by 100 sales reps",
      "detail": "Each rep can explore their accounts and the engagement behind them."
    },
    "demo": "sales",
    "sections": [
      [
        "Data integration",
        "I connected separate data sources through data streams into Snowflake, bringing account information, doctor records, channel exposure, interactions, and asset details into a common data layer."
      ],
      [
        "API and account access",
        "The dashboard calls an API to retrieve the data from Snowflake. Reps sign in, see their accounts, and open an account to inspect its doctors and engagement history."
      ],
      [
        "What the account view reveals",
        "The dashboard brings together who was reached, which channels they encountered, what they interacted with, and the assets involved. Reps can review that history at the account and doctor level."
      ],
      [
        "My role and delivery",
        "I built the full solution: data connections, Snowflake integration, API integration, and dashboard. It is used by 100 sales reps."
      ]
    ],
    "provenance": "The interactive illustration uses fictional reps, accounts, doctors, and activity. It illustrates the workflow locally without connecting to employer systems."
  },
  {
    "id": "leaf-classification",
    "title": "Convolutional Neural Networks for Plant Classification",
    "category": "school",
    "kind": "Academic",
    "tags": [
      "Computer vision",
      "CNN",
      "Error analysis"
    ],
    "image": "assets/flavia-leaves.png",
    "imageAlt": "Sample leaf images and plant-species labels from the saved Flavia classification notebook.",
    "imageCaption": "Dataset samples displayed in the published notebook.",
    "description": "A convolutional neural network trained to identify 32 plant species from leaf images, with an analysis of the classes it confuses.",
    "repo": "https://github.com/n8butcher-debug/Flavia-Plant-Image-Classification-CNN",
    "sections": [
      [
        "Goal",
        "Can a convolutional neural network distinguish 32 plant species using leaf images from the Flavia dataset?"
      ],
      [
        "Method",
        "Images are resized to 128 × 128, converted to grayscale, and normalized. A stratified 70/15/15 split separates training, validation, and test data. Training uses light augmentation, early stopping, and learning-rate reduction."
      ],
      [
        "Results",
        "The notebook reports 255 correct predictions from 287 test images: 88.85% accuracy and a macro F1 score of 0.8835. The best validation accuracy is 89.16%."
      ],
      [
        "Errors",
        "Chinese cinnamon has only 25% recall in the saved analysis. More examples or targeted augmentation for weaker classes would be useful follow-up work; the results apply to this dataset and split."
      ]
    ],
    "provenance": "Results and leaf images are saved outputs in the linked notebook.",
    "thumbnail": "plantCover",
    "outcome": {
      "headline": "88.85% test accuracy",
      "detail": "255 of 287 leaf images classified correctly across 32 species."
    }
  },
  {
    "id": "campaign-roi",
    "title": "Machine Learning for Campaign ROI Analysis",
    "category": "work",
    "kind": "Work project",
    "tags": [
      "Snowflake",
      "Model ensembles",
      "Adjusted comparisons"
    ],
    "image": "assets/campaign-roi.svg",
    "imageAlt": "Marketing and revenue data connected to an ensemble of models, with campaign returns and account-share findings.",
    "demo": "roi",
    "description": "Used marketing and revenue data from my Snowflake pipeline to estimate campaign returns and prioritize campaign spending.",
    "outcome": {
      "headline": "95% of measured return from accounts below 60% share",
      "detail": "The findings supported more marketing funding and a change in audience allocation."
    },
    "sections": [
      [
        "Data and features",
        "I reused the Snowflake pipeline I built to connect marketing activity with revenue data. Views, clicks, web visits, and other engagement metrics became features for revenue prediction and campaign return analysis."
      ],
      [
        "Models and adjusted analyses",
        "I combined tree-based models with simpler regressions in an ensemble. Alongside the predictive models, I ran difference-based analyses with adjustments for seasonality, number of doctors, account size, and other account characteristics."
      ],
      [
        "What the analysis found",
        "The best campaigns showed roughly 30–40× returns, suggesting we were underspending. Although the strategy had emphasized high-revenue accounts, around 95% of measured return came from accounts with less than 60% share."
      ],
      [
        "How it changed decisions",
        "Campaign-level measurement had previously been difficult, and resource allocation relied heavily on judgment. The analysis supported a larger marketing budget and helped redirect advertising spend toward account segments with more room to grow."
      ]
    ],
    "provenance": "Project scope and findings are described by the portfolio owner."
  },
  {
    "id": "headline-prediction",
    "title": "Machine Learning for Email and Search Headlines",
    "category": "work",
    "kind": "Work project",
    "tags": [
      "Text features",
      "Rate prediction",
      "Interactive feedback"
    ],
    "image": "assets/copy-prediction.svg",
    "imageAlt": "Draft email and search copy linked to rate predictions.",
    "demo": "copy",
    "description": "Built an app that predicts email open rates and search click rates from draft copy, with feedback that updates as marketers edit.",
    "outcome": {
      "headline": "Feedback before a campaign goes live",
      "detail": "Marketers could revise a line and immediately see the updated rate estimate and copy feedback."
    },
    "sections": [
      [
        "Historical campaign data",
        "The app used historical email subject lines and email metadata to predict open rates. A corresponding workflow used Google Search headlines and click-rate data."
      ],
      [
        "Features used",
        "Inputs included the words used, line length, branded terms, numbers, time of day, and day of the week. These combined characteristics of the copy with the context in which it would run."
      ],
      [
        "The marketer workflow",
        "A marketer could type a draft, get a predicted rate, and adjust the wording in real time. Feedback highlighted what looked useful or problematic so they could refine the line before launch."
      ],
      [
        "Email and search",
        "The email workflow predicted open rate; the search-headline workflow predicted click rate. Both put the estimate and feedback beside the editable copy so marketers could compare revisions immediately."
      ]
    ],
    "provenance": "The public demo uses synthetic examples and illustrative scoring to show the editing workflow."
  }
];
