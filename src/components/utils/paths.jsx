// Detect if we're in production or development
const isProd = import.meta.env.PROD;

// Base path should be empty for username.github.io repos
export const BASE_PATH = '';

/**
 * Resolves a path based on environment
 */
export function resolvePath(path) {
  // If already has the base path or is an external URL, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Ensure path starts with slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In production (GitHub Pages), use the base path
  // In development, use paths as is
  return `${BASE_PATH}${normalizedPath}`;
}

/**
 * Resolves an asset path
 */
export function resolveAssetPath(path) {
  // Handle external URLs
  if (path.startsWith('http')) {
    return path;
  }
  
  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In production, assets are at the root
  return `${BASE_PATH}/${normalizedPath}`;
}