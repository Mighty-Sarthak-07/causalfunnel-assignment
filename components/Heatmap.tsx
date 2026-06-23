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
      <div className="flex justify-center items-center py-20 text-xs text-[#6B7280]">
        Loading heatmap coordinates...
      </div>
    );
  }

  if (clicks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-[#E5E7EB] rounded-2xl bg-[#FAFAF9]">
        <Flame className="h-8 w-8 text-gray-300 mb-3" />
        <span className="text-[#6B7280] font-semibold text-sm">
          No click data available
        </span>
        <p className="text-xs text-[#6B7280] max-w-xs mt-1">
          Make click interactions on the demo site first.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Mock Browser Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-55 bg-gray-50 border border-[#E5E7EB] rounded-t-xl text-xs text-gray-400">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded px-3 py-0.5 w-full max-w-xs font-mono text-[10px] text-[#6B7280] truncate select-none">
          https://localhost:3000/demo
        </div>
      </div>

      {/* Coordinate Container */}
      <div className="relative border-x border-b border-[#E5E7EB] rounded-b-xl bg-white h-[640px] overflow-auto select-none p-6">
        {/* Wireframe bg */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none p-6 flex flex-col gap-8">
          <div className="h-10 bg-gray-50 border border-[#E5E7EB] rounded-lg flex items-center justify-between px-6" />
          <div className="flex flex-col items-center py-8 text-center gap-3">
            <div className="w-24 h-6 bg-gray-50 border border-[#E5E7EB] rounded" />
            <div className="w-64 h-10 bg-gray-50 border border-[#E5E7EB] rounded" />
            <div className="w-48 h-4 bg-gray-50 border border-[#E5E7EB] rounded" />
            <div className="flex gap-3 mt-4">
              <div className="w-28 h-10 bg-gray-50 border border-[#E5E7EB] rounded" />
              <div className="w-28 h-10 bg-gray-50 border border-[#E5E7EB] rounded" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-32 bg-gray-55 bg-gray-50 border border-[#E5E7EB] rounded-xl" />
            <div className="h-32 bg-gray-55 bg-gray-50 border border-[#E5E7EB] rounded-xl" />
            <div className="h-32 bg-gray-55 bg-gray-50 border border-[#E5E7EB] rounded-xl" />
          </div>
        </div>

        {/* Click overlays */}
        {clicks.map((click, index) => {
          const x = Math.min(Math.max(click.x, 15), 1200);
          const y = Math.min(Math.max(click.y, 15), 2000);

          return (
            <div
              key={index}
              className="absolute group z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${x}px`, top: `${y}px` }}
              onMouseEnter={() => setHoveredDot({ x: click.x, y: click.y, index })}
              onMouseLeave={() => setHoveredDot(null)}
            >
              <div className="relative">
                {/* Pulsating Radar */}
                <div className="absolute -inset-1.5 bg-[#2563EB]/35 rounded-full animate-ping pointer-events-none" />
                {/* Main Marker */}
                <div className="w-3.5 h-3.5 bg-[#2563EB] rounded-full shadow border border-white transition-transform duration-200 hover:scale-125 relative z-10" />
              </div>

              {hoveredDot?.index === index && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 bg-white border border-[#E5E7EB] text-[10px] text-[#111827] p-2.5 rounded-lg shadow-xl font-mono flex flex-col gap-1 pointer-events-none z-50">
                  <div className="font-bold border-b border-[#E5E7EB] pb-0.5 text-[#2563EB]">
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
  );
}
