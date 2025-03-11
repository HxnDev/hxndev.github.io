import { gsap } from 'gsap';
import { ANIMATION_DEFAULTS, REDUCED_MOTION_DEFAULTS } from './constants';

// Initialize GSAP with default settings
gsap.defaults({
  ease: ANIMATION_DEFAULTS.easings.smooth,
  duration: ANIMATION_DEFAULTS.durations.medium,
});

/**
 * Configure GSAP based on user preferences
 * @param {boolean} reducedMotion - Whether user prefers reduced motion
 */
export const configureGsap = (reducedMotion = false) => {
  const defaults = reducedMotion ? REDUCED_MOTION_DEFAULTS : ANIMATION_DEFAULTS;

  gsap.defaults({
    ease: defaults.easings.smooth,
    duration: defaults.durations.medium,
    overwrite: true,
  });
};

/**
 * Animate elements with optimized performance
 * @param {Element|String} target - Element or selector to animate
 * @param {Object} props - Animation properties
 * @param {Object} options - Animation options
 */
export const animateElement = (target, props, options = {}) => {
  const {
    duration = ANIMATION_DEFAULTS.durations.medium,
    ease = ANIMATION_DEFAULTS.easings.smooth,
    delay = 0,
    onComplete,
    stagger,
  } = options;

  return gsap.to(target, {
    ...props,
    duration,
    ease,
    delay,
    onComplete,
    stagger,
    force3D: true, // Force GPU acceleration
    overwrite: 'auto',
  });
};

/**
 * Animate element from initial state
 * @param {Element|String} target - Element or selector to animate
 * @param {Object} props - Animation properties
 * @param {Object} options - Animation options
 */
export const animateFrom = (target, props, options = {}) => {
  const {
    duration = ANIMATION_DEFAULTS.durations.medium,
    ease = ANIMATION_DEFAULTS.easings.smooth,
    delay = 0,
    onComplete,
    stagger,
  } = options;

  return gsap.from(target, {
    ...props,
    duration,
    ease,
    delay,
    onComplete,
    stagger,
    force3D: true,
    overwrite: 'auto',
  });
};

/**
 * Create a timeline for sequenced animations
 * @param {Object} options - Timeline options
 * @returns {gsap.timeline} GSAP Timeline
 */
export const createTimeline = (options = {}) => {
  return gsap.timeline({
    paused: options.paused || false,
    defaults: {
      duration: options.duration || ANIMATION_DEFAULTS.durations.medium,
      ease: options.ease || ANIMATION_DEFAULTS.easings.smooth,
    },
  });
};
