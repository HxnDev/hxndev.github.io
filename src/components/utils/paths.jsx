// Detect if we're in production or development
const _isProd = import.meta.env.PROD;

// For GitHub Pages repository project sites, this should be the repo name
// For username.github.io personal sites, this should be empty
export const BASE_PATH = '';

/**
 * Resolves a path based on environment
 * This handles routing correctly for GitHub Pages
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
/**
 * Resolves an asset path
 * Works for both development and GitHub Pages environments
 */
export function resolveAssetPath(path) {
  // Handle external URLs
  if (path.startsWith('http')) {
    return path;
  }

  // Remove leading slash if present
  const normalizedPath = path.startsWith('/') ? path.substring(1) : path;

  // Keep it simple - for both GitHub Pages personal site (username.github.io)
  // and local development, assets are served from the root
  return `/${normalizedPath}`;
}
