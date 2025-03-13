# Hassan Shahzad | Portfolio Website

Welcome to my portfolio website repository! This project showcases my work, skills, and experiences with a modern, responsive design built using React, Vite, and Mantine UI. The website is automatically deployed on GitHub Pages at [https://hxndev.github.io/](https://hxndev.github.io/).

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Performance Optimizations](#performance-optimizations)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Demo

Visit the live website: [https://hxndev.github.io/](https://hxndev.github.io/)

Notable projects:
- [JobFit - AI Job Matching Platform](https://hxndev.github.io/JobFit/) - Live demo available!

## Features

- **Responsive Design:** Adapts seamlessly to mobile, tablet, and desktop screens.
- **Project Showcase:** Explore detailed project pages with filtering options by category.
- **Smooth Animations:** Enjoy dynamic transitions powered by GSAP with performance optimization.
- **Modern UI:** Crafted with Mantine UI and Tabler Icons for a sleek look.
- **Dark/Light Theme:** Toggle between dark and light modes for comfortable viewing.
- **Optimized Performance:** Built with Vite for lightning-fast builds and performance.
- **Automated Deployment:** GitHub Actions ensure your changes are live as soon as you push to the main branch.
- **Quantum-Inspired Design:** Custom color system based on dynamic interactions.

## Technologies

- **React 18:** For building interactive user interfaces.
- **Vite:** A modern build tool for fast development.
- **React Router 7:** For seamless client-side routing.
- **Mantine UI 7:** For a robust and stylish component library.
- **GSAP:** For creating smooth, high-performance animations.
- **GitHub Actions:** Automating CI/CD and deployments.
- **GitHub Pages:** Hosting the live website.
- **ESLint/Prettier:** For code quality and consistent formatting.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HxnDev/hxndev.github.io.git
   cd hxndev.github.io
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

### Development

Start the development server with hot reloading:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Production Build

Generate an optimized production build:

```bash
npm run build
```

The build output will be located in the `dist` directory.

### Preview the Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting and Formatting

```bash
# Check formatting
npm run format:check

# Fix formatting issues
npm run format

# Check for linting issues
npm run lint

# Run all checks
npm run check
```

## Deployment

This project is configured for automated deployment using GitHub Actions. Every push to the `main` branch triggers a build and deploys the `dist` folder to the `gh-pages` branch.

**Live Website:** [https://hxndev.github.io/](https://hxndev.github.io/)

The deployment workflow is defined in `.github/workflows/deploy.yml`.

## Project Structure

```
hxndev.github.io/
├── .github/workflows/    # GitHub Actions workflow for deployment
├── public/               # Public assets and static files
├── src/
│   ├── animations/       # Animation configurations and utilities
│   ├── components/       # Reusable React components
│   │   ├── about/        # About page components
│   │   ├── common/       # Shared components
│   │   ├── contact/      # Contact page components
│   │   ├── home/         # Home page components
│   │   ├── projects/     # Project components
│   │   └── utils/        # Component utilities
│   ├── context/          # React context providers
│   ├── data/             # Static data (projects.json)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── styles/           # Global styles and effects
│   ├── theme/            # Theme configuration
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point for React
├── index.html            # HTML template
├── package.json          # Project configuration
├── vite.config.js        # Vite configuration
├── .eslintrc.cjs         # ESLint configuration
├── .prettierrc           # Prettier configuration
└── README.md             # This file
```

## Performance Optimizations

This portfolio includes several performance optimizations:

- **Code Splitting:** Lazy loading of page components.
- **Asset Preloading:** Critical assets are preloaded for faster initial rendering.
- **Reduced Motion Support:** Respects user preferences for reduced motion.
- **Responsive Images:** Optimized images with fallbacks.
- **GSAP Animations:** Optimized animations with hardware acceleration.
- **Adaptive Features:** Adjusts features based on device capabilities.

## Accessibility

The portfolio is built with accessibility in mind:

- **Semantic HTML:** Proper HTML structure for better screen reader support.
- **Keyboard Navigation:** All interactive elements are keyboard-accessible.
- **Color Contrast:** Meets WCAG 2.1 guidelines for color contrast.
- **Reduced Motion:** Respects user preferences for reduced motion.
- **Focus Management:** Proper focus handling for navigation.

## Contributing

Contributions, issues, and feature requests are welcome!  
Please check the [issues page](https://github.com/HxnDev/hxndev.github.io/issues) for ideas or open a new issue if you have a suggestion.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

**Hassan Shahzad**  
Email: [hassanshahzad.dev@gmail.com](mailto:hassanshahzad.dev@gmail.com)  
LinkedIn: [hassan-shahzad-2a6617212](https://www.linkedin.com/in/hassan-shahzad-2a6617212/)  
GitHub: [HxnDev](https://github.com/HxnDev)  
Portfolio: [https://hxndev.github.io/](https://hxndev.github.io/)
