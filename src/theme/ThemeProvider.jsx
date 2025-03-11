import { createContext, useContext, useEffect, useState } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { generateQuantumPalette } from './quantum.jsx';

// Create the color scheme context
const ColorSchemeContext = createContext({
  colorScheme: 'dark',
  toggleColorScheme: () => {},
  quantumColors: {},
  interactionIntensity: 0,
  setInteractionIntensity: () => {}
});

// Define base theme with more rounded elements
const baseTheme = createTheme({
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
    // Add quantum colors
    quantum: [
      '#E6FCFF',
      '#C3FAFF',
      '#96F2FF',
      '#63E6FF',
      '#38D9FF',
      '#00F5FF',
      '#00C5CC',
      '#00959B',
      '#006569',
      '#003538',
    ],
    neutron: [
      '#F3E7FF',
      '#E9D2FF',
      '#D4AEFF',
      '#C089FF',
      '#A763FF',
      '#9240FF',
      '#6E30C7',
      '#4D2189',
      '#2C124D',
      '#0F0617',
    ],
    plasma: [
      '#FFE7EC',
      '#FFD2DA',
      '#FFAEB9',
      '#FF899B',
      '#FF637C',
      '#FF3864',
      '#D7294E',
      '#A61F3C',
      '#751628',
      '#450C14',
    ],
  },
  fontFamily: "'Inter', sans-serif",
  headings: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
  },
  defaultRadius: "xl", // Changed from 'md' to 'xl' for more rounded corners throughout
  components: {
    Button: {
      defaultProps: {
        radius: "xl" // Set all buttons to have fully rounded corners by default
      }
    },
    Card: {
      defaultProps: {
        radius: "xl" // Rounder cards
      }
    },
    Paper: {
      defaultProps: {
        radius: "xl" // Rounder papers
      }
    },
    TextInput: {
      defaultProps: {
        radius: "xl" // Rounder text inputs
      }
    },
    Badge: {
      defaultProps: {
        radius: "xl" // Pill-shaped badges
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: "xl" // Circular action icons
      }
    }
  },
  other: {
    borderRadiusXXL: '2rem',
    glassEffect: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  },
});

// Theme provider component
export function ThemeProvider({ children }) {
  // Get initial color scheme from localStorage or default to dark
  const [colorScheme, setColorScheme] = useState(() => {
    return localStorage.getItem('colorScheme') || 'dark';
  });
  
  // State for quantum colors
  const [quantumColors, setQuantumColors] = useState(() => {
    return generateQuantumPalette();
  });
  
  // Interaction intensity for dynamic colors
  const [interactionIntensity, setInteractionIntensity] = useState(0);
  
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
    
    // Generate quantum colors based on color scheme
    setQuantumColors(generateQuantumPalette({
      base: colorScheme === 'dark' ? '#0B0C10' : '#FFFFFF',
      accent: '#00F5FF',
      secondary: '#9B00FF',
      tertiary: '#FF3864'
    }));
  }, [colorScheme]);
  
  // Create extended theme with quantum colors
  const extendedTheme = {
    ...baseTheme,
    colorScheme,
    other: {
      ...baseTheme.other,
      quantumColors
    }
  };

  return (
    <ColorSchemeContext.Provider value={{ 
      colorScheme, 
      toggleColorScheme,
      quantumColors,
      interactionIntensity,
      setInteractionIntensity
    }}>
      <MantineProvider 
        theme={extendedTheme}
        defaultColorScheme={colorScheme}
      >
        {children}
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
}

// Export the hook separately (this is the key fix for HMR compatibility)
export const useColorScheme = () => useContext(ColorSchemeContext);