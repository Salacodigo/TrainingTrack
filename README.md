# TrainingTrack
MVP to track physical activity: build a routine, log the reps of each exercise and follow your progress over time.

[ link to project ](https://salacodigo.github.io/TrainingTrack/src/)

## Features

- **4-step flow** with a progress tracker: Perfil → Rutina → Entrenar → Resultados.
- **Routine builder**: add exercises; they appear as chips.
- **Rep counter**: each exercise has big −/+ buttons and a numeric keyboard on mobile.
- **Results dashboard**:
  - Summary cards: sessions, total reps, best session and progress (last vs. first session).
  - Trend chart of reps per session for the selected exercise.
  - Session history, newest first.
- **Filters**: by exercise and by date range (**Desde / Hasta**). Both dates are optional and inclusive;
  the cards, chart and history all follow the filters.
- Data is saved in the browser (`localStorage`), per user name.

## Getting started

No build step is needed to run the app: it uses native ES modules and loads JSCharting from its CDN.

```bash
npm install          # dev tooling only (Sass)
npm start            # serves src/ at http://localhost:8080
npm test             # unit tests (Node built-in test runner)
npm run build:css    # compiles src/styles/scss into src/styles/css/index.css
```

Requires Node 20+ (for `node --test`) and Python 3 for `npm start` (any static server works).
After editing any `.scss` file, run `npm run build:css` and commit the generated CSS: GitHub Pages serves it as is.

## Dependencies

| Dependency | Version | Use |
|---|---|---|
| [JSCharting](https://jscharting.com/) | 3.4.0 (CDN) | Results chart |
| [Barlow / Barlow Condensed](https://fonts.google.com/specimen/Barlow) | Google Fonts | Body and heading fonts |
| [Sass](https://sass-lang.com/) | ^1.107.1 (dev) | Compiles the styles |

## Architecture

```
src/js/
├── index.js            # Entry point: creates the views and connects them with callbacks
├── views/              # One module per screen; owns its DOM container and events
│   ├── userView.js
│   ├── exerciseView.js
│   ├── trackingView.js
│   └── resultsView.js
├── components/         # Reusable UI pieces; receive data/callbacks, never read global state
│   ├── DateRangeFilter.js
│   ├── SelectField.js
│   ├── NumberField.js  # −/+ stepper
│   ├── ItemList.js
│   ├── StatCards.js
│   ├── StepIndicator.js
│   ├── SessionHistory.js
│   └── ExerciseChart.js
├── domain/             # Pure logic (no DOM, no libraries), fully unit tested
│   ├── dateRange.js
│   └── exerciseSeries.js
├── state/
│   └── sessionStore.js # Current session + saved history (single source of truth)
├── services/
│   └── storage.js      # The only module that touches localStorage
└── utils/
    └── dom.js          # createElement, show/hide, clear helpers

src/styles/scss/
├── index.scss          # @use entry point
├── base/_tokens.scss   # Design tokens (colors, fonts, spacing, radius) as CSS variables
├── base/_base.scss     # Reset, typography, focus ring, reduced motion
└── components/         # One partial per UI block: layout, steps, card, forms, buttons, tracking, results
```

Dependency direction: `views → components / state / domain`, `state → services`, `components → utils`.
Views never import each other, so a screen can be added, removed or reordered by changing only `index.js`.

Rules for new code:

- **New UI piece?** Add a component that takes its data and callbacks as arguments
  (see `createDateRangeFilter({ onChange })`) so it can be reused in any view.
- **New calculation?** Put it in `domain/` as a pure function and add a test in `test/`.
- **New persistence (e.g. a real database, item 8)?** Replace `services/storage.js`; nothing else changes.
- **New style?** Use the tokens in `base/_tokens.scss`, never raw colors or sizes.
- Text from the user is written with `textContent`, never `innerHTML`.

## Design

The visual direction was generated with the `ui-ux-pro-max` skill for a fitness tracker:

- **Style:** vibrant and block-based, dark slate background.
- **Colors:** energy orange `#F97316` (primary) and success green `#22C55E` (finish actions and rep badges).
- **Type:** Barlow Condensed for headings, Barlow for body text.
- **Accessibility:** text contrast of at least 4.5:1, visible labels on every field, 48px touch targets,
  a visible focus ring, and `prefers-reduced-motion` respected.

## Tests

22 unit tests in `test/` cover the date range filter, the chart series and summary, and the session store
(with an in-memory `localStorage`). Run them with `npm test`.

## Roadmap

```
1  [✓] - Make a function to create exercises
2  [✓] - Make a function to assign a number of reps to one of the exercises
     2.1 [✓] - Verify the existence of that exercise to update
3  [✓] - show the list of exercises with reps
4  [✓] - Use the same function of point 1, if the exercise exist,
    save the number of reps for each series
5  [✓] - add a complexity, using the date to save the data
6  [✓] - Make a filter to show results filtered by data
    6.1 [✓] - Make a filter with date's range
7  [✓] - Build the minimum acceptable HTML page
8  [ ] - Build a Database
9  [✓] - Exercises as a list
10 [✓] - Session Data presented in charts
11 [✓] - Historic Data presented in charts
12 [✓] - Present the chart based on the type of exercise. User can select the type of exercise
```
