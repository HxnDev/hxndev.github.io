import React from 'react';
import { Container, Title, Text, Group, Button, Grid } from '@mantine/core';
import HeroSection from '../components/home/HeroSection';
import ProjectCard from '../components/ProjectCard';
import SponsorshipSection from '../components/SponsorshipSection';

const Home = () => {
  // Example featured projects data
  const featuredProjects = [
    {
      title: 'AI Job Match Analyzer',
      description: 'A powerful tool that helps job seekers analyze their resumes against job descriptions and generate AI-powered cover letters.',
      image: 'https://placehold.co/600x400/9B00FF/FFFFFF?text=AI+Job+Analyzer',
      technologies: ['React', 'Flask', 'Python', 'AI'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Portfolio Website',
      description: 'An interactive portfolio website built with React, featuring advanced animations and a responsive design.',
      image: 'https://placehold.co/600x400/00F5FF/FFFFFF?text=Portfolio',
      technologies: ['React', 'Mantine UI', 'GSAP', 'JavaScript'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Machine Learning Project',
      description: 'An intelligent system that uses machine learning algorithms to process natural language and generate insights.',
      image: 'https://placehold.co/600x400/6200EE/FFFFFF?text=ML+Project',
      technologies: ['Python', 'TensorFlow', 'NLP', 'Data Science'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      featured: true
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Projects Section */}
      <Container size="lg" style={{ padding: '60px 0' }}>
        <Title 
          order={2} 
          mb={50}
          sx={(theme) => ({
            fontSize: '2.5rem',
            fontWeight: 700,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: theme.fn.linearGradient(45, '#6200EE', '#00F5FF'),
              borderRadius: '2px'
            }
          })}
        >
          Featured Projects
        </Title>
        
        <Grid>
          {featuredProjects.map((project, index) => (
            <Grid.Col key={index} md={6} lg={4}>
              <ProjectCard {...project} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      
      {/* Enhanced Sponsorship Section */}
      <Container size="lg" style={{ padding: '20px 0 80px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(155, 0, 255, 0.1), rgba(0, 245, 255, 0.1))',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Title order={2} align="center" mb="md">Support My Work</Title>
          
          <Text align="center" mb="xl" maw={600} mx="auto">
            If you find my projects helpful, consider supporting their continued development and maintenance.
          </Text>
          
          <Group position="center">
            <Button 
              component="a"
              href="https://github.com/sponsors/HxnDev"
              target="_blank"
              color="pink"
              variant="filled"
              size="md"
              styles={{
                root: {
                  background: 'linear-gradient(45deg, #FF3864, #9B00FF)',
                  boxShadow: '0 4px 12px rgba(155, 0, 255, 0.3)',
                }
              }}
            >
              Sponsor on GitHub
            </Button>
            
            <Button
              component="a"
              href="https://www.buymeacoffee.com/hassanshahzad"
              target="_blank"
              variant="filled"
              color="yellow"
              size="md"
              styles={{
                root: {
                  background: 'linear-gradient(45deg, #FFCC33, #FF9500)',
                  boxShadow: '0 4px 12px rgba(255, 149, 0, 0.3)',
                }
              }}
            >
              Buy Me a Coffee
            </Button>
          </Group>
        </div>
      </Container>
    </div>
  );
};

export default Home;