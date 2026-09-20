"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/about", label: "About", sectionId: null },
  { href: "/blogs", label: "Blog", sectionId: null },
  { href: "/photography", label: "Photography", sectionId: null },
  { href: "/youtube", label: "YouTube", sectionId: null },
  { href: "/travel", label: "Travel", sectionId: null },
  { href: "/resources", label: "Resources", sectionId: null },
  { href: "/work-with-me", label: "Work With Me", sectionId: null },
  { href: "/contact", label: "Contact", sectionId: null },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    if (!isHome) return;
    const update = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "home");
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
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
    <nav className="hidden md:flex flex-col gap-2.5 text-[13px]">
      {links.map((link) => {
        const isActive =
          isHome && link.sectionId
            ? activeSection === link.sectionId
            : link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.sectionId ? `/#${link.sectionId}` : link.href}
            onClick={(e) => handleClick(e, link.href, link.sectionId)}
            className={`relative w-fit pb-0.5 transition-colors duration-200 text-[#22201c] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#22201c] after:transition-all after:duration-300 hover:after:w-full cursor-pointer ${
              isActive ? "font-bold after:w-full" : "font-normal after:w-0"
            }`}
          >
            {isActive && <span className="mr-1">|</span>}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
