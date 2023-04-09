// import { createClient } from 'next-sanity'
// import { createClient } from '@sanity/client'
import sanityClient from '@sanity/client';

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECTID
const token = process.env.NEXT_PUBLIC_SANITY_TOKEN

export const Client = sanityClient({
  apiVersion,
  dataset,
  token,
  projectId,
  ignoreBrowserTokenWarning: true,
  useCdn: false,
});
