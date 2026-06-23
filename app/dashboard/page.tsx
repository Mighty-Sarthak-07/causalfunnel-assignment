"use client";

import { useEffect, useState } from "react";
import {
  Users,
  MousePointer,
  FileText,
  Activity,
  RotateCw,
  Clock,
} from "lucide-react";

interface Stats {
  totalSessions: number;
  totalEvents: number;
  totalClicks: number;
  totalPageViews: number;
}

interface EventLog {
  _id: string;
  session_id: string;
  event_type: "page_view" | "click";
  page_url: string;
  timestamp: string;
  x?: number;
  y?: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [events, setEvents] = useState<EventLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, eventsRes] = await Promise.all([
        fetch("/api/stats"),
        fetch("/api/events?limit=20"),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      } else {
        setStats(null);
      }

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
        } else {
          setEvents([]);
        }
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Fetch failed", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl">
      {/* Title Block */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-[#111827]">System Overview</h2>
          <p className="text-xs text-[#6B7280]">
            Real-time aggregate data and interaction counts.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] rounded-lg text-xs font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <RotateCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sessions */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Total Sessions
            </span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-[#2563EB]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#111827]">
            {loading ? "..." : stats?.totalSessions ?? 0}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-2">Unique user sessions tracked</p>
        </div>

        {/* Total Events */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Total Events
            </span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Activity className="h-5 w-5 text-[#2563EB]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#111827]">
            {loading ? "..." : stats?.totalEvents ?? 0}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-2">Combined raw payload logs</p>
        </div>

        {/* Total Clicks */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Total Clicks
            </span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <MousePointer className="h-5 w-5 text-[#2563EB]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#111827]">
            {loading ? "..." : stats?.totalClicks ?? 0}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-2">Clicks with coordinate markers</p>
        </div>

        {/* Total Page Views */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Page Views
            </span>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-5 w-5 text-[#2563EB]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#111827]">
            {loading ? "..." : stats?.totalPageViews ?? 0}
          </div>
          <p className="text-[10px] text-[#6B7280] mt-2">Automatic path load signals</p>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-[#111827] mb-4 flex items-center gap-2">
          <Clock className="h-4.5 w-4.5 text-[#2563EB]" /> Recent Events Stream
        </h3>
        {loading && events.length === 0 ? (
          <div className="text-center py-12 text-sm text-[#6B7280]">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-sm text-[#6B7280] border border-dashed border-[#E5E7EB] rounded-xl bg-[#FAFAF9]">
            No events recorded yet. Visit the demo page and generate interaction events.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider bg-gray-50/50">
                  <th className="py-3.5 px-4">Event Type</th>
                  <th className="py-3.5 px-4">Path URL</th>
                  <th className="py-3.5 px-4">Session Identifier</th>
                  <th className="py-3.5 px-4">Coordinates (x, y)</th>
                  <th className="py-3.5 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-[#111827]">
                {events.map((ev) => (
                  <tr key={ev._id} className="hover:bg-gray-50/50 transition-all">
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          ev.event_type === "click"
                            ? "bg-blue-50 text-[#2563EB] border-blue-100"
                            : "bg-gray-100 text-[#6B7280] border-[#E5E7EB]"
                        }`}
                      >
                        {ev.event_type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#6B7280]">{ev.page_url}</td>
                    <td className="py-3 px-4 font-mono text-[#6B7280] max-w-[150px] truncate">
                      {ev.session_id}
                    </td>
                    <td className="py-3 px-4 text-[#6B7280] font-mono">
                      {ev.event_type === "click" && ev.x !== undefined ? (
                        `(${ev.x}, ${ev.y})`
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-[#6B7280]">
                      {new Date(ev.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
