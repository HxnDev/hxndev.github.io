import { useState, useEffect, useRef } from 'react';
import { useColorScheme } from '../theme/ThemeProvider';
import { useAnimationContext } from '../context/AnimationContext';

/**
 * Hook for creating dynamic skills visualization
 * @param {Array} skills - Array of skill objects with name, level, and category
 * @returns {Object} Skills visualization utilities
 */
export const useSkillsVisualization = (skills = []) => {
  const [categories, setCategories] = useState(['all']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const { colorScheme } = useColorScheme();
  const { reducedMotion } = useAnimationContext();
  
  // Extract categories from skills
  useEffect(() => {
    if (!skills || skills.length === 0) return;
    
    // Get unique categories
    const uniqueCategories = [...new Set(skills.map(skill => skill.category))];
    setCategories(['all', ...uniqueCategories]);
  }, [skills]);
  
  // Filter skills based on active category
  useEffect(() => {
    setIsAnimating(true);
    
    // Short delay to allow for animation
    const timeoutId = setTimeout(() => {
      // Filter skills
      const filtered = activeCategory === 'all'
        ? skills
        : skills.filter(skill => skill.category === activeCategory);
      
      setFilteredSkills(filtered);
      setIsAnimating(false);
    }, reducedMotion ? 0 : 300);
    
    return () => clearTimeout(timeoutId);
  }, [activeCategory, skills, reducedMotion]);
  
  // Calculate color for skill level
  const getSkillLevelColor = (level) => {
    const isDark = colorScheme === 'dark';
    
    // Define gradient colors based on theme
    const startColor = isDark ? '#9B00FF' : '#6200EE'; // Lower skill level
    const endColor = isDark ? '#00F5FF' : '#03DAC5';   // Higher skill level
    
    // Helper function to interpolate between colors
    const interpolateColor = (color1, color2, factor) => {
      // Convert hex to RGB
      const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
      };
      
      // Convert RGB to hex
      const rgb2hex = (rgb) => {
        return "#" + rgb.map(x => {
          const hex = Math.round(x).toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        }).join('');
      };
      
      // Interpolate between colors
      const rgb1 = hex2rgb(color1);
      const rgb2 = hex2rgb(color2);
      
      const result = rgb1.map((value, index) => {
        return value + factor * (rgb2[index] - value);
      });
      
      return rgb2hex(result);
    };
    
    // Normalize level to 0-1 scale
    const normalizedLevel = level / 100;
    
    // Return interpolated color
    return interpolateColor(startColor, endColor, normalizedLevel);
  };
  
  // Generate a gradient for skill bar
  const getSkillGradient = (level) => {
    const isDark = colorScheme === 'dark';
    
    const baseColor = getSkillLevelColor(level);
    const endColor = level > 80 
      ? (isDark ? '#00F5FF' : '#03DAC5') 
      : baseColor;
    
    return `linear-gradient(90deg, ${baseColor} 0%, ${endColor} 100%)`;
  };
  
  return {
    categories,
    activeCategory,
    setActiveCategory,
    filteredSkills,
    isAnimating,
    getSkillLevelColor,
    getSkillGradient
  };
};

export default useSkillsVisualization;