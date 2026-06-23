import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  try {
    await dbConnect();

    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$session_id",
          event_count: { $sum: 1 },
          last_activity: { $max: "$timestamp" },
        },
      },
      {
        $project: {
          _id: 0,
          session_id: "$_id",
          event_count: 1,
          last_activity: 1,
        },
      },
      {
        $sort: { last_activity: -1 },
      },
    ]);

    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
