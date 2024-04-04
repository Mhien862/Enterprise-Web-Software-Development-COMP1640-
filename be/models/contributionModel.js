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
    // required: true,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],

  isSelected: Boolean,
});

const Contribution = mongoose.model("Contribution", contributionSchema);

export default Contribution;
