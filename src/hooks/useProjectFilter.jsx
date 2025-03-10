import { useState, useEffect, useMemo } from 'react';

export const useProjectFilter = (initialProjects = []) => {
  // Create state variables
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Use useMemo for categories to avoid recalculations
  const categories = useMemo(() => {
    // Return empty array before projects are loaded
    if (!initialProjects || initialProjects.length === 0) {
      return [{ value: 'all', label: 'All Categories' }];
    }
    
    // Get unique categories
    const uniqueCategories = Array.from(
      new Set(
        initialProjects
          .filter(project => project.category)
          .map(project => project.category)
      )
    ).map(category => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1)
    }));
    
    return [
      { value: 'all', label: 'All Categories' },
      ...uniqueCategories
    ];
  }, [initialProjects]);
  
  // Filter projects when category or search changes
  useEffect(() => {
    // Return early if no projects
    if (!initialProjects || initialProjects.length === 0) {
      setFilteredProjects([]);
      return;
    }
    
    // Start with a fresh copy of initialProjects every time
    let result = [...initialProjects];
    
    // Filter by category (if not 'all')
    if (activeCategory !== 'all') {
      result = result.filter(project => project.category === activeCategory);
    }
    
    // Filter by search query (if not empty)
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        (project.title && project.title.toLowerCase().includes(query)) || 
        (project.description && project.description.toLowerCase().includes(query)) ||
        (project.technologies && 
          project.technologies.some(tech => 
            tech.toLowerCase().includes(query)
          ))
      );
    }
    
    // Update filtered projects
    setFilteredProjects(result);
  }, [initialProjects, activeCategory, searchQuery]);
  
  // Reset filters function
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };
  
  return {
    filteredProjects,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    resetFilters
  };
};

export default useProjectFilter;