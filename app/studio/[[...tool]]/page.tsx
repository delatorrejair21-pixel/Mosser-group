// Renders Sanity Studio at /studio
// Sara accesses the admin dashboard by navigating to yoursite.com/studio
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
