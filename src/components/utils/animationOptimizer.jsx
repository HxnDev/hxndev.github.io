import { gsap } from 'gsap';
import { ANIMATION_DEFAULTS, REDUCED_MOTION_DEFAULTS } from '../../animations/constants';

/**
 * Utility for optimizing animations based on device performance
 */

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element to check
 * @param {Number} offset - Offset in pixels
 * @returns {Boolean} - Whether element is in viewport
 */
export const isInViewport = (element, offset = 0) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top - offset <= windowHeight && rect.top + rect.height + offset >= 0;
  const horInView = rect.left - offset <= windowWidth && rect.left + rect.width + offset >= 0;

  return vertInView && horInView;
};

/**
 * Optimized animation function that only animates if element is in viewport
 * @param {Element} element - DOM element to animate
 * @param {Object} properties - Animation properties
 * @param {Object} options - Animation options
 * @returns {gsap.tween|null} - The GSAP tween or null if not animated
 */
export const optimizedAnimation = (element, properties, options = {}) => {
  // Don't animate if element is not in viewport and force isn't true
  if (!options.force && !isInViewport(element, options.viewportOffset || 100)) {
    return null;
  }

  const {
    duration = ANIMATION_DEFAULTS.durations.medium,
    ease = ANIMATION_DEFAULTS.easings.smooth,
    delay = 0,
    onComplete,
    stagger,
  } = options;

  return gsap.to(element, {
    ...properties,
    duration,
    ease,
    delay,
    onComplete,
    stagger,
    force3D: true, // Force GPU acceleration
    overwrite: 'auto', // Automatically overwrite existing tweens
  });
};

/**
 * Create a throttled scroll handler
 * @param {Function} callback - Function to call on scroll
 * @param {Number} limit - Throttle limit in ms
 * @returns {Function} - Throttled scroll handler
 */
export const createThrottledScrollHandler = (callback, limit = 100) => {
  let waiting = false;
  let frameId = null;

  return () => {
    if (waiting) return;

    waiting = true;
    cancelAnimationFrame(frameId);

    frameId = requestAnimationFrame(() => {
      callback();
      waiting = false;
    });

    // Fallback timeout in case requestAnimationFrame is blocked
    setTimeout(() => {
      waiting = false;
    }, limit);
  };
};

/**
 * Apply performance optimizations based on device capabilities
 * @param {Object} performanceMetrics - Performance metrics
 */
export const applyPerformanceOptimizations = performanceMetrics => {
  // Reduce particle count for ParticleBackground
  if (performanceMetrics.devicePerformance === 'low') {
    // Apply low performance optimizations
    document.documentElement.style.setProperty('--max-particles', '25');
    document.documentElement.style.setProperty('--animation-scale', '0.7');
  } else if (performanceMetrics.devicePerformance === 'medium') {
    // Apply medium performance optimizations
    document.documentElement.style.setProperty('--max-particles', '40');
    document.documentElement.style.setProperty('--animation-scale', '0.85');
  } else {
    // Reset to high performance settings
    document.documentElement.style.setProperty('--max-particles', '60');
    document.documentElement.style.setProperty('--animation-scale', '1');
  }
};

export default {
  isInViewport,
  optimizedAnimation,
  createThrottledScrollHandler,
  applyPerformanceOptimizations,
};
