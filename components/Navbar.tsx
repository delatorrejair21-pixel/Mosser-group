'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { brand } from '@/data/content'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Process',    href: '#process' },
  { label: 'Properties', href: '#properties' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-parchment-50/96 backdrop-blur-md border-b border-parchment-300/60 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">

          {/* Brand mark */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Green+Logo+no+background.png.webp"
              alt="The Mosser Group"
              width={160}
              height={60}
              data-navbar-logo
              className={`h-[86px] w-auto object-contain transition-all duration-500 ${
                scrolled ? 'brightness-0' : 'brightness-0 invert'
              }`}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[13px] font-sans tracking-wide transition-colors duration-300 hover:opacity-60 ${
                  scrolled ? 'text-stone-700' : 'text-parchment-100'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-6 py-2.5 bg-moss-800 text-parchment-100 text-[13px] font-sans tracking-wide hover:bg-moss-700 transition-colors duration-300"
            >
              Work With Sara
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-1 transition-colors duration-300 ${
              scrolled ? 'text-moss-800' : 'text-parchment-100'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 bg-moss-900 flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-parchment-300 hover:text-parchment-100 transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl font-light text-parchment-100 hover:text-parchment-400 transition-colors duration-300"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-10 py-3.5 bg-parchment-200 text-moss-900 font-sans text-sm tracking-wide hover:bg-white transition-colors duration-300"
          >
            Work With Sara
          </a>
        </nav>

        <div className="absolute bottom-10 text-parchment-500 text-[10px] font-sans tracking-widest uppercase">
          {brand.name} · {brand.affiliation}
        </div>
      </div>
    </>
  )
}
