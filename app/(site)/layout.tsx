import Navbar from "@/components/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3EFE7] text-[#14140F]">
      <Navbar />
      {children}
    </div>
  );
}
