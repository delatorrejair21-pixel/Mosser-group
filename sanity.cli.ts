// Used by the Sanity CLI for commands like `npx sanity manage` and `npx sanity deploy`
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
})
