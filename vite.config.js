import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Adjust base path according to your deployment needs
  // Using '/' if deploying to a custom domain, or '/hxndev.github.io/' if deploying to a GitHub Pages project site
  base: '/',  // Changed to root path for local development
  
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  
  // Add alias for better imports
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Public directory configuration
  publicDir: 'public',
  
  // Server options
  server: {
    port: 3000,
    open: true,
    // Handles image request paths correctly
    proxy: {
      '/hxndev.github.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hxndev\.github\.io/, '')
      }
    }
  }
});