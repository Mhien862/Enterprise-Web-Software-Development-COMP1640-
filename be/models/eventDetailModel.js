import mongoose from "mongoose";

const eventDetailSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  allowedReports: [String],
});

const EventDetail = mongoose.model("EventDetail", eventDetailSchema);

export default EventDetail;
