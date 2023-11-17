/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { pageStructure, singletonPlugin } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import Iframe, {
  defineUrlResolver,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'
import page from 'schemas/documents/page'
import project from 'schemas/documents/project'
import duration from 'schemas/objects/duration'
import milestone from 'schemas/objects/milestone'
import timeline from 'schemas/objects/timeline'
import home from 'schemas/singletons/home'
import settings from 'schemas/singletons/settings'
import post from 'schemas/documents/post'
import author from 'schemas/documents/author'
import category from 'schemas/documents/category'
import blockContent from 'schemas/documents/blockContent'
import { media } from 'sanity-plugin-media'
import { SanityDocument } from 'next-sanity'
import { codeInput } from '@sanity/code-input'
import {
  dashboardTool,
  sanityTutorialsWidget,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard'
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify'
import album from 'schemas/documents/album'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Blackpig'

export const PREVIEWABLE_DOCUMENT_TYPES = [
  home.name,
  page.name,
  project.name,
  post.name,
] satisfies string[]

export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS = [
  page.name,
  project.name,
] satisfies typeof PREVIEWABLE_DOCUMENT_TYPES

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = '/api/draft'

export const urlResolver = defineUrlResolver({
  base: PREVIEW_BASE_URL,
  requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
})

export const iframeOptions = {
  url: urlResolver,
  urlSecretId: previewSecretId,
} satisfies IframeOptions

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      duration,
      post,
      author,
      category,
      blockContent,
      page,
      project,
      album,
      // Objects
      milestone,
      timeline,
    ],
  },
  plugins: [
    dashboardTool({
      widgets: [
        // sanityTutorialsWidget(),
        projectUsersWidget(),
        projectInfoWidget(),
      ],
    }),
    codeInput(),
    deskTool({
      structure: pageStructure([home, settings]),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
          return S.document().views([
            // Default form view
            S.view.form(),
            // Preview
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ])
        }
        switch (schemaType) {
          case `post`:
            return S.document().views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: (doc: SanityDocument) => getPreviewUrl(doc),
                })
                .title('Preview'),
            ])
          default:
            return S.document().views([S.view.form()])
        }

        return null
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add the "Open preview" action
    previewUrl({
      base: PREVIEW_BASE_URL,
      requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // Media browser
    // https://www.sanity.io/plugins/sanity-plugin-media
    media(),
  ],
})

// Customise this function to show the correct URL based on the current document
function getPreviewUrl(doc: SanityDocument) {
  return doc?.slug?.current
    ? `${window.location.host}/${doc.slug.current}`
    : `${window.location.host}`
}
