/**
 * Utility for preloading assets to improve performance
 */

/**
 * Preload an image
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
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
      images.map(
        src => 
          preloadImage(src)
            .then(img => {
              loaded++;
              if (progressCallback) {
                progressCallback(loaded / total * 100);
              }
              return img;
            })
            .catch(err => {
              console.warn(`Failed to preload image: ${src}`, err);
              loaded++;
              if (progressCallback) {
                progressCallback(loaded / total * 100);
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
        font.load().then(loadedFont => {
          document.fonts.add(loadedFont);
          resolve(loadedFont);
        }).catch(reject);
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
    return [
      // Profile image
      '/hxndev.github.io/images/profile.jpg',
      
      // Project images for featured projects
      '/hxndev.github.io/images/projects/virtual-mouse.jpg',
      '/hxndev.github.io/images/projects/tictactoe.jpg',
      '/hxndev.github.io/images/projects/solar-system.jpg',
      '/hxndev.github.io/images/projects/portfolio.jpg',
      
      // Fallback images
      'https://placehold.co/600x400/9B00FF/FFFFFF?text=Image+Not+Found'
    ];
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
    preloadCriticalAssets
  };