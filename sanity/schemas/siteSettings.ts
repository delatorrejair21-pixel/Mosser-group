// ─────────────────────────────────────────────────────────────────────────────
// SITE SETTINGS SCHEMA
// This controls the main content across the homepage:
//   Hero section, About section, and Contact information.
//
// This is a "singleton" — meaning there is only ever ONE of these documents.
// Sara will see it as a single editable page in the CMS, not a list.
// ─────────────────────────────────────────────────────────────────────────────

import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Groups organize fields into tabs in the editor so it's less overwhelming
  groups: [
    { name: 'brand',   title: '🏷️  Brand & Name'        },
    { name: 'hero',    title: '🖼️  Hero Section'          },
    { name: 'about',   title: '👋  About Section'         },
    { name: 'contact', title: '📞  Contact Information'   },
  ],
  fields: [

    // ── BRAND ────────────────────────────────────────────────────────────────
    defineField({
      name: 'agentName',
      title: 'Agent Name',
      type: 'string',
      group: 'brand',
      description: 'Your full name as it appears on the site.',
      initialValue: 'Sara Mosser',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'firmName',
      title: 'Firm / Group Name',
      type: 'string',
      group: 'brand',
      description: 'e.g. "The Mosser Group"',
      initialValue: 'The Mosser Group',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'affiliation',
      title: 'Brokerage Affiliation',
      type: 'string',
      group: 'brand',
      description: 'e.g. "Keller Williams"',
      initialValue: 'Keller Williams',
    }),

    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'The italic quote that appears under your name in the hero.',
      initialValue: "You've got somewhere you want to be — let me help you get there.",
      validation: (R) => R.required().max(160),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Portrait Photo',
      type: 'image',
      group: 'hero',
      description: 'Your main portrait on the homepage. High-res JPEG or PNG recommended.',
      options: {
        hotspot: true, // Lets you choose which part of the photo to focus on
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the photo for accessibility (e.g. "Sara Mosser headshot").',
          initialValue: 'Sara Mosser — The Mosser Group',
        }),
      ],
    }),
    defineField({
      name: 'heroStats',
      title: 'Stats (Career Highlights)',
      type: 'array',
      group: 'hero',
      description: 'The 3 numbers shown below your tagline. Keep each value short (e.g. "$100M+").',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Stat Value', type: 'string', description: 'e.g. "$100M+" or "Top 10%"' }),
            defineField({ name: 'label', title: 'Stat Label', type: 'string', description: 'e.g. "Career Sales"' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
      validation: (R) => R.max(4),
    }),

    // ── ABOUT ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'aboutEyebrow',
      title: 'About — Eyebrow Label',
      type: 'string',
      group: 'about',
      description: 'Small uppercase label above the headline (e.g. "About The Mosser Group").',
      initialValue: 'About The Mosser Group',
    }),
    defineField({
      name: 'aboutHeadline',
      title: 'About — Headline',
      type: 'string',
      group: 'about',
      description: 'Large heading in the About section.',
      initialValue: 'Real Estate, Done With Intention',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'aboutParagraphs',
      title: 'About — Body Paragraphs',
      type: 'array',
      group: 'about',
      description: 'Add one or two paragraphs describing your background and approach.',
      of: [{ type: 'text', rows: 4 }],
      validation: (R) => R.max(3),
    }),
    defineField({
      name: 'aboutValues',
      title: 'About — Value Pillars',
      type: 'array',
      group: 'about',
      description: 'The three key values listed on the right side of the About section.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Value Title',       type: 'string' }),
            defineField({ name: 'desc',  title: 'Value Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
      validation: (R) => R.max(4),
    }),

    // ── CONTACT ───────────────────────────────────────────────────────────────
    defineField({
      name: 'contactPhone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      description: 'Displayed and linked on the contact section.',
      initialValue: '(404) 555-0192',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
      description: 'Displayed and linked on the contact section.',
      initialValue: 'sara@themossergroup.com',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Office Address',
      type: 'text',
      rows: 2,
      group: 'contact',
      description: 'Full office address. Press Enter for a line break.',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'contact',
      description: 'Full URL including https://',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'contact',
    }),
  ],

  // How this document appears in the studio list view
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
