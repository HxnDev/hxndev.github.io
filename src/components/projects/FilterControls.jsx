import React, { useState } from 'react';
import { Group, Button, TextInput, Box, Transition, Paper } from '@mantine/core';
import { IconSearch, IconFilter, IconX } from '@tabler/icons-react';

const FilterControls = ({ 
  categories = [], 
  activeCategory = 'all', 
  setActiveCategory, 
  searchQuery = '',
  setSearchQuery,
  onReset
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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

  return (
    <Paper 
      withBorder 
      radius="md" 
      p="md" 
      mb="xl"
      style={{
        background: 'rgba(28, 29, 34, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(155, 0, 255, 0.15)'
      }}
    >
      {/* Mobile filter toggle */}
      <Box className="filter-mobile-toggle" sx={{ display: { xs: 'block', sm: 'none' }, marginBottom: '1rem' }}>
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
            placeholder="Search projects..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.currentTarget.value)}
            icon={<IconSearch size={16} />}
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
              width: '250px',
              transition: 'all 0.3s ease',
              '&:focus-within': {
                width: '300px',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
              },
              input: {
                backgroundColor: 'rgba(40, 40, 45, 0.8)'
              }
            }}
          />
          
          {/* Category buttons */}
          <Group spacing="xs">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "filled" : "outline"}
                color={activeCategory === category.value ? "grape" : "gray"}
                onClick={() => setActiveCategory && setActiveCategory(category.value)}
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
                      background: 'linear-gradient(45deg, #9B00FF, #00F5FF)'
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
              placeholder="Search projects..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.currentTarget.value)}
              icon={<IconSearch size={16} />}
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
              mb="md"
              sx={{
                width: '100%',
                transition: 'all 0.3s ease',
                input: {
                  backgroundColor: 'rgba(40, 40, 45, 0.8)'
                }
              }}
            />
            
            <Group spacing="xs" mb="md" position="center" style={{ flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeCategory === category.value ? "filled" : "outline"}
                  color={activeCategory === category.value ? "grape" : "gray"}
                  onClick={() => setActiveCategory && setActiveCategory(category.value)}
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
                        background: 'linear-gradient(45deg, #9B00FF, #00F5FF)'
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
    </Paper>
  );
};

export default FilterControls;