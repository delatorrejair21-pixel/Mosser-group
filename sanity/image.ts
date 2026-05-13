// Builds optimized image URLs from Sanity image references.
// Usage: urlFor(image).width(800).url()
import { createImageUrlBuilder } from '@sanity/image-url'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any
import { client } from './client'

const builder = createImageUrlBuilder(client)

// Returns null if the image has no uploaded asset yet (prevents build crash)
export function urlFor(source: SanityImageSource): ReturnType<typeof builder.image> | null {
  if (!source?.asset?._ref) return null
  return builder.image(source)
}
