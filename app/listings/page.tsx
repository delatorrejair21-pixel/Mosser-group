export const dynamic = 'force-dynamic'

import { getProperties } from '@/sanity/queries'
import ListingsClient from '@/components/ListingsClient'

export const metadata = {
  title: 'All Listings — The Mosser Group',
  description: 'Browse all featured properties with Sara Mosser, The Mosser Group · Keller Williams.',
}

export default async function ListingsPage() {
  const properties = await getProperties().catch(() => null)
  return <ListingsClient properties={properties} />
}
