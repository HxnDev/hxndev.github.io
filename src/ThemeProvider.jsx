import { createContext, useContext, useEffect, useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

// Create a theme context
const ColorSchemeContext = createContext({
  colorScheme: 'dark',
  toggleColorScheme: () => {},
});

// Define custom theme
const theme = createTheme({
  primaryColor: 'grape',
  colors: {
    grape: [
      '#F3E7FA',
      '#E9D2F6',
      '#D4AEF0',
      '#C089EA',
      '#A763E4',
      '#9240DF',
      '#6E30A7',
      '#4D2175',
      '#2C1242',
      '#0F0617',
    ],
    teal: [
      '#E6FCF5',
      '#C3FAE8',
      '#96F2D7',
      '#63E6BE',
      '#38D9A9',
      '#20C997',
      '#12B886',
      '#0CA678',
      '#099268',
      '#087F5B',
    ],
  },
  fontFamily: "'Inter', sans-serif",
  headings: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
  },
  defaultRadius: 'md',
});

// Theme provider component
export function ThemeProvider({ children }) {
  // Get initial color scheme from localStorage or default to dark
  const [colorScheme, setColorScheme] = useState(() => {
    return localStorage.getItem('colorScheme') || 'dark';
  });

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newColorScheme);
    localStorage.setItem('colorScheme', newColorScheme);
    
    // Apply the theme to document body directly
    document.documentElement.setAttribute('data-mantine-color-scheme', newColorScheme);
  };

  // Set initial theme on mount
  useEffect(() => {
    // Set the initial color scheme on document
    document.documentElement.setAttribute('data-mantine-color-scheme', colorScheme);
    
    // Also set a data attribute that can be used for additional custom styling
    document.body.dataset.theme = colorScheme;
  }, [colorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <MantineProvider 
        theme={{ ...theme, colorScheme: colorScheme }}
        defaultColorScheme={colorScheme}
      >
        {children}
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useColorScheme = () => useContext(ColorSchemeContext);