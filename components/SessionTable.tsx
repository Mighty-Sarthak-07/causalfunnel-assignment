import { Users, Calendar } from "lucide-react";

interface Session {
  session_id: string;
  event_count: number;
  last_activity: string;
}

interface SessionTableProps {
  sessions: Session[];
  selectedSessionId: string | null;
  onSelectSession: (id: string) => void;
}

export default function SessionTable({
  sessions,
  selectedSessionId,
  onSelectSession,
}: SessionTableProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-[#E5E7EB] dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm transition-colors duration-200">
        <Users className="h-8 w-8 text-gray-300 dark:text-slate-700 mb-3" />
        <span className="text-[#6B7280] dark:text-slate-400 font-semibold text-sm">No sessions found</span>
        <p className="text-xs text-[#6B7280] dark:text-slate-500 max-w-xs mt-1">
          Perform actions on the demo site to populate visitor records.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-[#E5E7EB] dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm transition-colors duration-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] dark:border-slate-800 text-[#6B7280] dark:text-slate-400 font-bold uppercase tracking-wider bg-gray-50/50 dark:bg-slate-800/20">
              <th className="py-3.5 px-5">Session Identifier</th>
              <th className="py-3.5 px-5">Total Events</th>
              <th className="py-3.5 px-5 text-right">Latest Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] dark:divide-slate-800 text-[#111827] dark:text-slate-100">
            {sessions.map((sess) => (
              <tr
                key={sess.session_id}
                onClick={() => onSelectSession(sess.session_id)}
                className={`cursor-pointer transition-all hover:bg-gray-50/50 dark:hover:bg-slate-800/30 select-none ${
                  selectedSessionId === sess.session_id
                    ? "bg-blue-50/50 dark:bg-blue-950/20 text-[#2563EB] dark:text-blue-400 font-semibold border-l-4 border-l-[#2563EB]"
                    : ""
                }`}
              >
                <td className="py-3.5 px-5 font-mono text-[#6B7280] dark:text-slate-400 max-w-[180px] truncate">
                  {sess.session_id}
                </td>
                <td className="py-3.5 px-5">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-slate-800 text-[#6B7280] dark:text-slate-400 border border-[#E5E7EB] dark:border-slate-700">
                    {sess.event_count}
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right font-mono text-[#6B7280] dark:text-slate-500 flex items-center justify-end gap-1.5 mt-1">
                  <Calendar className="h-3 w-3 text-gray-400 dark:text-slate-650" />
                  {new Date(sess.last_activity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
