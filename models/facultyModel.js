import mongoose from "mongoose";

const facultySchema = mongoose.Schema({
  facultyName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);
const createFaculties = async () => {
  try {
    const facultiesData = [
      { facultyName: "IT" },
      { facultyName: "Business" },
      { facultyName: "Design" },
    ];

    await Faculty.insertMany(facultiesData);

    console.log("Faculties created successfully");
  } catch (error) {
    console.error("Error creating faculties:", error);
  }
};
export { Faculty, createFaculties };
