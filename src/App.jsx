import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AnimationProvider } from './context/AnimationContext';
import { Box, Container, Title, Tabs, Group, Text, Badge, Button } from '@mantine/core';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/common/ParticleBackground';
import NavigationPulsar from './components/common/NavigationPulsar';
import ImageTestComponent from './components/ImageTestComponent';
import EnhancedDebugLoader from './components/EnhancedDebugLoader';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [debugMode, setDebugMode] = useState(false);
  const [activeTab, setActiveTab] = useState('app');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showImageTest, setShowImageTest] = useState(false);
  
  // Check for debug mode
  useEffect(() => {
    // Enable debug mode with URL parameter ?debug=true
    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    setDebugMode(debugParam === 'true');
    
    // Also check for imageTest parameter
    const imageTestParam = urlParams.get('imageTest');
    setShowImageTest(imageTestParam === 'true');
    
    // Preload project data
    import('./data/projects.json')
      .then(data => {
        console.log('Projects data preloaded:', data);
        setDataLoaded(true);
      })
      .catch(err => {
        console.error('Error preloading projects data:', err);
      });
  }, []);
  
  return (
    <ThemeProvider>
      <AnimationProvider>
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
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hxndev.github.io/" element={<Home />} />
                        <Route path="/hxndev.github.io/projects" element={<Projects />} />
                        <Route path="/hxndev.github.io/about" element={<About />} />
                        <Route path="/hxndev.github.io/contact" element={<Contact />} />
                      </Routes>
                    </main>
                    
                    <Footer />
                  </div>
                </Tabs.Panel>
                
                <Tabs.Panel value="debug" p="md">
                  <EnhancedDebugLoader />
                </Tabs.Panel>
                
                {showImageTest && (
                  <Tabs.Panel value="imageTest" p="md">
                    <ImageTestComponent />
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
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hxndev.github.io/" element={<Home />} />
                    <Route path="/hxndev.github.io/projects" element={<Projects />} />
                    <Route path="/hxndev.github.io/about" element={<About />} />
                    <Route path="/hxndev.github.io/contact" element={<Contact />} />
                  </Routes>
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