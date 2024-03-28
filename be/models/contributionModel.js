import mongoose from "mongoose";

const contributionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  faculty: {
    type: String,
    ref: "Faculty",
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  submissionDate: Date,
  status: String,
  isSelected: Boolean,
});

const Contribution = mongoose.model("Contribution", contributionSchema);

export default Contribution;
