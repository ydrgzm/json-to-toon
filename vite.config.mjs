import { defineConfig } from 'vite';

export default defineConfig({
  // Use root path for local dev, change to '/json-to-toon/' for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/json-to-toon/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: false // Disable auto-open to avoid issues
  },
  // Suppress CJS deprecation warning
  logLevel: 'warn'
});

