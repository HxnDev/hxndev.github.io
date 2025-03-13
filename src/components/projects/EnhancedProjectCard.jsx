import React, { useState, useEffect, useRef } from 'react';
import { Paper, Text, Title, Group, Badge, Box } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconInfoCircle, IconRocket } from '@tabler/icons-react';
import { useColorScheme } from '../../theme/ThemeProvider';

const EnhancedProjectCard = ({
  title,
  description,
  image,
  fallbackImage,
  technologies = [],
  featured = false,
  githubUrl,
  liveUrl,
  onViewDetails,
  projectId,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Check if this is the JobFit project to highlight the live demo
  const isJobFit = projectId === 'jobfit' || (title && title.toLowerCase().includes('jobfit'));
  const isPortfolio =
    projectId === 'portfolio' || (title && title.toLowerCase().includes('portfolio'));
  const isLiveDemo = isJobFit || isPortfolio;

  // Determine image source
  const imgSrc = imageError
    ? fallbackImage || 'https://placehold.co/600x400/9B00FF/FFFFFF?text=Project'
    : image || 'https://placehold.co/600x400/9B00FF/FFFFFF?text=No+Image';

  // Animation on mount
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(20px)';

      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle card click with proper navigation
  const handleCardClick = e => {
    e.preventDefault();
    if (onViewDetails && projectId) {
      onViewDetails(projectId, 'page');
    }
  };

  // Handle details button click
  const handleDetailsClick = e => {
    e.preventDefault();
    e.stopPropagation();
    if (onViewDetails && projectId) {
      onViewDetails(projectId, 'page');
    }
  };

  // Handle direct link to live demo
  const handleLiveDemo = e => {
    e.preventDefault();
    e.stopPropagation();
    window.open(liveUrl, '_blank');
  };

  return (
    <Paper
      ref={cardRef}
      p="lg"
      radius="xl"
      shadow="md"
      withBorder
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 10px 25px rgba(155, 0, 255, 0.15)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: featured ? '2px solid rgba(155, 0, 255, 0.5)' : undefined,
        backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(245, 245, 250, 0.7)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Background glow effect for featured projects */}
      {featured && (
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: isHovered ? 0.3 : 0.15,
            background: 'linear-gradient(45deg, rgba(155, 0, 255, 0.3), rgba(0, 245, 255, 0.3))',
            filter: 'blur(20px)',
            borderRadius: 'xl',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Image container */}
      <Box
        sx={{
          overflow: 'hidden',
          borderRadius: 'xl',
          marginBottom: '1.2rem',
          height: '180px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <img
          src={imgSrc}
          alt={title}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0.3,
            transition: 'all 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Overlay gradient for better text visibility */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovered
              ? 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1))'
              : 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2) 70%, rgba(0,0,0,0))',
            opacity: 1,
            transition: 'all 0.3s ease',
          }}
        />

        {/* Featured badge (if applicable) */}
        {featured && (
          <Box
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 2,
            }}
          >
            <Badge
              color="grape"
              radius="xl"
              variant="filled"
              gradient={{ from: '#9B00FF', to: '#00F5FF' }}
            >
              Featured
            </Badge>
          </Box>
        )}

        {/* Live demo badge for JobFit */}
        {isLiveDemo && liveUrl && (
          <Box
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 2,
            }}
          >
            <Badge
              color="green"
              radius="xl"
              variant="filled"
              gradient={{ from: '#00F5FF', to: '#00B5AD' }}
            >
              Live Demo
            </Badge>
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Title order={4} mb="xs" style={{ color: isDark ? '#e0e0e0' : '#1A1B1E' }}>
          {title}
        </Title>
        <Text size="sm" color={isDark ? 'dimmed' : 'dark.6'} mb="md" style={{ flex: 1 }}>
          {description}
        </Text>

        <Group spacing="xs" mb="md">
          {technologies &&
            technologies.slice(0, 3).map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                color="cyan"
                size="sm"
                radius="xl"
                styles={{
                  root: {
                    transition: 'all 0.3s ease',
                    transform: isHovered ? `translateY(${-3 * (index % 3)}px)` : 'translateY(0)',
                  },
                }}
              >
                {tech}
              </Badge>
            ))}
          {technologies && technologies.length > 3 && (
            <Badge variant="filled" size="sm" color="gray" radius="xl">
              +{technologies.length - 3}
            </Badge>
          )}
        </Group>

        {/* Action buttons */}
        <Group mt="auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                padding: '8px 12px',
                borderRadius: '25px',
                color: 'white',
                backgroundColor: '#333',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <IconBrandGithub size={16} />
              GitHub
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={isLiveDemo ? handleLiveDemo : e => e.stopPropagation()}
              style={{
                padding: '8px 12px',
                borderRadius: '25px',
                color: 'white',
                background: isLiveDemo
                  ? 'linear-gradient(45deg, #00F5FF, #00B5AD)'
                  : 'linear-gradient(45deg, #9B00FF, #00F5FF)',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isLiveDemo && isHovered ? '0 4px 12px rgba(0, 245, 255, 0.3)' : 'none',
                fontWeight: isLiveDemo ? 600 : 400,
              }}
            >
              {isLiveDemo ? <IconRocket size={16} /> : <IconExternalLink size={16} />}
              {isLiveDemo ? 'Try Demo' : 'Live Demo'}
            </a>
          )}

          <Box
            onClick={handleDetailsClick}
            style={{
              padding: '8px 12px',
              borderRadius: '25px',
              marginLeft: 'auto',
              color: isDark ? '#00F5FF' : '#6200EE',
              backgroundColor: isHovered
                ? isDark
                  ? 'rgba(0, 245, 255, 0.1)'
                  : 'rgba(98, 0, 238, 0.1)'
                : 'transparent',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: isHovered ? 1 : 0.7,
            }}
          >
            <IconInfoCircle size={16} />
            Details
          </Box>
        </Group>
      </Box>
    </Paper>
  );
};

export default EnhancedProjectCard;
