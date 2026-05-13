// Sanity JS client — used server-side to fetch content for the website.
// Data flows: Sanity Studio → Sanity cloud → this client → your pages.
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: '2024-01-01', // Keep this fixed — no need to change it
  useCdn: process.env.NODE_ENV === 'production', // CDN cache in prod, live data in dev
})
