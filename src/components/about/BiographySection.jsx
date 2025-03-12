import React, { useRef, useEffect } from 'react';
import { Paper, Title, Text, Box, Grid, Image } from '@mantine/core';
import { gsap } from 'gsap';
import { useAnimationContext } from '../../context/AnimationContext';
import { useColorScheme } from '../../theme/ThemeProvider';
import AnimatedSection from '../common/AnimatedSection';

/**
 * Enhanced biography section with animated elements
 */
const BiographySection = ({ bio, image }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Default bio if not provided
  const defaultBio = [
    "I'm a passionate developer with expertise in building applications that combine intuitive user experiences with powerful backend systems. My focus is on creating technology that solves real problems.",
    "With a background in both software engineering and machine learning, I specialize in creating applications that leverage AI to deliver innovative solutions. I'm particularly interested in optimizing workflows and improving productivity through technology.",
  ];

  const bioText = bio || defaultBio;

  // Apply parallax effect to image
  useEffect(() => {
    if (reducedMotion || !imageRef.current) return;

    const handleScroll = () => {
      const imageRect = imageRef.current.getBoundingClientRect();
      const centerY = imageRect.top + imageRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = centerY - viewportCenter;

      // Calculate parallax amount based on distance from center
      const parallaxAmount = distance * -0.1;

      gsap.to(imageRef.current, {
        y: parallaxAmount,
        duration: 0.5,
        ease: 'power1.out',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  // Apply staggered reveal to text paragraphs
  useEffect(() => {
    if (reducedMotion || !contentRef.current) return;

    const paragraphs = contentRef.current.querySelectorAll('.bio-paragraph');

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              paragraphs,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.7,
                ease: 'power3.out',
              }
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, bioText]);

  return (
    <Paper
      withBorder
      p="xl"
      radius="md"
      mb="xl"
      ref={containerRef}
      style={{
        overflow: 'hidden',
        background: isDark
          ? 'linear-gradient(145deg, rgba(28, 29, 34, 0.9), rgba(15, 16, 20, 1))'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(245, 245, 250, 1))',
        position: 'relative',
        borderColor: isDark ? 'rgba(155, 0, 255, 0.3)' : 'rgba(155, 0, 255, 0.2)',
      }}
    >
      {/* Background decoration */}
      {!reducedMotion && (
        <Box
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at center, rgba(155, 0, 255, 0.15), transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
      )}

      <Title
        order={2}
        mb="lg"
        style={{
          backgroundImage: 'linear-gradient(45deg, #6200EE, #03DAC5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Bio
      </Title>

      <Grid gutter={50}>
        <Grid.Col md={4}>
          <AnimatedSection animation="fadeInLeft" duration={0.8}>
            <Box
              ref={imageRef}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Image
                src={image || '/images/profile.jpg'}
                alt="Hassan Shahzad"
                radius="md"
                height={300}
                width="auto"
                fit="contain"
                fallbackSrc="https://placehold.co/300x300?text=Profile+Image"
                style={{
                  border: `3px solid ${isDark ? 'rgba(155, 0, 255, 0.3)' : 'rgba(98, 0, 238, 0.2)'}`,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                }}
              />

              {/* Decorative elements */}
              {!reducedMotion && (
                <>
                  <Box
                    style={{
                      position: 'absolute',
                      top: -15,
                      right: -15,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at center, rgba(0, 245, 255, 0.3), transparent 70%)',
                      filter: 'blur(15px)',
                      zIndex: -1,
                    }}
                  />
                  <Box
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      left: -20,
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at center, rgba(155, 0, 255, 0.3), transparent 70%)',
                      filter: 'blur(20px)',
                      zIndex: -1,
                    }}
                  />
                </>
              )}
            </Box>
          </AnimatedSection>
        </Grid.Col>

        <Grid.Col md={8}>
          <Box
            ref={contentRef}
            style={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            {bioText.map((paragraph, index) => (
              <Text
                key={index}
                className="bio-paragraph"
                mb="lg"
                size="lg"
                style={{
                  lineHeight: 1.7,
                  opacity: reducedMotion ? 1 : 0, // Set initial opacity for animation
                  color: isDark ? 'white' : '#1A1B1E',
                }}
              >
                {paragraph}
              </Text>
            ))}
          </Box>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default BiographySection;
