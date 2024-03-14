import mongoose from "mongoose";

// Kết nối tới cơ sở dữ liệu MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Định nghĩa các mô hình dữ liệu

// Bảng Users
const userSchema = new mongoose.Schema({
  userID: { type: Number, unique: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  username: String,
  password: String,
  email: String,
  agreement: Boolean,
});

const User = mongoose.model("User", userSchema);

// Bảng Roles
const roleSchema = new mongoose.Schema({
  roleName: { type: String, unique: true },
});

const Role = mongoose.model("Role", roleSchema);

// Bảng Faculties
const facultySchema = new mongoose.Schema({
  facultyName: { type: String, unique: true },
});

const Faculty = mongoose.model("Faculty", facultySchema);

// Bảng Contributions
const contributionSchema = new mongoose.Schema({
  contributionID: { type: Number, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  document: String,
  submissionDate: Date,
  status: String,
  isSelected: Boolean,
});

const Contribution = mongoose.model("Contribution", contributionSchema);

// Bảng Events
const eventSchema = new mongoose.Schema({
  eventName: String,
  firstClosureDate: Date,
  finalClosureDate: Date,
});

const Event = mongoose.model("Event", eventSchema);

// Bảng EventDetails
const eventDetailSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  allowedReports: [String],
});

const EventDetail = mongoose.model("EventDetail", eventDetailSchema);

// Bảng Comments
const commentSchema = new mongoose.Schema({
  contribution: { type: mongoose.Schema.Types.ObjectId, ref: "Contribution" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  submissionDate: Date,
});

const Comment = mongoose.model("Comment", commentSchema);

// Bảng Statistics
const statisticSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" },
  numberOfContributions: Number,
  percentageOfContribution: Number,
  numberOfContributors: Number,
});

const Statistic = mongoose.model("Statistic", statisticSchema);

export default connectDB;
