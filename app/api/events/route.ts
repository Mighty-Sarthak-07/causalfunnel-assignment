import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { session_id, event_type, page_url, x, y, timestamp } = body;

    if (!session_id || !event_type || !page_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const event = new Event({
      session_id,
      event_type,
      page_url,
      x,
      y,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    await event.save();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to store event" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 20;

    const events = await Event.find({})
      .sort({ timestamp: -1 })
      .limit(limit);

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
