import React from 'react';
import { Paper, Text, Title, Button, Group, Badge, Image } from '@mantine/core';
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
  return (
    <Paper
      p="md"
      radius="md"
      withBorder
      shadow="sm"
      style={{
        backgroundColor: 'var(--mantine-color-body)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        border: featured ? '2px solid var(--mantine-color-grape-6)' : undefined,
      }}
      className="hover:transform-translateY(-5px) hover:shadow-md"
    >
      {image && (
        <Image
          src={image}
          height={180}
          radius="md"
          mb="md"
          alt={title}
          fallbackSrc="https://placehold.co/600x400?text=Project+Image"
        />
      )}

      {featured && (
        <Badge color="grape" variant="filled" mb="xs">
          Featured Project
        </Badge>
      )}

      <Title order={3} mb="xs">{title}</Title>
      <Text size="sm" c="dimmed" mb="md">{description}</Text>

      <Group gap="xs" mb="md">
        {technologies.map((tech, index) => (
          <Badge key={index} variant="outline" color="teal">
            {tech}
          </Badge>
        ))}
      </Group>

      <Group>
        {githubUrl && (
          <Button 
            component="a"
            href={githubUrl}
            target="_blank"
            variant="outline"
            leftSection={<IconBrandGithub size={16} />}
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
            color="grape"
          >
            Live Demo
          </Button>
        )}
      </Group>
    </Paper>
  );
};

export default ProjectCard;