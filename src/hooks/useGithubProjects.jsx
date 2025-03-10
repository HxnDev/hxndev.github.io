import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and format GitHub repositories as projects
 * @param {string} username - GitHub username
 * @returns {Object} - GitHub projects, loading state, and error
 */
export const useGitHubProjects = (username = 'HxnDev') => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch repositories from GitHub API
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub repositories');
        }
        
        const repos = await response.json();
        
        // Transform GitHub repos into project format
        const transformedProjects = repos
          .filter(repo => !repo.fork && !repo.archived) // Filter out forks and archived repos
          .map(repo => {
            // Try to determine the category based on topics or languages
            let category = 'other';
            
            if (repo.topics && repo.topics.includes('web')) {
              category = 'web';
            } else if (repo.topics && repo.topics.some(topic => ['ai', 'machine-learning', 'ml', 'deep-learning'].includes(topic))) {
              category = 'ai';
            } else if (repo.topics && repo.topics.some(topic => ['mobile', 'android', 'ios', 'react-native'].includes(topic))) {
              category = 'mobile';
            } else if (repo.topics && repo.topics.some(topic => ['data', 'visualization', 'dashboard', 'analytics'].includes(topic))) {
              category = 'data';
            }
            
            // Extract technologies from languages when available
            const technologies = repo.topics || [];
            
            return {
              id: repo.name,
              title: repo.name
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' '),
              description: repo.description || 'No description available',
              longDescription: `This is a GitHub repository created on ${new Date(repo.created_at).toLocaleDateString()}. ${repo.description || ''}`,
              image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
              technologies: technologies,
              githubUrl: repo.html_url,
              liveUrl: repo.homepage || '#',
              featured: repo.stargazers_count > 0, // Mark as featured if it has stars
              category: category,
              date: new Date(repo.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
              })
            };
          });
        
        setProjects(transformedProjects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub projects:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [username]);
  
  return { projects, loading, error };
};

export default useGitHubProjects;