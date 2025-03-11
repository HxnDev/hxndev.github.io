import React, { useRef, useEffect, useState } from 'react';
import { SimpleGrid, Box, Text, Transition, Center, Button } from '@mantine/core';
import { IconMoodSad, IconArrowRight } from '@tabler/icons-react';
import { gsap } from 'gsap';
import ProjectCard from './ProjectCard';
import { useAnimationContext } from '../../context/AnimationContext';

const ProjectGallery = ({ filteredProjects, searchQuery, onViewDetails }) => {
  const galleryRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const [animationComplete, setAnimationComplete] = useState(false);

  // Handle masonry layout
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumns(1);
      } else if (width < 992) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate cards when filtered projects change
  useEffect(() => {
    if (!galleryRef.current || reducedMotion) {
      setAnimationComplete(true);
      return;
    }

    // Set animation as not complete at start
    setAnimationComplete(false);

    // Clear any existing animations
    const cards = galleryRef.current.querySelectorAll('.project-card-wrapper');
    if (cards.length > 0) {
      gsap.killTweensOf(cards);
    }

    // Wait a short time for the DOM to update
    const timeoutId = setTimeout(() => {
      const updatedCards = galleryRef.current?.querySelectorAll('.project-card-wrapper');

      if (updatedCards && updatedCards.length > 0) {
        // Convert NodeList to Array for GSAP
        const cardsArray = Array.from(updatedCards);

        gsap.fromTo(
          cardsArray,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            onComplete: () => setAnimationComplete(true),
          }
        );
      } else {
        // If no cards found, still mark animation as complete
        setAnimationComplete(true);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [filteredProjects, reducedMotion]);

  // Highlight search matches
  const highlightMatches = (text, query) => {
    if (!query || query.length < 3 || typeof text !== 'string') return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return parts.map((part, index) =>
      part.toLowerCase() === query?.toLowerCase() ? (
        <Text
          key={index}
          span
          weight={700}
          color="grape"
          sx={{ background: 'rgba(155, 0, 255, 0.1)' }}
        >
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  return (
    <Box ref={galleryRef}>
      {filteredProjects.length > 0 ? (
        <Transition mounted={true} transition="fade" duration={500}>
          {styles => (
            <SimpleGrid
              cols={columns}
              spacing="lg"
              breakpoints={[
                { maxWidth: 992, cols: 2, spacing: 'md' },
                { maxWidth: 768, cols: 1, spacing: 'sm' },
              ]}
              style={styles}
            >
              {filteredProjects.map((project, index) => (
                <Box
                  key={project.id || index}
                  className="project-card-wrapper"
                  sx={{
                    opacity: animationComplete ? 1 : 0,
                    transform: animationComplete
                      ? 'translateY(0) scale(1)'
                      : 'translateY(30px) scale(0.95)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ProjectCard
                    {...project}
                    onViewDetails={onViewDetails}
                    projectId={project.id || index}
                    title={
                      searchQuery && searchQuery.length > 2
                        ? highlightMatches(project.title, searchQuery)
                        : project.title
                    }
                    description={
                      searchQuery && searchQuery.length > 2
                        ? highlightMatches(project.description, searchQuery)
                        : project.description
                    }
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Transition>
      ) : (
        <Transition mounted={true} transition="fade" duration={500}>
          {styles => (
            <Center py={50} style={styles}>
              <Box
                sx={{
                  textAlign: 'center',
                  padding: '2rem',
                  borderRadius: 'md',
                  background: 'rgba(155, 0, 255, 0.05)',
                  border: '1px dashed rgba(155, 0, 255, 0.3)',
                }}
              >
                <IconMoodSad size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <Text size="lg" mb="xs">
                  No projects found matching your criteria.
                </Text>
                <Text color="dimmed" mb="lg">
                  Try adjusting your search or filter settings.
                </Text>
                <Button
                  variant="outline"
                  color="grape"
                  onClick={() => {
                    // Reset filters
                    if (typeof onViewDetails === 'function') {
                      onViewDetails(null, 'reset');
                    }
                  }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  View All Projects
                </Button>
              </Box>
            </Center>
          )}
        </Transition>
      )}
    </Box>
  );
};

export default ProjectGallery;
