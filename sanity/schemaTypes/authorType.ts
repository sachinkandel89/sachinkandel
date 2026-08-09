import { Icon } from '@sanity/icons'
import { createElement } from 'react'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const authorType = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    icon: () => createElement(Icon, { symbol: 'user' }),
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
            },
        }),
        defineField({
            name: 'image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'bio',
            type: 'array',
            of: [
                defineArrayMember({
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }],
                    lists: [],
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
})
