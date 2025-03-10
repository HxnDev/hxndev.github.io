import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

/**
 * Custom hook to load project data from local JSON
 * @returns {Object} - Project data, loading state, and error
 */
export const useGetProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      // Make sure projectsData.projects exists and is an array
      if (projectsData && Array.isArray(projectsData.projects)) {
        // Process projects - ensure all necessary fields exist
        const processedProjects = projectsData.projects.map(project => {
          // Fix image paths if necessary - only if they don't start with http
          let imagePath = project.image;
          if (imagePath && !imagePath.startsWith('http') && imagePath.startsWith('/')) {
            // Remove the leading slash if it's causing issues in your deployment
            imagePath = imagePath.substring(1);
          }
          
          // If imagePath still has /public/ prefix, remove it
          if (imagePath && imagePath.includes('/public/')) {
            imagePath = imagePath.replace('/public/', '/');
          }
          
          return {
            ...project,
            image: imagePath,
            // Ensure featured is a boolean
            featured: !!project.featured
          };
        });
        
        setProjects(processedProjects);
      } else {
        console.error('Invalid projects data structure');
        setError('Projects data has invalid structure');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects. Please try again later.');
      setLoading(false);
    }
  }, []);
  
  return { projects, loading, error };
};

export default useGetProjects;