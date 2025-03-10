import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Group, Button, Grid, Loader, Box } from '@mantine/core';
import HeroSection from '../components/home/HeroSection';
import ProjectCard from '../components/projects/ProjectCard';
import SponsorshipSection from '../components/SponsorshipSection';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

const Home = () => {
  const { 
    projects: githubProjects, 
    loading: githubLoading, 
    error: githubError 
  } = useGitHubProjects('HxnDev');
  
  // Get featured projects only
  const featuredProjects = githubLoading ? [] : 
    githubProjects
      .filter(project => project.featured)
      .slice(0, 3); // Get only the first 3 featured projects
  
  // Fallback projects if GitHub API fails
  const fallbackProjects = [
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
  
  // Decide which projects to display
  const projectsToShow = githubError || featuredProjects.length === 0 ? 
    fallbackProjects : featuredProjects;

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
        
        {githubLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column', gap: '1rem' }}>
            <Loader color="grape" size="lg" />
            <Text align="center">Loading projects...</Text>
          </Box>
        ) : (
          <Grid>
            {projectsToShow.map((project, index) => (
              <Grid.Col key={index} md={6} lg={4}>
                <ProjectCard {...project} />
              </Grid.Col>
            ))}
          </Grid>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <Button
            component="a"
            href="/hxndev.github.io/projects"
            size="lg"
            variant="gradient"
            gradient={{ from: '#9B00FF', to: '#00F5FF' }}
            sx={{
              boxShadow: '0 4px 15px rgba(155, 0, 255, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 20px rgba(155, 0, 255, 0.4)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            View All Projects
          </Button>
        </Box>
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