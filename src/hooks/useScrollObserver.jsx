import { useState, useEffect, useRef } from 'react';

/**
 * Hook for observing when elements enter the viewport
 * @param {Object} options - Intersection observer options
 * @returns {Object} Observer utilities
 */
export const useScrollObserver = (options = {}) => {
  const [entries, setEntries] = useState([]);
  const [observedElements, setObservedElements] = useState([]);
  const observerRef = useRef(null);

  // Default options
  const defaultOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // Trigger slightly before elements enter viewport
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  // Merge default options with provided options
  const observerOptions = { ...defaultOptions, ...options };

  // Initialize intersection observer
  useEffect(() => {
    // Create observer
    observerRef.current = new IntersectionObserver(observedEntries => {
      setEntries(observedEntries);
    }, observerOptions);

    // Observe all elements
    observedElements.forEach(element => {
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [JSON.stringify(observerOptions), observedElements]);

  // Function to observe an element
  const observe = element => {
    if (!element || observedElements.includes(element)) return;

    setObservedElements(prev => [...prev, element]);

    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  // Function to unobserve an element
  const unobserve = element => {
    if (!element) return;

    setObservedElements(prev => prev.filter(el => el !== element));

    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  };

  // Check if an element is in view
  const isInView = element => {
    if (!element) return false;

    return entries.some(entry => entry.target === element && entry.isIntersecting);
  };

  return {
    observe,
    unobserve,
    isInView,
    entries,
  };
};

export default useScrollObserver;
