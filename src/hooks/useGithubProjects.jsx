import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

/**
 * Custom hook to load project data from local JSON instead of GitHub API
 * @returns {Object} - Project data, loading state, and error
 */
export const useGitHubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      // Use the local data from projects.json
      setProjects(projectsData.projects);
      setLoading(false);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects. Please try again later.');
      setLoading(false);
    }
  }, []);
  
  return { projects, loading, error };
};

export default useGitHubProjects;