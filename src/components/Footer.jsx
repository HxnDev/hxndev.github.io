import React from 'react';
import { Text, Group, Container, Anchor } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{ 
      marginTop: 'auto',
      padding: '24px 0',
      borderTop: '1px solid var(--mantine-color-gray-2)'
    }}>
      <Container size="lg">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            © {year} Hassan Shahzad. All rights reserved.
          </Text>
          
          <Group gap="md">
            <Anchor href="https://github.com/HxnDev" target="_blank">
              <IconBrandGithub size={20} />
            </Anchor>
            <Anchor href="https://www.linkedin.com/in/hassan-shahzad-2a6617212/" target="_blank">
              <IconBrandLinkedin size={20} />
            </Anchor>
            <Anchor href="mailto:hassanshahzad.dev@gmail.com">
              <IconMail size={20} />
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;