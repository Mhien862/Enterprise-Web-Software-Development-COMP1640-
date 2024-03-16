import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

// Định nghĩa route cho API đăng ký người dùng
router.post("/register", registerUser);

export default router;
