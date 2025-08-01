import Navbar from "@/components/public-page/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
