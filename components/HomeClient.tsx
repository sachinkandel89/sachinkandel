"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

export const socialLinks = [
  { label: "INSTAGRAM", href: "https://www.instagram.com/sachin_kandel45/" },
  { label: "TIKTOK", href: "https://www.tiktok.com/@sachin.kandel7" },
  { label: "YOUTUBE", href: "https://www.youtube.com/channel/UCcJOh7WbGlGIOHMvAfE5W1Q" },
];

type FeaturedPost = {
    title: string;
    excerpt?: string;
    destination?: string;
    publishedAt?: string;
    slug?: string;
};

type RecentPost = {
    id: string;
    title: string;
    excerpt?: string;
    destination?: string;
    tripDuration?: string;
    publishedAt?: string;
    slug?: string;
    categories: string[];
    imageUrl: string | null;
};

type Props = {
    imageUrl: string;
    featuredThumb: string | null;
    featured: FeaturedPost | null;
    recentPosts?: RecentPost[];
};

export default function HomeClient({ imageUrl, featuredThumb, featured, recentPosts = [] }: Props) {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }

        const sections = ["home", "about", "contact"]
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        const newHash = id === "home" ? "" : `#${id}`;
                        const currentHash = window.location.hash;
                        if (currentHash !== newHash && !(currentHash === "" && newHash === "")) {
                            const newUrl = newHash ? `/#${id}` : "/";
                            window.history.replaceState(null, "", newUrl);
                            window.dispatchEvent(new Event("hashchange"));
                        }
                    }
                });
            },
            {
                threshold: 0.3,
            }
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "");
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return null;
        try {
            return new Date(dateStr).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } catch {
            return null;
        }
    };

    return (
        <main className="w-full bg-[#F3EFE7] font-[var(--font-geist-sans)] text-[#22201c]">
            <section id="home" className="relative min-h-screen w-full overflow-hidden">
                <div className="hidden md:block relative min-h-screen">
                    <main className="min-h-screen w-full bg-[#F3EFE7] text-[#22201c] p-12 font-[var(--font-geist-sans)]">
                        <div className="relative mx-auto flex max-w-6xl flex-col overflow-hidden">
                            {/* Main Grid Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-12">
                                {/* Left Editorial Grid Column (7 cols) */}
                                <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[#22201c]/15 lg:col-span-7">
                                    <div className="border-b border-[#22201c]/15 p-6 sm:p-8 lg:p-10">
                                        <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl leading-snug font-medium italic text-[#22201c] mb-4">
                                            I write, wander, and capture the quiet beauty of the world.
                                        </h1>
                                        <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4f493f] tracking-wide">
                                            Hello, I&apos;m Sachin Kandel — a curious learner, explorer, and visual storyteller based in Nepal. I enjoy researching new ideas, discovering breathtaking places, and sharing thoughtful, personal stories from the road.
                                        </p>
                                    </div>

                                    {/* Box 2: JOURNEY & EXPLORATIONS */}
                                    <div className="border-b border-[#22201c]/15 p-6 sm:p-8 lg:p-10">
                                        <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3947c] mb-4">
                                            JOURNEY &amp; EXPLORATIONS
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[13px] leading-relaxed text-[#4f493f]">
                                            <div>
                                                <p className="font-semibold text-[#22201c] uppercase tracking-wider text-[11px] mb-1">
                                                    NEPAL &amp; BEYOND
                                                </p>
                                                <p className="text-[12px] text-[#6b665d]">
                                                    Documenting mountain cultures, heritage trails, and local life across South Asia.
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#22201c] uppercase tracking-wider text-[11px] mb-1">
                                                    STORYTELLING &amp; MEDIA
                                                </p>
                                                <p className="text-[12px] text-[#6b665d]">
                                                    Creating travel essays, photography journals, and video stories that inspire mindful exploration.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {featured && (
                                        <>
                                            <p className="tracking-[0.5rem] font-black text-black/20 px-4.5 pt-5">FEATURED BLOG</p>
                                            <div className="flex w-90 gap-4 rounded-2xl border border-white/40 bg-[#F3EFE7]/95 p-4.5">
                                                {featuredThumb && (
                                                    <img src={featuredThumb} alt={featured.title} className="h-32 w-28 flex-shrink-0 rounded-xl object-cover" />
                                                )}
                                                <div className="flex flex-col justify-between py-0.5">
                                                    <div>
                                                        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a3947c]">
                                                            <span>{featured.destination ?? "Featured Story"}</span>
                                                            {formatDate(featured.publishedAt) && (
                                                                <>
                                                                    <span>·</span>
                                                                    <span>{formatDate(featured.publishedAt)}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <h3 className="mt-1 font-[var(--font-display)] text-[15px] font-medium leading-snug text-[#14140F] line-clamp-2">
                                                            {featured.title}
                                                        </h3>
                                                        {featured.excerpt && (
                                                            <p className="mt-1 text-[12px] leading-snug text-[#6f6a5e] line-clamp-2">{featured.excerpt}</p>
                                                        )}
                                                    </div>
                                                    {featured.slug && (
                                                        <Link
                                                            href={`/blogs/${featured.slug}`}
                                                            className="mt-2 w-fit rounded-full bg-[#14140F] px-4 py-1.5 text-[11px] font-medium text-white hover:bg-black/80 transition-colors flex items-center gap-1"
                                                        >
                                                            <span>Read story</span>
                                                            <span>&rarr;</span>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                        </>
                                    )}
                                </div>

                                {/* Right Dramatic Photo Column (5 cols) */}
                                <div className="relative min-h-[420px] lg:min-h-[580px] lg:col-span-5 bg-[#efe9dd] overflow-hidden group">
                                    <img
                                        src="/profile.jpg"
                                        alt="Sachin Kandel"
                                        className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute bottom-6 left-6 right-6 text-white text-[11px] uppercase tracking-[0.2em] font-medium flex justify-between items-center pointer-events-none">
                                        <span>Sachin Kandel</span>
                                        <span className="text-white/70">Kathmandu, Nepal</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Editorial Footer */}
                            <div className="flex flex-wrap items-center justify-between border-t border-[#22201c]/15 px-6 py-5 sm:px-8 sm:py-6 gap-4">
                                <div className="flex flex-wrap gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#22201c]">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline underline-offset-4 transition-all"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                                <Link
                                    href="/blogs"
                                    className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#22201c] hover:opacity-60 transition-opacity"
                                >
                                    EXPLORE BLOG &rarr;
                                </Link>
                            </div>
                        </div>
                    </main>

                </div>
            </section>

            <section id="home" className="w-full bg-[#F3EFE7] px-4 sm:px-6 md:pl-32 lg:px-8 lg:pl-36 py-10">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 sm:mb-12 flex flex-wrap items-end justify-between gap-4 border-b border-[#22201c]/15 pb-6">
                        <div>
                            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3947c] mb-2">
                                PERSONAL BLOG &amp; WRITINGS
                            </p>
                            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-medium text-[#22201c]">
                                From the Journal
                            </h2>
                        </div>
                        <p className="text-xs text-[#8B6E5C] italic">
                            "Recent thoughts, travel essays &amp; reflections"
                        </p>
                    </div>

                    {recentPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
                            {recentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="group flex flex-col justify-between overflow-hidden rounded-[20px] border border-[#22201c]/15 bg-[#f7efe3] p-5 sm:p-6 shadow-[0_10px_30px_rgba(34,32,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div>
                                        {post.imageUrl && (
                                            <div className="mb-4 overflow-hidden rounded-xl h-52 w-full bg-[#efe9dd]">
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a3947c] mb-2">
                                            <span>{post.destination || "Journal"}</span>
                                            {formatDate(post.publishedAt) && <span>{formatDate(post.publishedAt)}</span>}
                                        </div>
                                        <h3 className="font-[var(--font-display)] text-xl sm:text-2xl font-medium leading-snug text-[#22201c] group-hover:text-[#8B6E5C] transition-colors mb-2">
                                            {post.title}
                                        </h3>
                                        {post.excerpt && (
                                            <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#59544b] line-clamp-3 mb-4">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t border-[#22201c]/10 pt-4">
                                        {post.categories.length > 0 ? (
                                            <span className="text-[10px] font-medium uppercase tracking-wider text-[#a3947c] px-2.5 py-1 rounded-full border border-[#22201c]/15">
                                                {post.categories[0]}
                                            </span>
                                        ) : <span />}
                                        {post.slug && (
                                            <Link
                                                href={`/blogs/${post.slug}`}
                                                className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#22201c] group-hover:translate-x-1 transition-transform flex items-center gap-1"
                                            >
                                                Read story &rarr;
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-sm text-[#8a8578] py-12">No journal entries found.</p>
                    )}

                    <div className="mt-10 sm:mt-12 text-center">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 rounded-full border border-[#22201c]/20 bg-[#22201c] px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-black hover:scale-105"
                        >
                            <span>EXPLORE ALL JOURNAL POSTS</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section id="contact" className="w-full bg-[#F3EFE7] px-4 py-20 sm:px-6 sm:py-24 md:pl-32 lg:px-8 lg:pl-36 lg:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-6 text-center">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3947c]">GET IN TOUCH</p>
                        <h2 className="font-[var(--font-display)] text-[clamp(2.2rem,7vw,4rem)] italic leading-none text-[#22201c]">
                            Let&apos;s Connect
                        </h2>
                    </div>
                    <p className="mb-12 text-center text-[14px] text-[#8a8578] sm:mb-16 sm:text-[15px]">
                        Questions, collaborations, or just want to say hello.
                    </p>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-medium text-[#22201c]">Name</label>
                                    <input
                                        name="name" type="text" placeholder="Your name" required
                                        className="border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-medium text-[#22201c]">Email</label>
                                    <input
                                        name="email" type="email" placeholder="you@example.com" required
                                        className="border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-medium text-[#22201c]">Subject</label>
                                <input
                                    name="subject" type="text" placeholder="What's this about?" required
                                    className="border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-medium text-[#22201c]">Message</label>
                                <textarea
                                    name="message" rows={5} placeholder="Tell me a bit more..." required
                                    className="resize-none border-b border-[#22201c]/20 bg-transparent py-2 text-[15px] text-[#22201c] placeholder:text-[#a3947c] focus:border-[#22201c] focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#22201c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3a3730] disabled:opacity-60 sm:w-fit sm:justify-start"
                            >
                                {status === "sending" ? "Sending..." : "Send message"}
                                <svg className="transition-transform duration-200 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            {status === "success" && <p className="text-sm text-green-700">Message sent — I&apos;ll get back to you soon.</p>}
                            {status === "error" && <p className="text-sm text-red-700">Something went wrong. Please try again.</p>}
                        </form>

                        <div className="flex flex-col gap-8 sm:gap-10">
                            <div>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">Email</p>
                                <p className="font-[var(--font-display)] text-[20px] text-[#22201c]">sachinkandel89@gmail.com</p>
                            </div>
                            <div>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">Based in</p>
                                <p className="font-[var(--font-display)] text-[20px] text-[#22201c]">Kathmandu, Nepal</p>
                            </div>
                            <div>
                                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#a3947c]">Elsewhere</p>
                                <div className="flex flex-col gap-2 text-[15px] text-[#22201c]">
                                    <a href="https://www.instagram.com/sachin_kandel45/" target="_blank" rel="noopener noreferrer" className="w-fit border-b border-transparent pb-0.5 transition-colors hover:border-[#22201c]">Instagram</a>
                                    <a href="https://www.youtube.com/channel/UCcJOh7WbGlGIOHMvAfE5W1Q" target="_blank" rel="noopener noreferrer" className="w-fit border-b border-transparent pb-0.5 transition-colors hover:border-[#22201c]">Youtube</a>
                                    <a href="https://www.tiktok.com/@sachin.kandel7" target="_blank" rel="noopener noreferrer" className="w-fit border-b border-transparent pb-0.5 transition-colors hover:border-[#22201c]">Tiktok</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
