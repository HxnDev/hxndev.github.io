import React, { useState, useEffect, useRef } from 'react';
import { Paper, Text, Title, Group, Badge, Box } from '@mantine/core';
import { IconBrandGithub, IconExternalLink, IconInfoCircle } from '@tabler/icons-react';

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
  projectId
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Determine image source
  const imgSrc = imageError 
    ? (fallbackImage || "https://placehold.co/600x400/9B00FF/FFFFFF?text=Project") 
    : (image || "https://placehold.co/600x400/9B00FF/FFFFFF?text=No+Image");
  
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
  
  return (
    <Paper 
      ref={cardRef}
      p="lg" 
      radius="xl" 
      shadow="md" 
      withBorder
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 25px rgba(155, 0, 255, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: featured ? '2px solid rgba(155, 0, 255, 0.5)' : undefined,
        backgroundColor: 'rgba(28, 29, 34, 0.7)',
        position: 'relative',
        overflow: 'hidden'
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
            transition: 'opacity 0.3s ease'
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
          zIndex: 1
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
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Hover overlay */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            onClick={() => onViewDetails && onViewDetails(projectId)}
            style={{
              cursor: 'pointer',
              padding: '8px 16px',
              background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',
              color: 'white',
              borderRadius: '25px',
              fontWeight: 'bold',
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
              opacity: isHovered ? 1 : 0,
              transition: 'all 0.3s ease'
            }}
          >
            View Details
          </Box>
        </Box>
      </Box>
      
      {/* Content */}
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {featured && (
          <Badge 
            color="grape" 
            mb="xs" 
            radius="xl"
            variant="filled"
            gradient={{ from: '#9B00FF', to: '#00F5FF' }}
          >
            Featured
          </Badge>
        )}
        
        <Title order={4} mb="xs" style={{ color: '#e0e0e0' }}>{title}</Title>
        <Text size="sm" color="dimmed" mb="md" style={{ flex: 1 }}>{description}</Text>
        
        <Group spacing="xs" mb="md">
          {technologies && technologies.slice(0, 3).map((tech, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              color="cyan"
              size="sm"
              radius="xl"
              styles={{
                root: {
                  transition: 'all 0.3s ease',
                  transform: isHovered ? `translateY(${-3 * (index % 3)}px)` : 'translateY(0)'
                }
              }}
            >
              {tech}
            </Badge>
          ))}
          {technologies && technologies.length > 3 && (
            <Badge variant="filled" size="sm" color="gray" radius="xl">+{technologies.length - 3}</Badge>
          )}
        </Group>
        
        {/* Action buttons */}
        <Group mt="auto">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
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
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
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
              style={{ 
                padding: '8px 12px',
                borderRadius: '25px',
                color: 'white',
                background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              <IconExternalLink size={16} />
              Live Demo
            </a>
          )}
          
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onViewDetails && onViewDetails(projectId);
            }}
            style={{ 
              padding: '8px 12px',
              borderRadius: '25px',
              marginLeft: 'auto',
              color: '#00F5FF',
              backgroundColor: 'transparent',
              textDecoration: 'none',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
              opacity: isHovered ? 1 : 0.7
            }}
          >
            <IconInfoCircle size={16} />
            Details
          </a>
        </Group>
      </Box>
    </Paper>
  );
};

export default EnhancedProjectCard;