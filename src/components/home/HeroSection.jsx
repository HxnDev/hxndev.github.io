import React, { useRef, useEffect } from 'react';
import { Title, Text, Container, Button, Group, Image, Grid, Box } from '@mantine/core';
import { IconDownload, IconBrandGithub, IconArrowRight } from '@tabler/icons-react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const ctaRef = useRef(null);

  // Animation on component mount
  useEffect(() => {
    if (!textRef.current || !imageRef.current) return;

    // Reset positions for animation
    gsap.set(textRef.current.querySelectorAll('.animate-item'), { 
      y: 50, 
      opacity: 0 
    });
    
    gsap.set(imageRef.current, { 
      scale: 0.8, 
      opacity: 0,
      rotationY: -15
    });
    
    // Create timeline
    const tl = gsap.timeline({
      defaults: { 
        duration: 0.8, 
        ease: "power3.out" 
      }
    });
    
    // Animate text elements
    tl.to(textRef.current.querySelectorAll('.animate-item'), {
      y: 0,
      opacity: 1,
      stagger: 0.2
    });
    
    // Animate image
    tl.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 1.2
    }, "-=0.5");
    
    // Add scroll listener for parallax
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const parallaxRate = scrollPos * 0.15;
      
      gsap.to(imageRef.current, {
        y: -parallaxRate * 0.5,
        duration: 0.1
      });
      
      gsap.to(textRef.current, {
        y: parallaxRate * 0.3,
        duration: 0.1
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
        background: 'radial-gradient(circle at 30% 50%, rgba(155, 0, 255, 0.15), transparent 70%)'
      }}
    >
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
                  fontWeight: 700
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
              color="dimmed"
              style={{ 
                maxWidth: '600px',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}
            >
              Specializing in creating intelligent, intuitive applications
              that solve real-world problems with a passion for clean code and innovative solutions.
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
                  transition: 'all 0.3s ease'
                }}
                sx={{
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 20px rgba(155, 0, 255, 0.4)'
                  }
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
                variant="outline"
                leftSection={<IconBrandGithub size={20} />}
                rightSection={<IconArrowRight size={16} />}
                radius="xl"
                style={{
                  borderColor: '#9B00FF',
                  color: '#00F5FF',
                  transition: 'all 0.3s ease'
                }}
                sx={{
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    background: 'rgba(155, 0, 255, 0.1)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                GitHub Profile
              </Button>
            </Group>
          </Grid.Col>
          
          <Grid.Col md={5} style={{ position: 'relative' }}>
            <Box
              ref={imageRef}
              style={{
                position: 'relative',
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <Box
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '-40px',
                  right: '-40px',
                  bottom: '-40px',
                  background: 'linear-gradient(135deg, rgba(155, 0, 255, 0.3), rgba(0, 245, 255, 0.2))',
                  borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
                  filter: 'blur(60px)',
                  opacity: 0.5,
                  zIndex: -1,
                  animation: 'morphBlob 8s infinite ease-in-out'
                }}
              />
              
              <Image 
                src="/hxndev.github.io/images/profile.jpg" 
                alt="Hassan Shahzad" 
                radius="xl"
                height={450}
                fit="cover"
                style={{
                  border: '4px solid rgba(155, 0, 255, 0.3)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(155, 0, 255, 0.4)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'all 0.5s ease'
                }}
              />
              
              {/* Decorative elements */}
              <Box
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00F5FF, transparent)',
                  opacity: 0.7,
                  filter: 'blur(20px)'
                }}
              />
              
              <Box
                style={{
                  position: 'absolute',
                  bottom: '-30px',
                  left: '-30px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9B00FF, transparent)',
                  opacity: 0.6,
                  filter: 'blur(30px)'
                }}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
      
      {/* Add animated scroll indicator */}
      <Box
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 0.7,
          animation: 'fadeInUp 2s 1s forwards'
        }}
      >
        <Text size="sm" mb={10} style={{ opacity: 0.7 }}>Scroll to explore</Text>
        <Box
          style={{
            width: '30px',
            height: '50px',
            border: '2px solid rgba(155, 0, 255, 0.5)',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            padding: '5px 0'
          }}
        >
          <Box
            style={{
              width: '6px',
              height: '10px',
              background: 'linear-gradient(#9B00FF, #00F5FF)',
              borderRadius: '3px',
              animation: 'scrollIndicator 2s infinite'
            }}
          />
        </Box>
      </Box>
      
      {/* Add keyframes for animations */}
      <style>
        {`
          @keyframes morphBlob {
            0% { border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; }
            25% { border-radius: 60% 40% 40% 60% / 60% 60% 40% 40%; }
            50% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; }
            75% { border-radius: 40% 60% 60% 40% / 60% 60% 40% 40%; }
            100% { border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%; }
          }
          
          @keyframes scrollIndicator {
            0% { transform: translateY(0); opacity: 1; }
            75% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 0; }
          }
          
          @keyframes fadeInUp {
            from { opacity: 0; transform: translate(-50%, 30px); }
            to { opacity: 0.7; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </Box>
  );
};

export default HeroSection;