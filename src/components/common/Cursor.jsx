import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import { gsap } from 'gsap';
import { useAnimationContext } from '../../context/AnimationContext';
import { useColorScheme } from '../../theme/ThemeProvider';

/**
 * Custom cursor component for enhanced visual feedback
 */
const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [cursorType, setCursorType] = useState('default'); // default, hover, drag, text
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Check if we should show the custom cursor
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  
  // Skip custom cursor for touch devices
  if (isTouchDevice) {
    return null;
  }
  
  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;
    
    // Initialize cursor position to center of viewport
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    gsap.set(cursorRef.current, { 
      x: initialX, 
      y: initialY, 
      opacity: 0 
    });
    
    gsap.set(cursorDotRef.current, { 
      x: initialX, 
      y: initialY, 
      opacity: 0 
    });
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      if (!cursorRef.current || !cursorDotRef.current) return;
      
      // Show cursor on first move
      if (cursorRef.current.style.opacity === '0') {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
        gsap.to(cursorDotRef.current, { opacity: 1, duration: 0.3 });
      }
      
      // Move cursor to mouse position
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });
      
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };
    
    // Mouse down handler
    const handleMouseDown = () => {
      if (!cursorRef.current) return;
      
      gsap.to(cursorRef.current, {
        scale: 0.8,
        duration: 0.2
      });
    };
    
    // Mouse up handler
    const handleMouseUp = () => {
      if (!cursorRef.current) return;
      
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.2
      });
    };
    
    // Handle interactive elements hover
    const handleInteractiveEnter = (e) => {
      if (!cursorRef.current) return;
      
      // Check element type
      const isButton = e.currentTarget.tagName === 'BUTTON' || 
                      e.currentTarget.role === 'button' ||
                      e.currentTarget.classList.contains('button');
                      
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.currentTarget.tagName);
      const isLink = e.currentTarget.tagName === 'A' || e.currentTarget.classList.contains('link');
      
      // Set cursor type
      if (isButton || isLink) {
        setCursorType('hover');
        gsap.to(cursorRef.current, {
          scale: 1.5,
          backgroundColor: isDark ? 'rgba(155, 0, 255, 0.1)' : 'rgba(155, 0, 255, 0.1)',
          borderColor: isDark ? 'rgba(0, 245, 255, 0.5)' : 'rgba(0, 245, 255, 0.5)',
          duration: 0.3
        });
      } else if (isInput) {
        setCursorType('text');
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: isDark ? 'rgba(0, 245, 255, 0.5)' : 'rgba(0, 245, 255, 0.5)',
          duration: 0.3
        });
      }
    };
    
    // Reset cursor on interactive element leave
    const handleInteractiveLeave = () => {
      if (!cursorRef.current) return;
      
      setCursorType('default');
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        duration: 0.3
      });
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"]'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleInteractiveEnter);
      el.addEventListener('mouseleave', handleInteractiveLeave);
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Ensure cursor stays visible when mouse enters window
    const handleWindowEnter = () => {
      if (!cursorRef.current || !cursorDotRef.current) return;
      
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(cursorDotRef.current, { opacity: 1, duration: 0.3 });
    };
    
    // Keep track of cursor when mouse leaves window
    const handleWindowLeave = () => {
      if (!cursorRef.current || !cursorDotRef.current) return;
      
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(cursorDotRef.current, { opacity: 0, duration: 0.3 });
    };
    
    document.addEventListener('mouseenter', handleWindowEnter);
    document.addEventListener('mouseleave', handleWindowLeave);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleWindowEnter);
      document.removeEventListener('mouseleave', handleWindowLeave);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleInteractiveEnter);
        el.removeEventListener('mouseleave', handleInteractiveLeave);
      });
      
      // Restore default cursor
      document.body.style.cursor = '';
    };
  }, [isDark, cursorType]);
  
  return (
    <>
      <Box
        ref={cursorRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: `2px solid ${isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'}`,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          opacity: 0, // Start invisible
          willChange: 'transform'
        }}
      />
      <Box
        ref={cursorDotRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: isDark ? '#00F5FF' : '#9B00FF',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000,
          opacity: 0, // Start invisible
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default Cursor;