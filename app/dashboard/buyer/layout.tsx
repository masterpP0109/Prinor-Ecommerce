import Sidebar from "@/components/layout/Sidebar";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="flex min-h-screen bg-gradient-to-br from-[#0b0b0f] via-[#18132a] to-[#18132a] relative">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40" style={{backgroundImage: 'url(/images/noise.png)', mixBlendMode: 'overlay'}} />
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 relative z-10">
        {children}
      </main>
    </div>
  );
}