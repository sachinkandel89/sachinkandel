import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import HomeClient from "@/components/HomeClient";

const HERO_QUERY = `*[_type == "post"] | order(featured desc, publishedAt desc)[0...1]{
  _id, title, slug, excerpt, mainImage, destination, publishedAt
}`;

const RECENT_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...4]{
  _id, title, slug, excerpt, mainImage, destination, tripDuration, publishedAt,
  categories[]->{title}
}`;

export default async function HomePage() {
  const [heroPosts, recentRaw] = await Promise.all([
    client.fetch(HERO_QUERY),
    client.fetch(RECENT_POSTS_QUERY),
  ]);

  const featured = heroPosts?.[0];

  const imageUrl = "/profile.jpg"
  const featuredThumb = featured?.mainImage
    ? urlFor(featured.mainImage).width(200).height(240).url()
    : null;

  const recentPosts = (recentRaw || []).map((post: any) => ({
    id: post._id,
    title: post.title,
    excerpt: post.excerpt,
    destination: post.destination,
    tripDuration: post.tripDuration,
    publishedAt: post.publishedAt,
    slug: post.slug?.current,
    categories: post.categories?.map((c: any) => c.title) || [],
    imageUrl: post.mainImage ? urlFor(post.mainImage).width(800).height(600).url() : null,
  }));

  return (
    <HomeClient
      imageUrl={imageUrl}
      featuredThumb={featuredThumb}
      featured={
        featured
          ? {
            title: featured.title,
            excerpt: featured.excerpt,
            destination: featured.destination,
            publishedAt: featured.publishedAt,
            slug: featured.slug?.current,
          }
          : null
      }
      recentPosts={recentPosts}
    />
  );
}

