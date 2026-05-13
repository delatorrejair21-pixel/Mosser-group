'use client'

import { useState, FormEvent } from 'react'
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react'
import FadeInView from '@/components/ui/FadeInView'
import { contact as staticContact, brand } from '@/data/content'
import type { SanitySettings } from '@/sanity/queries'

type Props = { sanitySettings?: SanitySettings | null }

export default function Contact({ sanitySettings }: Props) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // Sanity data takes priority; static content.ts is the fallback
  const phone     = sanitySettings?.contactPhone   ?? staticContact.phone
  const email     = sanitySettings?.contactEmail   ?? staticContact.email
  const address   = sanitySettings?.contactAddress ?? staticContact.address
  const instagram = sanitySettings?.instagram      ?? staticContact.social.instagram
  const linkedin  = sanitySettings?.linkedin       ?? staticContact.social.linkedin
  const facebook  = sanitySettings?.facebook       ?? staticContact.social.facebook
  const agentName = sanitySettings?.agentName      ?? brand.agent

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Connect to Formspree, HubSpot, or another form backend
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-white py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Info */}
          <div>
            <FadeInView>
              <span className="eyebrow text-moss-700 mb-6 block">{staticContact.eyebrow}</span>
            </FadeInView>
            <FadeInView delay={0.1}>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight text-stone-900 mb-8 whitespace-pre-line">
                {staticContact.headline}
              </h2>
            </FadeInView>
            <FadeInView delay={0.2}>
              <p className="font-sans text-base md:text-lg text-stone-500 leading-relaxed mb-14 max-w-md">
                {staticContact.subtext}
              </p>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="space-y-5 mb-12">
                <a href={`tel:${phone}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 border border-moss-200 flex items-center justify-center group-hover:bg-moss-800 group-hover:border-moss-800 transition-all duration-300">
                    <Phone size={14} className="text-moss-700 group-hover:text-parchment-100 transition-colors duration-300" />
                  </div>
                  <span className="font-sans text-stone-700 group-hover:text-moss-800 transition-colors duration-300">{phone}</span>
                </a>
                <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 border border-moss-200 flex items-center justify-center group-hover:bg-moss-800 group-hover:border-moss-800 transition-all duration-300">
                    <Mail size={14} className="text-moss-700 group-hover:text-parchment-100 transition-colors duration-300" />
                  </div>
                  <span className="font-sans text-stone-700 group-hover:text-moss-800 transition-colors duration-300">{email}</span>
                </a>
                {address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-moss-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={14} className="text-moss-700" />
                    </div>
                    <address className="font-sans text-stone-500 not-italic text-sm leading-relaxed whitespace-pre-line">{address}</address>
                  </div>
                )}
              </div>
            </FadeInView>

            <FadeInView delay={0.4}>
              <div className="flex gap-3">
                {instagram && instagram !== '#' && (
                  <a href={instagram} className="w-10 h-10 border border-parchment-400 flex items-center justify-center hover:bg-moss-800 hover:border-moss-800 group transition-all duration-300" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <Instagram size={14} className="text-stone-500 group-hover:text-parchment-100 transition-colors duration-300" />
                  </a>
                )}
                {linkedin && linkedin !== '#' && (
                  <a href={linkedin} className="w-10 h-10 border border-parchment-400 flex items-center justify-center hover:bg-moss-800 hover:border-moss-800 group transition-all duration-300" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={14} className="text-stone-500 group-hover:text-parchment-100 transition-colors duration-300" />
                  </a>
                )}
                {facebook && facebook !== '#' && (
                  <a href={facebook} className="w-10 h-10 border border-parchment-400 flex items-center justify-center hover:bg-moss-800 hover:border-moss-800 group transition-all duration-300" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <Facebook size={14} className="text-stone-500 group-hover:text-parchment-100 transition-colors duration-300" />
                  </a>
                )}
              </div>
            </FadeInView>
          </div>

          {/* Right — Form */}
          <FadeInView delay={0.2} direction="left">
            <div className="bg-parchment-50 p-8 lg:p-12 border border-parchment-300/60">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-12 h-px bg-moss-800 mx-auto mb-8" />
                  <h3 className="font-display text-3xl font-light text-stone-900 mb-4">
                    Thank you, <span className="italic">{formData.name.split(' ')[0]}.</span>
                  </h3>
                  <p className="font-sans text-stone-500 text-sm leading-relaxed max-w-xs">
                    Sara will be in touch shortly. Looking forward to learning more about what you&apos;re searching for.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-light text-stone-900 mb-1">Start the Conversation</h3>
                  <p className="font-sans text-sm text-stone-400 mb-8">No pressure. No commitment. Just a conversation.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { name: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your full name',              required: true  },
                      { name: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com',              required: true  },
                      { name: 'phone',   label: 'Phone',   type: 'tel',   placeholder: '(404) 555-0000',              required: false },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-[11px] font-sans font-semibold tracking-widest uppercase text-stone-400 mb-2">
                          {field.label}{!field.required && <span className="normal-case tracking-normal font-normal ml-1">(optional)</span>}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          required={field.required}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 bg-white border border-parchment-300 font-sans text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-moss-600 transition-colors duration-200"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[11px] font-sans font-semibold tracking-widest uppercase text-stone-400 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell Sara a bit about what you're looking for..."
                        className="w-full px-4 py-3 bg-white border border-parchment-300 font-sans text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-moss-600 transition-colors duration-200 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-moss-800 text-parchment-100 font-sans text-sm font-semibold tracking-widest uppercase hover:bg-moss-700 transition-colors duration-300 mt-2"
                    >
                      Start the Conversation
                    </button>
                    <p className="text-[11px] font-sans text-stone-400 text-center leading-relaxed">
                      {agentName} personally reviews every inquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </FadeInView>

        </div>
      </div>
    </section>
  )
}
