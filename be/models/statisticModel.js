import mongoose from "mongoose";

const statisticSchema = new mongoose.Schema({
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
  numberOfContributions: Number,
  percentageOfContribution: Number,
  numberOfContributors: Number,
});

const Statistic = mongoose.model("Statistic", statisticSchema);

export default Statistic;
