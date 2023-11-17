import { defineType } from "sanity";
import { DocumentIcon, ImageIcon } from '@sanity/icons'

export default defineType({
    type: 'document',
    name: 'album',
    title: 'Album',
    icon: ImageIcon,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'sharedAlbumUrl',
            title: 'URL',
            type: 'string',
            description: 'The URL of the shared album on your Synology NAS. Blackpig Only.',
        },
    ],
    preview: {
        select: {
            title: 'name',
        },
        prepare({ title }) {
            return {
                title,
            }
        }
    }
})