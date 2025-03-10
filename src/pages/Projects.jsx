import React, { useState, useEffect } from 'react';
import { Title, Text, Container, Box, Alert, Button } from '@mantine/core';
import { IconAlertCircle, IconRocket } from '@tabler/icons-react';
import { gsap } from 'gsap';

// Custom hooks - Fixed imports
import { useProjectFilter } from '../hooks/useProjectFilter';
import { useProjectDetail } from '../hooks/useProjectDetail';
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
  
  // Sample project data - in a real application, this would come from an API or CMS
  const projectsData = [
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
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      description: 'An interactive portfolio website built with React, featuring advanced animations and a responsive design.',
      longDescription: 'This portfolio website showcases my projects and skills with a focus on user experience and visual appeal. It features smooth animations, responsive design, and accessibility features. The site is built with React and uses modern CSS techniques for styling.',
      image: 'https://placehold.co/600x400/00F5FF/FFFFFF?text=Portfolio',
      technologies: ['React', 'Mantine UI', 'GSAP', 'JavaScript'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      featured: true,
      category: 'web',
      date: 'Mar 2023',
      features: [
        'Interactive project showcase',
        'Animated section transitions',
        'Responsive design for all devices',
        'Dark/light mode toggle',
        'Performance optimized animations'
      ],
      technicalDetails: {
        description: 'This portfolio uses React with the Mantine UI library and GSAP for animations. It follows modern front-end practices with a focus on performance and accessibility.',
        architecture: 'The site is built with a component-based architecture, with reusable UI components and custom hooks for state management. Animation logic is abstracted into separate utilities for maintainability.',
        challenges: [
          {
            challenge: 'Balancing animation complexity with performance',
            solution: 'Implemented throttling and debouncing techniques for scroll events, and used requestAnimationFrame for smooth animations.'
          },
          {
            challenge: 'Supporting both dark and light themes',
            solution: 'Created a theme system with CSS variables and context API to manage theme state across the application.'
          }
        ]
      },
      screenshots: [
        {
          image: 'https://placehold.co/600x400/00F5FF/FFFFFF?text=Home',
          caption: 'Home page with hero section'
        },
        {
          image: 'https://placehold.co/600x400/9B00FF/FFFFFF?text=Projects',
          caption: 'Projects showcase gallery'
        }
      ]
    },
    {
      id: 'ml-project',
      title: 'Machine Learning Project',
      description: 'An intelligent system that uses machine learning algorithms to process natural language and generate insights.',
      longDescription: 'This machine learning project focuses on natural language processing to extract insights from text data. It can classify text, extract key information, and generate summaries. The system is trained on a diverse dataset to ensure accuracy across different domains.',
      image: 'https://placehold.co/600x400/6200EE/FFFFFF?text=ML+Project',
      technologies: ['Python', 'TensorFlow', 'NLP', 'Data Science'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      featured: true,
      category: 'ai',
      date: 'Nov 2022',
      features: [
        'Text classification and sentiment analysis',
        'Named entity recognition',
        'Automatic text summarization',
        'Keyword extraction',
        'Custom model training pipeline'
      ],
      technicalDetails: {
        description: 'This project uses TensorFlow and transformers to build natural language processing models for text analysis and generation.',
        architecture: 'The system consists of a preprocessing pipeline, multiple model architectures for different tasks, and a unified API for interfacing with the models.',
        challenges: [
          {
            challenge: 'Training models with limited labeled data',
            solution: 'Implemented transfer learning approaches using pre-trained language models like BERT and fine-tuning them on domain-specific data.'
          },
          {
            challenge: 'Handling multiple languages efficiently',
            solution: 'Developed a language detection module and separate processing pipelines for each supported language.'
          }
        ]
      },
      screenshots: [
        {
          image: 'https://placehold.co/600x400/6200EE/FFFFFF?text=Model+Training',
          caption: 'Model training dashboard'
        },
        {
          image: 'https://placehold.co/600x400/9B00FF/FFFFFF?text=Text+Analysis',
          caption: 'Text analysis results'
        },
        {
          image: 'https://placehold.co/600x400/00F5FF/FFFFFF?text=Performance+Metrics',
          caption: 'Model performance metrics'
        }
      ]
    },
    {
      id: 'mobile-app',
      title: 'Mobile App',
      description: 'A cross-platform mobile application for productivity and task management built with React Native.',
      image: 'https://placehold.co/600x400/FF3864/FFFFFF?text=Mobile+App',
      technologies: ['React Native', 'Firebase', 'Redux', 'JavaScript'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      category: 'mobile',
      date: 'Jul 2022',
      features: [
        'Task management with categories',
        'Calendar integration',
        'Push notifications',
        'Data synchronization across devices',
        'Offline mode support'
      ]
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing complex datasets with customizable charts and filters.',
      image: 'https://placehold.co/600x400/00F5FF/FFFFFF?text=Data+Viz',
      technologies: ['D3.js', 'React', 'Node.js', 'Express', 'MongoDB'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      category: 'data',
      date: 'Sep 2022'
    },
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
      image: 'https://placehold.co/600x400/9B00FF/FFFFFF?text=E-commerce',
      technologies: ['Next.js', 'Stripe', 'MongoDB', 'TypeScript'],
      githubUrl: 'https://github.com/HxnDev',
      liveUrl: '#',
      category: 'web',
      date: 'Apr 2022'
    }
  ];
  
  // Initialize project data and hooks
  useEffect(() => {
    // Simulate loading data from an API
    const loadProjects = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/projects');
        // const data = await response.json();
        
        setIsLoading(false);
        
        // Animate the page title
        if (!reducedMotion) {
          gsap.fromTo(
            '.page-title',
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects. Please try again later.');
        setIsLoading(false);
      }
    };
    
    loadProjects();
  }, [reducedMotion]);
  
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
          {error && (
            <Alert 
              icon={<IconAlertCircle size={16} />} 
              title="Error" 
              color="red" 
              mb="lg"
            >
              {error}
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
            {isLoading ? (
              <Text align="center" py={50}>Loading projects...</Text>
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