import React, { useState, useRef, useEffect } from 'react';
import { Paper, Title, Text, Group, Tabs, Box, Badge, Grid } from '@mantine/core';
import { gsap } from 'gsap';
import { useColorScheme } from '../../theme/ThemeProvider';
import { useAnimationContext } from '../../context/AnimationContext';
import {
  IconBrandJavascript,
  IconBrandPython,
  IconBrandReact,
  IconDatabase,
  IconServer,
  IconCloud,
  IconTools,
  IconBrandGit,
} from '@tabler/icons-react';

/**
 * Animated skill bar component with progress animation
 */
const SkillBar = ({ name, level, category, color = 'grape', index = 0 }) => {
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animate skill bar when it appears
  useEffect(() => {
    if (reducedMotion || !progressRef.current || !containerRef.current) return;

    // Initial state
    gsap.set(progressRef.current, { width: '0%' });
    gsap.set(containerRef.current, { opacity: 0, y: 20 });

    // Use Intersection Observer instead of ScrollTrigger
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Create a timeline for the animation
            const tl = gsap.timeline();

            // Animate the container first
            tl.to(containerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.1,
            });

            // Then animate the progress bar
            tl.to(
              progressRef.current,
              {
                width: `${level}%`,
                duration: 1,
                ease: 'power3.out',
              },
              '-=0.2'
            );

            // Unobserve after animation starts
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Start observing
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [level, index, reducedMotion]);

  return (
    <Box
      ref={containerRef}
      mb="md"
      style={{
        opacity: reducedMotion ? 1 : 0,
      }}
    >
      <Group position="apart" mb={5}>
        <Text weight={500}>{name}</Text>
        <Badge
          color={color}
          variant="light"
          styles={{
            root: {
              background: isDark ? 'rgba(155, 0, 255, 0.2)' : 'rgba(155, 0, 255, 0.1)',
            },
          }}
        >
          {category}
        </Badge>
      </Group>

      <Box
        style={{
          height: 8,
          width: '100%',
          borderRadius: 4,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        <Box
          ref={progressRef}
          style={{
            height: '100%',
            width: reducedMotion ? `${level}%` : '0%',
            borderRadius: 4,
            background: `linear-gradient(90deg, ${isDark ? '#9B00FF' : '#6200EE'} 0%, ${isDark ? '#00F5FF' : '#03DAC5'} 100%)`,
            transition: reducedMotion ? 'width 0.3s ease-out' : 'none',
          }}
        />
      </Box>
      <Text size="sm" color="dimmed" align="right">
        {level}%
      </Text>
    </Box>
  );
};

/**
 * Skill category icon component
 */
const SkillCategoryIcon = ({ category }) => {
  const categoryIcons = {
    Frontend: <IconBrandReact size={20} />,
    Backend: <IconServer size={20} />,
    Languages: <IconBrandJavascript size={20} />,
    Database: <IconDatabase size={20} />,
    DevOps: <IconCloud size={20} />,
    Tools: <IconTools size={20} />,
    'AI/ML': <IconBrandPython size={20} />,
    'Version Control': <IconBrandGit size={20} />,
  };

  return categoryIcons[category] || null;
};

/**
 * Skills visualization component with category tabs
 */
const SkillsVisualization = ({ skills = [] }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const skillsContainerRef = useRef(null);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Sample skills data if none provided
  if (!skills || skills.length === 0) {
    skills = [
      { name: 'React', level: 95, category: 'Frontend' },
      { name: 'JavaScript', level: 90, category: 'Languages' },
      { name: 'TypeScript', level: 85, category: 'Languages' },
      { name: 'Node.js', level: 80, category: 'Backend' },
      { name: 'Python', level: 75, category: 'Languages' },
      { name: 'GSAP', level: 85, category: 'Frontend' },
      { name: 'TensorFlow', level: 70, category: 'AI/ML' },
      { name: 'MongoDB', level: 85, category: 'Database' },
      { name: 'PostgreSQL', level: 80, category: 'Database' },
      { name: 'Git', level: 90, category: 'Version Control' },
      { name: 'Docker', level: 75, category: 'DevOps' },
      { name: 'AWS', level: 70, category: 'DevOps' },
    ];
  }

  // Get unique categories
  const categories = ['all', ...new Set(skills.map(skill => skill.category))];

  // Filter skills based on active category
  const filteredSkills =
    activeCategory === 'all' ? skills : skills.filter(skill => skill.category === activeCategory);

  // Handle category change with animation
  const handleCategoryChange = category => {
    if (category === activeCategory) return;

    if (skillsContainerRef.current) {
      // Animate the container on category change
      gsap.to(skillsContainerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setActiveCategory(category);
          gsap.to(skillsContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: 0.1,
          });
        },
      });
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <Paper withBorder p="xl" radius="md">
      <Title order={2} mb="lg">
        Skills & Expertise
      </Title>

      {/* Category tabs */}
      <Tabs
        value={activeCategory}
        onChange={handleCategoryChange}
        mb="xl"
        styles={{
          tab: {
            transition: 'all 0.3s ease',
            '&:where([dataActive])': {
              borderColor: isDark ? '#9B00FF' : '#6200EE',
              color: isDark ? '#00F5FF' : '#6200EE',
            },
          },
        }}
      >
        <Tabs.List>
          {categories.map(category => (
            <Tabs.Tab
              key={category}
              value={category}
              leftSection={category !== 'all' ? <SkillCategoryIcon category={category} /> : null}
            >
              {category === 'all' ? 'All Skills' : category}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      {/* Skills grid */}
      <Box ref={skillsContainerRef}>
        <Grid gutter="xl">
          {filteredSkills.map((skill, index) => (
            <Grid.Col key={skill.name} md={6}>
              <SkillBar
                name={skill.name}
                level={skill.level}
                category={skill.category}
                index={index}
              />
            </Grid.Col>
          ))}
        </Grid>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <Box ta="center" py="xl">
            <Text color="dimmed">No skills found in this category.</Text>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default SkillsVisualization;
