import React from 'react';
import { Title, Text, Container, Timeline, List, ThemeIcon, Group, Image, Paper, Grid } from '@mantine/core';
import { IconCheck, IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import SponsorshipSection from '../components/SponsorshipSection';

const About = () => {
  return (
    <Container size="lg">
      <Title order={1} mb="xl">About Me</Title>
      
      <Grid gutter={50}>
        <Grid.Col md={4}>
          <Image 
            src="/hxndev.github.io/images/profile.jpg" 
            alt="Hassan Shahzad" 
            radius="md"
            height={300}  // Add a fixed height
            width="auto"  // Maintain aspect ratio
            fit="contain" // Ensure the image fits within container
            fallbackSrc="https://placehold.co/300x300?text=Profile+Image"  // Fallback image    
          />
          
          <Paper withBorder p="md" mt="md" radius="md">
            <Title order={4} mb="md">Connect With Me</Title>
            <List spacing="sm">
              <List.Item 
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconBrandGithub size={16} />
                  </ThemeIcon>
                }
              >
                <Text component="a" href="https://github.com/HxnDev" target="_blank">
                  GitHub
                </Text>
              </List.Item>
              
              <List.Item 
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconBrandLinkedin size={16} />
                  </ThemeIcon>
                }
              >
                <Text component="a" href="https://www.linkedin.com/in/hassan-shahzad-2a6617212/" target="_blank">
                  LinkedIn
                </Text>
              </List.Item>
              
              <List.Item 
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconMail size={16} />
                  </ThemeIcon>
                }
              >
                <Text component="a" href="mailto:hassanshahzad.dev@gmail.com">
                  Email Me
                </Text>
              </List.Item>
            </List>
          </Paper>
        </Grid.Col>
        
        <Grid.Col md={8}>
          <Paper withBorder p="xl" radius="md" mb="xl">
            <Title order={2} mb="md">Bio</Title>
            <Text>
              I'm a passionate developer with expertise in building applications that combine intuitive 
              user experiences with powerful backend systems. My focus is on creating technology that
              solves real problems.
            </Text>
            
            <Text mt="md">
              With a background in both software engineering and machine learning, I specialize in 
              creating applications that leverage AI to deliver innovative solutions. I'm particularly
              interested in optimizing workflows and improving productivity through technology.
            </Text>
          </Paper>

          <Paper withBorder p="xl" radius="md" mb="xl">
            <Title order={2} mb="md">Skills</Title>
            
            <Title order={4} mt="md">Languages</Title>
            <Group spacing="xs" my="xs">
              <Text component="span" weight={500}>Frontend:</Text>
              <Text component="span" color="dimmed">JavaScript, TypeScript, HTML, CSS</Text>
            </Group>
            
            <Group spacing="xs" my="xs">
              <Text component="span" weight={500}>Backend:</Text>
              <Text component="span" color="dimmed">Python, Node.js, C++, Java</Text>
            </Group>
            
            <Title order={4} mt="md">Frameworks & Technologies</Title>
            <List
              spacing="xs"
              mt="xs"
              icon={
                <ThemeIcon color="teal" size={24} radius="xl">
                  <IconCheck size={16} />
                </ThemeIcon>
              }
            >
              <List.Item>React, Next.js, Vue.js</List.Item>
              <List.Item>Flask, Express, Django</List.Item>
              <List.Item>TensorFlow, PyTorch, scikit-learn</List.Item>
              <List.Item>MongoDB, PostgreSQL, Redis</List.Item>
              <List.Item>Docker, AWS, Firebase</List.Item>
            </List>
          </Paper>
          
          <Paper withBorder p="xl" radius="md">
            <Title order={2} mb="md">Experience</Title>
            <Timeline active={1} bulletSize={24} lineWidth={2}>
              <Timeline.Item title="Software Engineer" bullet={<ThemeIcon radius="xl" color="grape" size={22}><IconCheck size={14} /></ThemeIcon>}>
                <Text weight={500}>Company Name</Text>
                <Text size="sm" color="dimmed">Jan 2023 - Present</Text>
                <Text size="sm" mt="xs">
                  Developing and maintaining web applications using React and Node.js. 
                  Leading a team of frontend developers.
                </Text>
              </Timeline.Item>
              
              <Timeline.Item title="ML Engineer" bullet={<ThemeIcon radius="xl" color="grape" size={22}><IconCheck size={14} /></ThemeIcon>}>
                <Text weight={500}>Company Name</Text>
                <Text size="sm" color="dimmed">Jun 2021 - Dec 2022</Text>
                <Text size="sm" mt="xs">
                  Designed and implemented machine learning models for natural language processing applications.
                </Text>
              </Timeline.Item>
              
              <Timeline.Item title="Software Developer Intern" bullet={<ThemeIcon radius="xl" color="grape" size={22}><IconCheck size={14} /></ThemeIcon>}>
                <Text weight={500}>Company Name</Text>
                <Text size="sm" color="dimmed">Jan 2021 - May 2021</Text>
                <Text size="sm" mt="xs">
                  Assisted in the development of a web application using React and Firebase.
                </Text>
              </Timeline.Item>
            </Timeline>
          </Paper>
        </Grid.Col>
      </Grid>
      
      <SponsorshipSection />
    </Container>
  );
};

export default About;