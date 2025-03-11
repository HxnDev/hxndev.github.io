import React from 'react';
import { Text, Group, Container, Anchor, Box } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconMail } from '@tabler/icons-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 'auto',
        padding: '24px 0',
        borderTop: '1px solid var(--mantine-color-gray-2)',
        position: 'relative',
      }}
    >
      <Container size="lg">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            © {year} Hassan Shahzad. All rights reserved.
          </Text>

          <Group gap="md">
            <Anchor
              href="https://github.com/HxnDev"
              target="_blank"
              style={{
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(155, 0, 255, 0.1)',
                color: 'var(--mantine-color-dimmed)',
              }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(155, 0, 255, 0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(155, 0, 255, 0.2)',
                  color: '#9B00FF',
                },
              }}
            >
              <IconBrandGithub size={20} />
            </Anchor>
            <Anchor
              href="https://www.linkedin.com/in/hassan-shahzad-2a6617212/"
              target="_blank"
              style={{
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(0, 119, 181, 0.1)',
                color: 'var(--mantine-color-dimmed)',
              }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 119, 181, 0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0, 119, 181, 0.2)',
                  color: '#0077B5',
                },
              }}
            >
              <IconBrandLinkedin size={20} />
            </Anchor>
            <Anchor
              href="mailto:hassanshahzad.dev@gmail.com"
              style={{
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(0, 245, 255, 0.1)',
                color: 'var(--mantine-color-dimmed)',
              }}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 245, 255, 0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0, 245, 255, 0.2)',
                  color: '#00F5FF',
                },
              }}
            >
              <IconMail size={20} />
            </Anchor>
          </Group>
        </Group>
      </Container>

      {/* Decorative element */}
      <Box
        style={{
          position: 'absolute',
          left: '50%',
          top: -1,
          width: '150px',
          height: '3px',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(90deg, transparent, #9B00FF, #00F5FF, transparent)',
          borderRadius: '100px',
        }}
      />
    </footer>
  );
};

export default Footer;
