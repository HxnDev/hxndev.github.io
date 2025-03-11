import React, { useRef, useEffect } from 'react';
import {
  Container,
  Box,
  Text,
  Title,
  Image,
  Group,
  Badge,
  Button,
  SimpleGrid,
  ThemeIcon,
  List,
  Divider,
} from '@mantine/core';
import {
  IconExternalLink,
  IconBrandGithub,
  IconArrowLeft,
  IconCircleCheck,
} from '@tabler/icons-react';
import { gsap } from 'gsap';
import { useColorScheme } from '../../theme/ThemeProvider';
import { useAnimationContext } from '../../context/AnimationContext';

const ProjectDetail = ({ project, onBack }) => {
  const containerRef = useRef(null);
  const { colorScheme, quantumColors } = useColorScheme();
  const { reducedMotion } = useAnimationContext();
  const isDark = colorScheme === 'dark';

  // Animate entrance
  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const elements = containerRef.current.querySelectorAll('.animate-in');

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
    );
  }, [project, reducedMotion]);

  if (!project) return null;

  // Add screenshots section if available
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <Container size="lg" ref={containerRef}>
      {/* Back button */}
      <Button
        className="animate-in"
        variant="subtle"
        color="gray"
        onClick={onBack}
        leftSection={<IconArrowLeft size={16} />}
        mb="lg"
        mt="md"
        sx={{
          '&:hover': {
            transform: 'translateX(-5px)',
            background: 'rgba(155, 0, 255, 0.1)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Back to Projects
      </Button>

      {/* Hero section */}
      <Box
        className="animate-in"
        sx={{
          position: 'relative',
          borderRadius: 'lg',
          overflow: 'hidden',
          marginBottom: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Image
          src={project.image || 'https://placehold.co/1200x400/9B00FF/FFFFFF?text=Project+Image'}
          alt={project.title}
          height={400}
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: `linear-gradient(to top, ${
              isDark ? 'rgba(28, 29, 34, 0.9)' : 'rgba(255, 255, 255, 0.9)'
            }, transparent)`,
            zIndex: 2,
          }}
        />

        {/* Project title overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            right: '30px',
            zIndex: 3,
          }}
        >
          <Title order={1}>{project.title}</Title>
          <Group spacing="xs" mt="xs">
            {project.featured && (
              <Badge
                color="grape"
                variant="filled"
                size="lg"
                sx={{
                  background: 'linear-gradient(45deg, #9B00FF, #6200EE)',
                  boxShadow: '0 2px 8px rgba(155, 0, 255, 0.3)',
                }}
              >
                Featured Project
              </Badge>
            )}
            {project.date && (
              <Badge color="blue" variant="light" size="lg">
                {project.date}
              </Badge>
            )}
          </Group>
        </Box>
      </Box>

      {/* Main content */}
      <SimpleGrid cols={2} spacing={50} breakpoints={[{ maxWidth: 'md', cols: 1, spacing: 'md' }]}>
        {/* Left column - Project overview */}
        <Box>
          <Title className="animate-in" order={2} mb="md">
            Overview
          </Title>
          <Text className="animate-in" size="lg" mb="xl">
            {project.description}
          </Text>

          {project.longDescription && (
            <Text className="animate-in" mb="xl">
              {project.longDescription}
            </Text>
          )}

          {project.features && (
            <>
              <Title className="animate-in" order={3} mb="md">
                Key Features
              </Title>
              <List
                spacing="sm"
                mb="xl"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCircleCheck size={16} />
                  </ThemeIcon>
                }
              >
                {project.features.map((feature, index) => (
                  <List.Item
                    key={index}
                    className="animate-in"
                    sx={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    {feature}
                  </List.Item>
                ))}
              </List>
            </>
          )}

          {/* Action Buttons */}
          <Group className="animate-in" mt="xl">
            {project.liveUrl && (
              <Button
                component="a"
                href={project.liveUrl}
                target="_blank"
                leftSection={<IconExternalLink size={16} />}
                sx={{
                  background: 'linear-gradient(45deg, #6200EE, #9B00FF)',
                  boxShadow: '0 3px 10px rgba(155, 0, 255, 0.3)',
                  '&:hover': {
                    boxShadow: '0 5px 15px rgba(155, 0, 255, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View Live Demo
              </Button>
            )}

            {project.githubUrl && (
              <Button
                component="a"
                href={project.githubUrl}
                target="_blank"
                variant="outline"
                leftSection={<IconBrandGithub size={16} />}
                sx={{
                  borderColor: 'rgba(155, 0, 255, 0.5)',
                  color: '#9B00FF',
                  '&:hover': {
                    background: 'rgba(155, 0, 255, 0.1)',
                    borderColor: '#9B00FF',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                View Source Code
              </Button>
            )}
          </Group>
        </Box>

        {/* Right column - Technical details */}
        <Box>
          <Title className="animate-in" order={2} mb="md">
            Technical Details
          </Title>

          {project.technicalDetails ? (
            <>
              <Text className="animate-in" mb="lg">
                {project.technicalDetails.description ||
                  'Technical information about this project.'}
              </Text>

              {project.technicalDetails.architecture && (
                <>
                  <Title className="animate-in" order={3} mb="md">
                    Architecture
                  </Title>
                  <Text className="animate-in" mb="xl">
                    {project.technicalDetails.architecture}
                  </Text>
                </>
              )}

              {project.technicalDetails.challenges && (
                <>
                  <Title className="animate-in" order={3} mb="md">
                    Challenges & Solutions
                  </Title>
                  <List spacing="sm" mb="xl">
                    {project.technicalDetails.challenges.map((challenge, index) => (
                      <List.Item
                        key={index}
                        className="animate-in"
                        sx={{ animationDelay: `${0.2 + index * 0.1}s` }}
                      >
                        <Text weight={700}>{challenge.challenge}</Text>
                        <Text>{challenge.solution}</Text>
                      </List.Item>
                    ))}
                  </List>
                </>
              )}
            </>
          ) : (
            <Text className="animate-in" color="dimmed">
              Detailed technical information not available for this project.
            </Text>
          )}

          <Divider my="xl" className="animate-in" />

          <Title className="animate-in" order={3} mb="md">
            Technologies
          </Title>
          <Group className="animate-in" spacing="xs">
            {project.technologies &&
              project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  color="teal"
                  size="lg"
                  sx={{
                    borderColor: '#00F5FF',
                    color: '#00F5FF',
                    background: 'rgba(0, 245, 255, 0.05)',
                    marginBottom: '10px',
                  }}
                >
                  {tech}
                </Badge>
              ))}
          </Group>
        </Box>
      </SimpleGrid>

      {hasScreenshots && (
        <Container size="lg" mt="xl">
          <Divider my="xl" className="animate-in" />
          <Title className="animate-in" order={2} mb="xl">
            Screenshots
          </Title>

          <SimpleGrid
            cols={3}
            spacing="md"
            breakpoints={[
              { maxWidth: 'md', cols: 2, spacing: 'md' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' },
            ]}
          >
            {project.screenshots.map((screenshot, index) => (
              <Box
                key={index}
                className="animate-in"
                sx={{
                  borderRadius: 'md',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Image
                  src={screenshot.image}
                  alt={screenshot.caption}
                  height={200}
                  sx={{
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <Box p="sm">
                  <Text size="sm" weight={500}>
                    {screenshot.caption}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      )}
    </Container>
  );
};

export default ProjectDetail;
