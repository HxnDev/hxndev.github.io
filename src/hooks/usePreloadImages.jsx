import { useState, useEffect } from 'react';

/**
 * Hook to preload images for better user experience
 * @param {Array} images - Array of image URLs to preload
 * @param {Boolean} enabled - Whether preloading is enabled
 * @returns {Object} - Loading state and progress
 */
export const usePreloadImages = (images = [], enabled = true) => {
  const [loaded, setLoaded] = useState(0);
  const [failed, setFailed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled || !images || images.length === 0) {
      setIsComplete(true);
      return;
    }

    // Filter out null or undefined images
    const validImages = images.filter(img => img);

    if (validImages.length === 0) {
      setIsComplete(true);
      return;
    }

    let loadedCount = 0;
    let failedCount = 0;

    // Function to check if all images have been processed
    const checkComplete = () => {
      if (loadedCount + failedCount === validImages.length) {
        setIsComplete(true);
      }
    };

    // Preload each image
    validImages.forEach(src => {
      // Skip preloading for external URLs to avoid CORS issues
      if (src.startsWith('http') && !src.includes(window.location.hostname)) {
        loadedCount++;
        setLoaded(loadedCount);
        checkComplete();
        return;
      }

      const img = new Image();

      img.onload = () => {
        loadedCount++;
        setLoaded(loadedCount);
        checkComplete();
      };

      img.onerror = () => {
        console.warn(`Failed to preload image: ${src}`);
        failedCount++;
        setFailed(failedCount);
        checkComplete();
      };

      // Try different path formats if the image is a local path
      if (!src.startsWith('http')) {
        // First try with the original path
        img.src = src;

        // If it's a path with leading slash, add a fallback setTimeout
        if (src.startsWith('/')) {
          setTimeout(() => {
            if (!img.complete) {
              // Try without the leading slash
              img.src = src.substring(1);
            }
          }, 500);
        }
      } else {
        img.src = src;
      }
    });

    return () => {
      // Clean up by removing event listeners for any in-progress loads
      validImages.forEach(src => {
        const img = new Image();
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images, enabled]);

  return {
    loaded,
    failed,
    total: images.filter(img => img).length,
    progress: images.length > 0 ? Math.round((loaded / images.length) * 100) : 100,
    isComplete,
  };
};

export default usePreloadImages;
