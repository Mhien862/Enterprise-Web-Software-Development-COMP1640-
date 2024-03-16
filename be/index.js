import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import Comment from "./models/commentModel.js";
import Contribution from "./models/contributionModel.js";
import EventDetail from "./models/eventDetailModel.js";
import Event from "./models/eventModel.js";
import Faculty from "./models/facultyModel.js";
import Statistic from "./models/statisticModel.js";
import { Role } from "./models/roleModel.js";
import User from "./models/userModels.js";
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
Comment();
Contribution();
EventDetail();
Event();
Faculty();
Statistic();
Role();
User();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
