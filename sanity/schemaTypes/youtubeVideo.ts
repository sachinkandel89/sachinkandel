import { defineField, defineType } from "sanity";

export default defineType({
  name: "youtubeVideo",
  title: "YouTube Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      description:
        "Paste the full YouTube link (e.g. https://www.youtube.com/watch?v=xxxx)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featured",
      title: "Featured video",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "playlist",
      title: "Playlist name",
      type: "string",
      description: "Optional – e.g. Travel Vlogs, Life in Australia",
    }),
    defineField({
      name: "playlistUrl",
      title: "Playlist URL",
      type: "url",
      description: "Full YouTube playlist link (optional)",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "playlist",
    },
  },
});
