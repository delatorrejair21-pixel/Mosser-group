'use client'

import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/data/content'

const footerLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Process',    href: '#process' },
  { label: 'Properties', href: '#properties' },
  { label: 'Contact',    href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-moss-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-12 border-b border-parchment-600/15">

          {/* Brand */}
          <div>
            <Image
              src="/images/Green+Logo+no+background.png.webp"
              alt="The Mosser Group"
              width={180}
              height={70}
              className="h-14 w-auto object-contain brightness-0 invert mb-5"
            />
            <p className="text-[10px] font-sans tracking-wider uppercase text-parchment-600/70 mb-5">
              {brand.affiliation} · Atlanta, GA
            </p>
            <div className="w-10 h-px bg-parchment-600/30 mb-5" />
            <p className="font-display text-2xl font-light italic text-parchment-400 max-w-xs leading-snug">
              &ldquo;{brand.tagline}&rdquo;
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] font-sans tracking-wide text-parchment-500 hover:text-parchment-200 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] font-sans text-parchment-600/60">
            &copy; {year} {brand.name}. All rights reserved.
          </p>
          <p className="text-[11px] font-sans text-parchment-600/40">
            Licensed Real Estate Agent · Georgia · Keller Williams Realty
          </p>
        </div>

      </div>
    </footer>
  )
}
