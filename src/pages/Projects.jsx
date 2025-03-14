import React, { useState, useEffect, useCallback } from 'react';
import { Title, Text, Container, Box, Alert, Button, Loader, SimpleGrid } from '@mantine/core';
import { IconAlertCircle, IconRocket } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Custom hooks
import { useProjectFilter } from '../hooks/useProjectFilter';
import { useProjectDetail } from '../hooks/useProjectDetail';
import { useGetProjects } from '../hooks/useGetProjects';
import { useAnimationContext } from '../context/AnimationContext';

// Components
import FilterControls from '../components/projects/FilterControls';
import EnhancedProjectCard from '../components/projects/EnhancedProjectCard';
import ProjectDetail from '../components/projects/ProjectDetail';
import ProjectModal from '../components/projects/ProjectModal';

const Projects = () => {
  const { reducedMotion } = useAnimationContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch projects data
  const {
    projects: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useGetProjects();

  // Project filtering hook
  const {
    filteredProjects,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    resetFilters,
  } = useProjectFilter(projectsData);

  // Project detail view hook
  const {
    selectedProject,
    isModalOpen,
    viewMode,
    openProjectModal,
    closeProjectModal,
    viewProjectDetails,
    returnToGallery,
  } = useProjectDetail();

  // Handle view project details with proper navigation
  const handleViewDetails = useCallback(
    (projectId, action = 'page') => {
      if (action === 'reset') {
        resetFilters();
        navigate('/projects', { replace: true });
        return;
      }

      if (!projectId) {
        return;
      }

      if (action === 'modal') {
        openProjectModal(projectId, projectsData);
      } else if (action === 'page') {
        const expectedSearch = `?project=${projectId}`;
        // Only update the URL if it is different than what we expect
        if (location.search !== expectedSearch) {
          navigate(`/projects${expectedSearch}`);
        }
        viewProjectDetails(projectId, projectsData);
      }
    },
    [navigate, location.search, resetFilters, openProjectModal, projectsData, viewProjectDetails]
  );

  // Check for direct project link in URL or reset view mode
  useEffect(() => {
    // If we're not on a specific project page, ensure we're in gallery mode
    if (!location.search && viewMode !== 'gallery') {
      returnToGallery();
    }
    
    // Check for direct project link in URL
    const urlParams = new URLSearchParams(location.search);
    const projectId = urlParams.get('project');
    
    if (projectId && projectsData && projectsData.length > 0) {
      // If we have a project ID in the URL and data is loaded, show the project
      handleViewDetails(projectId);
    }
    
    // Set loading state based on projects data
    if (!projectsLoading) {
      setIsLoading(false);
    }
  }, [projectsLoading, projectsData, location.search, handleViewDetails, viewMode, returnToGallery]);

  // Handle back to gallery with proper state management
  const handleBackToGallery = () => {
    // First reset state - this is important to do BEFORE navigation
    returnToGallery();
    
    // Then update URL (after state is reset)
    // This prevents the temporary blank page
    setTimeout(() => {
      navigate('/projects', { replace: true });
    }, 0);
  };

  return (
    <Container size="lg">
      {viewMode === 'gallery' ? (
        <>
          <Title order={1} className="page-title" mb="xl">
            Projects
          </Title>

          {(error || projectsError) && (
            <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="lg">
              {error || projectsError}
              <Button
                variant="outline"
                color="red"
                size="xs"
                mt="sm"
                onClick={() => setError(null)}
              >
                Dismiss
              </Button>
            </Alert>
          )}

          <FilterControls
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onReset={resetFilters}
          />

          <Box mt={30}>
            {isLoading || projectsLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <Loader color="grape" size="lg" />
                <Text align="center">Loading projects...</Text>
              </Box>
            ) : (
              <>
                {filteredProjects.length > 0 ? (
                  <SimpleGrid
                    cols={3}
                    spacing="lg"
                    breakpoints={[
                      { maxWidth: 992, cols: 2, spacing: 'md' },
                      { maxWidth: 768, cols: 1, spacing: 'sm' },
                    ]}
                  >
                    {filteredProjects.map((project, index) => (
                      <div
                        key={project.id || index}
                        style={{
                          animation: `fadeInUp 0.5s ease forwards ${0.1 + (index % 9) * 0.05}s`,
                          opacity: 0,
                        }}
                      >
                        <EnhancedProjectCard
                          {...project}
                          image={
                            project.image ? project.image.replace(/^\/|^\/public\//, '') : null
                          }
                          onViewDetails={handleViewDetails}
                          projectId={project.id}
                        />
                      </div>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '300px',
                      flexDirection: 'column',
                      gap: '1rem',
                      background: 'rgba(155, 0, 255, 0.05)',
                      borderRadius: '8px',
                      border: '1px dashed rgba(155, 0, 255, 0.3)',
                    }}
                  >
                    <IconAlertCircle size={48} style={{ opacity: 0.5 }} />
                    <Text align="center" size="lg">
                      No projects found with the current filters
                    </Text>
                    <Button
                      onClick={resetFilters}
                      variant="gradient"
                      gradient={{ from: '#9B00FF', to: '#00F5FF' }}
                    >
                      Reset Filters
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>

          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeProjectModal}
          />
        </>
      ) : (
        <ProjectDetail project={selectedProject} onBack={handleBackToGallery} />
      )}

      {viewMode === 'gallery' && activeCategory === 'all' && !searchQuery && (
        <Box
          mt={50}
          mb={30}
          p="xl"
          sx={theme => ({
            borderRadius: theme.radius.md,
            background: 'linear-gradient(135deg, rgba(155, 0, 255, 0.1), rgba(0, 245, 255, 0.1))',
            border: '1px dashed rgba(155, 0, 255, 0.3)',
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <IconRocket size={32} style={{ color: '#9B00FF' }} />
            <div>
              <Title order={4} mb="xs">
                Interested in a collaboration?
              </Title>
              <Text>
                I'm always open to discussing new projects and opportunities. Feel free to reach out
                if you'd like to work together!
              </Text>
            </div>
            <Button
              component="a"
              href="/contact"
              variant="gradient"
              gradient={{ from: '#9B00FF', to: '#00F5FF' }}
              ml="auto"
              sx={{
                boxShadow: '0 4px 15px rgba(155, 0, 255, 0.3)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 20px rgba(155, 0, 255, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Box>
      )}

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
    </Container>
  );
};

export default Projects;