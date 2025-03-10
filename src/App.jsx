import { AppShell } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell
          header={{ height: 70 }}
          padding={0}
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>
          
          <AppShell.Main pt={70}>
            <Routes>
              <Route path="/hxndev.github.io/" element={<Home />} />
              <Route path="/hxndev.github.io/projects" element={<Projects />} />
              <Route path="/hxndev.github.io/about" element={<About />} />
              <Route path="/hxndev.github.io/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </AppShell.Main>
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;