import { Icon } from '@sanity/icons'
import { createElement } from 'react'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: () => createElement(Icon, {symbol: 'tag'}),
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            description: 'e.g. "Adventure", "Food & Culture", "Budget Travel"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
    ],
})
