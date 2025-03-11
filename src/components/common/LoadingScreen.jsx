import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Title } from '@mantine/core';
import { gsap } from 'gsap';
import { useColorScheme } from '../../theme/ThemeProvider';

/**
 * Initial loading screen component with progress animation
 */
const LoadingScreen = ({ progress = 0, isComplete = false, minDisplayTime = 1000 }) => {
  const [hidden, setHidden] = useState(false);
  const loadingRef = useRef(null);
  const progressRef = useRef(null);
  const startTime = useRef(Date.now());
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Handle completion and fade out animation
  useEffect(() => {
    if (isComplete) {
      const elapsedTime = Date.now() - startTime.current;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      setTimeout(() => {
        if (loadingRef.current) {
          gsap.to(loadingRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setHidden(true),
          });
        }
      }, remainingTime);
    }
  }, [isComplete, minDisplayTime]);

  // Update progress bar animation
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [progress]);

  // Add exit animation for the entire loading screen
  useEffect(() => {
    if (!loadingRef.current) return;

    // Capture the ref at the top of the effect function
    const currentRef = loadingRef.current;

    // Create entrance animation
    gsap.fromTo(
      currentRef.querySelectorAll('.animate-item'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
    );

    return () => {
      if (currentRef) {
        gsap.to(currentRef, {
          opacity: 0,
          duration: 0.5,
        });
      }
    };
  }, []);

  if (hidden) return null;

  return (
    <Box
      ref={loadingRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: isDark
          ? 'linear-gradient(135deg, #0B0C10, #1F2833)'
          : 'linear-gradient(135deg, #F8F9FA, #E9ECEF)',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <Title
        className="animate-item"
        order={2}
        mb="xl"
        style={{
          background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
        }}
      >
        Hassan Shahzad
      </Title>

      <Box
        className="animate-item"
        style={{
          width: '200px',
          height: '4px',
          background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '1rem',
        }}
      >
        <Box
          ref={progressRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '0%',
            background: 'linear-gradient(to right, #9B00FF, #00F5FF)',
            borderRadius: '2px',
          }}
        />
      </Box>

      <Text className="animate-item" mt="md" size="sm" color="dimmed">
        {Math.round(progress)}% loaded
      </Text>

      {/* Decorative elements */}
      <Box
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(155, 0, 255, 0.1), transparent 70%)',
          filter: 'blur(20px)',
          animation: 'pulse 4s infinite ease-in-out',
        }}
      />

      <Box
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(0, 245, 255, 0.1), transparent 70%)',
          filter: 'blur(15px)',
          animation: 'pulse 4s infinite ease-in-out 1s',
        }}
      />

      {/* Animation keyframes */}
      <style jsx="true">{`
        @keyframes pulse {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
};

export default LoadingScreen;
