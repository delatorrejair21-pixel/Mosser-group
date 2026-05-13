// ─────────────────────────────────────────────────────────────────────────────
// SANITY STUDIO CONFIGURATION
// This file sets up the admin dashboard Sara uses to edit the website.
// ─────────────────────────────────────────────────────────────────────────────

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// The siteSettings document is a singleton — there should only ever be one.
// These settings prevent Sara from accidentally creating duplicates.
const SINGLETON_TYPE = 'siteSettings'
const ALLOWED_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  // ── Project identity (set via environment variables) ─────────────────────
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  // ── Studio appearance ────────────────────────────────────────────────────
  name:  'mosser-group-studio',
  title: 'The Mosser Group — Content Studio',

  // ── Plugins ──────────────────────────────────────────────────────────────
  plugins: [
    // Structures the left-hand navigation in the Studio
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([

            // Site Settings — singleton, opens directly (no list)
            S.listItem()
              .title('⚙️  Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings') // Always the same document
              ),

            S.divider(),

            // Testimonials — list of documents
            S.documentTypeListItem('testimonial')
              .title('💬  Testimonials')
              .child(
                S.documentTypeList('testimonial')
                  .title('Client Testimonials')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),

            // Properties — list of documents
            S.documentTypeListItem('property')
              .title('🏡  Featured Listings')
              .child(
                S.documentTypeList('property')
                  .title('Featured Properties')
                  .defaultOrdering([{ field: 'order', direction: 'asc' }])
              ),
          ]),
    }),

    // visionTool lets you run GROQ queries in the studio — useful for developers
    visionTool(),
  ],

  // ── Schema ───────────────────────────────────────────────────────────────
  schema: { types: schemaTypes },

  // ── Singleton guard ──────────────────────────────────────────────────────
  // Hides "Create new" and "Delete" for Site Settings
  document: {
    actions: (input, ctx) =>
      ctx.schemaType === SINGLETON_TYPE
        ? input.filter(({ action }) => action && ALLOWED_ACTIONS.has(action))
        : input,
  },
})
