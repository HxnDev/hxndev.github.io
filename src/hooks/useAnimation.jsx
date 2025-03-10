import { useState, useEffect, useContext, useRef } from 'react';
import { useScrollVelocity } from './useScrollVelocity';

/**
 * Hook for animation utilities
 * @returns {Object} Animation utilities
 */
export const useAnimation = () => {
  const { position: scrollPosition, velocity: scrollVelocity } = useScrollVelocity();
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  
  // Check if element is in viewport
  const isInViewport = (element, offset = 0) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight + offset) &&
      rect.bottom > (0 - offset) &&
      rect.left < (window.innerWidth + offset) &&
      rect.right > (0 - offset)
    );
  };
  
  // Update reduced motion preference if it changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return {
    scrollPosition,
    scrollVelocity,
    reducedMotion,
    isInViewport
  };
};