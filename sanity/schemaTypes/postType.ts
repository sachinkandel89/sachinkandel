import {createElement} from 'react'
import {Icon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: () => createElement(Icon, {symbol: 'document-text'}),
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary shown on the blog listing page',
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    defineField({
      name: 'gallery',
      title: 'Photo gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alternative text'}),
          ],
        }),
      ],
      description: 'Additional trip photos shown in the post',
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'e.g. Nepal,Australia',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'tripDuration',
      title: 'Trip duration',
      type: 'string',
      description: 'e.g. "5 days", "2 weeks"',
    }),
    defineField({
      name: 'budgetLevel',
      title: 'Budget level',
      type: 'string',
      options: {
        list: [
          {title: 'Budget', value: 'budget'},
          {title: 'Mid-range', value: 'mid-range'},
          {title: 'Luxury', value: 'luxury'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured post',
      type: 'boolean',
      description: 'Show this post in the featured section on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      destination: 'destination',
    },
    prepare(selection) {
      const {author, destination} = selection
      return {
        ...selection,
        subtitle: [author && `by ${author}`, destination].filter(Boolean).join(' · '),
      }
    },
  },
})
