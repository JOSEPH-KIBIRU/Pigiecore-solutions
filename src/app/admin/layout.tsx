import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dark min-h-screen bg-[#0b0c0e] text-white/90">{children}</div>;
}