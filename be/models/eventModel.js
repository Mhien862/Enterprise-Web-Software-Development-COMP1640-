import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: String,
  firstClosureDate: Date,
  finalClosureDate: Date,
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
