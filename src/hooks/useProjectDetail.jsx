import { useState } from 'react';

/**
 * Custom hook for project detail view
 * @returns {Object} - Detail view state and controls
 */
export const useProjectDetail = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'detail'
  
  // Open project detail modal
  const openProjectModal = (projectId, projects) => {
    const project = projects.find(p => p.id === projectId || p.title === projectId);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };
  
  // Close project detail modal
  const closeProjectModal = () => {
    setIsModalOpen(false);
    // Delay clearing the selected project to allow for exit animation
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };
  
  // View project details in full page
  const viewProjectDetails = (projectId, projects) => {
    const project = projects.find(p => p.id === projectId || p.title === projectId);
    if (project) {
      setSelectedProject(project);
      setViewMode('detail');
      
      // Scroll to top when viewing project details
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Return to gallery view
  const returnToGallery = () => {
    setViewMode('gallery');
    
    // Delay clearing the selected project to allow for transition
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
    
    // Scroll to top when returning to gallery
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return {
    selectedProject,
    isModalOpen,
    viewMode,
    openProjectModal,
    closeProjectModal,
    viewProjectDetails,
    returnToGallery
  };
};