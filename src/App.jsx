import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import SmoothScroll from './components/core/SmoothScroll';
import CustomCursor from './components/core/CustomCursor';
import Grain from './components/core/Grain';
import Preloader from './components/core/Preloader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import useScrollReveal from './hooks/useScrollReveal';

const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] } },
};

const Page = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  useScrollReveal();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/projects" element={<Page><Projects /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />

          <Route path="/JobFit" element={<Navigate to="https://hxndev.github.io/JobFit/" replace />} />
          <Route
            path="/JobFit/*"
            element={<Navigate to="https://hxndev.github.io/JobFit/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <BrowserRouter>
      <Preloader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <Grain />

      <SmoothScroll>
        <Navbar />
        <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
