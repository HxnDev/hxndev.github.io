import React, { useRef, useState, useEffect } from 'react';
import { Paper, Text, Title, Button, Group, Badge, Image, Box, Transition } from '@mantine/core';
import { IconExternalLink, IconBrandGithub, IconInfoCircle } from '@tabler/icons-react';
import { gsap } from 'gsap';
import { useColorScheme } from '../../theme/ThemeProvider';
import { useAnimationContext } from '../../context/AnimationContext';

// Export component to avoid circular dependency issues
export const ProjectCard = ({ 
  title, 
  description, 
  image,
  fallbackImage, 
  technologies = [], 
  githubUrl, 
  liveUrl,
  featured = false,
  onViewDetails,
  projectId
}) => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const badgesRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const { colorScheme, quantumColors } = useColorScheme();
  const { reducedMotion } = useAnimationContext();
  const isDark = colorScheme === 'dark';
  const [imageSrc, setImageSrc] = useState(fallbackImage || "https://placehold.co/600x400/9B00FF/FFFFFF?text=Loading");
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Card flip state
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Debug log
  useEffect(() => {
    console.log("ProjectCard rendering:", { title, projectId, image });
  }, [title, projectId, image]);

  // Try to load the image with different path formats
  useEffect(() => {
    if (!image) {
      setImageSrc(fallbackImage || "https://placehold.co/600x400/9B00FF/FFFFFF?text=No+Image");
      return;
    }

    const tryImageFormats = async () => {
      // Test formats to try
      const formats = [
        image,                      // Original format
        image.startsWith('/') ? image.substring(1) : image,  // Without leading slash
        `/public/${image}`,         // With public prefix
        `public/${image}`,          // Public prefix without slash
        image.startsWith('/') ? `/images${image}` : `/images/${image}`, // Alternative path
      ];

      let loaded = false;

      for (const src of formats) {
        if (loaded) break;
        
        // Skip external URLs (they're likely placeholders)
        if (src.startsWith('http')) {
          setImageSrc(src);
          setImageLoaded(true);
          break;
        }

        try {
          // Create a promise that resolves when image loads or rejects on error
          const loadPromise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              console.log(`Image format worked: ${src}`);
              resolve(src);
            };
            img.onerror = () => {
              console.log(`Image format failed: ${src}`);
              reject();
            };
            img.src = src;
          });

          // Try to load the image with a timeout
          const result = await Promise.race([
            loadPromise,
            new Promise((_, reject) => setTimeout(() => reject(), 1000))
          ]).catch(() => null);

          if (result) {
            setImageSrc(result);
            setImageLoaded(true);
            loaded = true;
            break;
          }
        } catch (err) {
          console.log(`Error testing image ${src}:`, err);
        }
      }

      if (!loaded) {
        // If all formats failed, use fallback
        console.log("All image formats failed, using fallback");
        setImageSrc(fallbackImage || "https://placehold.co/600x400/9B00FF/FFFFFF?text=Failed+to+Load");
      }
    };

    tryImageFormats();
  }, [image, fallbackImage]);

  // Clean up badges ref array when technologies change
  useEffect(() => {
    badgesRef.current = badgesRef.current.slice(0, technologies.length);
  }, [technologies]);
  
  // Handle hover effect
  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;
    
    const card = cardRef.current;
    const shine = shineRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 20) * -1; // Reversed for natural feel
    const rotateY = (x - centerX) / 20;
    
    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Add highlight effect
    if (shine) {
      shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Animate badges - safely check if badges exist and are in the DOM
    if (contentRef.current && badgesRef.current.length > 0) {
      badgesRef.current.forEach((badge, index) => {
        if (badge) {
          gsap.fromTo(
            badge, 
            { y: 0, opacity: 0.7 }, 
            { 
              y: -5, 
              opacity: 1, 
              duration: 0.4, 
              delay: index * 0.05, 
              ease: "power2.out" 
            }
          );
        }
      });
    }
    
    // Subtle image zoom
    if (imageRef.current && !reducedMotion) {
      gsap.to(imageRef.current, { 
        scale: 1.05, 
        duration: 0.5, 
        ease: "power2.out" 
      });
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (!cardRef.current) return;
    
    // Reset transform
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    // Reset highlight effect
    if (shineRef.current) {
      shineRef.current.style.backgroundImage = 'none';
    }
    
    // Reset badge animation - safely check badges
    if (badgesRef.current.length > 0) {
      badgesRef.current.forEach(badge => {
        if (badge) {
          gsap.to(badge, { 
            y: 0, 
            opacity: 0.7, 
            duration: 0.2, 
            ease: "power2.in" 
          });
        }
      });
    }
    
    // Reset image zoom
    if (imageRef.current && !reducedMotion) {
      gsap.to(imageRef.current, { 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.in" 
      });
    }
  };
  
  // Handle flip effect
  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
    
    // Add delay to show/hide content between flips
    if (!isFlipped) {
      setTimeout(() => setShowDetails(true), 150);
    } else {
      setShowDetails(false);
    }
  };

  return (
    <Paper
      ref={cardRef}
      p={0}
      radius="md"
      shadow="md"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={isFlipped ? handleFlip : undefined}
      style={{
        backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        transform: 'perspective(1000px)',
        position: 'relative',
        overflow: 'hidden',
        border: featured 
          ? `2px solid ${isDark ? 'rgba(155, 0, 255, 0.5)' : 'rgba(155, 0, 255, 0.3)'}`
          : `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: isFlipped ? 'pointer' : 'default',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'perspective(1000px) rotateY(180deg)' : 'perspective(1000px) rotateY(0)',
        transition: 'transform 0.6s ease, box-shadow 0.3s ease',
        boxShadow: isHovered 
          ? '0 10px 25px rgba(155, 0, 255, 0.15)' 
          : '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Shine effect overlay */}
      <Box 
        ref={shineRef} 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />
      
      {/* Glowing border effect */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: featured ? (isHovered ? 0.7 : 0.5) : (isHovered ? 0.4 : 0),
          background: `linear-gradient(45deg, ${isDark ? 'rgba(155, 0, 255, 0.3)' : 'rgba(155, 0, 255, 0.3)'}, ${isDark ? 'rgba(0, 245, 255, 0.3)' : 'rgba(0, 245, 255, 0.3)'})`,
          filter: 'blur(20px)',
          borderRadius: 'md',
          transform: 'translateZ(-10px)',
          transition: 'opacity 0.3s ease'
        }} 
      />

      {/* Front side of card */}
      <Box 
        style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: isFlipped ? 'none' : 'flex',
          flexDirection: 'column',
          padding: 0,
          height: '100%',
          transform: 'rotateY(0deg)'
        }}
      >
        {imageSrc && (
          <Box 
            sx={{
              overflow: 'hidden', 
              borderTopLeftRadius: 'md', 
              borderTopRightRadius: 'md',
              height: '180px',
              width: '100%'
            }}
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              height={180}
              alt={title}
              withPlaceholder
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: 'scale(1)'
              }}
            />
          </Box>
        )}

        <Box 
          ref={contentRef}
          style={{ 
            position: 'relative', 
            zIndex: 2, 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            padding: '16px'
          }}
        >
          {featured && (
            <Badge 
              color="grape" 
              variant="filled" 
              mb="xs"
              sx={{
                background: 'linear-gradient(45deg, #9B00FF, #6200EE)',
                boxShadow: '0 2px 8px rgba(155, 0, 255, 0.3)'
              }}
            >
              Featured Project
            </Badge>
          )}

          <Title order={3} mb="xs">{title}</Title>
          <Text size="sm" c="dimmed" mb="md" style={{ flex: 1 }}>{description}</Text>

          <Group gap="xs" mb="md">
            {technologies && technologies.map((tech, index) => (
              <Badge 
                key={index}
                ref={el => badgesRef.current[index] = el}
                variant="outline" 
                color="teal"
                sx={{
                  borderColor: '#00F5FF',
                  color: '#00F5FF',
                  background: 'rgba(0, 245, 255, 0.05)',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  opacity: 0.7
                }}
              >
                {tech}
              </Badge>
            ))}
          </Group>

          <Group mt="auto">
            {githubUrl && (
              <Button 
                component="a"
                href={githubUrl}
                target="_blank"
                variant="outline"
                leftSection={<IconBrandGithub size={16} />}
                sx={{
                  borderColor: 'rgba(155, 0, 255, 0.5)',
                  color: '#9B00FF',
                  '&:hover': {
                    background: 'rgba(155, 0, 255, 0.1)',
                    borderColor: '#9B00FF',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                GitHub
              </Button>
            )}
            
            {liveUrl && (
              <Button
                component="a"
                href={liveUrl}
                target="_blank"
                leftSection={<IconExternalLink size={16} />}
                sx={{
                  background: 'linear-gradient(45deg, #6200EE, #9B00FF)',
                  boxShadow: '0 3px 10px rgba(155, 0, 255, 0.3)',
                  '&:hover': {
                    boxShadow: '0 5px 15px rgba(155, 0, 255, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Live Demo
              </Button>
            )}
            
            <Button
              variant="subtle"
              rightSection={<IconInfoCircle size={16} />}
              onClick={handleFlip}
              ml="auto"
              sx={{
                color: isDark ? '#00F5FF' : '#9B00FF',
                '&:hover': {
                  background: isDark ? 'rgba(0, 245, 255, 0.1)' : 'rgba(155, 0, 255, 0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Details
            </Button>
          </Group>
          
          {/* View details button (visible on hover) */}
          <Transition mounted={isHovered} transition="fade" duration={200}>
            {(styles) => (
              <Button
                style={{
                  ...styles,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',
                  boxShadow: '0 5px 15px rgba(155, 0, 255, 0.5)',
                  zIndex: 10
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onViewDetails) onViewDetails(projectId);
                }}
              >
                View Project
              </Button>
            )}
          </Transition>
          
          {/* Hover overlay */}
          <Transition mounted={isHovered} transition="fade" duration={200}>
            {(styles) => (
              <Box
                style={{
                  ...styles,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isDark 
                    ? 'rgba(28, 29, 34, 0.7)' 
                    : 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(3px)',
                  zIndex: 5
                }}
              />
            )}
          </Transition>
        </Box>
      </Box>
      
      {/* Back side of card */}
      <Box 
        style={{
          backfaceVisibility: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: isFlipped ? 'flex' : 'none',
          flexDirection: 'column',
          padding: '20px',
          height: '100%',
          transform: 'rotateY(180deg)',
          background: isDark 
            ? 'linear-gradient(145deg, rgba(28, 29, 34, 0.9), rgba(20, 21, 25, 0.9))' 
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.9))',
          borderRadius: 'md'
        }}
      >
        {showDetails && (
          <>
            <Title order={4} mb="md" style={{ textAlign: 'center' }}>Project Details</Title>
            
            <Text mb="md">
              <Text span weight={700}>Title:</Text> {title}
            </Text>
            
            <Text mb="md">
              <Text span weight={700}>Description:</Text> {description}
            </Text>
            
            <Text mb="xs" weight={700}>Technologies:</Text>
            <Group gap="xs" mb="md">
              {technologies && technologies.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="filled" 
                  color="grape"
                >
                  {tech}
                </Badge>
              ))}
            </Group>
            
            <Group position="center" mt="auto">
              <Button
                variant="subtle"
                onClick={handleFlip}
                sx={{
                  background: isDark ? 'rgba(0, 245, 255, 0.1)' : 'rgba(155, 0, 255, 0.1)',
                  color: isDark ? '#00F5FF' : '#9B00FF',
                  '&:hover': {
                    background: isDark ? 'rgba(0, 245, 255, 0.2)' : 'rgba(155, 0, 255, 0.2)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Back to Card
              </Button>
            </Group>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ProjectCard;