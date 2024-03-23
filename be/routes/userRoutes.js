import express from "express";
import {
  loginUser,
  logoutUser,
  getProfile,
} from "../controllers/userController.js";
import {
  registerUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";

import {
  authenticate,
  authenticateAdmin,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Định nghĩa route cho API đăng ký người dùng
router.post("/register", authenticate, authenticateAdmin, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
// router.get("/user-list/", authenticate, authenticateAdmin, getAllUser);

router
  .route("/user-list/:userId")
  .get(authenticate, authenticateAdmin, getAllUser)
  .put(authenticate, authenticateAdmin, updateUser)
  .delete(authenticate, authenticateAdmin, deleteUser);
router.get("/profile", authenticate, getProfile);
export default router;
