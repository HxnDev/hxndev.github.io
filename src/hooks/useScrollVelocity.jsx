import { useState, useEffect, useRef } from 'react';

/**
 * Hook to track scroll velocity
 * @returns {Object} Scroll position and velocity
 */
export const useScrollVelocity = () => {
  const [scrollState, setScrollState] = useState({
    position: 0,
    velocity: 0,
  });

  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(performance.now());
  const frameId = useRef(null);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollTop = window.pageYOffset;
      const currentTime = performance.now();
      const timeDelta = currentTime - lastScrollTime.current;

      // Calculate velocity (px per millisecond)
      let velocity = 0;
      if (timeDelta > 0) {
        velocity = (currentScrollTop - lastScrollTop.current) / timeDelta;
      }

      // Scale velocity for easier use (px per second)
      velocity = velocity * 1000;

      setScrollState({
        position: currentScrollTop,
        velocity: velocity,
      });

      lastScrollTop.current = currentScrollTop;
      lastScrollTime.current = currentTime;
    };

    const handleScroll = () => {
      // Use requestAnimationFrame for performance
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      frameId.current = requestAnimationFrame(updateScroll);
    };

    // Initial call
    updateScroll();

    // Add event listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return scrollState;
};
