import { hexToRgb, rgbToHex, generateColorPalette } from './colors';

/**
 * Generates the quantum color palette based on base colors
 * @param {Object} options - Color options
 * @returns {Object} Quantum color palette
 */
export const generateQuantumPalette = (options = {}) => {
  const defaults = {
    base: '#0B0C10', // Deep space black
    accent: '#00F5FF', // Aurora cyan
    secondary: '#9B00FF', // Neutron purple
    tertiary: '#FF3864', // Plasma pink
  };

  const colors = { ...defaults, ...options };

  return {
    base: generateColorPalette(colors.base),
    accent: generateColorPalette(colors.accent),
    secondary: generateColorPalette(colors.secondary),
    tertiary: generateColorPalette(colors.tertiary),

    // Original colors
    raw: colors,
  };
};

/**
 * Calculate dynamic color based on interaction intensity
 * @param {string} baseColor - Base color (hex)
 * @param {number} intensity - Interaction intensity (0-1)
 * @returns {string} Calculated color
 */
export const calculateDynamicColor = (baseColor, intensity = 0) => {
  // Clamp intensity between 0 and 1
  intensity = Math.max(0, Math.min(1, intensity));

  const rgb = hexToRgb(baseColor);
  if (!rgb) return baseColor;

  // Adjust saturation and brightness based on intensity
  // This is a simple implementation - can be expanded for more complex effects
  const brightnessAdjust = 0.15; // Max 15% increase in brightness

  // Simple brightness adjustment for now
  const r = Math.min(255, rgb.r + Math.round(255 * brightnessAdjust * intensity));
  const g = Math.min(255, rgb.g + Math.round(255 * brightnessAdjust * intensity));
  const b = Math.min(255, rgb.b + Math.round(255 * brightnessAdjust * intensity));

  return rgbToHex(r, g, b);
};

// Function to create color with motion-based intensity
export const createMotionColor = (baseColor, velocity = 0) => {
  // Normalize velocity to a 0-1 scale
  // Assuming normal scrolling is around 10-50px per frame
  const normalizedVelocity = Math.min(1, Math.abs(velocity) / 50);
  return calculateDynamicColor(baseColor, normalizedVelocity);
};
