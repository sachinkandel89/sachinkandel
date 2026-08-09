// side navbar
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/blogs", label: "Blogs", sectionId: null },
  { href: "/photography", label: "Photography", sectionId: null },
  { href: "/youtube", label: "Youtube", sectionId: null },
  { href: "/about", label: "About", sectionId: "about" },
  { href: "/contact", label: "Contact", sectionId: "contact" },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (!isHome) return;

    const updateActiveSection = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "home");
    };

    updateActiveSection();
    window.addEventListener("hashchange", updateActiveSection);
    return () => window.removeEventListener("hashchange", updateActiveSection);
  }, [isHome, pathname]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string | null
  ) => {
    if (sectionId && isHome) {
      e.preventDefault();
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId && !isHome) {
      e.preventDefault();
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav className="hidden md:flex flex-col gap-2.5 text-[13px] font-[var(--font-roboto)]">
      {links.map((link) => {
        const isActive =
          isHome && link.sectionId
            ? activeSection === link.sectionId
            : link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <a
            key={link.href}
            href={link.sectionId ? `/#${link.sectionId}` : link.href}
            onClick={(e) => handleClick(e, link.href, link.sectionId)}
            className="relative w-fit pb-0.5 text-[#22201c] transition-colors duration-200 hover:text-[#22201c] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#22201c] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            {isActive ? (
              <>
                <span className="font-bold">|</span> {link.label}
              </>
            ) : (
              link.label
            )}
          </a>
        );
      })}
    </nav>
  );
}
