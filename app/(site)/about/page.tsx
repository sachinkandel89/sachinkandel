import Link from "next/link";
import { socialLinks } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#F3EFE7] px-4 py-10 sm:px-6 lg:px-8 text-[#22201c]">
      <div className="relative mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[20px] border border-[#22201c]/20 bg-[#f7efe3] shadow-[0_20px_60px_rgba(34,32,28,0.08)] sm:rounded-[28px]">

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Editorial Grid Column (7 cols) */}
          <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[#22201c]/15 lg:col-span-7">
            {/* Box 1: ABOUT */}
            <div className="border-b border-[#22201c]/15 p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3947c] mb-3 sm:mb-4">
                ABOUT
              </p>
              <h1 className="font-[var(--font-display)] text-2xl sm:text-3xl leading-snug font-medium italic text-[#22201c] mb-4">
                I write, wander, and capture the quiet beauty of the world.
              </h1>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4f493f] tracking-wide">
                Hello, I&apos;m Sachin Kandel — a curious learner, explorer, and visual storyteller based in Nepal. Originally from a small village in Nepal, I&apos;ve spent years chasing light, stories, and new horizons. My journey took me from the mountains of Nepal to the cities of Australia, and the lessons I&apos;ve gathered along the way are what this space is all about.
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
                    LIFE IN AUSTRALIA
                  </p>
                  <p className="text-[12px] text-[#6b665d]">
                    Sharing honest insights on migration, settling in, finding work, and building a new life Down Under.
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
                <div>
                  <p className="font-semibold text-[#22201c] uppercase tracking-wider text-[11px] mb-1">
                    MY MISSION
                  </p>
                  <p className="text-[12px] text-[#6b665d]">
                    To help Nepali migrants navigate their new life with confidence — through real stories, practical guides, and community.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: PASSIONS & PHILOSOPHY */}
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a3947c] mb-3 sm:mb-4">
                PASSIONS &amp; PHILOSOPHY
              </p>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#4f493f] tracking-wide">
                My greatest joy is found in the simplicity of nature, authentic conversations, and quiet moments. Whether it&apos;s early morning light over the mountains or the rhythm of daily life, I aim to create work that encourages people to slow down, stay curious, and craft their own journey.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 rounded-full bg-[#22201c] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black/90"
                >
                  Read My Blog
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#22201c]/30 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#22201c] transition-colors hover:bg-[#22201c]/5"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>

          {/* Right Dramatic Photo Column (5 cols) */}
          <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[580px] lg:col-span-5 bg-[#efe9dd] overflow-hidden group">
            <img
              src="/profile.jpg"
              alt="Sachin Kandel"
              className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-[11px] uppercase tracking-[0.2em] font-medium flex justify-between items-center pointer-events-none">
              <span>Sachin Kandel</span>
              <span className="text-white/70">Nepal → Australia</span>
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
  );
}
