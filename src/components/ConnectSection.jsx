import React from 'react';
import { Box, Title, SimpleGrid, Paper, ThemeIcon, Text, Group } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { useColorScheme } from '../theme/ThemeProvider';

const ConnectSection = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const connectOptions = [
    {
      title: 'GitHub',
      description: 'Check out my projects and contributions',
      icon: <IconBrandGithub size={30} color={isDark ? "white" : "#333"} />,
      link: 'https://github.com/HxnDev',
      color: 'rgba(155, 0, 255, 0.8)'
    },
    {
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      icon: <IconBrandLinkedin size={30} color={isDark ? "white" : "#0077B5"} />,
      link: 'https://www.linkedin.com/in/hassan-shahzad-2a6617212/',
      color: '#0077B5'
    },
    {
      title: 'Email',
      description: 'Send me a direct message',
      icon: <IconMail size={30} color={isDark ? "white" : "#00B5AD"} />,
      link: 'mailto:hassanshahzad.dev@gmail.com',
      color: '#00B5AD'
    }
  ];

  return (
    <Box my={60}>
      <Title 
        order={2} 
        mb={40} 
        align="center"
        style={{
          backgroundImage: 'linear-gradient(45deg, #6200EE, #03DAC5)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2rem',
          fontWeight: 700
        }}
      >
        Connect With Me
      </Title>
      
      <SimpleGrid 
        cols={3} 
        spacing="lg"
        breakpoints={[
          { maxWidth: 'md', cols: 3 },
          { maxWidth: 'sm', cols: 1 }
        ]}
      >
        {connectOptions.map((option, index) => (
          <Paper
            key={index}
            component="a"
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            p={30}
            radius="md"
            withBorder
            style={{
              backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(245, 245, 250, 0.7)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center'
            }}
            sx={{
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                borderColor: option.color
              }
            }}
          >
            <Group position="center" mb={15}>
              <ThemeIcon size={60} radius={60} style={{ backgroundColor: option.color }}>
                {option.icon}
              </ThemeIcon>
            </Group>
            
            <Title order={4} align="center" mb={10} color={isDark ? "white" : "dark"}>
              {option.title}
            </Title>
            
            <Text align="center" color={isDark ? "dimmed" : "dark.6"} size="sm">
              {option.description}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ConnectSection;