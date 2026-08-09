import Navbar from "@/components/Navbar";
import SidebarNav from "@/components/SidebarNav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3EFE7] text-[#14140F]">
      <Navbar />
      <div className="fixed bottom-8 left-6 md:left-10 z-30">
        <SidebarNav />
      </div>
      {children}
    </div>
  );
}
