import mongoose from "mongoose";

// Kết nối tới cơ sở dữ liệu MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://root:123@cluster0.ku0d3lb.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
