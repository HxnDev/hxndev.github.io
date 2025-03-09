import React from 'react';
import { Title, Text, Container, Button, Group, Image, Stack, Grid } from '@mantine/core';
import { IconDownload, IconBrandGithub } from '@tabler/icons-react';
import ProjectCard from '../components/ProjectCard';
import SponsorshipSection from '../components/SponsorshipSection';

const Home = () => {
  // Featured projects data
  const featuredProjects = [
    {
      title: 'AI Job Match Analyzer',
      description: 'A powerful tool that helps job seekers analyze their resumes against job descriptions and generate AI-powered cover letters.',
      image: '/hxndev.github.io/images/job-analyzer.png',
      technologies: ['React', 'Flask', 'Gemini AI', 'Python'],
      githubUrl: 'https://github.com/HxnDev/AI-Job-Match-Analyzer',
      liveUrl: '/hxndev.github.io/projects/job-match-analyzer',
      featured: true
    },
    // Add more featured projects
  ];

  return (
    <Container size="lg">
      {/* Hero Section */}
      <Grid gutter={50} my={40}>
        <Grid.Col md={7}>
          <Stack spacing="xl">
            <Title
              sx={(theme) => ({
                fontSize: 48,
                fontWeight: 900,
                lineHeight: 1.1,
                backgroundImage: theme.fn.linearGradient(45, '#6200EE', '#03DAC5'),
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              })}
            >
              Hi, I'm Hassan Shahzad
            </Title>
            
            <Text size="xl" color="dimmed">
              Full Stack Developer & ML Engineer specializing in creating intelligent, intuitive applications
              that solve real-world problems.
            </Text>

            <Group mt="xl">
              <Button 
                component="a" 
                href="/hxndev.github.io/assets/hassan_resume.pdf" 
                size="lg"
                leftSection={<IconDownload size={20} />}
                color="grape"
                download
              >
                Download Resume
              </Button>
              <Button 
                component="a"
                href="https://github.com/HxnDev"
                target="_blank"
                size="lg"
                variant="outline"
                leftSection={<IconBrandGithub size={20} />}
              >
                GitHub Profile
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
        
        <Grid.Col md={5}>
          <Image 
            src="/hxndev.github.io/images/profile.jpg" 
            alt="Hassan Shahzad" 
            radius="lg"
            height={400}
            width="auto"
            fit="contain"
            fallbackSrc="https://placehold.co/400x400?text=Profile+Image"
          />
        </Grid.Col>
      </Grid>

      {/* Featured Projects */}
      <Title order={2} my="xl">Featured Projects</Title>
      <Grid>
        {featuredProjects.map((project, index) => (
          <Grid.Col key={index} md={6} lg={4}>
            <ProjectCard {...project} />
          </Grid.Col>
        ))}
      </Grid>
      
      {/* Call to action to see more projects */}
      <Group position="center" my="xl">
        <Button component="a" href="/hxndev.github.io/projects" size="lg" variant="light">
          View All Projects
        </Button>
      </Group>

      {/* Sponsorship Section */}
      <SponsorshipSection />
    </Container>
  );
};

export default Home;