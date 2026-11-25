import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifestFilename: 'manifest.json',
      manifest: {
        id: '/',
        name: 'Gag Combos',
        short_name: 'Gag Combos',
        description: 'Toontown Rewritten gag combo calculator.',
        start_url: '/',
        scope: '/',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,png,webp,svg,ico,ttf,woff,woff2}',
        ],
        globIgnores: [
          '**/node_modules/**/*',
          'img/unused/**/*',
          'service-worker.js',
        ],
      },
    }),
  ],
});
