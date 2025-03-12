/**
 * Central path utility for consistent path management throughout the app
 */

// Base path configuration - edit this value to change path prefix globally
const BASE_PATH = '/hxndev.github.io';

/**
 * Get the application base path
 * @returns {string} The base path for the application
 */
export const getBasePath = () => {
  return BASE_PATH;
};

/**
 * Resolve a path using the application base path
 * @param {string} path - The path to resolve (should start with '/')
 * @returns {string} - The resolved path
 */
export const resolvePath = (path) => {
  // If already has the base path or is an external URL, return as is
  if (path.startsWith(BASE_PATH) || path.startsWith('http')) {
    return path;
  }
  
  // Ensure path starts with slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Combine base path with provided path
  return `${BASE_PATH}${normalizedPath}`;
};

/**
 * Resolve an asset path
 * @param {string} path - The asset path
 * @returns {string} - The resolved asset path
 */
export const resolveAssetPath = (path) => {
  // Handle external URLs and absolute URLs differently
  if (path.startsWith('http')) {
    return path;
  }
  
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Combine base path with asset path
  return `${BASE_PATH}/${normalizedPath}`;
};