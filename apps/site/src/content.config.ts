import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const api = defineCollection({
  // Load Markdown and MDX files in the `src/content/api/` directory.
  loader: glob({ base: './src/content/api', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
    }),
});

export const collections = { api };
