// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIAL SCHEMA
// Each testimonial appears as a card in the "Client Stories" section.
// Sara can add, edit, reorder, or remove testimonials here.
// ─────────────────────────────────────────────────────────────────────────────

import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'quote',
      title: 'Client Quote',
      type: 'text',
      rows: 4,
      description: 'The full testimonial in the client\'s own words. Do not add quotation marks — the website adds them automatically.',
      validation: (R) => R.required().min(20),
    }),
    defineField({
      name: 'authorName',
      title: 'Client Name',
      type: 'string',
      description: 'e.g. "Michael & Jennifer R." — use initials or first names if preferred for privacy.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'authorLocation',
      title: 'Neighborhood / City',
      type: 'string',
      description: 'e.g. "Buckhead, Atlanta" — shown below the name in the card.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 1, 2, 3 etc. to control order.',
      initialValue: 99,
      validation: (R) => R.required().integer().positive(),
    }),
  ],

  // This controls how each testimonial appears in the studio list
  preview: {
    select: {
      title:    'authorName',
      subtitle: 'quote',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `"${subtitle.slice(0, 60)}…"` : '',
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
