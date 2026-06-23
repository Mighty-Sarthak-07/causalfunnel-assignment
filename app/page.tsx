import Link from "next/link";
import { Activity, LayoutDashboard, Sparkles, MoveRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAF9] text-[#111827]">
      {/* Navigation Header */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#E5E7EB] bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2563EB] rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-[#111827]">
            CausalFunnel <span className="font-light text-[#6B7280]">Analytics</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/demo"
            className="px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            Demo
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20 flex-1 flex flex-col items-center justify-center text-center">
        <div className="opacity-0 animate-fade-in inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E7EB] bg-white text-[#2563EB] text-xs font-semibold tracking-wide mb-8 uppercase">
          <Sparkles className="h-3.5 w-3.5" /> Analytics Platform Scaffolding
        </div>

        <h1 className="opacity-0 animate-fade-in stagger-1 text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827] mb-6 leading-tight max-w-3xl">
          Track and Group User <br />
          Interactions in Real-time.
        </h1>

        <p className="opacity-0 animate-fade-in stagger-2 text-lg text-[#6B7280] max-w-2xl mb-12 leading-relaxed">
          A clean, high-performance analytics platform tracking user flows, click
          coordinates, and sessions. Built with Next.js, Mongoose, MongoDB, and Tailwind CSS.
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-fade-in stagger-3 flex flex-col sm:flex-row gap-4 justify-center mb-20 w-full max-w-md">
          <Link
            href="/demo"
            className="group flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.98]"
          >
            Open Demo Website
            <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-gray-50 border border-[#E5E7EB] text-[#111827] font-semibold rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            <LayoutDashboard className="h-4.5 w-4.5 text-[#2563EB]" />
            Open Dashboard
          </Link>
        </div>

        {/* Reviewer Flow Flowchart */}
        <div className="opacity-0 animate-fade-in stagger-4 w-full max-w-4xl border border-[#E5E7EB] rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-xs font-bold text-[#6B7280] tracking-widest uppercase mb-8">
            Reviewer Evaluation Flow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] transition-all hover:scale-[1.02] duration-200">
              <span className="text-2xl font-extrabold text-[#2563EB] mb-2">01</span>
              <h3 className="font-bold text-[#111827] text-sm mb-1">Landing Page</h3>
              <p className="text-xs text-[#6B7280]">Project intro and setup guidelines.</p>
            </div>

            <div className="flex flex-col items-center p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] transition-all hover:scale-[1.02] duration-200">
              <span className="text-2xl font-extrabold text-[#2563EB] mb-2">02</span>
              <h3 className="font-bold text-[#111827] text-sm mb-1">Demo Page</h3>
              <p className="text-xs text-[#6B7280]">Click links & buttons to trigger events.</p>
            </div>

            <div className="flex flex-col items-center p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] transition-all hover:scale-[1.02] duration-200">
              <span className="text-2xl font-extrabold text-[#2563EB] mb-2">03</span>
              <h3 className="font-bold text-[#111827] text-sm mb-1">Event Ingestion</h3>
              <p className="text-xs text-[#6B7280]">Tracker SDK sends coordinates to DB.</p>
            </div>

            <div className="flex flex-col items-center p-5 rounded-xl bg-[#FAFAF9] border border-[#E5E7EB] transition-all hover:scale-[1.02] duration-200">
              <span className="text-2xl font-extrabold text-[#2563EB] mb-2">04</span>
              <h3 className="font-bold text-[#111827] text-sm mb-1">Dashboard</h3>
              <p className="text-xs text-[#6B7280]">Analyze user flows and click heatmaps.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-[#6B7280] border-t border-[#E5E7EB] bg-white">
        &copy; {new Date().getFullYear()} CausalFunnel Take-Home Assignment. Created with Next.js.
      </footer>
    </div>
  );
}
