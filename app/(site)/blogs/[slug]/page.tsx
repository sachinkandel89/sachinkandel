import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Gallery from "@/components/Gallery";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  destination,
  tripDuration,
  budgetLevel,
  publishedAt,
  body,
  gallery[]{asset, alt},
  author->{name},
  categories[]->{title}
}`;

const SLUGS_QUERY = `*[_type == "post"]{ "slug": slug.current }`;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  destination?: string;
  tripDuration?: string;
  budgetLevel?: "budget" | "mid-range" | "luxury";
  publishedAt: string;
  body?: any[];
  gallery?: Array<{ asset: any; alt?: string }>;
  author?: { name: string };
  categories?: Array<{ title: string }>;
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await client.fetch(POST_QUERY, { slug });
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Wayfare`,
    description: post.excerpt,
  };
}

const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-10">
        <img
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ""}
          className="w-full rounded-2xl object-cover"
        />
      </figure>
    ),
  },
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 leading-relaxed text-[#14140F]/80">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="font-[var(--font-display)] text-3xl md:text-4xl mt-12 mb-4 text-[#14140F]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-[var(--font-display)] text-2xl md:text-3xl mt-10 mb-3 text-[#14140F]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-[var(--font-display)] text-xl md:text-2xl mt-8 mb-2 text-[#14140F]">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-semibold text-lg mt-6 mb-2 text-[#14140F]">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-[#14140F]/20 pl-6 my-8 italic text-[#14140F]/60 text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-6 space-y-1 text-[#14140F]/80">
        {children}
      </ul>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-[#14140F]">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-[#14140F] transition-colors"
      >
        {children}
      </a>
    ),
  },
};

const budgetLabel: Record<string, string> = {
  budget: "$ Budget",
  "mid-range": "$$ Mid-range",
  luxury: "$$$ Luxury",
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post | null = await client.fetch(POST_QUERY, { slug });
  if (!post) notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F3EFE7]">
      <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(1800).height(1200).url()}
            alt={post.mainImage.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#14140F]/10" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#F3EFE7] via-[#F3EFE7]/10 to-transparent" />

        <div className="absolute top-24 left-6 md:left-10 z-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-white/80 text-sm hover:text-white transition-colors"
          >
            <span>←</span>
            <span>All stories</span>
          </Link>
        </div>
      </div>

      <div className="relative -mt-24 z-10 px-6 md:pl-36 md:pr-10 pb-32">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.destination && (
            <span className="text-xs px-3 py-1 rounded-full bg-[#14140F]/8 text-[#14140F]/70 uppercase tracking-wider">
              {post.destination}
            </span>
          )}
          {post.tripDuration && (
            <span className="text-xs px-3 py-1 rounded-full bg-[#14140F]/8 text-[#14140F]/70">
              {post.tripDuration}
            </span>
          )}
          {post.budgetLevel && (
            <span className="text-xs px-3 py-1 rounded-full bg-[#14140F]/8 text-[#14140F]/70">
              {budgetLabel[post.budgetLevel] ?? post.budgetLevel}
            </span>
          )}
          {post.categories?.map((cat) => (
            <span
              key={cat.title}
              className="text-xs px-3 py-1 rounded-full bg-[#14140F]/8 text-[#14140F]/70"
            >
              {cat.title}
            </span>
          ))}
        </div>

        <h1 className="font-[var(--font-display)] text-4xl md:text-6xl leading-tight text-[#14140F] max-w-3xl mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 text-sm text-[#14140F]/50">
          {post.author?.name && (
            <>
              <span>{post.author.name}</span>
              <span>·</span>
            </>
          )}
          <span>{formattedDate}</span>
        </div>

        {post.excerpt && (
          <p className="text-lg md:text-xl leading-relaxed text-[#14140F]/70 max-w-2xl mb-12 font-[var(--font-display)] italic">
            {post.excerpt}
          </p>
        )}

        <div className="w-12 h-px bg-[#14140F]/20 mb-12" />
        {post.body && post.body.length > 0 && (
          <article className="max-w-2xl text-base">
            <PortableText value={post.body} components={ptComponents} />
          </article>
        )}

        {post.gallery && post.gallery.length > 0 && (
          <section className="mt-16">
            <p className="text-sm text-[#14140F]/40 uppercase tracking-widest mb-6">
              Photo gallery
            </p>
            <Gallery images={post.gallery} />
          </section>
        )}

        <div className="mt-20">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-[#14140F]/50 hover:text-[#14140F] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to all stories</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
