import React, { useRef, useState, useEffect } from 'react';
import { Box, Text, Title, Paper } from '@mantine/core';
import { gsap } from 'gsap';
import { useAnimationContext } from '../../context/AnimationContext';
import { useColorScheme } from '../../theme/ThemeProvider';

/**
 * Timeline item component with animation effects
 */
const TimelineItem = ({ title, company, date, description, bullets = [], isActive = false }) => {
  const itemRef = useRef(null);
  const circleRef = useRef(null);
  const contentRef = useRef(null);
  const { reducedMotion } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Handle active state animations
  useEffect(() => {
    if (!itemRef.current || reducedMotion) return;

    if (isActive) {
      // Animate the timeline item when active
      gsap.to(circleRef.current, {
        scale: 1.2,
        backgroundColor: isDark ? '#9B00FF' : '#6200EE',
        boxShadow: '0 0 15px rgba(155, 0, 255, 0.5)',
        duration: 0.5,
      });

      gsap.to(itemRef.current, {
        borderLeftColor: isDark ? '#9B00FF' : '#6200EE',
        duration: 0.5,
      });

      // Staggered animation for content elements
      gsap.fromTo(
        contentRef.current.querySelectorAll('.timeline-content'),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    } else {
      // Reset animations when not active
      gsap.to(circleRef.current, {
        scale: 1,
        backgroundColor: isDark ? 'rgba(155, 0, 255, 0.3)' : 'rgba(98, 0, 238, 0.2)',
        boxShadow: 'none',
        duration: 0.5,
      });

      gsap.to(itemRef.current, {
        borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        duration: 0.5,
      });
    }
  }, [isActive, reducedMotion, isDark]);

  return (
    <Box
      ref={itemRef}
      mb={40}
      pl={30}
      style={{
        position: 'relative',
        borderLeft: '2px solid',
        borderLeftColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.5s ease',
      }}
    >
      {/* Timeline node */}
      <Box
        ref={circleRef}
        style={{
          position: 'absolute',
          left: -10,
          top: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: isDark ? 'rgba(155, 0, 255, 0.3)' : 'rgba(98, 0, 238, 0.2)',
          transition: 'all 0.3s ease',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Box ref={contentRef}>
        <Text className="timeline-content" color="dimmed" size="sm" mb="xs">
          {date}
        </Text>
        <Title className="timeline-content" order={4} mb="xs">
          {title}
        </Title>
        <Text className="timeline-content" weight={500} size="md" mb="sm">
          {company}
        </Text>

        {/* Description - can be string or JSX */}
        <Box className="timeline-content" mb={bullets && bullets.length > 0 ? 'sm' : 'md'}>
          {typeof description === 'string' ? <Text>{description}</Text> : description}
        </Box>

        {/* Bullets list - if provided */}
        {bullets && bullets.length > 0 && (
          <Box className="timeline-content" mb="md">
            <ul style={{ paddingLeft: '20px', margin: '0' }}>
              {bullets.map((bullet, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <Text component="span">{bullet}</Text>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/**
 * Interactive timeline component with scroll-based activation
 */
const Timeline = ({ experiences = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);
  const { scrollPosition } = useAnimationContext();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Update active timeline item based on scroll position
  useEffect(() => {
    if (!timelineRef.current) return;

    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    const viewportHeight = window.innerHeight;

    // Calculate which item should be active based on scroll position
    let newActiveIndex = 0;

    timelineItems.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const itemTop = itemRect.top;

      // Item is considered "active" when it's in the middle of the viewport
      if (itemTop < viewportHeight * 0.6 && itemTop > 0) {
        newActiveIndex = index;
      }
    });

    setActiveIndex(newActiveIndex);
  }, [scrollPosition]);

  if (!experiences || experiences.length === 0) {
    // Show sample data if no experiences provided
    experiences = [
      {
        title: 'Software Engineer',
        company: 'Company Name',
        date: 'Jan 2023 - Present',
        description:
          'Developing and maintaining web applications using React and Node.js. Leading a team of frontend developers.',
      },
      {
        title: 'ML Engineer',
        company: 'Company Name',
        date: 'Jun 2021 - Dec 2022',
        description:
          'Designed and implemented machine learning models for natural language processing applications.',
      },
      {
        title: 'Software Developer Intern',
        company: 'Company Name',
        date: 'Jan 2021 - May 2021',
        description: 'Assisted in the development of a web application using React and Firebase.',
      },
    ];
  }

  return (
    <Paper withBorder p="xl" radius="md" style={{ overflow: 'hidden' }}>
      <Title order={2} mb="xl">
        Experience
      </Title>

      <Box ref={timelineRef} style={{ position: 'relative' }}>
        {/* Timeline track */}
        <Box
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            zIndex: 1,
          }}
        />

        {/* Timeline items */}
        {experiences.map((experience, index) => (
          <Box key={`${experience.company}-${index}`} className="timeline-item">
            <TimelineItem
              title={experience.title}
              company={experience.company}
              date={experience.date}
              description={experience.description}
              bullets={experience.bullets}
              isActive={index === activeIndex}
              index={index}
            />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Timeline;
