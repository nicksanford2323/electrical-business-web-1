// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // The base option ensures the app’s assets (JS/CSS) load from /bama3/ on GitHub Pages
  base: '/bama3/',
  plugins: [react()],
  server: {
    // Allow your specific Replit host
    allowedHosts: [
      '79f7ed2b-4a25-41e2-be82-8a3341ae0aa1-00-3expw1nxlehl5.kirk.replit.dev'
    ]
  }
});
