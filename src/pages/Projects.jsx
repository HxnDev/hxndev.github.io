import React, { useState, useEffect } from 'react';
import { Title, Text, Container, Box, Alert, Button, Loader } from '@mantine/core';
import { IconAlertCircle, IconRocket } from '@tabler/icons-react';

// Custom hooks
import { useProjectFilter } from '../hooks/useProjectFilter';
import { useProjectDetail } from '../hooks/useProjectDetail';
import { useGitHubProjects } from '../hooks/useGithubProjects';
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
  
  // Fetch projects data
  const { 
    projects: projectsData, 
    loading: projectsLoading, 
    error: projectsError 
  } = useGitHubProjects();
  
  // Initialize project data and hooks
  useEffect(() => {
    // Simplified loading logic to avoid extra state updates
    if (!projectsLoading) {
      setIsLoading(false);
    }
  }, [projectsLoading]);
  
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
          {(error || projectsError) && (
            <Alert 
              icon={<IconAlertCircle size={16} />} 
              title="Error" 
              color="red" 
              mb="lg"
            >
              {error || projectsError}
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
            {isLoading || projectsLoading ? (
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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