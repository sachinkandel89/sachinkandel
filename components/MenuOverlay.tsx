"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/", label: "Home", sectionId: null },
  { href: "/about", label: "About", sectionId: null },
  { href: "/blogs", label: "Blog", sectionId: null },
  { href: "/youtube", label: "YouTube", sectionId: null },
  { href: "/photography", label: "Photography", sectionId: null },
  { href: "/work-with-me", label: "Work With Me", sectionId: null },
  { href: "/contact", label: "Contact", sectionId: null },
];

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="lg:hidden flex flex-col gap-1.5 w-6 cursor-pointer"
      >
        <span className="h-[1.5px] w-full bg-[#22201c]" />
        <span className="h-[1.5px] w-full bg-[#22201c]" />
        <span className="h-[1.5px] w-full bg-[#22201c]" />
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[200] flex">
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <div
            className="
              relative ml-auto
              w-[min(340px,100vw)] h-full
              bg-[#FAF6EE]/95
              backdrop-blur-2xl
              border-l border-white/50
              shadow-[-20px_0_60px_rgba(0,0,0,0.12)]
              flex flex-col
              px-8 py-16
              overflow-y-auto
            "
          >
            {/* Gradient gloss */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="
                absolute top-5 right-6 z-10
                text-[#22201c] text-3xl leading-none
                cursor-pointer transition-transform duration-300 hover:rotate-90
              "
            >
              ×
            </button>

            {/* Brand name */}
            <p className="relative z-10 mb-10 text-xs font-semibold uppercase tracking-[0.25em] text-[#a3947c]">
              Sachin Kandel
            </p>

            {/* Nav links */}
            <nav className="relative z-10 flex flex-col gap-5">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`
                      relative text-[#22201c] text-2xl
                      font-[var(--font-display)]
                      tracking-wide transition-colors duration-300
                      hover:text-[#8B6E5C]
                      after:absolute after:left-0 after:-bottom-1
                      after:h-[1px] after:bg-[#8B6E5C]
                      after:transition-all after:duration-300
                      ${isActive ? "text-[#8B6E5C] after:w-full font-semibold" : "after:w-0 hover:after:w-full"}
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Social links at bottom */}
            <div className="relative z-10 mt-auto pt-10 flex flex-col gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#a3947c]">
              <a href="https://www.instagram.com/sachin_kandel45/" target="_blank" rel="noopener noreferrer" className="hover:text-[#22201c] transition-colors">Instagram</a>
              <a href="https://www.youtube.com/channel/UCcJOh7WbGlGIOHMvAfE5W1Q" target="_blank" rel="noopener noreferrer" className="hover:text-[#22201c] transition-colors">YouTube</a>
              <a href="https://www.tiktok.com/@sachin.kandel7" target="_blank" rel="noopener noreferrer" className="hover:text-[#22201c] transition-colors">TikTok</a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
