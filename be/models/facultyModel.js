import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
