import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    unique: true,
  },
  firstClosureDate: Date,
  finalClosureDate: Date,
  faculty: {
    type: String,
    ref: "Faculty",
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
