import React, { useState, useEffect } from 'react';
import { Title, Text, Container, Group, Button, Grid, Loader, Box, SimpleGrid } from '@mantine/core';
import HeroSection from '../components/home/HeroSection';
import EnhancedProjectCard from '../components/projects/EnhancedProjectCard';
import SponsorshipSection from '../components/SponsorshipSection';
import { useGetProjects } from '../hooks/useGetProjects';
import AnimatedSection from '../components/common/AnimatedSection';
import { useColorScheme } from '../theme/ThemeProvider';

const Home = () => {
  const { 
    projects: allProjects, 
    loading: projectsLoading, 
    error: projectsError 
  } = useGetProjects();
  
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Get featured projects
  const featuredProjects = React.useMemo(() => {
    if (!allProjects || allProjects.length === 0) return [];
    return allProjects.filter(project => project.featured === true);
  }, [allProjects]);

  const handleViewDetails = (projectId) => {
    window.location.href = `/hxndev.github.io/projects?project=${projectId}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Projects Section */}
      <Container size="lg" style={{ padding: '60px 0' }}>
        <AnimatedSection animation="fadeInUp" duration={0.8}>
          <Title 
            order={2} 
            mb={50}
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              textAlign: 'center',
              position: 'relative',
              backgroundImage: 'linear-gradient(45deg, #6200EE, #03DAC5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Featured Projects
          </Title>
        </AnimatedSection>
        
        {projectsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column', gap: '1rem' }}>
            <Loader color="grape" size="lg" />
            <Text align="center">Loading projects...</Text>
          </Box>
        ) : projectsError ? (
          <Box sx={{ textAlign: 'center', padding: '40px 0' }}>
            <Text color="red" mb="lg">
              There was an error loading projects. Please try again later.
            </Text>
            <Button variant="outline" color="grape" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Box>
        ) : (
          <SimpleGrid 
            cols={3} 
            spacing="lg"
            breakpoints={[
              { maxWidth: 992, cols: 2, spacing: 'md' },
              { maxWidth: 768, cols: 1, spacing: 'sm' },
            ]}
          >
            {featuredProjects && featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <div key={project.id || index} style={{ 
                  animation: `fadeInUp 0.5s ease forwards ${0.1 + (index % 9) * 0.05}s`,
                  opacity: 0
                }}>
                  <EnhancedProjectCard 
                    {...project} 
                    // Fix potential image path issues
                    image={project.image ? project.image.replace(/^\/|^\/public\//, '') : null}
                    onViewDetails={handleViewDetails}
                    projectId={project.id}
                  />
                </div>
              ))
            ) : (
              <Grid.Col span={12}>
                <Text align="center" c={isDark ? "dimmed" : "dark.6"}>
                  No featured projects found. Total projects: {allProjects ? allProjects.length : 0}
                </Text>
              </Grid.Col>
            )}
          </SimpleGrid>
        )}
      </Container>
      
      {/* Sponsorship Section */}
      <Container size="lg" style={{ padding: '20px 0 80px 0' }}>
        <SponsorshipSection />
      </Container>

      {/* Animation keyframes */}
      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;