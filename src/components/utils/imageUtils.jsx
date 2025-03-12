/**
 * Utility functions for handling image paths in portfolio
 */
import { getBasePath as getBasePathUtil } from '../../utils/paths';

/**
 * Gets the correct image path based on environment and image path format
 * @param {string} imagePath - The original image path
 * @param {string} fallbackPath - Optional fallback path if image can't be resolved
 * @returns {string} - The correct path to the image
 */
export const getImagePath = (imagePath, fallbackPath = null) => {
  if (!imagePath) {
    return fallbackPath || 'https://placehold.co/600x400/9B00FF/FFFFFF?text=No+Image';
  }

  // External URL (e.g. https://...) - use as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // DEPLOYMENT ENVIRONMENT
  // For GitHub Pages with repository name in URL
  // e.g. https://username.github.io/repo-name/
  if (window.location.pathname.includes('/hxndev.github.io/')) {
    // Handle paths for GitHub Pages with repo name
    if (imagePath.startsWith('/')) {
      // Remove leading slash if present
      return imagePath.substring(1);
    }
    return imagePath;
  }

  // DEVELOPMENT ENVIRONMENT
  // Remove /hxndev.github.io/ prefix if present
  if (imagePath.startsWith('/hxndev.github.io/')) {
    return imagePath.substring('/hxndev.github.io/'.length);
  }

  // If the path starts with a slash but doesn't have /hxndev.github.io/
  if (imagePath.startsWith('/')) {
    return imagePath.substring(1);
  }

  // Path is already relative, use as is
  return imagePath;
};

/**
 * Tries multiple image path formats and returns the first one that loads
 * @param {string} imagePath - The original image path
 * @param {string} fallbackPath - Fallback path if all formats fail
 * @returns {Promise<string>} - Promise resolving to the working image path
 */
export const findWorkingImagePath = (imagePath, fallbackPath) => {
  return new Promise(resolve => {
    if (!imagePath) {
      resolve(fallbackPath || 'https://placehold.co/600x400/9B00FF/FFFFFF?text=No+Image');
      return;
    }

    // If it's an external URL, use it directly
    if (imagePath.startsWith('http')) {
      resolve(imagePath);
      return;
    }

    // Generate different path formats to try
    const pathsToTry = [
      imagePath, // Original format
      imagePath.startsWith('/') ? imagePath.substring(1) : imagePath, // Without leading slash
      imagePath.startsWith('/') ? `${imagePath}` : `/${imagePath}`, // With leading slash
      `/public/${imagePath.startsWith('/') ? imagePath.substring(1) : imagePath}`, // With public prefix
      `public/${imagePath.startsWith('/') ? imagePath.substring(1) : imagePath}`, // Public without leading slash
    ];

    // Debug info
    console.log('Trying image paths:', pathsToTry);

    // Counter for failed attempts
    let failedAttempts = 0;

    // Try each path format
    pathsToTry.forEach(path => {
      const img = new Image();

      img.onload = () => {
        console.log(`Image loaded successfully: ${path}`);
        resolve(path);
      };

      img.onerror = () => {
        failedAttempts++;
        console.log(`Image failed to load: ${path}`);

        // If all formats have failed, use fallback
        if (failedAttempts === pathsToTry.length) {
          console.log('All formats failed, using fallback');
          resolve(
            fallbackPath || 'https://placehold.co/600x400/9B00FF/FFFFFF?text=Image+Not+Found'
          );
        }
      };

      img.src = path;
    });
  });
};

/**
 * Detects the environment and base path for assets
 * @returns {string} - The base path for assets
 */
export const getBasePath = () => {
  return getBasePathUtil();
};

export default {
  getImagePath,
  findWorkingImagePath,
  getBasePath,
};
