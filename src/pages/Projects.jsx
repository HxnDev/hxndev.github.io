import React from 'react';
import { Title, Text, Container, Grid, TextInput, Select, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('all');

  // All projects data
  const allProjects = [
    {
      title: 'AI Job Match Analyzer',
      description: 'A powerful tool that helps job seekers analyze their resumes against job descriptions and generate AI-powered cover letters.',
      image: '/hxndev.github.io/images/job-analyzer.png',
      technologies: ['React', 'Flask', 'Gemini AI', 'Python'],
      githubUrl: 'https://github.com/HxnDev/AI-Job-Match-Analyzer',
      liveUrl: '/projects/job-match-analyzer',
      category: 'web',
      featured: true
    },
    // Add more projects here
  ];

  // Filter projects based on search and category
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                         project.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || project.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container size="lg">
      <Title order={1} mb="xl">Projects</Title>
      
      {/* Filter Controls */}
      <Group mb="xl" grow>
        <TextInput
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          icon={<IconSearch size={16} />}
        />
        
        <Select
          placeholder="Filter by category"
          value={category}
          onChange={setCategory}
          data={[
            { value: 'all', label: 'All Categories' },
            { value: 'web', label: 'Web Development' },
            { value: 'ml', label: 'Machine Learning' },
            { value: 'mobile', label: 'Mobile Apps' },
          ]}
        />
      </Group>
      
      {/* Projects Grid */}
      <Grid>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <Grid.Col key={index} md={6} lg={4}>
              <ProjectCard {...project} />
            </Grid.Col>
          ))
        ) : (
          <Text align="center" mt="xl" size="lg" color="dimmed" sx={{ width: '100%' }}>
            No projects found matching your criteria.
          </Text>
        )}
      </Grid>
    </Container>
  );
};

export default Projects;