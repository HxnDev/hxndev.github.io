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
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Demo

Visit the live website: [https://hxndev.github.io/](https://hxndev.github.io/)

## Features

- **Responsive Design:** Adapts seamlessly to mobile, tablet, and desktop screens.
- **Project Showcase:** Explore detailed project pages with filtering options.
- **Smooth Animations:** Enjoy dynamic transitions powered by GSAP.
- **Modern UI:** Crafted with Mantine UI and Tabler Icons for a sleek look.
- **Optimized Performance:** Built with Vite for lightning-fast builds and performance.
- **Automated Deployment:** GitHub Actions ensure your changes are live as soon as you push to the main branch.

## Technologies

- **React:** For building interactive user interfaces.
- **Vite:** A modern build tool for fast development.
- **React Router:** For seamless client-side routing.
- **Mantine UI:** For a robust and stylish component library.
- **GSAP:** For creating smooth, high-performance animations.
- **GitHub Actions:** Automating CI/CD and deployments.
- **GitHub Pages:** Hosting the live website.

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

## Deployment

This project is configured for automated deployment using GitHub Actions. Every push to the `main` branch triggers a build and deploys the `dist` folder to the `gh-pages` branch.

**Live Website:** [https://hxndev.github.io/](https://hxndev.github.io/)

## Project Structure

```
hxndev.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for deployment
├── public/                     # Public assets (if any)
├── src/
│   ├── assets/                 # Images and other assets
│   ├── components/             # Reusable React components
│   ├── context/                # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page components (e.g., Projects, About, Contact)
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Entry point for React
│   └── index.css               # Global styles
├── index.html                  # HTML template processed by Vite
├── package.json                # Project configuration and dependencies
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## Contributing

Contributions, issues, and feature requests are welcome!  
Please check the [issues page](https://github.com/HxnDev/hxndev.github.io/issues) for ideas or open a new issue if you have a suggestion.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

**Hassan Shahzad**  
Email: [hassanshahzad.dev@gmail.com](mailto:hassanshahzad.dev@gmail.com)  
Portfolio: [https://hxndev.github.io/](https://hxndev.github.io/)
