import type { Metadata } from "next";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "CausalFunnel Analytics Assignment",
  description: "Track and visualize user click journeys and heatmaps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FAFAF9] text-[#111827] min-h-screen font-sans">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
