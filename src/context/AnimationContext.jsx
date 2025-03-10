import React, { createContext, useContext, useState, useEffect } from 'react';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import { configureGsap } from '../animations/gsap';

// Create the context
const AnimationContext = createContext({
  scrollPosition: 0,
  scrollVelocity: 0,
  reducedMotion: false,
  viewportWidth: 0,
  viewportHeight: 0,
  interactionIntensity: 0
});

/**
 * Animation Provider component
 */
export const AnimationProvider = ({ children }) => {
  const { position: scrollPosition, velocity: scrollVelocity } = useScrollVelocity();
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [interactionIntensity, setInteractionIntensity] = useState(0);
  
  // Update reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      const prefersReducedMotion = mediaQuery.matches;
      setReducedMotion(prefersReducedMotion);
      
      // Configure GSAP based on preference
      configureGsap(prefersReducedMotion);
    };
    
    // Initial configuration
    configureGsap(reducedMotion);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Update viewport dimensions
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate interaction intensity based on scroll velocity
  useEffect(() => {
    // Normalize velocity to a 0-1 scale
    // Assuming normal scrolling is around 10-100px per second
    const normalizedVelocity = Math.min(1, Math.abs(scrollVelocity) / 1000);
    setInteractionIntensity(normalizedVelocity);
  }, [scrollVelocity]);
  
  const value = {
    scrollPosition,
    scrollVelocity,
    reducedMotion,
    viewportWidth: viewport.width,
    viewportHeight: viewport.height,
    interactionIntensity
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

/**
 * Hook to use the animation context
 */
export const useAnimationContext = () => useContext(AnimationContext);