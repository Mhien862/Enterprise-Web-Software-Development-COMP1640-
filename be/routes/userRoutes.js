import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Định nghĩa route cho API đăng ký người dùng
router.post("/register", authenticate, authenticateAdmin, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
export default router;
