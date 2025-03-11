import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AnimationProvider } from './context/AnimationContext';
import { Box, Container, Title, Tabs, Group, Text, Badge, Button } from '@mantine/core';

// Utilities
import browserDetection from './components/utils/browserDetection';
import { preloadCriticalAssets } from './components/utils/assetPreloader';
import { applyPerformanceOptimizations } from './components/utils/animationOptimizer';

// Create style elements directly in the App component
// This is a fallback in case the CSS files cannot be imported
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

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/common/ParticleBackground';
import NavigationPulsar from './components/common/NavigationPulsar';
import LoadingScreen from './components/common/LoadingScreen';
import PageTransition from './components/common/PageTransition';

// Lazy-loaded components
const ImageTestComponent = lazy(() => import('./components/ImageTestComponent'));
const EnhancedDebugLoader = lazy(() => import('./components/EnhancedDebugLoader'));

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  const [debugMode, setDebugMode] = useState(false);
  const [activeTab, setActiveTab] = useState('app');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showImageTest, setShowImageTest] = useState(false);
  
  // Loading state
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Initialize browser detection and feature detection
  useEffect(() => {
    // Apply browser and feature detection
    browserDetection.applyDetectionClasses();
    
    // Enable debug mode with URL parameter ?debug=true
    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    setDebugMode(debugParam === 'true');
    
    // Check for imageTest parameter
    const imageTestParam = urlParams.get('imageTest');
    setShowImageTest(imageTestParam === 'true');
    
    // Preload project data and critical assets
    Promise.all([
      // Preload project data
      import('./data/projects.json')
        .then(data => {
          console.log('Projects data preloaded:', data);
          setDataLoaded(true);
          return data;
        }),
      
      // Preload critical assets
      preloadCriticalAssets(progress => {
        setLoadingProgress(progress);
      })
    ])
    .then(() => {
      // Slight delay to ensure smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 500);
    })
    .catch(err => {
      console.error('Error during preloading:', err);
      // Continue anyway after a timeout
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
    
    // Performance optimizations based on device capabilities
    const performanceMetrics = {
      devicePerformance: browserDetection.detectFeatures().hardwareConcurrency > 4 ? 'high' : 'medium'
    };
    applyPerformanceOptimizations(performanceMetrics);
  }, []);
  
  return (
    <ThemeProvider>
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <AnimationProvider>
        {/* Loading Screen */}
        {loading && (
          <LoadingScreen 
            progress={loadingProgress} 
            isComplete={loadingProgress >= 100} 
          />
        )}
        
        <BrowserRouter>
          {/* Show the normal app or the debug view */}
          {(debugMode || showImageTest) ? (
            <Container size="lg" p="xl">
              <Title order={2} mb="xl">Portfolio Website Debug Mode</Title>
              
              <Group mb="xl">
                <Badge color="red" size="lg">Debug Mode Active</Badge>
                <Button 
                  size="sm" 
                  color="blue" 
                  onClick={() => window.location.search = ''}
                >
                  Exit Debug Mode
                </Button>
                
                <Button 
                  size="sm" 
                  color="green" 
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </Group>
              
              <Tabs value={activeTab} onChange={setActiveTab} mb="xl">
                <Tabs.List>
                  <Tabs.Tab value="app">Normal App</Tabs.Tab>
                  <Tabs.Tab value="debug">Debug Tools</Tabs.Tab>
                  {showImageTest && <Tabs.Tab value="imageTest">Image Test</Tabs.Tab>}
                </Tabs.List>
                
                <Tabs.Panel value="app" p="md">
                  <Text mb="xl">The normal app is rendered below:</Text>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    minHeight: '50vh',
                    border: '2px solid #6200EE',
                    borderRadius: '10px',
                    padding: '20px',
                    overflow: 'auto'
                  }}>
                    <Header />
                    
                    <main style={{ flex: 1 }}>
                      <Suspense fallback={<div className="loading-dots">Loading</div>}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/hxndev.github.io/" element={<Home />} />
                          <Route path="/hxndev.github.io/projects" element={<Projects />} />
                          <Route path="/hxndev.github.io/about" element={<About />} />
                          <Route path="/hxndev.github.io/contact" element={<Contact />} />
                        </Routes>
                      </Suspense>
                    </main>
                    
                    <Footer />
                  </div>
                </Tabs.Panel>
                
                <Tabs.Panel value="debug" p="md">
                  <Suspense fallback={<div className="loading-dots">Loading debug tools</div>}>
                    <EnhancedDebugLoader />
                  </Suspense>
                </Tabs.Panel>
                
                {showImageTest && (
                  <Tabs.Panel value="imageTest" p="md">
                    <Suspense fallback={<div className="loading-dots">Loading image test</div>}>
                      <ImageTestComponent />
                    </Suspense>
                  </Tabs.Panel>
                )}
              </Tabs>
            </Container>
          ) : (
            // Regular app
            <>
              <ParticleBackground particleCount={50} />
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh'
              }}>
                <Header />
                
                <main style={{ flex: 1 }}>
                  <PageTransition>
                    <Suspense fallback={
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '50vh'
                      }}>
                        <div className="loading-dots">Loading page</div>
                      </Box>
                    }>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hxndev.github.io/" element={<Home />} />
                        <Route path="/hxndev.github.io/projects" element={<Projects />} />
                        <Route path="/hxndev.github.io/about" element={<About />} />
                        <Route path="/hxndev.github.io/contact" element={<Contact />} />
                      </Routes>
                    </Suspense>
                  </PageTransition>
                </main>
                
                <Footer />
              </div>
              
              <NavigationPulsar />
            </>
          )}
        </BrowserRouter>
      </AnimationProvider>
    </ThemeProvider>
  );
}

export default App;