// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind'; 

import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [react(), tailwind(), mdx({
    remarkPlugins: [],
    rehypePlugins: [],
    extendMarkdownConfig: true,
  }),], 

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