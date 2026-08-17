import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';

// The dev server proxies /api to the Core backend so the browser makes same-origin
// calls (no CORS needed). Core must be running on :3001 (backend repo).
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: { '@genio/ui': resolve(__dirname, '../../libs/ui/src/index.ts') },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://192.168.1.52:3001', changeOrigin: true },
    },
  },
});
