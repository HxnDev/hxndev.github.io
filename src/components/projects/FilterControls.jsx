import React, { useState, useEffect } from 'react';
import { Group, Button, TextInput, Box, Transition } from '@mantine/core';
import { IconSearch, IconFilter, IconX } from '@tabler/icons-react';
import { gsap } from 'gsap';
import { useColorScheme } from '../../theme/ThemeProvider';
import { useAnimationContext } from '../../context/AnimationContext';

const FilterControls = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  searchQuery,
  setSearchQuery,
  onReset
}) => {
  const [mounted, setMounted] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { colorScheme, quantumColors } = useColorScheme();
  const { reducedMotion } = useAnimationContext();
  const isDark = colorScheme === 'dark';

  // Animate on mount
  useEffect(() => {
    if (reducedMotion) {
      setMounted(true);
      return;
    }
    
    // Set mounted immediately to prevent additional renders
    setMounted(true);
    
    // Use setTimeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const filterControls = document.querySelectorAll('.filter-control');
      
      if (filterControls && filterControls.length > 0) {
        const timeline = gsap.timeline();
        
        timeline.fromTo(
          Array.from(filterControls), // Convert NodeList to Array
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' }
        );
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [reducedMotion]);

  // Handle search input clearing
  const handleClearSearch = () => {
    setSearchQuery('');
    
    // Focus the input after clearing
    setTimeout(() => {
      const searchInput = document.getElementById('project-search-input');
      if (searchInput) searchInput.focus();
    }, 10);
  };

  return (
    <Box mb="xl">
      {/* Mobile filter toggle */}
      <Box className="filter-control filter-mobile-toggle" sx={{ display: { xs: 'block', sm: 'none' }, marginBottom: '1rem' }}>
        <Button
          fullWidth
          leftSection={<IconFilter size={16} />}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          variant={showMobileFilters ? "filled" : "outline"}
          color="grape"
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </Box>
      
      {/* Desktop layout */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Group position="apart" align="center">
          {/* Search input */}
          <TextInput
            id="project-search-input"
            className="filter-control"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            icon={<IconSearch size={16} />}
            rightSection={
              searchQuery ? (
                <Box
                  sx={{
                    cursor: 'pointer',
                    color: 'gray',
                    '&:hover': { color: isDark ? '#00F5FF' : '#9B00FF' }
                  }}
                  onClick={handleClearSearch}
                >
                  <IconX size={16} />
                </Box>
              ) : null
            }
            sx={{
              width: '250px',
              transition: 'all 0.3s ease',
              '&:focus-within': {
                width: '300px',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
              }
            }}
          />
          
          {/* Category buttons */}
          <Group className="filter-control filter-categories" spacing="xs">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "filled" : "outline"}
                color={activeCategory === category.value ? "grape" : "gray"}
                onClick={() => setActiveCategory(category.value)}
                size='sm'
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                {category.label}
                {activeCategory === category.value && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',
                      animation: mounted && !reducedMotion 
                        ? 'slideIn 0.3s ease-out forwards' 
                        : 'none'
                    }}
                  />
                )}
              </Button>
            ))}
            
            {/* Reset button */}
            {(activeCategory !== 'all' || searchQuery) && (
              <Button
                variant="subtle"
                color="gray"
                onClick={onReset}
                size='sm'
                sx={{
                  transition: 'all 0.2s ease',
                  opacity: 0.7,
                  '&:hover': {
                    opacity: 1,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Reset Filters
              </Button>
            )}
          </Group>
        </Group>
      </Box>
      
      {/* Mobile layout */}
      <Transition
        mounted={showMobileFilters}
        transition="slide-down"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Box sx={{ display: { xs: 'block', sm: 'none' } }} style={styles}>
            <TextInput
              id="project-search-input-mobile"
              className="filter-control"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              icon={<IconSearch size={16} />}
              rightSection={
                searchQuery ? (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      color: 'gray',
                      '&:hover': { color: isDark ? '#00F5FF' : '#9B00FF' }
                    }}
                    onClick={handleClearSearch}
                  >
                    <IconX size={16} />
                  </Box>
                ) : null
              }
              mb="md"
              sx={{
                width: '100%',
                transition: 'all 0.3s ease'
              }}
            />
            
            <Group className="filter-control filter-categories-mobile" spacing="xs" mb="md" position="center">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeCategory === category.value ? "filled" : "outline"}
                  color={activeCategory === category.value ? "grape" : "gray"}
                  onClick={() => setActiveCategory(category.value)}
                  size='sm'
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    marginBottom: '0.5rem'
                  }}
                >
                  {category.label}
                  {activeCategory === category.value && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: 'linear-gradient(45deg, #9B00FF, #00F5FF)',
                        animation: mounted && !reducedMotion 
                          ? 'slideIn 0.3s ease-out forwards' 
                          : 'none'
                      }}
                    />
                  )}
                </Button>
              ))}
            </Group>
            
            {(activeCategory !== 'all' || searchQuery) && (
              <Button
                variant="subtle"
                color="gray"
                onClick={onReset}
                fullWidth
                sx={{
                  transition: 'all 0.2s ease',
                  opacity: 0.7,
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                Reset Filters
              </Button>
            )}
          </Box>
        )}
      </Transition>
      
      {/* Add keyframes for animations */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
        `}
      </style>
    </Box>
  );
};

export default FilterControls;