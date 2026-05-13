import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sara Mosser — The Mosser Group · Keller Williams',
  description:
    'Atlanta luxury real estate with Sara Mosser. $100M+ in career sales, top 10% solo agent in Atlanta. Buying, selling, relocation, and luxury real estate strategy.',
  openGraph: {
    title: 'Sara Mosser — The Mosser Group',
    description: 'Luxury real estate in Atlanta with Sara Mosser, Keller Williams.',
    // Replace with real image: add /public/og-image.jpg
    // images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
