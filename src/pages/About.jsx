import React, { useEffect, useRef } from 'react';
import { Title, Text, Container, List, ThemeIcon, Group, Image, Paper, Grid, Box, SimpleGrid, Anchor } from '@mantine/core';
import { IconCheck, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import SponsorshipSection from '../components/SponsorshipSection';
import BiographySection from '../components/about/BiographySection';
import Timeline from '../components/about/Timeline';
import SkillsVisualization from '../components/about/SkillsVisualization';
import AnimatedSection from '../components/common/AnimatedSection';
import { useAnimationContext } from '../context/AnimationContext';
import { gsap } from 'gsap';
import { useColorScheme } from '../theme/ThemeProvider';

const About = () => {
  const pageRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Page entrance animation
  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;
    
    // Animate title
    const title = pageRef.current.querySelector('.page-title');
    gsap.fromTo(
      title,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [reducedMotion]);
  
  // Prepare experience data for timeline
  const experiences = [
    {
      title: "Software Engineer",
      company: "Company Name",
      date: "Jan 2023 - Present",
      description: "Developing and maintaining web applications using React and Node.js. Leading a team of frontend developers."
    },
    {
      title: "ML Engineer",
      company: "Company Name",
      date: "Jun 2021 - Dec 2022",
      description: "Designed and implemented machine learning models for natural language processing applications."
    },
    {
      title: "Software Developer Intern",
      company: "Company Name",
      date: "Jan 2021 - May 2021",
      description: "Assisted in the development of a web application using React and Firebase."
    }
  ];
  
  // Prepare skills data
  const skills = [
    { name: 'JavaScript', level: 95, category: 'Languages' },
    { name: 'TypeScript', level: 85, category: 'Languages' },
    { name: 'Python', level: 80, category: 'Languages' },
    { name: 'C++', level: 70, category: 'Languages' },
    { name: 'Java', level: 75, category: 'Languages' },
    
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Next.js', level: 85, category: 'Frontend' },
    { name: 'Vue.js', level: 80, category: 'Frontend' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend' },
    { name: 'GSAP', level: 85, category: 'Frontend' },
    
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Express', level: 80, category: 'Backend' },
    { name: 'Flask', level: 75, category: 'Backend' },
    { name: 'Django', level: 70, category: 'Backend' },
    
    { name: 'TensorFlow', level: 75, category: 'AI/ML' },
    { name: 'PyTorch', level: 70, category: 'AI/ML' },
    { name: 'scikit-learn', level: 80, category: 'AI/ML' },
    
    { name: 'MongoDB', level: 85, category: 'Database' },
    { name: 'PostgreSQL', level: 80, category: 'Database' },
    { name: 'Redis', level: 75, category: 'Database' },
    
    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'AWS', level: 75, category: 'DevOps' },
    { name: 'Firebase', level: 85, category: 'DevOps' },
    
    { name: 'Git', level: 90, category: 'Tools' }
  ];
  
  // Bio paragraphs
  const bio = [
    "I'm a passionate developer with expertise in building applications that combine intuitive user experiences with powerful backend systems. My focus is on creating technology that solves real problems.",
    "With a background in both software engineering and machine learning, I specialize in creating applications that leverage AI to deliver innovative solutions. I'm particularly interested in optimizing workflows and improving productivity through technology.",
    "Through my projects and professional experience, I've developed a strong understanding of the entire development lifecycle, from concept to deployment and maintenance. I enjoy tackling complex challenges and finding elegant solutions that prioritize both functionality and user experience."
  ];
  
  return (
    <Container size="lg" ref={pageRef}>
      <Title order={1} className="page-title" mb="xl">About Me</Title>
      
      <Grid gutter={50} mb="xl">
        <Grid.Col md={12}>
          <BiographySection bio={bio} />
        </Grid.Col>
      </Grid>
      
      {/* Skills section */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.2} mb="xl">
        <SkillsVisualization skills={skills} />
      </AnimatedSection>
      
      {/* Experience timeline */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.4} mb="xl">
        <Timeline experiences={experiences} />
      </AnimatedSection>
      
      {/* Connect with me section - Reverted to the original style with clickable cards */}
      <Paper withBorder p="xl" radius="md" mb="xl" style={{ backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(255, 255, 255, 0.7)' }}>
        <Title order={2} mb="xl">Connect With Me</Title>
        
        <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 768, cols: 1 }]}>
          {/* GitHub Card */}
          <Anchor 
            href="https://github.com/HxnDev" 
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <Box 
              p="lg" 
              style={{
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: isDark ? 'rgba(22, 23, 26, 0.4)' : 'rgba(245, 245, 245, 0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(155, 0, 255, 0.2)'
                }
              }}
            >
              <ThemeIcon
                size={80}
                radius="xl"
                style={{
                  backgroundColor: '#9B00FF',
                  color: 'white',
                  marginBottom: '16px'
                }}
              >
                <IconBrandGithub size={40} />
              </ThemeIcon>
              <Title order={4} align="center" style={{ color: '#9B00FF', marginBottom: '8px' }}>GitHub</Title>
              <Text align="center" color="dimmed">
                Check out my projects and contributions
              </Text>
            </Box>
          </Anchor>
          
          {/* LinkedIn Card */}
          <Anchor 
            href="https://www.linkedin.com/in/hassan-shahzad-2a6617212/" 
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <Box 
              p="lg" 
              style={{
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: isDark ? 'rgba(22, 23, 26, 0.4)' : 'rgba(245, 245, 245, 0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0, 119, 181, 0.2)'
                }
              }}
            >
              <ThemeIcon
                size={80}
                radius="xl"
                style={{
                  backgroundColor: '#0077B5',
                  color: 'white',
                  marginBottom: '16px'
                }}
              >
                <IconBrandLinkedin size={40} />
              </ThemeIcon>
              <Title order={4} align="center" style={{ color: '#0077B5', marginBottom: '8px' }}>LinkedIn</Title>
              <Text align="center" color="dimmed">
                Connect with me professionally
              </Text>
            </Box>
          </Anchor>
          
          {/* Email Card */}
          <Anchor 
            href="mailto:hassanshahzad.dev@gmail.com"
            style={{ textDecoration: 'none' }}
          >
            <Box 
              p="lg" 
              style={{
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: isDark ? 'rgba(22, 23, 26, 0.4)' : 'rgba(245, 245, 245, 0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0, 245, 255, 0.2)'
                }
              }}
            >
              <ThemeIcon
                size={80}
                radius="xl"
                style={{
                  backgroundColor: '#00F5FF',
                  color: 'white',
                  marginBottom: '16px'
                }}
              >
                <IconMail size={40} />
              </ThemeIcon>
              <Title order={4} align="center" style={{ color: '#00F5FF', marginBottom: '8px' }}>Email</Title>
              <Text align="center" color="dimmed">
                Send me a direct message
              </Text>
            </Box>
          </Anchor>
        </SimpleGrid>
      </Paper>
      
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.8}>
        <SponsorshipSection />
      </AnimatedSection>
    </Container>
  );
};

export default About;