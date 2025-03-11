import React, { useRef, useEffect } from 'react';
import { Title, Text, Container, Button, Group, Grid, Box } from '@mantine/core';
import { IconDownload, IconBrandGithub, IconArrowRight } from '@tabler/icons-react';
import { gsap } from 'gsap';
import { useColorScheme } from '../../theme/ThemeProvider';

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const ctaRef = useRef(null);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animation on component mount
  useEffect(() => {
    if (!textRef.current || !imageRef.current) return;

    // Reset positions for animation
    gsap.set(textRef.current.querySelectorAll('.animate-item'), {
      y: 50,
      opacity: 0,
    });

    gsap.set(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      rotationY: -15,
    });

    // Create timeline
    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: 'power3.out',
      },
    });

    // Animate text elements
    tl.to(textRef.current.querySelectorAll('.animate-item'), {
      y: 0,
      opacity: 1,
      stagger: 0.2,
    });

    // Animate image
    tl.to(
      imageRef.current,
      {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
      },
      '-=0.5'
    );

    // Add scroll listener for parallax
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const parallaxRate = scrollPos * 0.15;

      gsap.to(imageRef.current, {
        y: -parallaxRate * 0.5,
        duration: 0.1,
      });

      gsap.to(textRef.current, {
        y: parallaxRate * 0.3,
        duration: 0.1,
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '80px 0 100px',
        overflow: 'hidden',
        background: isDark
          ? 'radial-gradient(circle at 30% 50%, rgba(155, 0, 255, 0.15), transparent 70%)'
          : 'radial-gradient(circle at 30% 50%, rgba(155, 0, 255, 0.05), transparent 70%)',
      }}
    >
      {/* Floating orbs background decoration */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <Container size="lg">
        <Grid gutter={60}>
          <Grid.Col md={7} ref={textRef}>
            <Box className="animate-item" mb={20}>
              <Text
                component="span"
                size="lg"
                style={{
                  background: 'linear-gradient(45deg, #00F5FF, #9B00FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                }}
              >
                Full Stack Developer & ML Engineer
              </Text>
            </Box>

            <Title
              className="animate-item"
              style={{
                fontSize: '4rem',
                fontWeight: 900,
                lineHeight: 1.1,
                backgroundImage: 'linear-gradient(45deg, #6200EE, #03DAC5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.5rem',
              }}
            >
              Hi, I'm Hassan Shahzad
            </Title>

            <Text
              className="animate-item"
              size="xl"
              color={isDark ? 'dimmed' : 'dark'}
              style={{
                maxWidth: '600px',
                lineHeight: 1.6,
                marginBottom: '2rem',
              }}
            >
              Specializing in creating intelligent, intuitive applications that solve real-world
              problems with a passion for clean code and innovative solutions.
            </Text>

            <Group position="left" spacing="md" className="animate-item" ref={ctaRef}>
              <Button
                component="a"
                href="/hxndev.github.io/assets/hassan_resume.pdf"
                size="lg"
                leftSection={<IconDownload size={20} />}
                radius="xl"
                style={{
                  background: 'linear-gradient(45deg, #6200EE, #9B00FF)',
                  boxShadow: '0 4px 15px rgba(155, 0, 255, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                sx={{
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(155, 0, 255, 0.4)',
                  },
                }}
                download
              >
                Download Resume
              </Button>

              <Button
                component="a"
                href="https://github.com/HxnDev"
                target="_blank"
                size="lg"
                variant={isDark ? 'outline' : 'filled'}
                leftSection={<IconBrandGithub size={20} />}
                rightSection={<IconArrowRight size={16} />}
                radius="xl"
                style={{
                  borderColor: '#9B00FF',
                  color: isDark ? '#00F5FF' : 'white',
                  backgroundColor: isDark ? 'transparent' : '#9B00FF',
                  transition: 'all 0.3s ease',
                }}
                sx={{
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    background: isDark ? 'rgba(155, 0, 255, 0.1)' : '#8100d9',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                GitHub Profile
              </Button>
            </Group>
          </Grid.Col>

          <Grid.Col md={5} style={{ position: 'relative' }}>
            <div className="profile-container" ref={imageRef}>
              <div className="profile-image-wrapper">
                <img
                  src="/hxndev.github.io/images/profile.jpg"
                  alt="Hassan Shahzad"
                  className="profile-image"
                />
              </div>

              {/* Decorative elements */}
              <div className="glow-effect"></div>
              <div className="circle-decoration circle-1"></div>
              <div className="circle-decoration circle-2"></div>
            </div>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Custom CSS for the new profile design */}
      <style>
        {`
          .profile-container {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            perspective: 1000px;
          }
          
          .profile-image-wrapper {
            position: relative;
            height: 400px;
            width: 400px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(155, 0, 255, 0.4);
            transform: perspective(1000px) rotateY(-5deg);
            transition: all 0.5s ease;
            border: 4px solid rgba(155, 0, 255, 0.3);
          }
          
          .profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .profile-image-wrapper:hover .profile-image {
            transform: scale(1.05);
          }
          
          .glow-effect {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle at center, rgba(155, 0, 255, 0.2), transparent 70%);
            filter: blur(20px);
            opacity: 0.7;
            z-index: -1;
          }
          
          .circle-decoration {
            position: absolute;
            border-radius: 50%;
            filter: blur(15px);
          }
          
          .circle-1 {
            top: -10%;
            right: -5%;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #00F5FF, transparent);
            opacity: 0.7;
          }
          
          .circle-2 {
            bottom: -10%;
            left: -5%;
            width: 150px;
            height: 150px;
            background: linear-gradient(135deg, #9B00FF, transparent);
            opacity: 0.6;
          }
          
          .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(30px);
            opacity: 0.4;
            z-index: -1;
          }
          
          .orb-1 {
            top: 20%;
            right: 10%;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle at center, rgba(0, 245, 255, 0.3), transparent);
            animation: float 15s infinite ease-in-out;
          }
          
          .orb-2 {
            bottom: 15%;
            left: 10%;
            width: 180px;
            height: 180px;
            background: radial-gradient(circle at center, rgba(155, 0, 255, 0.3), transparent);
            animation: float 18s infinite ease-in-out reverse;
          }
          
          .orb-3 {
            top: 40%;
            left: 20%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle at center, rgba(255, 56, 100, 0.2), transparent);
            animation: float 12s infinite ease-in-out 2s;
          }
          
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(0) translateX(20px); }
            75% { transform: translateY(20px) translateX(10px); }
            100% { transform: translateY(0) translateX(0); }
          }
          
          @media (max-width: 992px) {
            .profile-image-wrapper {
              height: 300px;
              width: 300px;
              margin: 40px auto 0;
            }
          }
          
          @media (max-width: 768px) {
            .profile-image-wrapper {
              height: 250px;
              width: 250px;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroSection;
