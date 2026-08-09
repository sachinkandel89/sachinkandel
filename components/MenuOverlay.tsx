"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/blogs", label: "Blogs", sectionId: null },
  { href: "/photography", label: "Photography", sectionId: null },
  { href: "/youtube", label: "Youtube", sectionId: null },
  { href: "/about", label: "About", sectionId: "about" },
  { href: "/contact", label: "Contact", sectionId: "contact" },
];

export default function MenuOverlay() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string | null,
    href: string
  ) => {
    setOpen(false);
    if (sectionId && isHome) {
      e.preventDefault();
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else if (sectionId && !isHome) {
      e.preventDefault();
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden flex flex-col gap-1.5 w-6 cursor-pointer"
      >
        <span className="h-[1.5px] w-full bg-[#22201c]" />
        <span className="h-[1.5px] w-full bg-[#22201c]" />
        <span className="h-[1.5px] w-full bg-[#22201c]" />
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-50 flex md:items-start md:justify-end">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/10"
          />

          <div
            className="
              relative
              w-full h-full
              md:w-[340px]
              md:h-auto
              md:m-6
              md:rounded-3xl

              bg-[#FAF6EE]/70
              backdrop-blur-2xl
              border border-white/50
              shadow-[0_10px_40px_rgba(0,0,0,0.12)]

              overflow-hidden

              flex flex-col
              items-center
              justify-center
              gap-8

              px-8
              py-16
              md:py-14

              transition-all
              duration-300
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                rounded-3xl
                bg-gradient-to-br
                from-white/40
                via-white/15
                to-transparent
              "
            />

            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="
                absolute
                top-6
                right-6
                z-10
                text-[#22201c]
                text-4xl
                leading-none
                cursor-pointer
                transition-transform
                duration-300
                hover:rotate-90
              "
            >
              ×
            </button>

            <div className="relative z-10 flex flex-col items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.sectionId ? `/#${link.sectionId}` : link.href}
                  onClick={(e) => handleClick(e, link.sectionId, link.href)}
                  className="
                    relative
                    text-[#22201c]
                    text-4xl
                    md:text-2xl
                    font-[var(--font-display)]
                    tracking-wide
                    transition-colors
                    duration-300
                    cursor-pointer

                    hover:text-[#8B6E5C]

                    after:absolute
                    after:left-0
                    after:-bottom-1
                    after:h-[1px]
                    after:w-0
                    after:bg-[#8B6E5C]
                    after:transition-all
                    after:duration-300

                    hover:after:w-full
                  "
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
