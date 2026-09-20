"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide navbar on blog detail pages (e.g. /blogs/some-slug)
  const isBlogDetail = /^\/blogs\/[^/]+/.test(pathname);

  return (
    <div className="min-h-screen bg-[#F3EFE7] text-[#14140F]">
      {!isBlogDetail && <Navbar />}
      <div className={!isBlogDetail ? "pt-16" : ""}>{children}</div>
    </div>
  );
}
