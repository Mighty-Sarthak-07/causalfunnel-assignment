"use client";

import { useState } from "react";
import { Flame } from "lucide-react";

interface ClickCoord {
  x: number;
  y: number;
}

interface HeatmapProps {
  clicks: ClickCoord[];
  loading: boolean;
}

export default function Heatmap({ clicks, loading }: HeatmapProps) {
  const [hoveredDot, setHoveredDot] = useState<{
    x: number;
    y: number;
    index: number;
  } | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-xs text-[#6B7280] dark:text-slate-400">
        Loading heatmap coordinates...
      </div>
    );
  }

  if (clicks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-[#E5E7EB] dark:border-slate-800 rounded-2xl bg-[#FAFAF9] dark:bg-slate-950 transition-colors duration-200">
        <Flame className="h-8 w-8 text-gray-300 dark:text-slate-700 mb-3" />
        <span className="text-[#6B7280] dark:text-slate-400 font-semibold text-sm">
          No click data available
        </span>
        <p className="text-xs text-[#6B7280] dark:text-slate-500 max-w-xs mt-1">
          Make click interactions on the demo site first.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mock Browser Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-t-xl text-xs text-gray-400">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-slate-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-slate-700" />
        </div>
        <div className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded px-3 py-0.5 w-full max-w-xs font-mono text-[10px] text-[#6B7280] dark:text-slate-400 truncate select-none">
          https://localhost:3000/demo
        </div>
      </div>

      {/* Scrollable Viewport Frame */}
      <div className="border-x border-b border-[#E5E7EB] dark:border-slate-700 rounded-b-xl bg-white dark:bg-slate-950 h-[640px] overflow-auto transition-colors duration-200">
        
        {/* Fixed 1280px Mockup canvas wrapper */}
        <div className="relative w-[1280px] h-[1600px] bg-white dark:bg-slate-950 mx-auto overflow-hidden">
          
          {/* Wireframe bg */}
          <div className="absolute inset-0 pointer-events-none flex flex-col bg-[#FAFAF9] dark:bg-slate-950/20">
            
            {/* Header wireframe */}
            <header className="border-b border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between opacity-35 dark:opacity-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="w-24 h-4 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="flex items-center gap-8">
                  <div className="w-14 h-3 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="w-14 h-3 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="w-14 h-3 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="w-14 h-3 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-8 bg-gray-200 dark:bg-slate-700 rounded-lg" />
                  <div className="w-10 h-8 bg-gray-200 dark:bg-slate-700 rounded-lg" />
                </div>
              </div>
            </header>

            {/* Mock Main Container to align vertical flow exactly */}
            <main className="max-w-6xl mx-auto px-6 py-12 w-full flex flex-col opacity-35 dark:opacity-20">
              
              {/* Sandbox Banner wireframe */}
              <div className="mb-10 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 text-center">
                <div className="w-48 h-6 bg-gray-200 dark:bg-slate-700 rounded mx-auto mb-2" />
                <div className="w-[500px] h-3 bg-gray-200 dark:bg-slate-700 rounded mx-auto" />
              </div>

              {/* Hero Section wireframe */}
              <section className="text-center py-10 mb-16 w-full">
                <div className="w-36 h-5 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto mb-4" />
                <div className="w-[480px] h-9 bg-gray-200 dark:bg-slate-700 rounded mx-auto mb-3" />
                <div className="w-[380px] h-9 bg-gray-200 dark:bg-slate-700 rounded mx-auto mb-6" />
                <div className="w-[450px] h-4 bg-gray-200 dark:bg-slate-700 rounded mx-auto mb-8" />
                <div className="flex justify-center gap-4">
                  <div className="w-40 h-11 bg-gray-200 dark:bg-slate-700 rounded-xl" />
                  <div className="w-28 h-11 bg-gray-200 dark:bg-slate-700 rounded-xl" />
                </div>
              </section>

              {/* Product Grid wireframe */}
              <section className="mb-20 w-full">
                <div className="w-40 h-5 bg-gray-200 dark:bg-slate-700 rounded mb-6" />
                <div className="grid grid-cols-3 gap-6">
                  <div className="border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 h-48 flex flex-col justify-between" />
                  <div className="border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 h-48 flex flex-col justify-between" />
                  <div className="border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-6 h-48 flex flex-col justify-between" />
                </div>
              </section>

              {/* Pricing Plan wireframe */}
              <section className="mb-16 w-full">
                <div className="w-40 h-6 bg-gray-200 dark:bg-slate-700 rounded mx-auto mb-2" />
                <div className="w-60 h-3 bg-gray-200 dark:bg-slate-700 rounded mx-auto mb-8" />
                <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8">
                  <div className="border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-8 h-64" />
                  <div className="border border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl p-8 h-64" />
                </div>
              </section>

            </main>

          </div>

          {/* Plotted coordinates overlay */}
          {clicks.map((click, index) => {
            // Constrain coordinate bounds
            const x = Math.min(Math.max(click.x, 10), 1270);
            const y = Math.min(Math.max(click.y, 10), 1590);

            return (
              <div
                key={index}
                className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${x}px`, top: `${y}px` }}
                onMouseEnter={() => setHoveredDot({ x: click.x, y: click.y, index })}
                onMouseLeave={() => setHoveredDot(null)}
              >
                <div className="relative">
                  <div className="absolute -inset-1.5 bg-[#2563EB]/35 dark:bg-blue-400/25 rounded-full animate-ping pointer-events-none" />
                  <div className="w-3.5 h-3.5 bg-[#2563EB] dark:bg-blue-500 rounded-full shadow border border-white dark:border-slate-950 transition-transform duration-200 hover:scale-125 relative z-10" />
                </div>

                {hoveredDot?.index === index && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-[10px] text-[#111827] dark:text-slate-100 p-2.5 rounded-lg shadow-xl font-mono flex flex-col gap-1 pointer-events-none z-50">
                    <div className="font-bold border-b border-[#E5E7EB] dark:border-slate-800 pb-0.5 text-[#2563EB] dark:text-blue-400">
                      Click Marker
                    </div>
                    <div>x: {hoveredDot.x}px</div>
                    <div>y: {hoveredDot.y}px</div>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
