import React from 'react';
import { Box, Title, SimpleGrid, Paper, ThemeIcon, Text, Group } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';
import { useColorScheme } from '../theme/ThemeProvider';

const ConnectSection= () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Match the design in the image with simpler styling
  
  const connectOptions = [
    {
      title: 'GitHub',
      description: 'Check out my projects and contributions',
      icon: <IconBrandGithub size={30} color="white" />,
      link: 'https://github.com/HxnDev',
      color: 'rgba(155, 0, 255, 0.8)',
      iconBg: '#9B00FF'
    },
    {
      title: 'LinkedIn',
      description: 'Connect with me professionally',
      icon: <IconBrandLinkedin size={30} color="white" />,
      link: 'https://www.linkedin.com/in/hassan-shahzad-2a6617212/',
      color: '#0077B5',
      iconBg: '#0077B5'
    },
    {
      title: 'Email',
      description: 'Send me a direct message',
      icon: <IconMail size={30} color="white" />,
      link: 'mailto:hassanshahzad.dev@gmail.com',
      color: '#00F5FF',
      iconBg: '#00B5AD'
    }
  ];

  return (
    <Box my={8}>
      <Title 
        order={2} 
        mb={8}
        align="center"
        style={{
          color: '#4169E1',
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
            p="xl"
            radius="md"
            withBorder
            style={{
              backgroundColor: isDark ? 'rgba(28, 29, 34, 0.7)' : 'rgba(245, 245, 250, 0.7)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              padding: '32px 16px'
            }}
            sx={{
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                borderColor: option.color
              }
            }}
          >
            <div 
              style={{ 
                backgroundColor: option.iconBg,
                boxShadow: `0 4px 8px rgba(0, 0, 0, 0.15)`,
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              {option.icon}
            </div>
            
            <Text 
              weight={700} 
              size="xl" 
              align="center" 
              mb={1}
              style={{ 
                color: option.title === 'GitHub' ? '#4169E1' : 
                        option.title === 'LinkedIn' ? '#0077B5' : 
                        '#00B5AD'
              }}
            >
              {option.title}
            </Text>
            
            <Text align="center" color="dimmed" size="md">
              {option.description}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ConnectSection;