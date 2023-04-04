import { createClient } from '@sanity/client'

export const Client = createClient({
  apiVersion: '2023-04-03',
  dataset: 'production',
  ignoreBrowserTokenWarning: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECTID,
  useCdn: true,
})