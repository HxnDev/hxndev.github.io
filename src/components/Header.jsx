import { Group, Button, Title, ActionIcon, Container } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useColorScheme } from '../theme/ThemeProvider';
import { useEffect, useRef } from 'react';

const Header = () => {
  const location = useLocation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const dark = colorScheme === 'dark';
  
  // Check if path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Reference for animation
  const titleRef = useRef(null);
  
  // Add more visible entrance animation
  useEffect(() => {
    if (titleRef.current) {
      // Start with these styles
      titleRef.current.style.opacity = '0';
      titleRef.current.style.transform = 'translateY(-20px)';
      
      // Animate in after a slight delay
      setTimeout(() => {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
      }, 300);
    }
  }, []);

  return (
    <Container 
      size="lg" 
      py="md" 
      style={{ 
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: dark ? 'rgba(15, 6, 23, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',  // More visible shadow
        borderRadius: '0 0 10px 10px',  // Rounded bottom corners
        marginBottom: '10px'  // Add some space below
      }}
    >
      <Group justify="space-between" align="center">
        <Link to="/hxndev.github.io/" style={{ textDecoration: 'none' }}>
          <Title 
            ref={titleRef}
            order={2} 
            style={{
              background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',  // Using quantum colors
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.5s ease',
              fontSize: '1.8rem',  // Slightly larger
              letterSpacing: '0.5px'  // Add letter spacing
            }}
          >
            Hassan Shahzad
          </Title>
        </Link>

        <Group>
          {[
            { path: '/hxndev.github.io/', label: 'Home' },
            { path: '/hxndev.github.io/projects', label: 'Projects' },
            { path: '/hxndev.github.io/about', label: 'About' },
            { path: '/hxndev.github.io/contact', label: 'Contact' }
          ].map((item, index) => (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <Button 
                variant={isActive(item.path) ? "filled" : "subtle"} 
                color={isActive(item.path) ? "grape" : "dark"}  // More contrast
                style={{
                  transition: 'all 0.2s ease',
                  transform: 'scale(1)',
                  opacity: 1,
                  fontWeight: 500,
                  // Delayed appearance for staggered effect
                  animation: `fadeIn 0.5s ease ${0.1 + index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';  // More noticeable scale
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';  // Add shadow
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
          
          <ActionIcon
            variant="filled"  // More visible
            size="lg"  // Larger
            color={dark ? 'yellow' : 'blue'}
            onClick={toggleColorScheme}
            title="Toggle color scheme"
            style={{
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: 'scale(1)',
              animation: 'fadeIn 0.5s ease 0.5s both'  // Delayed appearance
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08) rotate(45deg)';  // Add rotation
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>
        </Group>
      </Group>
    </Container>
  );
};

// Add a keyframe animation for the staggered entrance
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

export default Header;