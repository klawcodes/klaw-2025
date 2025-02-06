import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(), // Use coerce to handle string dates
    description: z.string().optional(),
  })
});

export const collections = {
  'posts': postsCollection
};