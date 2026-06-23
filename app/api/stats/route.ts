import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await dbConnect();

    const [totalEvents, totalClicks, totalPageViews, uniqueSessions] =
      await Promise.all([
        Event.countDocuments({}),
        Event.countDocuments({ event_type: "click" }),
        Event.countDocuments({ event_type: "page_view" }),
        Event.distinct("session_id"),
      ]);

    return NextResponse.json({
      totalSessions: uniqueSessions.length,
      totalEvents,
      totalClicks,
      totalPageViews,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
