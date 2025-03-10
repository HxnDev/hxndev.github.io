import React, { useRef } from 'react';
import { Paper, Text, Title, Button, Group, Badge, Image, Box } from '@mantine/core';
import { IconExternalLink, IconBrandGithub } from '@tabler/icons-react';

const ProjectCard = ({ 
  title, 
  description, 
  image, 
  technologies, 
  githubUrl, 
  liveUrl,
  featured = false
}) => {
  const cardRef = useRef(null);
  
  // Handle hover effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Add highlight effect
    const shine = card.querySelector('.card-shine');
    if (shine) {
      shine.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
    }
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    // Reset transform
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    // Reset highlight effect
    const shine = cardRef.current.querySelector('.card-shine');
    if (shine) {
      shine.style.backgroundImage = 'none';
    }
  };
  
  return (
    <Paper
      ref={cardRef}
      p="lg"
      radius="md"
      shadow="md"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: 'var(--mantine-color-body)',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        transform: 'perspective(1000px)',
        position: 'relative',
        overflow: 'hidden',
        border: featured ? '2px solid rgba(155, 0, 255, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Shine effect overlay */}
      <Box className="card-shine" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      {/* Glowing border effect */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        opacity: featured ? 0.5 : 0,
        background: 'linear-gradient(45deg, rgba(155, 0, 255, 0.3), rgba(0, 245, 255, 0.3))',
        filter: 'blur(20px)',
        borderRadius: 'md',
        transform: 'translateZ(-10px)',
        transition: 'opacity 0.3s ease'
      }} />

      {image && (
        <Box mb="md" sx={{ overflow: 'hidden', borderRadius: 'md' }}>
          <Image
            src={image}
            height={180}
            radius="md"
            alt={title}
            sx={{
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>
      )}

      <Box style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
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
          {technologies.map((tech, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              color="teal"
              sx={{
                borderColor: '#00F5FF',
                color: '#00F5FF',
                background: 'rgba(0, 245, 255, 0.05)'
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
        </Group>
      </Box>
    </Paper>
  );
};

export default ProjectCard;