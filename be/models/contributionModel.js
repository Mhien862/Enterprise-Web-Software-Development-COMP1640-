import mongoose from "mongoose";

const contributionSchema = mongoose.Schema({
  contributionID: {
    type: Number,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  document: String,
  submissionDate: Date,
  status: String,
  isSelected: Boolean,
});

const Contribution = mongoose.model("Contribution", contributionSchema);

export default Contribution;
