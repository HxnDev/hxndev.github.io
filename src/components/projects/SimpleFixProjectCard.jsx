import React from 'react';
import { Paper, Text, Title, Group, Badge, Box } from '@mantine/core';

const SimpleFixProjectCard = ({ 
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
  // Use state to track if image loaded
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  
  // Log what's happening
  React.useEffect(() => {
    console.log(`SimpleFixProjectCard for ${title}, image path: ${image}`);
  }, [title, image]);
  
  // Determine image source
  const imgSrc = imageError 
    ? (fallbackImage || "https://placehold.co/600x400/9B00FF/FFFFFF?text=Project") 
    : (image || "https://placehold.co/600x400/9B00FF/FFFFFF?text=No+Image");
  
  return (
    <Paper p="md" radius="md" shadow="md" withBorder style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Simple image element */}
      <div style={{ height: '180px', overflow: 'hidden', marginBottom: '1rem', borderRadius: '4px' }}>
        <img 
          src={imgSrc}
          alt={title} 
          onError={() => {
            console.log(`Error loading image: ${image}`);
            setImageError(true);
          }}
          onLoad={() => {
            console.log(`Successfully loaded image: ${image}`);
            setImageLoaded(true);
          }}
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>
      
      {/* Project info */}
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {featured && (
          <Badge color="grape" mb="xs">Featured</Badge>
        )}
        
        <Title order={4} mb="xs">{title}</Title>
        <Text size="sm" color="dimmed" mb="md" style={{ flex: 1 }}>{description}</Text>
        
        <Group spacing="xs" mb="md">
          {technologies && technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="outline" color="blue" size="sm">
              {tech}
            </Badge>
          ))}
          {technologies && technologies.length > 3 && (
            <Badge variant="filled" size="sm" color="gray">+{technologies.length - 3}</Badge>
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
                borderRadius: '4px',
                color: 'white',
                backgroundColor: '#333',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
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
                borderRadius: '4px',
                color: 'white',
                backgroundColor: '#9B00FF',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Live Demo
            </a>
          )}
          
          {onViewDetails && (
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onViewDetails(projectId);
              }}
              style={{ 
                padding: '8px 12px',
                borderRadius: '4px',
                marginLeft: 'auto',
                color: '#9B00FF',
                backgroundColor: 'transparent',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Details
            </a>
          )}
        </Group>
      </Box>
    </Paper>
  );
};

export default SimpleFixProjectCard;