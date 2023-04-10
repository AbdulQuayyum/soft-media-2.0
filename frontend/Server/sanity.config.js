import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './Schemas/Index'

export default defineConfig({
  name: 'default',
  title: 'soft-media-v2',

  projectId: 'fz45s8ql',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
