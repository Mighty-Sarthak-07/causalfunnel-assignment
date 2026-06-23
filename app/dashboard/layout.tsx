import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Flame,
  Activity,
  ArrowLeft,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FAFAF9] text-[#111827] font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[#E5E7EB] bg-white shrink-0 flex flex-col justify-between p-6">
        <div className="flex flex-col gap-8">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2563EB] rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-lg text-[#111827]">CF Analytics</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:text-[#111827] text-[#6B7280] transition-all"
            >
              <LayoutDashboard className="h-4.5 w-4.5 text-[#2563EB]" />
              Overview
            </Link>
            <Link
              href="/dashboard/sessions"
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:text-[#111827] text-[#6B7280] transition-all"
            >
              <Users className="h-4.5 w-4.5 text-[#2563EB]" />
              Sessions
            </Link>
            <Link
              href="/dashboard/heatmap"
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:text-[#111827] text-[#6B7280] transition-all"
            >
              <Flame className="h-4.5 w-4.5 text-[#2563EB]" />
              Heatmap
            </Link>
          </nav>
        </div>

        {/* Back Links */}
        <div className="flex flex-col gap-2">
          <Link
            href="/demo"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#2563EB] rounded-lg border border-blue-100 transition-all text-center justify-center"
          >
            Launch Demo Site
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-[#111827] px-4 py-2 transition-all justify-center"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-[#E5E7EB] bg-white px-8 flex items-center justify-between">
          <h1 className="font-bold text-lg text-[#111827]">Analytics Workspace</h1>
          <div className="text-xs text-[#6B7280] font-mono">
            Environment: Localhost
          </div>
        </header>
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
