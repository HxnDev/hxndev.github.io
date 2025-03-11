import React from 'react';
import { Text, Stack, Group, Button, Paper, Title } from '@mantine/core';
import { IconHeart, IconCoffee } from '@tabler/icons-react';
import { useColorScheme } from '../theme/ThemeProvider';

const SponsorshipSection = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper 
      p="xl" 
      radius="xl" 
      withBorder
      style={{
        background: isDark
          ? 'linear-gradient(145deg, rgba(28, 29, 34, 0.7), rgba(20, 21, 25, 0.9))'
          : 'linear-gradient(145deg, rgba(245, 245, 250, 0.7), rgba(235, 235, 240, 0.9))',
        borderColor: isDark ? 'rgba(155, 0, 255, 0.3)' : 'rgba(155, 0, 255, 0.2)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(155, 0, 255, 0.2)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(155, 0, 255, 0.2), transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.6,
          zIndex: 0
        }}
      />
      
      <Stack align="center" style={{ position: 'relative', zIndex: 1 }}>
        <Title 
          order={3}
          style={{
            background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            fontWeight: 700
          }}
        >
          Support My Work
        </Title>
        
        <Text ta="center" c={isDark ? "dimmed" : "dark.6"} maw={600} mx="auto">
          If you find my projects helpful, consider supporting their continued development and maintenance.
        </Text>
        
        <Group mt="md">
          <Button 
            component="a"
            href="https://github.com/sponsors/HxnDev"
            target="_blank"
            leftSection={<IconHeart size={18} />}
            variant="gradient"
            gradient={{ from: 'pink', to: 'grape' }}
            radius="xl"
            sx={{
              boxShadow: '0 4px 12px rgba(155, 0, 255, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 16px rgba(155, 0, 255, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Sponsor on GitHub
          </Button>
          
          <Button
            component="a"
            href="https://www.buymeacoffee.com/hassanshahzad"
            target="_blank"
            variant="filled"
            color="yellow"
            leftSection={<IconCoffee size={18} />}
            radius="xl"
            sx={{
              boxShadow: '0 4px 12px rgba(252, 211, 77, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 16px rgba(252, 211, 77, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Buy Me a Coffee
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export default SponsorshipSection;