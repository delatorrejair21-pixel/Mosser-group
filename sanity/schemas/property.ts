// ─────────────────────────────────────────────────────────────────────────────
// PROPERTY SCHEMA
// Each property appears as a card in the "Featured Listings" section.
// Sara can add new listings, update prices/status, swap photos, and reorder.
// ─────────────────────────────────────────────────────────────────────────────

import { defineField, defineType } from 'sanity'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: () => '🏡',
  fields: [
    defineField({
      name: 'location',
      title: 'Address / Neighborhood',
      type: 'string',
      description: 'e.g. "Buckhead, Atlanta, GA" — shown at the top of the card.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'price',
      title: 'Listing Price',
      type: 'string',
      description: 'Format however you prefer, e.g. "$1,250,000" or "Offered at $1.25M".',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'status',
      title: 'Listing Status',
      type: 'string',
      description: 'Controls the badge color on the card.',
      options: {
        list: [
          { title: 'Active — green badge',            value: 'Active'           },
          { title: 'Under Contract — amber badge',    value: 'Under Contract'   },
          { title: 'Sold — muted badge',              value: 'Sold'             },
        ],
        layout: 'radio',
      },
      initialValue: 'Active',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'beds',
      title: 'Bedrooms',
      type: 'number',
      validation: (R) => R.required().positive().integer(),
    }),
    defineField({
      name: 'baths',
      title: 'Bathrooms',
      type: 'number',
      description: 'Use decimals for half-baths, e.g. 3.5',
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: 'sqft',
      title: 'Square Footage',
      type: 'string',
      description: 'Formatted as text so you can include commas, e.g. "3,800".',
    }),
    defineField({
      name: 'image',
      title: 'Property Photo',
      type: 'image',
      description: 'Main photo shown on the listing card. High-res JPEG recommended (landscape orientation works best).',
      options: {
        hotspot: true, // Lets you control the focal point so the crop looks great
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Brief description of the photo for accessibility.',
        }),
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the grid. Use 1, 2, 3 etc.',
      initialValue: 99,
      validation: (R) => R.required().integer().positive(),
    }),
  ],

  preview: {
    select: {
      title:    'location',
      subtitle: 'price',
      media:    'image',
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media }
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
