import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Paper, Title, Stack } from '@mantine/core';

// This is a diagnostic component to test image loading directly
const ImageTestComponent = () => {
  const [testImages, setTestImages] = useState([
    { 
      path: 'images/projects/virtual-mouse.jpg',
      name: 'Virtual Mouse' 
    },
    { 
      path: '/images/projects/virtual-mouse.jpg',
      name: 'Virtual Mouse (with leading slash)' 
    },
    { 
      path: 'public/images/projects/virtual-mouse.jpg',
      name: 'Virtual Mouse (with public prefix)' 
    },
    {
      path: 'https://placehold.co/600x400/9B00FF/FFFFFF?text=Virtual+Mouse',
      name: 'Placeholder (external URL)'
    }
  ]);

  return (
    <Paper p="xl" withBorder shadow="md" radius="md" mx="auto" my="xl" sx={{ maxWidth: 800 }}>
      <Title order={3} mb="md">Image Path Test</Title>
      <Text mb="xl">This component tests various image path formats to diagnose loading issues.</Text>
      
      <Stack spacing="xl">
        {testImages.map((img, index) => (
          <Box key={index}>
            <Text weight={700} mb="xs">{img.name}</Text>
            <Text size="sm" color="dimmed" mb="xs">Path: {img.path}</Text>
            <Paper p="sm" withBorder>
              <Image 
                src={img.path}
                height={200}
                width="100%"
                fit="contain"
                withPlaceholder
                caption={`Loading status for: ${img.path}`}
                onLoad={() => console.log(`Image loaded successfully: ${img.path}`)}
                onError={() => console.log(`Image failed to load: ${img.path}`)}
              />
            </Paper>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default ImageTestComponent;