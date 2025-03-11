import React, { useRef, useEffect } from 'react';
import { Box } from '@mantine/core';
import { gsap } from 'gsap';
import { useAnimationContext } from '../../context/AnimationContext';

/**
 * A component that animates its children when they enter the viewport
 */
const AnimatedSection = ({ 
  children, 
  animation = 'fadeIn', 
  duration = 0.7, 
  delay = 0, 
  triggerPosition = 'center 80%',
  stagger = 0.1,
  className,
  style,
  ...props 
}) => {
  const sectionRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  
  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    // Elements to animate
    const elementsToAnimate = sectionRef.current.querySelectorAll('.animate-item');
    
    // If no specific elements have the animate-item class, animate the section itself
    const targets = elementsToAnimate.length > 0 ? elementsToAnimate : sectionRef.current;
    
    // Configure animation based on type
    let animationConfig = {
      duration: duration,
      ease: "power3.out",
      stagger: stagger
    };
    
    // Define different animation types
    switch (animation) {
      case 'fadeIn':
        animationConfig = {
          ...animationConfig,
          opacity: 0,
          y: 30,
        };
        break;
      case 'fadeInUp':
        animationConfig = {
          ...animationConfig,
          opacity: 0,
          y: 50,
        };
        break;
      case 'fadeInLeft':
        animationConfig = {
          ...animationConfig,
          opacity: 0,
          x: -50,
        };
        break;
      case 'fadeInRight':
        animationConfig = {
          ...animationConfig,
          opacity: 0,
          x: 50,
        };
        break;
      case 'zoomIn':
        animationConfig = {
          ...animationConfig,
          opacity: 0,
          scale: 0.9,
        };
        break;
      case 'slideUp':
        animationConfig = {
          ...animationConfig,
          y: 100,
          opacity: 0,
        };
        break;
      default:
        animationConfig = {
          ...animationConfig,
          opacity: 0,
        };
    }
    
    // Set initial state
    gsap.set(targets, animationConfig);
    
    // Create scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate to final state
            gsap.to(targets, {
              ...animationConfig,
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              stagger: stagger,
              duration: duration,
              delay: delay,
              ease: "power3.out",
              clearProps: "all" // Clean up after animation completes
            });
            
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -10% 0px" // Adjust trigger position
      }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [animation, duration, delay, stagger, reducedMotion, triggerPosition]);
  
  return (
    <Box
      ref={sectionRef}
      className={`animated-section ${className || ''}`}
      style={{ overflow: 'hidden', ...style }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedSection;