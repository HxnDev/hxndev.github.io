export const ANIMATION_DEFAULTS = {
  // Base durations in seconds
  durations: {
    fast: 0.3,
    medium: 0.5,
    slow: 0.8,
    entrance: 1.2,
  },

  // Easing functions
  easings: {
    smooth: 'power2.out',
    bounce: 'back.out(1.2)',
    elastic: 'elastic.out(1, 0.3)',
    emphasis: 'power3.inOut',
  },
};

export const REDUCED_MOTION_DEFAULTS = {
  durations: {
    fast: 0.15,
    medium: 0.2,
    slow: 0.3,
    entrance: 0.4,
  },
  easings: {
    smooth: 'power1.out',
    bounce: 'power1.out',
    elastic: 'power1.out',
    emphasis: 'power1.out',
  },
};
