import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // For username.github.io personal sites, the base URL should be '/'
  base: '/',
  
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  server: {
    port: 3000,
    open: true
  }
});