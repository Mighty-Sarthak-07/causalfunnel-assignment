"use client";

import { useEffect, useState } from "react";
import Heatmap from "@/components/Heatmap";

export default function HeatmapPage() {
  const [selectedPage, setSelectedPage] = useState("/demo");
  const [clicks, setClicks] = useState<{ x: number; y: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHeatmap = async (page: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/heatmap?page=${encodeURIComponent(page)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setClicks(data);
        } else {
          setClicks([]);
        }
      } else {
        setClicks([]);
      }
    } catch (err) {
      console.error("Failed to load heatmap", err);
      setClicks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeatmap(selectedPage);
  }, [selectedPage]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#111827]">Click Heatmap</h2>
          <p className="text-xs text-[#6B7280]">
            Viewport coordinate visualizer of user click coordinates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#6B7280]">Active Path:</span>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="text-xs bg-white border border-[#E5E7EB] text-[#111827] px-3 py-1.5 rounded-lg font-semibold hover:border-gray-300 focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="/demo">/demo</option>
            <option value="/">/ (Landing Page)</option>
            <option value="/dashboard">/dashboard</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <Heatmap clicks={clicks} loading={loading} />
      </div>
    </div>
  );
}
