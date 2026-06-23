import { FileText, MousePointer, Clock } from "lucide-react";

interface EventLog {
  _id: string;
  event_type: "page_view" | "click";
  page_url: string;
  timestamp: string;
  x?: number;
  y?: number;
}

interface EventTimelineProps {
  events: EventLog[];
  loading: boolean;
}

export default function EventTimeline({ events, loading }: EventTimelineProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-xs text-[#6B7280] dark:text-slate-400">
        Loading journey events...
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-[#E5E7EB] dark:border-slate-800 rounded-2xl bg-[#FAFAF9] dark:bg-slate-950 transition-colors duration-200">
        <Clock className="h-8 w-8 text-gray-300 dark:text-slate-700 mb-3" />
        <span className="text-[#6B7280] dark:text-slate-400 font-semibold text-sm">No events recorded</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative pl-6 border-l border-[#E5E7EB] dark:border-slate-800 ml-3">
      {events.map((ev, index) => {
        const isClick = ev.event_type === "click";
        const formattedTime = new Date(ev.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return (
          <div key={ev._id || index} className="relative group">
            {/* Timeline Icon */}
            <div
              className={`absolute -left-[37px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                isClick
                  ? "bg-blue-50 dark:bg-blue-950/40 border-[#2563EB] dark:border-blue-500 text-[#2563EB] dark:text-blue-400"
                  : "bg-gray-50 dark:bg-slate-800 border-gray-400 dark:border-slate-600 text-[#6B7280] dark:text-slate-400"
              }`}
            >
              {isClick ? (
                <MousePointer className="h-3 w-3" />
              ) : (
                <FileText className="h-3 w-3" />
              )}
            </div>

            {/* Content Card */}
            <div className="bg-[#FAFAF9] dark:bg-slate-950 border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-4 transition-all hover:border-gray-300 dark:hover:border-slate-700">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isClick ? "text-[#2563EB] dark:text-blue-400" : "text-[#6B7280] dark:text-slate-400"
                  }`}
                >
                  {isClick ? "Click Interaction" : "Page Visited"}
                </span>
                <span className="text-[10px] text-[#6B7280] dark:text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formattedTime}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#111827] dark:text-slate-100 truncate">{ev.page_url}</p>
              {isClick && ev.x !== undefined && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-[10px] font-mono text-[#6B7280] dark:text-slate-400">
                  <span>Coordinates:</span>
                  <span className="text-[#2563EB] dark:text-blue-450 dark:text-blue-400">
                    x: {ev.x}, y: {ev.y}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
