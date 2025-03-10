import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AnimationProvider } from './context/AnimationContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/common/ParticleBackground';
import NavigationPulsar from './components/common/NavigationPulsar';
import DebugProjectLoader from './components/DebugProjectLoader';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [debugMode, setDebugMode] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  
  // Check for debug mode
  useEffect(() => {
    // Enable debug mode with URL parameter ?debug=true
    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    setDebugMode(debugParam === 'true');
    
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
          <ParticleBackground particleCount={50} />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh'
          }}>
            <Header />
            
            <main style={{ flex: 1 }}>
              {debugMode && (
                <div style={{ padding: '20px', background: 'rgba(155, 0, 255, 0.1)', margin: '20px' }}>
                  <h3>Debug Mode</h3>
                  <DebugProjectLoader />
                </div>
              )}
              
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
        </BrowserRouter>
      </AnimationProvider>
    </ThemeProvider>
  );
}

export default App;