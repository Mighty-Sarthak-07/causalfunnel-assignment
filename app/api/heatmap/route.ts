import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const pageUrl = searchParams.get("page") || "/demo";

    const clicks = await Event.find({
      page_url: pageUrl,
      event_type: "click",
    }).select("x y -_id");

    return NextResponse.json(clicks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch heatmap data" },
      { status: 500 }
    );
  }
}
