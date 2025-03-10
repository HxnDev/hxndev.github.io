import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { AnimationProvider } from './context/AnimationContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ParticleBackground from './components/common/ParticleBackground';
import NavigationPulsar from './components/common/NavigationPulsar';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
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
              <Routes>
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