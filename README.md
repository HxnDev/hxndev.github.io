# Hassan Shahzad — Portfolio

A cinematic, scroll-driven portfolio built to prove a point: that an engineer can also design and ship an award-grade interface. The homepage isn't a stack of sections — it's a single pinned 3D world you scroll *through*, rendered with a hand-written GLSL shader and React Three Fiber.

Live: **[https://hxndev.github.io/](https://hxndev.github.io/)**

## Highlights

- **Scroll-driven 3D hero.** One persistent crystal whose camera dolly, drift, scale, rotation, and surface morph are all driven directly by scroll progress (GSAP ScrollTrigger → R3F render loop). Text "acts" reveal *inside* the same world.
- **Hand-written GLSL.** A custom aurora backdrop shader (domain-warped fractal noise) — no Spline, no shader libraries — that reacts to the cursor and refracts through the glass.
- **"Aurora Noir" design system.** Deep near-black canvas with an electric-cyan primary and a warm-amber accent. Cyan + amber sit on the blue–yellow axis, the most colorblind-safe high-contrast pairing, so hierarchy reads through luminance *and* hue.
- **Buttery motion.** Lenis momentum scrolling synced to GSAP, a magnetic custom cursor, and Framer Motion reveals.
- **Performance-conscious.** Device-tiered 3D quality, clamped DPR, off-screen render pausing, lazy-loaded routes, and full `prefers-reduced-motion` support.

## Tech Stack

- **React 18** + **Vite** — fast SPA tooling and HMR.
- **React Router 7** — client-side routing with lazy-loaded pages.
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — declarative 3D.
- **@react-three/postprocessing** — bloom and post effects.
- **Custom GLSL** — the aurora backdrop fragment shader.
- **GSAP (ScrollTrigger)** + **Lenis** — scroll choreography and smooth scrolling.
- **Framer Motion** — UI transitions and staggered reveals.
- **Tabler Icons** — iconography.
- **ESLint** + **Prettier** — code quality and formatting.
- **GitHub Actions** + **GitHub Pages** — CI/CD and hosting.

## Getting Started

```bash
# Clone
git clone https://github.com/HxnDev/hxndev.github.io.git
cd hxndev.github.io

# Install
npm install

# Develop (http://localhost:3000)
npm run dev

# Production build → ./dist
npm run build

# Preview the production build
npm run preview
```

### Quality checks

```bash
npm run lint          # ESLint
npm run format        # Prettier (write)
npm run format:check  # Prettier (check)
npm run check         # lint + format check
```

## Project Structure

```
hxndev.github.io/
├── .github/workflows/        # CI/CD (build + deploy to gh-pages)
├── public/                   # Static assets (images, resume, project media)
├── src/
│   ├── components/
│   │   ├── common/           # Marquee and shared bits
│   │   ├── core/             # Cursor, SmoothScroll, Preloader, Grain, Magnetic
│   │   ├── home/             # CinematicStage (the scroll-driven hero)
│   │   ├── layout/           # Navbar, Footer
│   │   ├── projects/         # ProjectCard, ProjectModal
│   │   ├── three/            # CinematicScene, AuroraBackdrop (GLSL)
│   │   └── utils/            # Asset path helpers
│   ├── data/                 # profile, skills, experience, certifications,
│   │                         #   recommendations, projects.json
│   ├── hooks/                # useGetProjects, useScrollReveal
│   ├── pages/                # Home, Projects, About, Certifications,
│   │                         #   Recommendations, Contact
│   ├── styles/               # global.css (design tokens), ui.css
│   ├── App.jsx               # Routing + global layout
│   └── main.jsx              # Entry point
├── index.html
├── vite.config.js
└── README.md
```

## Architecture Notes

- **Cinematic flow.** `CinematicStage.jsx` owns a tall scroll region with a `position: sticky` viewport. A single `ScrollTrigger` writes scroll progress (0→1) into a ref that `CinematicScene.jsx` reads every frame to animate the camera and crystal, and derives the active text act from. This keeps per-frame work off the React render path.
- **Data-driven content.** All résumé content (experience, skills, certifications, recommendations, stats) lives in small modules under `src/data/`, so updating the site is a content edit, not a code change.
- **Accessibility.** Honors reduced-motion (disables smooth scroll, freezes shader time, drops heavy 3D), keyboard-navigable, and built on a colorblind-safe palette.

## Deployment

Every push to `main` triggers a GitHub Actions workflow that builds the app and publishes `dist/` to the `gh-pages` branch. See `.github/workflows/`.

## License

Distributed under the MIT License. See `LICENSE` for details.

## Contact

**Hassan Shahzad** — Senior Full-Stack Engineer (Geneva, CH)

- Email: [hassanshahzad.dev@gmail.com](mailto:hassanshahzad.dev@gmail.com)
- LinkedIn: [hassan-shahzad-2a6617212](https://www.linkedin.com/in/hassan-shahzad-2a6617212/)
- GitHub: [HxnDev](https://github.com/HxnDev)
- Portfolio: [https://hxndev.github.io/](https://hxndev.github.io/)
