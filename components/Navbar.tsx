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
        <header className="flex flex-wrap items-center justify-between px-5 pt-5">
            <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#22201c]">
                <Link href="/" className="hover:opacity-60 transition-opacity">
                    HOME
                </Link>
                <span className="opacity-30">/</span>
                <Link href="/blogs" className="hover:opacity-60 transition-opacity">
                    BLOGS
                </Link>
                <span className="opacity-30">/</span>
                <Link href="/photography" className="hover:opacity-60 transition-opacity">
                    PHOTOGRAPHY
                </Link>
                <span className="opacity-30">/</span>
                <Link href="/youtube" className="hover:opacity-60 transition-opacity">
                    youtube
                </Link>
                <span className="opacity-30">/</span>
                <Link href="/contact" className="hover:opacity-60 transition-opacity">
                    CONTACT
                </Link>
            </div>
        </header>
    );
}
