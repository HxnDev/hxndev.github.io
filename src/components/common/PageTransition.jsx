import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAnimationContext } from '../../context/AnimationContext';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = React.useRef(null);
  const { reducedMotion } = useAnimationContext();
  
  // Apply enter animation when the component mounts or location changes
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const content = container.children[0];
    
    // Reset positions
    gsap.set(container, { perspective: 1000 });
    gsap.set(content, { opacity: 0, y: 30 });
    
    // Create timeline for entrance animation
    const timeline = gsap.timeline({
      defaults: {
        duration: reducedMotion ? 0.2 : 0.5,
        ease: 'power2.out'
      }
    });
    
    // Simple fade in for reduced motion, more complex animation otherwise
    if (reducedMotion) {
      timeline.to(content, { opacity: 1, y: 0 });
    } else {
      timeline
        .to(content, { opacity: 1, y: 0 })
        .from(
          content.querySelectorAll('h1, h2, h3, .animate-in'), 
          { 
            opacity: 0, 
            y: 20, 
            stagger: 0.1,
            delay: 0.1
          },
          '-=0.2'
        );
    }
    
    return () => {
      timeline.kill();
    };
  }, [location.pathname, reducedMotion]);
  
  return (
    <div ref={containerRef} style={{ width: '100%', minHeight: '80vh' }}>
      <div>{children}</div>
    </div>
  );
};

export default PageTransition;