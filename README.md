# omar_faruk.portfolio

Personal portfolio site — built with a terminal/HUD aesthetic using React, Framer Motion, and Lenis smooth scroll.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Smooth scroll | Lenis |
| Fonts | Fraunces, Newsreader, JetBrains Mono |

## Features

- **Boot sequence** — skippable terminal intro on first visit (sessionStorage gated)
- **Matrix rain background** — canvas-based katakana/digit rain, DPR-capped for performance
- **HUD overlay** — fixed corner brackets, live clock, scroll %, section tracker
- **Hero** — typewriter name + subtitle, status badges, live clock panel, résumé download
- **Selected works** — scroll-driven sticky project viewer with modal detail view (problem / solution / impact / features / telemetry)
- **Experience** — timeline with role details
- **Contact** — mail channels + presence nodes
- **Perf** — memoized page content, MotionValue-driven scroll bar (no React re-renders on scroll), no CSS `filter: blur()` on scroll-composited layers

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── assets/          # Icons, images
├── components/
│   ├── hud/         # BootSequence, MatrixRain, HUDOverlay, SideRails, BracketFrame, GlitchText
│   ├── Hero.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Contact.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── data/
│   └── projects.js  # Project definitions
├── App.jsx
└── index.css        # Tailwind v4 theme + custom keyframes
public/
└── Resume.pdf
```
