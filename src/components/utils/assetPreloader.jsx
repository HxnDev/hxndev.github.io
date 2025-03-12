/**
 * Utility for preloading assets to improve performance
 */
import { resolveAssetPath } from '../utils/paths';

/**
 * Preload an image
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 * @param {Array} images - Array of image URLs
 * @param {Function} progressCallback - Callback for progress updates
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadImages = (images, progressCallback = null) => {
  let loaded = 0;
  const total = images.length;

  return Promise.all(
    images.map(src =>
      preloadImage(src)
        .then(img => {
          loaded++;
          if (progressCallback) {
            progressCallback((loaded / total) * 100);
          }
          return img;
        })
        .catch(err => {
          console.warn(`Failed to preload image: ${src}`, err);
          loaded++;
          if (progressCallback) {
            progressCallback((loaded / total) * 100);
          }
          return null;
        })
    )
  );
};

/**
 * Preload a font
 * @param {string} fontFamily - Font family name
 * @param {string} src - Font source URL
 * @returns {Promise} - Promise that resolves when font is loaded
 */
export const preloadFont = (fontFamily, src) => {
  return new Promise((resolve, reject) => {
    try {
      const font = new FontFace(fontFamily, `url(${src})`);
      font
        .load()
        .then(loadedFont => {
          document.fonts.add(loadedFont);
          resolve(loadedFont);
        })
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Get critical images that should be preloaded
 * @returns {Array} Array of critical image URLs
 */
export const getCriticalImages = () => {
  // Define paths without prefix
  const imagePaths = [
    // Profile image
    'images/profile.jpg',

    // Project images for featured projects
    'images/projects/3d-solar-system.jpg',
    'images/projects/ai-chess.jpg',
    'images/projects/brilliant-pro.jpg',
    'images/projects/event-management.jpg',
    'images/projects/exam-scheduler.jpg',
    'images/projects/face-mesh.jpg',
    'images/projects/graphical-password.jpg',
    'images/projects/hawkseye.jpg',
    'images/projects/image-to-sketch.jpg',
    'images/projects/insta-profile.jpg',
    'images/projects/job-fit.jpg',
    'images/projects/password-cracker.jpg',
    'images/projects/phy-app.jpg',
    'images/projects/portfolio.jpg',
    'images/projects/pose-detection.jpg',
    'images/projects/qr-code.jpg',
    'images/projects/ripple-effect.jpg',
    'images/projects/rock-paper-scissors.jpg',
    'images/projects/simple-translator.jpg',
    'images/projects/vehicle-buy-sell.jpg',
    'images/projects/video-to-gif.jpg',
    'images/projects/virtual-drag-and-drop.jpg',
    'images/projects/virtual-mouse.jpg',

    // Fallback images
    'https://placehold.co/600x400/9B00FF/FFFFFF?text=Image+Not+Found',
  ];

  // Resolve all paths
  return imagePaths.map(path => 
    path.startsWith('http') ? path : resolveAssetPath(path)
  );
};

/**
 * Preload critical assets for the portfolio
 * @param {Function} progressCallback - Callback function for loading progress
 * @returns {Promise} - Promise that resolves when critical assets are loaded
 */
export const preloadCriticalAssets = (progressCallback = null) => {
  const criticalImages = getCriticalImages();

  return preloadImages(criticalImages, progressCallback);
};

export default {
  preloadImage,
  preloadImages,
  preloadFont,
  getCriticalImages,
  preloadCriticalAssets,
};