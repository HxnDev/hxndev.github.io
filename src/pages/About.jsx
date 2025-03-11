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
import ConnectSection from '../components/ConnectSection';

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
      <Title 
        order={1} 
        className="page-title" 
        mb="xl"
        style={{
          backgroundImage: 'linear-gradient(45deg, #6200EE, #03DAC5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        About Me
      </Title>
      
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
      
      {/* Connect with me section */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.6} mb="xl">
        <ConnectSection />
      </AnimatedSection>
      
      {/* Support My Work section */}
      <AnimatedSection animation="fadeInUp" duration={0.8} delay={0.8} mb="xl">
        <SponsorshipSection />
      </AnimatedSection>
    </Container>
  );
};

export default About;