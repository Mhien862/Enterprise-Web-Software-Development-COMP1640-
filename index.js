import express from "express";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
