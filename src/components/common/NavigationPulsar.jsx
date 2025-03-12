import React, { useState, useEffect, useRef } from 'react';
import { ActionIcon, Tooltip, Group, Paper, Text } from '@mantine/core';
import { IconMenu2, IconHome, IconCode, IconUser, IconMail } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnimationContext } from '../../context/AnimationContext';
import { gsap } from 'gsap';
import { resolvePath } from '../utils/paths';

const NavigationPulsar = () => {
  const [expanded, setExpanded] = useState(false);
  const pulsarRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollVelocity, reducedMotion } = useAnimationContext();

  const navigationItems = [
    { path: resolvePath('/'), label: 'Home', icon: <IconHome size={20} /> },
    { path: resolvePath('/projects'), label: 'Projects', icon: <IconCode size={20} /> },
    { path: resolvePath('/about'), label: 'About', icon: <IconUser size={20} /> },
    { path: resolvePath('/contact'), label: 'Contact', icon: <IconMail size={20} /> },
  ];

  // Handle navigation click
  const handleNavigate = path => {
    setExpanded(false);
    navigate(path);
  };

  // Animate pulsar based on scroll velocity
  useEffect(() => {
    if (!pulsarRef.current || reducedMotion) return;

    // Cap the velocity magnitude to prevent excessive scaling
    const velocityMagnitude = Math.min(2, Math.abs(scrollVelocity) / 50); // Cap at 2
    const scale = 1 + velocityMagnitude * 0.03; // Reduced scale factor

    gsap.to(pulsarRef.current, {
      scale,
      boxShadow: `0 0 ${10 + velocityMagnitude * 3}px rgba(155, 0, 255, ${0.5 + velocityMagnitude * 0.2})`,
      duration: 0.3,
    });
  }, [scrollVelocity, reducedMotion]);

  // Animate menu expansion
  useEffect(() => {
    if (!menuRef.current) return;

    if (expanded) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
      });
    }
  }, [expanded]);

  return (
    <>
      <Tooltip label={expanded ? 'Close Menu' : 'Navigation'} position="left">
        <ActionIcon
          ref={pulsarRef}
          variant="filled"
          color="grape"
          size="xl"
          radius="xl"
          onClick={() => setExpanded(!expanded)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: '0 0 10px rgba(155, 0, 255, 0.5)',
          }}
        >
          <IconMenu2
            size={24}
            style={{
              transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </ActionIcon>
      </Tooltip>

      {expanded && (
        <Paper
          ref={menuRef}
          shadow="md"
          p="md"
          radius="md"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '30px',
            zIndex: 999,
            minWidth: '200px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(28, 10, 46, 0.85)',
          }}
        >
          <Group position="center" mb="xs">
            <Text size="sm" color="dimmed">
              Navigate To
            </Text>
          </Group>

          {navigationItems.map(item => (
            <Group
              key={item.path}
              position="left"
              spacing="xs"
              py="xs"
              px="md"
              style={{
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor:
                  item.path === location.pathname ? 'rgba(155, 0, 255, 0.3)' : 'transparent',
                transition: 'background-color 0.2s ease',
                marginBottom: '4px',
              }}
              onClick={() => handleNavigate(item.path)}
            >
              {item.icon}
              <Text>{item.label}</Text>
            </Group>
          ))}
        </Paper>
      )}
    </>
  );
};

export default NavigationPulsar;
