import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mantine/core';
import { useAnimationContext } from '../../context/AnimationContext';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  
  // Apply enter animation when the component mounts or location changes
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    
    // Reset positions
    gsap.set(containerRef.current, { perspective: 1000 });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });
    
    // Create timeline for entrance animation
    const timeline = gsap.timeline({
      defaults: {
        duration: reducedMotion ? 0.2 : 0.5,
        ease: 'power2.out'
      }
    });
    
    // Simple fade in for reduced motion, more complex animation otherwise
    if (reducedMotion) {
      timeline.to(contentRef.current, { opacity: 1, y: 0 });
    } else {
      timeline.to(contentRef.current, { opacity: 1, y: 0 });
      
      // Find and animate headings and elements with animate-in class if they exist
      const animateElements = contentRef.current.querySelectorAll('h1, h2, h3, .animate-in');
      
      if (animateElements.length > 0) {
        timeline.fromTo(
          animateElements,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1,
            delay: 0.1
          },
          '-=0.2'
        );
      }
    }
    
    return () => {
      timeline.kill();
    };
  }, [location.pathname, reducedMotion]);
  
  return (
    <Box ref={containerRef} sx={{ width: '100%', minHeight: '80vh' }}>
      <Box ref={contentRef}>{children}</Box>
    </Box>
  );
};

export default PageTransition;