import React, { useState } from 'react';
import { Group, Button, TextInput, Box, Transition, Paper } from '@mantine/core';
import { IconSearch, IconFilter, IconX } from '@tabler/icons-react';
import { useColorScheme } from '../../theme/ThemeProvider';

const FilterControls = ({ 
  categories = [], 
  activeCategory = 'all', 
  setActiveCategory, 
  searchQuery = '',
  setSearchQuery,
  onReset
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Handle search input clearing
  const handleClearSearch = () => {
    if (setSearchQuery) {
      setSearchQuery('');
    }
    
    // Focus the input after clearing
    setTimeout(() => {
      try {
        const searchInput = document.getElementById('project-search-input');
        if (searchInput) searchInput.focus();
      } catch (error) {
        console.error('Focus error:', error);
      }
    }, 10);
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Paper 
      withBorder 
      radius="xl" 
      p="md" 
      mb="xl"
      style={{
        background: isDark ? 'rgba(28, 29, 34, 0.8)' : 'rgba(245, 245, 250, 0.8)',
        backdropFilter: 'blur(12px)',
        border: isDark ? '1px solid rgba(155, 0, 255, 0.15)' : '1px solid rgba(155, 0, 255, 0.3)'
      }}
    >
      {/* Filter toggle button */}
      <Button
        fullWidth
        leftSection={<IconFilter size={16} />}
        onClick={toggleFilters}
        variant={showFilters ? "filled" : "outline"}
        color="grape"
        radius="xl"
        mb="md"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>
      
      {/* Filter content - only show when filters are toggled on */}
      <Transition
        mounted={showFilters}
        transition="slide-down"
        duration={300}
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles}>
            {/* Search input */}
            <TextInput
              id="project-search-input"
              placeholder="Search projects..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.currentTarget.value)}
              icon={<IconSearch size={16} />}
              radius="xl"
              mb="md"
              rightSection={
                searchQuery ? (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      color: 'gray',
                      '&:hover': { color: '#00F5FF' }
                    }}
                    onClick={handleClearSearch}
                  >
                    <IconX size={16} />
                  </Box>
                ) : null
              }
              sx={{
                width: '100%',
                transition: 'all 0.3s ease',
                input: {
                  backgroundColor: isDark ? 'rgba(40, 40, 45, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '30px', // Ensure input field is also rounded
                  color: isDark ? 'white' : 'black'
                }
              }}
            />
            
            {/* Category buttons */}
            <Group spacing="xs" mb="md" position="center" style={{ flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeCategory === category.value ? "filled" : "outline"}
                  color={activeCategory === category.value ? "grape" : "gray"}
                  onClick={() => setActiveCategory && setActiveCategory(category.value)}
                  size='sm'
                  radius="xl"
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    marginBottom: '0.5rem',
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
                        background: 'linear-gradient(45deg, #9B00FF, #00F5FF)'
                      }}
                    />
                  )}
                </Button>
              ))}
            </Group>
            
            {/* Reset button */}
            {(activeCategory !== 'all' || searchQuery) && (
              <Button
                variant="subtle"
                color="gray"
                onClick={onReset}
                fullWidth
                radius="xl"
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
    </Paper>
  );
};

export default FilterControls;