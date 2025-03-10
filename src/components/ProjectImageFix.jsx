import React, { useState, useEffect } from 'react';
import { Image } from '@mantine/core';

/**
 * A component that handles project image paths and fallbacks
 * This helps resolve path issues with project images
 */
const ProjectImageFix = ({ 
  src, 
  alt, 
  fallbackSrc, 
  height, 
  width = '100%', 
  radius, 
  imageRef = null,
  fit = 'cover',
  style = {},
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [error, setError] = useState(false);
  
  // Normalize the image path
  useEffect(() => {
    if (!src) return;
    
    let normalizedSrc = src;
    
    // If src starts with '/hxndev.github.io/', try removing the leading slash
    if (src.startsWith('/hxndev.github.io/')) {
      normalizedSrc = src.substring(1);
    }
    
    // For development, try to resolve to the proper public path
    try {
      // Check if we're in development environment
      const isDev = process.env.NODE_ENV === 'development';
      if (isDev && src.includes('hxndev.github.io/images/')) {
        // Create a fallback to public directory
        const publicPath = src.replace('hxndev.github.io/images/', 'images/');
        import.meta.url; // This ensures Vite processes this
        normalizedSrc = new URL(`/public${publicPath}`, import.meta.url).href;
      }
    } catch (e) {
      console.log('Path resolution failed:', e);
    }
    
    setImageSrc(normalizedSrc);
  }, [src]);
  
  // Reset error state when src changes
  useEffect(() => {
    setError(false);
  }, [src]);
  
  const handleError = () => {
    console.log('Image failed to load:', imageSrc);
    setError(true);
    
    // Try direct fallback source if available
    if (fallbackSrc) {
      setImageSrc(fallbackSrc);
    } else {
      // Create placeholder
      // Format the alt text for the placeholder
      const placeholderText = alt ? encodeURIComponent(alt) : 'Image';
      setImageSrc(`https://placehold.co/600x400/9B00FF/FFFFFF?text=${placeholderText}`);
    }
  };
  
  return (
    <Image
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      height={height}
      width={width}
      radius={radius}
      fit={fit}
      onError={!error ? handleError : undefined} // Prevent infinite loop if fallback also fails
      style={{
        ...style,
        objectFit: fit
      }}
      {...props}
    />
  );
};

export default ProjectImageFix;