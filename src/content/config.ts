import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(), // Use coerce to handle string dates
    description: z.string().optional(),
  })
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tech: z.string(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(99),
  })
});

export const collections = {
  'posts': postsCollection,
  'projects': projectsCollection
};