"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuOverlay from "@/components/MenuOverlay";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blog" },
  { href: "/youtube", label: "YouTube" },
  { href: "/photography", label: "Photography" },
  { href: "/work-with-me", label: "Work With Me" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F3EFE7]/90 backdrop-blur-md shadow-[0_1px_0_rgba(34,32,28,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo / Name */}
        <Link
          href="/"
          className="font-[var(--font-display)] text-base font-semibold tracking-wide text-[#22201c] hover:opacity-70 transition-opacity"
        >
          Sachin Kandel
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#22201c]">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-0.5 transition-opacity hover:opacity-60 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#22201c] after:transition-all after:duration-300 ${
                  isActive ? "after:w-full font-semibold" : "after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <MenuOverlay />
      </div>
    </header>
  );
}
