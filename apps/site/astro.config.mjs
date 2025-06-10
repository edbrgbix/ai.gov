// @ts-check
import { fileURLToPath } from 'url';
import { dirname, join as pathJoin } from 'path';
import globalData from '@csstools/postcss-global-data';
import customMedia from 'postcss-custom-media';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { createAstroConfig } from '@repo/ui/astro-config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseConfig = createAstroConfig({
  appDir: __dirname,
});

export default defineConfig({
  ...baseConfig,
  integrations: [
    ...baseConfig.integrations,
    mdx(), 
    sitemap()
  ],
  vite: {
    ...baseConfig.vite,
    css: {
      postcss: {
        plugins: [
          globalData({ 
            files: [
              pathJoin(__dirname, '../../packages/style-tokens/dist/css/custom-media.css'),
            ],
          }),
          customMedia(),
        ],
      },
    },
  },
});
