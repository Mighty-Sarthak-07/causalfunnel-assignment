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
import ThemeToggle from "@/components/ThemeToggle";

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
    <div className="min-h-screen bg-[#FAFAF9] dark:bg-slate-950 text-[#111827] dark:text-slate-100 flex flex-col font-sans select-none pb-32 transition-colors duration-200">
      {/* Demo Header */}
      <header className="border-b border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40 px-6 py-4 transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-wide text-[#111827] dark:text-white flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#2563EB] dark:text-blue-400" />
              SaaSify <span className="text-[#6B7280] dark:text-slate-400 font-light">Store</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-[#6B7280] dark:text-slate-400 border border-[#E5E7EB] dark:border-slate-800">
              Demo Environment
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#6B7280] dark:text-slate-400">
            <button className="hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer active:scale-95 duration-100">
              Products
            </button>
            <button className="hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer active:scale-95 duration-100">
              Features
            </button>
            <button className="hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer active:scale-95 duration-100">
              Pricing
            </button>
            <button className="hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer active:scale-95 duration-100">
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all font-semibold shadow-sm active:scale-95 duration-100"
            >
              Go to Dashboard <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              href="/"
              className="text-xs text-[#6B7280] dark:text-slate-400 hover:text-[#111827] dark:hover:text-white px-2 py-1.5 transition-all active:scale-95 duration-100"
            >
              Back
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full animate-fade-in">
        {/* Top Info Banner */}
        <div className="mb-10 text-center bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 transition-all hover:border-blue-200 dark:hover:border-blue-900/50">
          <h1 className="text-xl font-bold text-[#111827] dark:text-white mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Event Generator Sandbox
          </h1>
          <p className="text-sm text-[#6B7280] dark:text-slate-400 max-w-xl mx-auto">
            Click anywhere on this page. Every click captures your exact coordinate mapping
            (`clientX`, `clientY`) and records the action directly in MongoDB.
          </p>
        </div>

        {/* Hero Section */}
        <section className="text-center py-10 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-full text-xs text-[#2563EB] dark:text-blue-400 font-semibold mb-4 transition-transform hover:scale-105 duration-200">
            Unleash 10x Productivity
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-6">
            The modern platform to <br />
            scale your business.
          </h2>
          <p className="text-[#6B7280] dark:text-slate-400 text-base max-w-lg mx-auto mb-8">
            Manage workflows, collaborate securely, and gain deeper user insights with our
            all-in-one unified web application.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCounter((c) => c + 1)}
              className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold rounded-xl shadow-sm transition-all active:scale-[0.96] duration-100 cursor-pointer"
            >
              Buy Now (Counter: {counter})
            </button>
            <button className="px-6 py-3 bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 border border-[#E5E7EB] dark:border-slate-800 text-[#111827] dark:text-slate-200 font-semibold rounded-xl transition-all shadow-sm active:scale-[0.96] duration-100 cursor-pointer">
              Learn More
            </button>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mb-20">
          <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-6 border-b border-[#E5E7EB] dark:border-slate-800 pb-3 flex items-center gap-2">
            <ShoppingBag className="h-4.5 w-4.5 text-[#2563EB] dark:text-blue-450 dark:text-blue-400" /> Premium Offerings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between shadow-sm hover:scale-[1.01] duration-250">
              <div>
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-5 w-5 text-[#2563EB] dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-[#111827] dark:text-white text-base mb-2">Analytics Engine</h4>
                <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed mb-6">
                  Aggregate visitor coordinates, mouse metrics, and conversion funnels dynamically.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#111827] dark:text-white">$49/mo</span>
                <button className="text-xs font-semibold px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all active:scale-95 duration-100 cursor-pointer shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between shadow-sm hover:scale-[1.01] duration-250">
              <div>
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-5 w-5 text-[#2563EB] dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-[#111827] dark:text-white text-base mb-2">AI Copilot Pro</h4>
                <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed mb-6">
                  Generate beautiful interface mockups and automate customer journeys in seconds.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#111827] dark:text-white">$99/mo</span>
                <button className="text-xs font-semibold px-3 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-all active:scale-95 duration-100 cursor-pointer shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between shadow-sm hover:scale-[1.01] duration-250">
              <div>
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/40 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-5 w-5 text-[#2563EB] dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-[#111827] dark:text-white text-base mb-2">Customer Relations</h4>
                <p className="text-xs text-[#6B7280] dark:text-slate-400 leading-relaxed mb-6">
                  Track client support threads, satisfaction score logs, and SLA agreements.
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-[#111827] dark:text-white">Free</span>
                <button className="text-xs font-semibold px-3 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#111827] dark:text-slate-200 rounded-lg border border-[#E5E7EB] dark:border-slate-700 transition-all active:scale-95 duration-100 cursor-pointer shadow-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plan */}
        <section className="mb-16">
          <h3 className="text-center font-bold text-2xl text-[#111827] dark:text-white mb-2">Pricing Plans</h3>
          <p className="text-center text-xs text-[#6B7280] dark:text-slate-400 mb-8">
            Choose the plan that matches your project scale.
          </p>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-8 relative flex flex-col justify-between shadow-sm transition-all hover:scale-[1.01] duration-200 animate-fade-in stagger-1">
              <div>
                <h4 className="font-bold text-[#111827] dark:text-white text-lg mb-1">Developer Plan</h4>
                <p className="text-xs text-[#6B7280] dark:text-slate-400 mb-6">Best for testing and personal side projects.</p>
                <div className="text-3xl font-extrabold text-[#111827] dark:text-white mb-6">
                  $0 <span className="text-xs font-normal text-[#6B7280] dark:text-slate-500">/ forever</span>
                </div>
              </div>
              <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-750 border border-[#E5E7EB] dark:border-slate-700 text-[#111827] dark:text-slate-200 rounded-xl font-semibold text-sm transition-all active:scale-95 duration-100 cursor-pointer">
                Choose Starter
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-[#2563EB] dark:border-blue-500 rounded-2xl p-8 relative flex flex-col justify-between shadow-md transition-all hover:scale-[1.01] duration-200 animate-fade-in stagger-2">
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#2563EB] dark:text-blue-450 dark:text-blue-450 border border-blue-200 dark:border-blue-900/30 text-[10px] font-bold uppercase tracking-wider">
                Popular
              </div>
              <div>
                <h4 className="font-bold text-[#111827] dark:text-white text-lg mb-1">Pro Analyst</h4>
                <p className="text-xs text-[#6B7280] dark:text-slate-400 mb-6">For expanding teams and growing customer logs.</p>
                <div className="text-3xl font-extrabold text-[#111827] dark:text-white mb-6">
                  $89 <span className="text-xs font-normal text-[#6B7280] dark:text-slate-550 dark:text-slate-500">/ month</span>
                </div>
              </div>
              <button className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-semibold text-sm shadow-sm active:scale-95 duration-100 cursor-pointer">
                Choose Pro
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating tracker console */}
      <div className="fixed bottom-6 right-6 w-80 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-4 shadow-xl z-50 flex flex-col gap-2.5 transition-colors duration-200">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-xs font-bold text-[#111827] dark:text-white tracking-wide">Live Event Tracker</span>
          </div>
          <span className="text-[10px] text-[#6B7280] dark:text-slate-450 dark:text-slate-400">SDK Status: Active</span>
        </div>
        <div className="flex flex-col gap-1.5 min-h-[96px] overflow-hidden">
          {logs.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#6B7280] dark:text-slate-400 text-xs text-center py-6 animate-pulse">
              <MousePointer className="h-5 w-5 mb-1 text-[#2563EB] dark:text-blue-400" />
              <span>Click anywhere to see tracker logs.</span>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="opacity-0 animate-slide-in-right text-[10px] font-mono flex items-start gap-1"
              >
                <span className="text-[#2563EB] dark:text-blue-400 shrink-0">➔</span>
                <span className="text-[#6B7280] dark:text-slate-400 break-all">{log.details}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
