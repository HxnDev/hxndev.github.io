import React, { useEffect, useState } from 'react';
import { Box, Text, Title, Button, Paper, Group, Code, Accordion } from '@mantine/core';
import projectsData from '../data/projects.json';
import ProjectImageFix from './ProjectImageFix';

const DebugProjectLoader = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      // Validate projects data
      if (!projectsData || !projectsData.projects || !Array.isArray(projectsData.projects)) {
        throw new Error('Invalid projects data structure');
      }
      
      // Log projects for debugging
      console.log('Debug - Projects data:', projectsData);
      console.log('Debug - Projects array:', projectsData.projects);
      
      // Get projects
      setProjects(projectsData.projects);
      setLoading(false);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);
  
  if (loading) {
    return <Text>Loading projects data...</Text>;
  }
  
  if (error) {
    return (
      <Paper p="md" withBorder color="red">
        <Title order={4} color="red">Error Loading Projects</Title>
        <Text>{error}</Text>
        <Button mt="sm" onClick={() => window.location.reload()}>Retry</Button>
      </Paper>
    );
  }
  
  // Check if projects exist
  if (!projects || projects.length === 0) {
    return (
      <Paper p="md" withBorder>
        <Title order={4}>No Projects Found</Title>
        <Text>The projects array is empty. Check your data source.</Text>
        <Code block mt="md">
          {JSON.stringify({ projectsData }, null, 2)}
        </Code>
      </Paper>
    );
  }
  
  return (
    <Box>
      <Title order={4} mb="md">Projects Debug View ({projects.length} projects)</Title>
      
      <Accordion>
        <Accordion.Item value="data-structure">
          <Accordion.Control>Data Structure</Accordion.Control>
          <Accordion.Panel>
            <Code block>
              {JSON.stringify(
                {
                  projectsCount: projects.length,
                  featuredCount: projects.filter(p => p.featured).length,
                  firstProject: projects[0]
                }, 
                null, 
                2
              )}
            </Code>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      
      <Title order={5} mt="xl" mb="md">Featured Projects</Title>
      <Group>
        {projects
          .filter(project => project.featured)
          .slice(0, 3)
          .map((project, index) => (
            <Paper key={index} p="md" withBorder style={{ width: '300px' }}>
              <Box mb="md" style={{ height: '150px', overflow: 'hidden' }}>
                <ProjectImageFix 
                  src={project.image}
                  fallbackSrc={project.fallbackImage}
                  alt={project.title}
                  height={150}
                  radius="md"
                />
              </Box>
              <Title order={5}>{project.title}</Title>
              <Text size="sm" lineClamp={2}>{project.description}</Text>
              
              <Group mt="md" position="apart">
                <Button variant="light" size="xs">
                  View Details
                </Button>
                <Text size="xs" color="dimmed">
                  {project.technologies && project.technologies.length} technologies
                </Text>
              </Group>
            </Paper>
          ))}
      </Group>
    </Box>
  );
};

export default DebugProjectLoader;