// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';  // Perhatikan perubahan import ini

import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [react(), tailwind(), mdx()],  // Dan perubahan ini

  vite: {
    resolve: {
      alias: {
        '@styles': '/src/styles'
      }
    },
    build: {
      assetsInlineLimit: 0, // Ini akan memastikan font tidak di-inline
    },
  },
  
});