// GROQ queries — fetch content from Sanity.
// Each function returns the Sanity data OR null if the project isn't configured yet.
// Components fall back to static data/content.ts when null is returned.
import { client } from './client'

// ─── TypeScript types ─────────────────────────────────────────────────────────
// These mirror the schema fields so TypeScript knows what data shape to expect.

export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
  alt?: string
}

export type SanitySettings = {
  // Brand
  agentName:    string
  firmName:     string
  affiliation:  string
  // Hero
  heroTagline:  string
  heroImage:    SanityImage | null
  heroStats:    { value: string; label: string }[]
  // About
  aboutEyebrow:    string
  aboutHeadline:   string
  aboutParagraphs: string[]
  aboutValues:     { title: string; desc: string }[]
  // Contact
  contactPhone:   string
  contactEmail:   string
  contactAddress: string
  instagram:      string
  linkedin:       string
  facebook:       string
}

export type SanityTestimonial = {
  _id:            string
  quote:          string
  authorName:     string
  authorLocation: string
}

export type SanityProperty = {
  _id:      string
  location: string
  price:    string
  status:   'Active' | 'Under Contract' | 'Sold'
  beds:     number
  baths:    number
  sqft:     string
  image:    SanityImage | null
}

// ─── Queries ──────────────────────────────────────────────────────────────────

// Returns null if NEXT_PUBLIC_SANITY_PROJECT_ID is not set
function isConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
}

export async function getSiteSettings(): Promise<SanitySettings | null> {
  if (!isConfigured()) return null
  return client.fetch<SanitySettings | null>(
    `*[_type == "siteSettings"][0]{
      agentName, firmName, affiliation,
      heroTagline,
      "heroImage": select(defined(heroImage.asset) => heroImage, null),
      heroStats,
      aboutEyebrow, aboutHeadline, aboutParagraphs, aboutValues,
      contactPhone, contactEmail, contactAddress,
      instagram, linkedin, facebook
    }`,
    {},
    { next: { revalidate: 60 } } // Re-fetch from Sanity at most every 60 seconds
  )
}

export async function getTestimonials(): Promise<SanityTestimonial[] | null> {
  if (!isConfigured()) return null
  const results = await client.fetch<SanityTestimonial[]>(
    `*[_type == "testimonial"] | order(order asc) {
      _id, quote, authorName, authorLocation
    }`,
    {},
    { next: { revalidate: 60 } }
  )
  return results.length > 0 ? results : null
}

export async function getProperties(): Promise<SanityProperty[] | null> {
  if (!isConfigured()) return null
  const results = await client.fetch<SanityProperty[]>(
    `*[_type == "property"] | order(order asc) {
      _id, location, price, status, beds, baths, sqft,
      "image": select(defined(image.asset) => image, null)
    }`,
    {},
    { next: { revalidate: 60 } }
  )
  return results.length > 0 ? results : null
}
