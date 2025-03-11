import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { configureGsap } from '../animations/gsap';

// Initial state
const initialState = {
  scrollPosition: 0,
  scrollVelocity: 0,
  viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
  viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 800,
  reducedMotion:
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  interactionIntensity: 0,
};

// Reducer for animation state
function animationReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SCROLL':
      return {
        ...state,
        scrollPosition: action.payload.position,
        scrollVelocity: action.payload.velocity,
        interactionIntensity: Math.min(1, Math.abs(action.payload.velocity) / 1000),
      };
    case 'UPDATE_VIEWPORT':
      return {
        ...state,
        viewportWidth: action.payload.width,
        viewportHeight: action.payload.height,
      };
    case 'SET_REDUCED_MOTION':
      return {
        ...state,
        reducedMotion: action.payload,
      };
    default:
      return state;
  }
}

// Create context
const AnimationContext = createContext(initialState);

// Animation provider component
export function AnimationProvider({ children }) {
  const [state, dispatch] = useReducer(animationReducer, initialState);

  // Track scroll position and velocity
  useEffect(() => {
    let lastScrollTop = window.pageYOffset;
    let lastScrollTime = performance.now();
    let frameId = null;

    const updateScroll = () => {
      const currentScrollTop = window.pageYOffset;
      const currentTime = performance.now();
      const timeDelta = currentTime - lastScrollTime;

      // Calculate velocity (px per millisecond)
      let velocity = 0;
      if (timeDelta > 0) {
        velocity = (currentScrollTop - lastScrollTop) / timeDelta;
      }

      // Scale velocity for easier use (px per second)
      velocity = velocity * 1000;

      dispatch({
        type: 'UPDATE_SCROLL',
        payload: {
          position: currentScrollTop,
          velocity: velocity,
        },
      });

      lastScrollTop = currentScrollTop;
      lastScrollTime = currentTime;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame for performance
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(updateScroll);
    };

    // Initial call
    updateScroll();

    // Add event listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Track viewport dimensions
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: 'UPDATE_VIEWPORT',
        payload: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      const prefersReducedMotion = mediaQuery.matches;
      dispatch({
        type: 'SET_REDUCED_MOTION',
        payload: prefersReducedMotion,
      });

      // Configure GSAP based on preference
      configureGsap(prefersReducedMotion);
    };

    // Initial configuration
    configureGsap(state.reducedMotion);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [state.reducedMotion]);

  return <AnimationContext.Provider value={state}>{children}</AnimationContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAnimationContext = () => useContext(AnimationContext);
