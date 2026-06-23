"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Flame,
  Activity,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/sessions", label: "Sessions", icon: Users },
    { href: "/dashboard/heatmap", label: "Heatmap", icon: Flame },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF9] dark:bg-slate-950 text-[#111827] dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Mobile Sidebar Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/30 dark:bg-slate-950/40 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-6 transition-all duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#2563EB] rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-[#111827] dark:text-white">CF Analytics</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white md:hidden cursor-pointer rounded-lg hover:bg-gray-150 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50/50 dark:bg-blue-950/20 text-[#2563EB] dark:text-blue-400"
                      : "hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#111827] dark:hover:text-white text-[#6B7280] dark:text-slate-450 dark:text-slate-450"
                  }`}
                >
                  <Icon className={`h-4.5 w-4.5 ${isActive ? "text-[#2563EB] dark:text-blue-400" : "text-[#6B7280] dark:text-slate-450"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Back Links */}
        <div className="flex flex-col gap-2">
          <Link
            href="/demo"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-[#2563EB] dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-900/30 transition-all text-center justify-center"
          >
            Launch Demo Site
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white px-4 py-2 transition-all justify-center"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Header */}
        <header className="h-16 border-b border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-8 flex items-center justify-between shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white md:hidden cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 border border-[#E5E7EB] dark:border-slate-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-bold text-lg text-[#111827] dark:text-white">Analytics Workspace</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-[#6B7280] dark:text-slate-400 font-mono hidden sm:block">
              Environment: Localhost
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Dashboard Pages Scroll Container */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
