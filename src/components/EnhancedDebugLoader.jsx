import React, { useEffect, useState } from 'react';
import { Box, Text, Title, Button, Paper, Group, Image, SimpleGrid, Stack, Tabs, Code, Badge } from '@mantine/core';
import projectsData from '../data/projects.json';

const EnhancedDebugLoader = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  
  useEffect(() => {
    try {
      // Validate projects data
      if (!projectsData || !projectsData.projects || !Array.isArray(projectsData.projects)) {
        throw new Error('Invalid projects data structure');
      }
      
      setProjects(projectsData.projects);
      setLoading(false);
      
      // Log projects for debugging
      console.log('EnhancedDebugLoader - Projects data:', projectsData);
      console.log('EnhancedDebugLoader - Projects array:', projectsData.projects);
      
      // Test image loading
      const testImageLoading = async () => {
        const testImage = projectsData.projects[0]?.image;
        if (testImage) {
          try {
            // Try to load the image directly
            const img = new Image();
            img.onload = () => console.log(`Test image loaded successfully: ${testImage}`);
            img.onerror = () => console.log(`Test image failed to load: ${testImage}`);
            img.src = testImage;
            
            // Try with public path prefix
            const img2 = new Image();
            img2.onload = () => console.log(`Test image with public prefix loaded: public/${testImage}`);
            img2.onerror = () => console.log(`Test image with public prefix failed: public/${testImage}`);
            img2.src = `public/${testImage}`;
          } catch (err) {
            console.error('Error testing image loading:', err);
          }
        }
      };
      
      testImageLoading();
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
  
  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured);
  
  return (
    <Paper p="xl" withBorder shadow="md">
      <Title order={3} mb="md">Enhanced Debug Tool</Title>
      
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="summary">Summary</Tabs.Tab>
          <Tabs.Tab value="imageTest">Image Test</Tabs.Tab>
          <Tabs.Tab value="featured">Featured Projects</Tabs.Tab>
          <Tabs.Tab value="all">All Projects</Tabs.Tab>
          <Tabs.Tab value="json">JSON Data</Tabs.Tab>
        </Tabs.List>
        
        <Tabs.Panel value="summary" pt="md">
          <Stack>
            <Paper p="md" withBorder>
              <Title order={5}>Projects Summary</Title>
              <Text>Total projects: {projects.length}</Text>
              <Text>Featured projects: {featuredProjects.length}</Text>
              <Text>Categories: {Array.from(new Set(projects.map(p => p.category))).join(', ')}</Text>
            </Paper>
            
            <Paper p="md" withBorder>
              <Title order={5}>Project Image Paths</Title>
              <Box mt="md">
                {projects.slice(0, 3).map((project, i) => (
                  <Text key={i} size="sm" mb="xs">
                    {project.title}: <Code>{project.image}</Code>
                  </Text>
                ))}
              </Box>
            </Paper>
            
            <Paper p="md" withBorder>
              <Title order={5}>Environment</Title>
              <Text>Base URL: {window.location.origin}</Text>
              <Text>Path: {window.location.pathname}</Text>
              <Text>Mode: {process.env.NODE_ENV}</Text>
            </Paper>
          </Stack>
        </Tabs.Panel>
        
        <Tabs.Panel value="imageTest" pt="md">
          <Title order={5} mb="md">Image Path Test</Title>
          
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {projects.slice(0, 4).map((project, index) => (
              <Paper key={index} p="md" withBorder>
                <Text weight={700}>{project.title}</Text>
                <Text size="sm" color="dimmed" mb="xs">Path: {project.image}</Text>
                
                <Box mb="md">
                  <Text size="sm" weight={500}>Direct image:</Text>
                  <Image
                    src={project.image}
                    height={100}
                    withPlaceholder
                    caption="Direct path"
                  />
                </Box>
                
                <Box mb="md">
                  <Text size="sm" weight={500}>With public prefix:</Text>
                  <Image
                    src={`/public/${project.image}`}
                    height={100}
                    withPlaceholder
                    caption="With /public prefix"
                  />
                </Box>
                
                <Box>
                  <Text size="sm" weight={500}>Fallback image:</Text>
                  <Image
                    src={project.fallbackImage || "https://placehold.co/600x400/9B00FF/FFFFFF?text=Fallback"}
                    height={100}
                    caption="Fallback URL"
                  />
                </Box>
              </Paper>
            ))}
          </SimpleGrid>
          
          <Paper p="md" withBorder mt="xl">
            <Title order={5}>Asset URL Test</Title>
            <Text size="sm" mb="md">Testing image loading with different URL formats:</Text>
            
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
              <Box>
                <Text size="sm" weight={500}>Absolute path:</Text>
                <Image
                  src="/images/projects/virtual-mouse.jpg"
                  height={100}
                  withPlaceholder
                  caption="/images/projects/virtual-mouse.jpg"
                />
              </Box>
              
              <Box>
                <Text size="sm" weight={500}>Relative path:</Text>
                <Image
                  src="images/projects/virtual-mouse.jpg"
                  height={100}
                  withPlaceholder
                  caption="images/projects/virtual-mouse.jpg"
                />
              </Box>
              
              <Box>
                <Text size="sm" weight={500}>With public prefix:</Text>
                <Image
                  src="/public/images/projects/virtual-mouse.jpg"
                  height={100}
                  withPlaceholder
                  caption="/public/images/projects/virtual-mouse.jpg"
                />
              </Box>
              
              <Box>
                <Text size="sm" weight={500}>With base prefix:</Text>
                <Image
                  src={`${window.location.origin}/images/projects/virtual-mouse.jpg`}
                  height={100}
                  withPlaceholder
                  caption={`${window.location.origin}/images/projects/virtual-mouse.jpg`}
                />
              </Box>
            </SimpleGrid>
          </Paper>
        </Tabs.Panel>
        
        <Tabs.Panel value="featured" pt="md">
          <Title order={5} mb="md">Featured Projects</Title>
          
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {featuredProjects.map((project, index) => (
              <Paper key={index} p="md" withBorder>
                <Group position="apart" mb="xs">
                  <Text weight={700}>{project.title}</Text>
                  <Badge color="grape">Featured</Badge>
                </Group>
                
                <Image
                  src={project.fallbackImage || "https://placehold.co/600x400/9B00FF/FFFFFF?text=Fallback"}
                  height={120}
                  withPlaceholder
                  mb="md"
                />
                
                <Text size="sm" mb="md" lineClamp={2}>{project.description}</Text>
                
                <Group spacing="xs">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i} size="sm">{tech}</Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge size="sm">+{project.technologies.length - 3} more</Badge>
                  )}
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Tabs.Panel>
        
        <Tabs.Panel value="all" pt="md">
          <Title order={5} mb="md">All Projects</Title>
          
          <SimpleGrid cols={3} spacing="md" breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'sm', cols: 1 }
          ]}>
            {projects.map((project, index) => (
              <Paper key={index} p="sm" withBorder>
                <Text weight={700} size="sm">{project.title}</Text>
                <Text size="xs" color="dimmed" mb="xs">
                  {project.category} • {project.date}
                </Text>
                <Group spacing="xs" mb="xs">
                  {project.technologies.slice(0, 2).map((tech, i) => (
                    <Badge key={i} size="xs">{tech}</Badge>
                  ))}
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        </Tabs.Panel>
        
        <Tabs.Panel value="json" pt="md">
          <Title order={5} mb="md">Projects JSON Data</Title>
          <Paper p="md" withBorder style={{ maxHeight: '500px', overflow: 'auto' }}>
            <Code block>
              {JSON.stringify(projects[0], null, 2)}
            </Code>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default EnhancedDebugLoader;