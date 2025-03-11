import React, { useRef, useEffect } from 'react';
import { Box, Title, Text, Button, Group } from '@mantine/core';
import { IconCheck, IconSend } from '@tabler/icons-react';
import { gsap } from 'gsap';
import { useAnimationContext } from '../../context/AnimationContext';
import { useColorScheme } from '../../theme/ThemeProvider';

/**
 * Success animation component shown after form submission
 */
const FormSuccessAnimation = ({ onReset }) => {
  const containerRef = useRef(null);
  const checkmarkRef = useRef(null);
  const circleRef = useRef(null);
  const messageRef = useRef(null);
  const buttonRef = useRef(null);

  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Play entrance animation on mount
  useEffect(() => {
    if (reducedMotion) return;

    // Create a timeline for sequenced animations
    const tl = gsap.timeline();

    // Circle animation
    tl.fromTo(circleRef.current, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(1.7)' });

    // Checkmark animation
    tl.fromTo(
      checkmarkRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' },
      '-=0.3' // Overlap with previous animation
    );

    // Message animation
    tl.fromTo(
      messageRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.1'
    );

    // Button animation
    tl.fromTo(
      buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Animate button on hover
  useEffect(() => {
    if (reducedMotion || !buttonRef.current) return;

    const button = buttonRef.current;

    const handleMouseEnter = () => {
      gsap.to(button, {
        y: -3,
        boxShadow: '0 8px 15px rgba(155, 0, 255, 0.3)',
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        y: 0,
        boxShadow: '0 4px 10px rgba(155, 0, 255, 0.2)',
        duration: 0.3,
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion]);

  return (
    <Box
      ref={containerRef}
      py={50}
      style={{
        textAlign: 'center',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Success checkmark circle */}
      <Box
        ref={circleRef}
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${isDark ? '#9B00FF' : '#6200EE'}, ${isDark ? '#00F5FF' : '#03DAC5'})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 20px rgba(155, 0, 255, 0.3)',
          opacity: reducedMotion ? 1 : 0, // For animation
        }}
      >
        <Box
          ref={checkmarkRef}
          style={{
            opacity: reducedMotion ? 1 : 0, // For animation
          }}
        >
          <IconCheck size={40} color="white" />
        </Box>
      </Box>

      {/* Success message */}
      <Box
        ref={messageRef}
        mb={40}
        style={{
          opacity: reducedMotion ? 1 : 0, // For animation
        }}
      >
        <Title order={2} color={isDark ? '#00F5FF' : '#6200EE'} mb="md">
          Message Sent!
        </Title>
        <Text size="lg" mb="sm">
          Thank you for reaching out.
        </Text>
        <Text color="dimmed">I'll get back to you as soon as possible.</Text>
      </Box>

      {/* Reset button */}
      <Group ref={buttonRef} style={{ opacity: reducedMotion ? 1 : 0 }}>
        <Button
          onClick={onReset}
          size="md"
          variant="light"
          rightSection={<IconSend size={16} />}
          style={{
            transition: 'all 0.3s ease',
          }}
        >
          Send Another Message
        </Button>
      </Group>

      {/* Decorative particles for success animation */}
      {!reducedMotion && (
        <>
          {Array(6)
            .fill()
            .map((_, i) => (
              <Box
                key={i}
                className={`particle particle-${i + 1}`}
                style={{
                  position: 'absolute',
                  width: 10 + Math.random() * 10,
                  height: 10 + Math.random() * 10,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? 'rgba(155, 0, 255, 0.6)' : 'rgba(0, 245, 255, 0.6)',
                  top: '50%',
                  left: '50%',
                  zIndex: 0,
                  opacity: 0, // Set initially invisible
                }}
              />
            ))}
        </>
      )}

      {/* Particle animation keyframes */}
      <style jsx="true">{`
        .particle {
          animation: particle-movement 1s ease forwards;
        }

        .particle-1 {
          animation-delay: 0.1s;
        }
        .particle-2 {
          animation-delay: 0.2s;
        }
        .particle-3 {
          animation-delay: 0.3s;
        }
        .particle-4 {
          animation-delay: 0.4s;
        }
        .particle-5 {
          animation-delay: 0.5s;
        }
        .particle-6 {
          animation-delay: 0.6s;
        }

        @keyframes particle-movement {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          100% {
            transform: translate(
                calc(-50% + ${Math.random() * 200 - 100}px),
                calc(-50% + ${Math.random() * 200 - 100}px)
              )
              scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
};

export default FormSuccessAnimation;
