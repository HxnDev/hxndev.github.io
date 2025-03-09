import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hxndev.github.io/', // Change this to '/repository-name/' if not using custom domain
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});