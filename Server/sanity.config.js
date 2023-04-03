import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './Schemas/Index'

export default defineConfig({
  name: 'default',
  title: 'Soft-Media-2.0 Backend',

  projectId: 'cyircdpq',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
