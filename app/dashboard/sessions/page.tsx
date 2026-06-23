"use client";

import { useEffect, useState } from "react";
import SessionTable from "@/components/SessionTable";
import EventTimeline from "@/components/EventTimeline";
import { Users, Clock } from "lucide-react";

interface Session {
  session_id: string;
  event_count: number;
  last_activity: string;
}

interface EventLog {
  _id: string;
  event_type: "page_view" | "click";
  page_url: string;
  timestamp: string;
  x?: number;
  y?: number;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [events, setEvents] = useState<EventLog[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoadingSessions(true);
      const res = await fetch("/api/sessions");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setSessions(data);
          if (data.length > 0 && !selectedSessionId) {
            setSelectedSessionId(data[0].session_id);
          }
        } else {
          setSessions([]);
        }
      } else {
        setSessions([]);
      }
    } catch (err) {
      console.error("Failed to load sessions", err);
      setSessions([]);
    } finally {
      setLoadingSessions(false);
    }
  };

  const fetchTimeline = async (id: string) => {
    try {
      setLoadingEvents(true);
      const res = await fetch(`/api/session/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error("Failed to load timeline", err);
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      fetchTimeline(selectedSessionId);
    }
  }, [selectedSessionId]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold text-[#111827] dark:text-white">Visitor Sessions</h2>
        <p className="text-xs text-[#6B7280] dark:text-slate-400">
          List of active tracking sessions and their step-by-step navigation logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Session List Table */}
        <div className="lg:col-span-3">
          {loadingSessions ? (
            <div className="text-center py-20 text-xs text-[#6B7280] dark:text-slate-400">
              Loading sessions...
            </div>
          ) : (
            <SessionTable
              sessions={sessions}
              selectedSessionId={selectedSessionId}
              onSelectSession={setSelectedSessionId}
            />
          )}
        </div>

        {/* User Journey Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 shadow-sm min-h-[400px] transition-colors duration-200">
          <h3 className="text-sm font-bold text-[#111827] dark:text-white mb-6 flex items-center gap-2 border-b border-[#E5E7EB] dark:border-slate-800 pb-3">
            <Clock className="h-4 w-4 text-[#2563EB] dark:text-blue-400" />
            User Journey Timeline
          </h3>

          {selectedSessionId ? (
            <div className="flex flex-col gap-1 animate-slide-in-right" key={selectedSessionId}>
              <div className="mb-4 text-[10px] font-mono text-[#6B7280] dark:text-slate-400 break-all bg-[#FAFAF9] dark:bg-slate-950 px-3 py-1.5 rounded border border-[#E5E7EB] dark:border-slate-800">
                Session ID: {selectedSessionId}
              </div>
              <EventTimeline events={events} loading={loadingEvents} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-[#6B7280] dark:text-slate-500">
              <Users className="h-8 w-8 text-gray-300 dark:text-slate-700 mb-2" />
              <span className="text-xs">Select a session to view its timeline.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
