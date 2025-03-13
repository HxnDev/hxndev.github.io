import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Title,
  Text,
  Button,
  Group,
  Badge,
  Image,
  Transition,
  ActionIcon,
  Tabs,
  SimpleGrid,
  ScrollArea,
  ThemeIcon,
  List,
} from '@mantine/core';
import {
  IconX,
  IconExternalLink,
  IconBrandGithub,
  IconDeviceLaptop,
  IconCode,
  IconInfoCircle,
  IconCircleCheck,
  IconRocket,
} from '@tabler/icons-react';
import { gsap } from 'gsap';
import { useColorScheme } from '../../theme/ThemeProvider';
import { useAnimationContext } from '../../context/AnimationContext';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { colorScheme } = useColorScheme();
  const { reducedMotion } = useAnimationContext();
  const isDark = colorScheme === 'dark';

  // Check if this is the JobFit project
  const isJobFit =
    project?.id === 'jobfit' || (project?.title && project?.title.toLowerCase().includes('jobfit'));

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle animation on open/close
  useEffect(() => {
    if (!isOpen || reducedMotion) return;

    // Safe check for refs
    if (!modalRef.current || !overlayRef.current) return;

    // Reset position for animation
    gsap.set(modalRef.current, { y: 50, opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });

    // Create timeline for entrance animation
    const timeline = gsap.timeline({
      defaults: { duration: 0.5, ease: 'power3.out' },
    });

    timeline
      .to(overlayRef.current, { opacity: 1 }, 0)
      .to(modalRef.current, { y: 0, opacity: 1 }, 0.1);

    // Animate content elements if they exist
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, delay: 0.3, duration: 0.5 }
        );
      }
    }

    return () => {
      // Cleanup timeline
      timeline.kill();
    };
  }, [isOpen, reducedMotion]);

  // Handle exit animation
  useEffect(() => {
    if (isOpen || reducedMotion) return;

    // Safe check for refs
    if (!modalRef.current || !overlayRef.current) return;

    gsap.to(modalRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
    });
  }, [isOpen, reducedMotion]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleOverlayClick = e => {
    if (e.target === overlayRef.current && onClose) {
      onClose();
    }
  };

  // If no project data or not open, return null
  if (!project || !isOpen) return null;

  // Handle image loading errors
  const handleImageError = e => {
    if (project.fallbackImage) {
      e.target.src = project.fallbackImage;
    }
  };

  return (
    <Transition mounted={isOpen} transition="fade" duration={300}>
      {styles => (
        <Box
          ref={overlayRef}
          onClick={handleOverlayClick}
          style={{
            ...styles,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <Box
            ref={modalRef}
            style={{
              background: isDark ? 'rgba(28, 29, 34, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              position: 'relative',
              border: `1px solid ${isDark ? 'rgba(155, 0, 255, 0.3)' : 'rgba(155, 0, 255, 0.2)'}`,
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 
                0 0 30px rgba(155, 0, 255, 0.2)`,
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <ActionIcon
              className="animate-item"
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                zIndex: 10,
              }}
              variant="filled"
              radius="xl"
              size="lg"
              color="gray"
              onClick={onClose}
            >
              <IconX size={18} />
            </ActionIcon>

            {/* Hero image */}
            <Box
              sx={{
                maxHeight: '300px',
                overflow: 'hidden',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                position: 'relative',
              }}
            >
              <Image
                src={project.image || project.fallbackImage}
                alt={project.title}
                height={300}
                onError={handleImageError}
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
                  height: '100px',
                  background: `linear-gradient(to top, ${
                    isDark ? 'rgba(28, 29, 34, 1)' : 'rgba(255, 255, 255, 1)'
                  }, transparent)`,
                  zIndex: 2,
                }}
              />

              {/* Title overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '30px',
                  right: '30px',
                  zIndex: 3,
                }}
              >
                <Title order={2} className="animate-item">
                  {project.title}
                </Title>
                {project.featured && (
                  <Badge
                    className="animate-item"
                    color="grape"
                    variant="filled"
                    sx={{
                      background: 'linear-gradient(45deg, #9B00FF, #6200EE)',
                      boxShadow: '0 2px 8px rgba(155, 0, 255, 0.3)',
                    }}
                  >
                    Featured Project
                  </Badge>
                )}

                {/* Live demo badge for JobFit */}
                {isJobFit && project.liveUrl && (
                  <Badge
                    className="animate-item"
                    color="teal"
                    variant="filled"
                    ml="sm"
                    sx={{
                      background: 'linear-gradient(45deg, #00F5FF, #00B5AD)',
                      boxShadow: '0 2px 8px rgba(0, 245, 255, 0.3)',
                    }}
                  >
                    Live Demo Available
                  </Badge>
                )}
              </Box>
            </Box>

            {/* Content area */}
            <Box ref={contentRef} p="xl">
              <Tabs value={activeTab} onChange={setActiveTab} sx={{ marginBottom: '1.5rem' }}>
                <Tabs.List>
                  <Tabs.Tab
                    value="overview"
                    leftSection={<IconInfoCircle size={16} />}
                    className="animate-item"
                  >
                    Overview
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="details"
                    leftSection={<IconCode size={16} />}
                    className="animate-item"
                  >
                    Technical Details
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="images"
                    leftSection={<IconDeviceLaptop size={16} />}
                    className="animate-item"
                  >
                    Screenshots
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>

              <ScrollArea h={380} type="auto" offsetScrollbars>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <Box>
                    <Text className="animate-item" size="lg" mb="lg">
                      {project.description}
                    </Text>

                    {project.longDescription && (
                      <Text className="animate-item" mb="lg">
                        {project.longDescription}
                      </Text>
                    )}

                    {project.features && project.features.length > 0 && (
                      <>
                        <Title order={4} className="animate-item" mb="md">
                          Key Features
                        </Title>
                        <List
                          spacing="sm"
                          mb="lg"
                          center
                          icon={
                            <ThemeIcon color="teal" size={24} radius="xl">
                              <IconCircleCheck size={16} />
                            </ThemeIcon>
                          }
                        >
                          {project.features.map((feature, index) => (
                            <List.Item key={index} className="animate-item">
                              {feature}
                            </List.Item>
                          ))}
                        </List>
                      </>
                    )}

                    <Title order={4} className="animate-item" mt="md" mb="sm">
                      Technologies
                    </Title>
                    <Group className="animate-item" mb="xl">
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
                            }}
                          >
                            {tech}
                          </Badge>
                        ))}
                    </Group>

                    {/* API Key note for JobFit */}
                    {isJobFit && (
                      <Box
                        className="animate-item"
                        sx={{
                          padding: '15px',
                          borderRadius: '8px',
                          border: '1px solid #00F5FF',
                          backgroundColor: 'rgba(0, 245, 255, 0.05)',
                          marginBottom: '20px',
                        }}
                      >
                        <Text size="sm" weight={500}>
                          <IconInfoCircle
                            size={16}
                            style={{ marginRight: '8px', verticalAlign: 'middle' }}
                          />
                          The live demo requires a Google Gemini API key to function. You can obtain
                          a free API key from{' '}
                          <a
                            href="https://aistudio.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#00F5FF', textDecoration: 'underline' }}
                          >
                            Google AI Studio
                          </a>
                          .
                        </Text>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Technical Details Tab */}
                {activeTab === 'details' && (
                  <Box>
                    {project.technicalDetails ? (
                      <>
                        <Text className="animate-item" mb="lg">
                          {project.technicalDetails.description ||
                            'Technical information about this project.'}
                        </Text>

                        {project.technicalDetails.architecture && (
                          <>
                            <Title order={4} className="animate-item" mb="md">
                              Architecture
                            </Title>
                            <Text className="animate-item" mb="lg">
                              {project.technicalDetails.architecture}
                            </Text>
                          </>
                        )}

                        {project.technicalDetails.challenges &&
                          project.technicalDetails.challenges.length > 0 && (
                            <>
                              <Title order={4} className="animate-item" mb="md">
                                Challenges & Solutions
                              </Title>
                              <List spacing="sm" mb="lg">
                                {project.technicalDetails.challenges.map((challenge, index) => (
                                  <List.Item key={index} className="animate-item">
                                    <Text weight={700}>{challenge.challenge}</Text>
                                    <Text>{challenge.solution}</Text>
                                  </List.Item>
                                ))}
                              </List>
                            </>
                          )}
                      </>
                    ) : (
                      <Text className="animate-item" color="dimmed">
                        Detailed technical information not available for this project.
                      </Text>
                    )}
                  </Box>
                )}

                {/* Images Tab */}
                {activeTab === 'images' && (
                  <Box>
                    {project.screenshots && project.screenshots.length > 0 ? (
                      <>
                        <Text className="animate-item" mb="lg">
                          Visual showcase of the project's interface and features.
                        </Text>

                        <SimpleGrid
                          cols={2}
                          spacing="md"
                          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                        >
                          {project.screenshots.map((screenshot, index) => (
                            <Box
                              key={index}
                              className="animate-item"
                              sx={{ borderRadius: 'md', overflow: 'hidden' }}
                            >
                              <Image
                                src={screenshot.image}
                                alt={screenshot.caption}
                                height={200}
                                fit="cover"
                                sx={{
                                  transition: 'transform 0.3s ease',
                                  '&:hover': {
                                    transform: 'scale(1.05)',
                                  },
                                }}
                              />
                              <Text size="sm" align="center" mt="xs">
                                {screenshot.caption}
                              </Text>
                            </Box>
                          ))}
                        </SimpleGrid>
                      </>
                    ) : (
                      <Text className="animate-item" color="dimmed">
                        No additional screenshots available for this project.
                      </Text>
                    )}
                  </Box>
                )}
              </ScrollArea>

              {/* Action buttons */}
              <Group position="center" mt="xl" className="animate-item">
                {isJobFit && project.liveUrl && (
                  <Button
                    component="a"
                    href={project.liveUrl}
                    target="_blank"
                    leftSection={<IconRocket size={16} />}
                    size="lg"
                    sx={{
                      background: 'linear-gradient(45deg, #00F5FF, #00B5AD)',
                      boxShadow: '0 4px 10px rgba(0, 245, 255, 0.3)',
                      '&:hover': {
                        boxShadow: '0 6px 15px rgba(0, 245, 255, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      marginRight: '20px',
                    }}
                  >
                    Try JobFit Live Demo
                  </Button>
                )}

                {!isJobFit && project.liveUrl && (
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
          </Box>
        </Box>
      )}
    </Transition>
  );
};

export default ProjectModal;
