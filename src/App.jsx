import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AnimationProvider } from './context/AnimationContext';
import { Box, Container } from '@mantine/core';

// Utilities
import browserDetection from './components/utils/browserDetection';
import { preloadCriticalAssets } from './components/utils/assetPreloader';
import { applyPerformanceOptimizations } from './components/utils/animationOptimizer';
import { resolvePath } from './components/utils/paths';


// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/common/ParticleBackground';
import NavigationPulsar from './components/common/NavigationPulsar';
import LoadingScreen from './components/common/LoadingScreen';
import PageTransition from './components/common/PageTransition';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Create style elements directly in the App component
const inlineStyles = `
/* Basic animation keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Loading indicator animation */
.loading-dots::after {
  content: '...';
  display: inline-block;
  animation: ellipsis 1.5s infinite;
  width: 1.5em;
  text-align: left;
}

@keyframes ellipsis {
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
}
`;

function App() {
  // Loading state
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Initialize browser detection and feature detection
  useEffect(() => {
    // Apply browser and feature detection
    browserDetection.applyDetectionClasses();

    // Preload project data and critical assets
    Promise.all([
      // Preload project data
      import('./data/projects.json'),

      // Preload critical assets
      preloadCriticalAssets(progress => {
        setLoadingProgress(progress);
      }),
    ])
      .then(() => {
        // Slight delay to ensure smooth transition
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(() => {
        // Continue anyway after a timeout
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });

    // Performance optimizations based on device capabilities
    const performanceMetrics = {
      devicePerformance:
        browserDetection.detectFeatures().hardwareConcurrency > 4 ? 'high' : 'medium',
    };
    applyPerformanceOptimizations(performanceMetrics);
  }, []);

  return (
    <ThemeProvider>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <AnimationProvider>
        {/* Loading Screen */}
        {loading && (
          <LoadingScreen progress={loadingProgress} isComplete={loadingProgress >= 100} />
        )}

        <BrowserRouter>
          <ParticleBackground particleCount={50} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />

            <main style={{ flex: 1 }}>
              <PageTransition>
                <Suspense
                  fallback={
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '50vh',
                      }}
                    >
                      <div className="loading-dots">Loading page</div>
                    </Box>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={resolvePath('/')} element={<Home />} />
                    <Route path={resolvePath('/projects')} element={<Projects />} />
                    <Route path={resolvePath('/about')} element={<About />} />
                    <Route path={resolvePath('/contact')} element={<Contact />} />
                  </Routes>
                </Suspense>
              </PageTransition>
            </main>

            <Footer />
          </div>

          <NavigationPulsar />
        </BrowserRouter>
      </AnimationProvider>
    </ThemeProvider>
  );
}

export default App;
