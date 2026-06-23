"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  TrendingUp,
  MousePointer,
  Heart,
  ExternalLink,
} from "lucide-react";

export default function DemoPage() {
  const [logs, setLogs] = useState<{ type: string; details: string; id: number }[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const handleLogClick = (e: MouseEvent) => {
      setLogs((prev) => [
        {
          id: Date.now() + Math.random(),
          type: "click",
          details: `x: ${e.clientX}, y: ${e.clientY} on ${
            (e.target as HTMLElement).tagName.toLowerCase()
          }`,
        },
        ...prev.slice(0, 4),
      ]);
    };
    window.addEventListener("click", handleLogClick);
    return () => window.removeEventListener("click", handleLogClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#111827] flex flex-col font-sans select-none pb-32">
      {/* Demo Header */}
      <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-wide text-[#111827] flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#2563EB]" />
              SaaSify <span className="text-[#6B7280] font-light">Store</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-[#6B7280] border border-[#E5E7EB]">
              Demo Environment
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#6B7280]">
            <button className="hover:text-[#111827] transition-colors cursor-pointer">
              Products
            </button>
            <button className="hover:text-[#111827] transition-colors cursor-pointer">
              Features
            </button>
            <button className="hover:text-[#111827] transition-colors cursor-pointer">
              Pricing
            </button>
            <button className="hover:text-[#111827] transition-colors cursor-pointer">
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all font-semibold shadow-sm"
            >
              Go to Dashboard <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              href="/"
              className="text-xs text-[#6B7280] hover:text-[#111827] px-2 py-1.5 transition-all"
            >
              Back
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full">
        {/* Top Info Banner */}
        <div className="mb-10 text-center bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
          <h1 className="text-xl font-bold text-[#111827] mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-505" />
            Event Generator Sandbox
          </h1>
          <p className="text-sm text-[#6B7280] max-w-xl mx-auto">
            Click anywhere on this page. Every click captures your exact coordinate mapping
            (`clientX`, `clientY`) and records the action directly in MongoDB.
          </p>
        </div>

        {/* Hero Section */}
        <section className="text-center py-10 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs text-[#2563EB] font-semibold mb-4">
            Unleash 10x Productivity
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-6">
            The modern platform to <br />
            scale your business.
          </h2>
          <p className="text-[#6B7280] text-base max-w-lg mx-auto mb-8">
            Manage workflows, collaborate securely, and gain deeper user insights with our
            all-in-one unified web application.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCounter((c) => c + 1)}
              className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              Buy Now (Counter: {counter})
            </button>
            <button className="px-6 py-3 bg-white hover:bg-gray-50 border border-[#E5E7EB] text-[#111827] font-semibold rounded-xl transition-all shadow-sm cursor-pointer">
              Learn More
            </button>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mb-20">
          <h3 className="text-lg font-bold text-[#111827] mb-6 border-b border-[#E5E7EB] pb-3 flex items-center gap-2">
            <ShoppingBag className="h-4.5 w-4.5 text-[#2563EB]" /> Premium Offerings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-5 w-5 text-[#2563EB]" />
                </div>
                <h4 className="font-bold text-[#111827] text-base mb-2">Analytics Engine</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                  Aggregate visitor coordinates, mouse metrics, and conversion funnels dynamically.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#111827]">$49/mo</span>
                <button className="text-xs font-semibold px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5 text-[#2563EB]" />
                </div>
                <h4 className="font-bold text-[#111827] text-base mb-2">AI Copilot Pro</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                  Generate beautiful interface mockups and automate customer journeys in seconds.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#111827]">$99/mo</span>
                <button className="text-xs font-semibold px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-5 w-5 text-[#2563EB]" />
                </div>
                <h4 className="font-bold text-[#111827] text-base mb-2">Customer Relations</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                  Track client support threads, satisfaction score logs, and SLA agreements.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#111827]">Free</span>
                <button className="text-xs font-semibold px-3 py-2 bg-gray-50 hover:bg-gray-100 text-[#111827] rounded-lg border border-[#E5E7EB] transition-all active:scale-95 cursor-pointer shadow-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plan */}
        <section className="mb-16">
          <h3 className="text-center font-bold text-2xl text-[#111827] mb-2">Pricing Plans</h3>
          <p className="text-center text-xs text-[#6B7280] mb-8">
            Choose the plan that matches your project scale.
          </p>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 relative flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="font-bold text-[#111827] text-lg mb-1">Developer Plan</h4>
                <p className="text-xs text-[#6B7280] mb-6">Best for testing and personal side projects.</p>
                <div className="text-3xl font-extrabold text-[#111827] mb-6">
                  $0 <span className="text-xs font-normal text-[#6B7280]">/ forever</span>
                </div>
              </div>
              <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 border border-[#E5E7EB] text-[#111827] rounded-xl font-semibold text-sm transition-all cursor-pointer">
                Choose Starter
              </button>
            </div>

            <div className="bg-white border border-[#2563EB] rounded-2xl p-8 relative flex flex-col justify-between shadow-md">
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
                Popular
              </div>
              <div>
                <h4 className="font-bold text-[#111827] text-lg mb-1">Pro Analyst</h4>
                <p className="text-xs text-[#6B7280] mb-6">For expanding teams and growing customer logs.</p>
                <div className="text-3xl font-extrabold text-[#111827] mb-6">
                  $89 <span className="text-xs font-normal text-[#6B7280]">/ month</span>
                </div>
              </div>
              <button className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-semibold text-sm shadow-sm transition-all cursor-pointer">
                Choose Pro
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating tracker console */}
      <div className="fixed bottom-6 right-6 w-80 bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-xl z-50 flex flex-col gap-2.5">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-xs font-bold text-[#111827] tracking-wide">Live Event Tracker</span>
          </div>
          <span className="text-[10px] text-[#6B7280]">SDK Status: Active</span>
        </div>
        <div className="flex flex-col gap-1.5 min-h-[96px]">
          {logs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#6B7280] text-xs text-center py-6">
              <MousePointer className="h-5 w-5 mb-1 text-[#2563EB]" />
              <span>Click anywhere to see tracker logs.</span>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="text-[10px] font-mono flex items-start gap-1">
                <span className="text-[#2563EB] shrink-0">➔</span>
                <span className="text-[#6B7280] break-all">{log.details}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
