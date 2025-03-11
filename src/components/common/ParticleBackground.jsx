import React, { useRef, useEffect } from 'react';
import { useAnimationContext } from '../../context/AnimationContext';
import { useColorScheme } from '../../theme/ThemeProvider';

const ParticleBackground = ({ particleCount = 50 }) => {
  const canvasRef = useRef(null);
  const { viewportWidth, viewportHeight, scrollVelocity, reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Use theme-appropriate colors
  const particleColor = isDark ? '#00F5FF' : '#9B00FF';
  const opacity = isDark ? 0.6 : 0.3; // Lower opacity in light mode

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    // Reduced particle count if reduced motion is preferred
    const actualParticleCount = reducedMotion ? Math.floor(particleCount / 3) : particleCount;

    // Create particles
    const particles = Array(actualParticleCount)
      .fill()
      .map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: particleColor,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        baseVx: Math.random() * 0.5 - 0.25,
        baseVy: Math.random() * 0.5 - 0.25,
      }));

    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach(particle => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Apply scroll velocity influence
        const scrollInfluence = scrollVelocity * 0.01;

        // Update position
        particle.x += particle.vx + scrollInfluence * 0.5;
        particle.y += particle.vy - scrollInfluence * 0.1;

        // Gradually return to base velocity
        particle.vx = particle.vx * 0.95 + particle.baseVx * 0.05;
        particle.vy = particle.vy * 0.95 + particle.baseVy * 0.05;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    particleCount,
    particleColor,
    viewportWidth,
    viewportHeight,
    scrollVelocity,
    reducedMotion,
    opacity,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
