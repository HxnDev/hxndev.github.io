import React, { useState, useEffect } from 'react';
import { Title, Text, Container, Box, Alert, Button, Loader } from '@mantine/core';
import { IconAlertCircle, IconRocket } from '@tabler/icons-react';
import { gsap } from 'gsap';

// Custom hooks
import { useProjectFilter } from '../hooks/useProjectFilter';
import { useProjectDetail } from '../hooks/useProjectDetail';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import { useAnimationContext } from '../context/AnimationContext';

// Components
import FilterControls from '../components/projects/FilterControls';
import ProjectGallery from '../components/projects/ProjectGallery';
import ProjectDetail from '../components/projects/ProjectDetail';
import ProjectModal from '../components/projects/ProjectModal';

const Projects = () => {
  const { reducedMotion } = useAnimationContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch projects from GitHub
  const { 
    projects: githubProjects, 
    loading: githubLoading, 
    error: githubError 
  } = useGitHubProjects('HxnDev');
  
  // Sample fallback projects in case GitHub API fails
  const fallbackProjects = [
    {
      id: 'ai-job-match',
      title: 'AI Job Match Analyzer',
      description: 'A powerful tool that helps job seekers analyze their resumes against job descriptions and generate AI-powered cover letters.',
      longDescription: 'This application leverages natural language processing to compare resumes with job descriptions, providing a match percentage and suggesting improvements. It also generates customized cover letters based on the analyzed data. The tool aims to increase the chances of getting interviews by tailoring application materials to specific job requirements.',
      image: 'https://placehold.co/600x400/9B00FF/FFFFFF?text=AI+Job+Analyzer',
      technologies: ['React', 'Flask', 'Python', 'AI', 'Natural Language Processing'],
      githubUrl: 'https://github.com/HxnDev/AI-Job-Match-Analyzer',
      liveUrl: '#',
      featured: true,
      category: 'web',
      date: 'Jan 2023',
      features: [
        'Resume analysis with job description matching',
        'Suggestions for resume improvements',
        'AI-generated cover letters',
        'Job application tracking',
        'Interview preparation tips'
      ],
      technicalDetails: {
        description: 'This application is built with a React frontend and Flask backend, using natural language processing models to analyze text.',
        architecture: 'The system uses a microservice architecture with separate services for document processing, text analysis, and AI generation. A Redis cache improves performance by storing analysis results.',
        challenges: [
          {
            challenge: 'Processing various resume formats',
            solution: 'Developed a unified document parser that can handle PDF, DOCX, and plain text formats with consistent output.'
          },
          {
            challenge: 'Ensuring accurate keyword matching',
            solution: 'Implemented semantic matching using word embeddings rather than exact word matching to capture related skills and concepts.'
          }
        ]
      },
      screenshots: [
        {
          image: 'https://placehold.co/600x400/9B00FF/FFFFFF?text=Dashboard',
          caption: 'Main dashboard with match metrics'
        },
        {
          image: 'https://placehold.co/600x400/6200EE/FFFFFF?text=Analysis',
          caption: 'Detailed resume analysis view'
        },
        {
          image: 'https://placehold.co/600x400/00F5FF/FFFFFF?text=Cover+Letter',
          caption: 'AI cover letter generator'
        }
      ]
    },
    // ... other fallback projects
  ];
  
  // Decide which projects to use (GitHub or fallback)
  const projectsData = githubError ? fallbackProjects : (githubLoading ? [] : githubProjects);
  
  // Initialize project data and hooks
  useEffect(() => {
    // Simulate loading data from an API
    const loadProjects = async () => {
      try {
        // Wait for GitHub projects to load
        if (!githubLoading) {
          setIsLoading(false);
          
          // Animate the page title
          if (!reducedMotion) {
            gsap.fromTo(
              '.page-title',
              { opacity: 0, y: -30 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );
          }
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadProjects();
  }, [githubLoading, reducedMotion]);
  
  // Project filtering hook
  const {
    filteredProjects,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    resetFilters
  } = useProjectFilter(projectsData);
  
  // Project detail view hook
  const {
    selectedProject,
    isModalOpen,
    viewMode,
    openProjectModal,
    closeProjectModal,
    viewProjectDetails,
    returnToGallery
  } = useProjectDetail();
  
  // Handle view project details
  const handleViewDetails = (projectId, action = 'modal') => {
    if (action === 'reset') {
      resetFilters();
      return;
    }
    
    if (action === 'modal') {
      openProjectModal(projectId, projectsData);
    } else if (action === 'page') {
      viewProjectDetails(projectId, projectsData);
    }
  };
  
  return (
    <Container size="lg">
      {viewMode === 'gallery' ? (
        <>
          <Title order={1} className="page-title" mb="xl">Projects</Title>
          
          {/* Error message if needed */}
          {(error || githubError) && (
            <Alert 
              icon={<IconAlertCircle size={16} />} 
              title="Error" 
              color="red" 
              mb="lg"
            >
              {error || githubError}
              <Button variant="outline" color="red" size="xs" mt="sm" onClick={() => setError(null)}>
                Dismiss
              </Button>
            </Alert>
          )}
          
          {/* Filter controls */}
          <FilterControls
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onReset={resetFilters}
          />
          
          {/* Project gallery */}
          <Box mt={30}>
            {isLoading || githubLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', flexDirection: 'column', gap: '1rem' }}>
                <Loader color="grape" size="lg" />
                <Text align="center">Loading projects...</Text>
              </Box>
            ) : (
              <ProjectGallery
                projects={projectsData}
                filteredProjects={filteredProjects}
                searchQuery={searchQuery}
                onViewDetails={handleViewDetails}
              />
            )}
          </Box>
          
          {/* Project modal */}
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeProjectModal}
          />
        </>
      ) : (
        // Detail view
        <ProjectDetail
          project={selectedProject}
          onBack={returnToGallery}
        />
      )}
      
      {/* Featured projects call to action - only show in gallery view with no filters */}
      {viewMode === 'gallery' && activeCategory === 'all' && !searchQuery && (
        <Box
          mt={50}
          mb={30}
          p="xl"
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            background: 'linear-gradient(135deg, rgba(155, 0, 255, 0.1), rgba(0, 245, 255, 0.1))',
            border: '1px dashed rgba(155, 0, 255, 0.3)',
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconRocket size={32} style={{ color: '#9B00FF' }} />
            <div>
              <Title order={4} mb="xs">Interested in a collaboration?</Title>
              <Text>
                I'm always open to discussing new projects and opportunities. 
                Feel free to reach out if you'd like to work together!
              </Text>
            </div>
            <Button 
              component="a" 
              href="/hxndev.github.io/contact"
              variant="gradient" 
              gradient={{ from: '#9B00FF', to: '#00F5FF' }}
              ml="auto"
              sx={{
                boxShadow: '0 4px 15px rgba(155, 0, 255, 0.3)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 20px rgba(155, 0, 255, 0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Projects;