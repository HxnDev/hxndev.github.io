import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for filtering projects
 * @param {Array} projects - Array of projects
 * @returns {Object} - Filter controls and filtered projects
 */
export const useProjectFilter = (projects = []) => {
  // Don't create state from props on every render
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Update allProjects only when projects prop changes (reference)
  useEffect(() => {
    setAllProjects(projects);
    setFilteredProjects(projects);
  }, [projects]); // Only when projects array reference changes
  
  // Extract unique categories - use useMemo to prevent recalculations
  const categories = useMemo(() => {
    return [
      { value: 'all', label: 'All Categories' },
      ...Array.from(
        new Set(
          projects
            .filter(project => project.category)
            .map(project => project.category)
        )
      ).map(category => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1)
      }))
    ];
  }, [projects]);
  
  // Filter projects when category or search changes
  useEffect(() => {
    if (allProjects.length === 0) return; // Prevent filtering empty array
    
    let result = [...allProjects];
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(project => project.category === activeCategory);
    }
    
    // Filter by search
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        (project.technologies && 
          project.technologies.some(tech => 
            tech.toLowerCase().includes(query)
          ))
      );
    }
    
    setFilteredProjects(result);
  }, [allProjects, activeCategory, searchQuery]); // Correct dependencies
  
  // Reset filters
  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };
  
  return {
    allProjects,
    filteredProjects,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    resetFilters
  };
};