import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const missions = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/missions' }),
  schema: z.object({
    code: z.string(),
    order: z.number(),
    title: z.string(),
    summary: z.string(),
    dates: z.string(),
    role: z.string(),
    team: z.string(),
    stack: z.array(z.string()),
    // One measured result for the homepage row. `todo` marks a placeholder.
    readout: z.object({ value: z.string(), label: z.string(), todo: z.boolean().default(false) }),
    links: z
      .array(z.object({ label: z.string(), href: z.string(), note: z.string().optional() }))
      .default([]),
    palette: z.enum(['starsync', 'anki', 'bluelink']).optional(),
  }),
});

export const collections = { missions };
