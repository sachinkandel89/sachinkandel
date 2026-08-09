"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MenuOverlay from "@/components/MenuOverlay";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${isScrolled
        ? "bg-white/90 backdrop-blur-md py-4"
        : "bg-transparent py-5 md:py-6"
        }`}
    >
      <Link href="/" className="relative z-10">
        <span
          className="cursor-pointer text-[24px] md:text-[32px] leading-none text-[#22201c] font-medium"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          Sachin Kandel
        </span>
      </Link>
      <div className="md:hidden">
        <MenuOverlay />
      </div>
    </header>
  );
}
