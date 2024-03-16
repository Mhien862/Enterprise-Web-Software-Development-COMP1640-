import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Định nghĩa route cho API đăng ký người dùng
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
