// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';  // Perhatikan perubahan import ini

export default defineConfig({
  integrations: [react(), tailwind()],  // Dan perubahan ini
});