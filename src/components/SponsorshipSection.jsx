import React from 'react';
import { Text, Stack, Group, Button, Paper } from '@mantine/core';
import { IconHeart, IconCoffee } from '@tabler/icons-react';

const SponsorshipSection = () => {
  return (
    <Paper p="xl" radius="md" withBorder>
      <Stack align="center">
        <Text size="xl" fw={700}>Support My Work</Text>
        <Text ta="center" c="dimmed" maw={600} mx="auto">
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
          >
            Buy Me a Coffee
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export default SponsorshipSection;