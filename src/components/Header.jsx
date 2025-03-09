import { Group, Button, Title, ActionIcon, Container } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useColorScheme } from '../ThemeProvider';

const Header = () => {
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const dark = colorScheme === 'dark';

  // Check if path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Container size="lg" py="md">
      <Group justify="space-between" align="center">
        <Link to="/hxndev.github.io/" style={{ textDecoration: 'none' }}>
          <Title 
            order={2} 
            style={{
              background: 'linear-gradient(45deg, #6200EE, #03DAC5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Hassan Shahzad
          </Title>
        </Link>

        <Group>
          <Link to="/hxndev.github.io/" style={{ textDecoration: 'none' }}>
            <Button variant={isActive('/hxndev.github.io/') ? "filled" : "subtle"} color="grape">
              Home
            </Button>
          </Link>
          
          <Link to="/hxndev.github.io/projects" style={{ textDecoration: 'none' }}>
            <Button variant={isActive('/hxndev.github.io/projects') ? "filled" : "subtle"} color="grape">
              Projects
            </Button>
          </Link>
          
          <Link to="/hxndev.github.io/about" style={{ textDecoration: 'none' }}>
            <Button variant={isActive('/hxndev.github.io/about') ? "filled" : "subtle"} color="grape">
              About
            </Button>
          </Link>
          
          <Link to="/hxndev.github.io/contact" style={{ textDecoration: 'none' }}>
            <Button variant={isActive('/hxndev.github.io/contact') ? "filled" : "subtle"} color="grape">
              Contact
            </Button>
          </Link>
          
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={toggleColorScheme}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
      </Group>
    </Container>
  );
};

export default Header;