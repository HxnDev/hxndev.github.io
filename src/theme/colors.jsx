/**
 * Converts hex color to RGB values
 * @param {string} hex - Hex color code
 * @returns {Object} RGB values
 */
export const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Converts RGB to hex color code
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} Hex color code
 */
export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * Generates a palette of colors based on a base color
 * @param {string} baseColor - Base color (hex)
 * @returns {Array} Array of color variations
 */
export const generateColorPalette = baseColor => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return Array(10).fill(baseColor);

  const result = [];

  // Generate 10 variations from lightest to darkest
  for (let i = 0; i < 10; i++) {
    const factor = i / 9; // 0 to 1
    const r = Math.round(rgb.r + (255 - rgb.r) * (1 - factor));
    const g = Math.round(rgb.g + (255 - rgb.g) * (1 - factor));
    const b = Math.round(rgb.b + (255 - rgb.b) * (1 - factor));

    result.push(rgbToHex(r, g, b));
  }

  return result;
};
