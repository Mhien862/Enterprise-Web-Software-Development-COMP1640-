import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
// import Comment from "./models/commentModel.js";
// import Contribution from "./models/contributionModel.js";
// import Event from "./models/eventModel.js";
// import { Faculty } from "./models/facultyModel.js";
// import Statistic from "./models/statisticModel.js";
// import { Role } from "./models/roleModel.js";
// import User from "./models/userModels.js";
// import AcademicYear from "./models/academicYearModel.js";
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
// Comment();
// Contribution();
// Event();
// Faculty();
// Statistic();
// Role();
// User();
// AcademicYear();

const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
