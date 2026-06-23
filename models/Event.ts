import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  session_id: string;
  event_type: "page_view" | "click";
  page_url: string;
  timestamp: Date;
  x?: number;
  y?: number;
}

const EventSchema: Schema = new Schema({
  session_id: { type: String, required: true, index: true },
  event_type: { type: String, required: true, enum: ["page_view", "click"] },
  page_url: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  x: { type: Number, required: false },
  y: { type: Number, required: false },
});

// Fast session journey queries
EventSchema.index({ session_id: 1, timestamp: 1 });

// Fast heatmap queries
EventSchema.index({ page_url: 1, event_type: 1 });

const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
