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

//User role

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticate, getProfile);
// router.get("/user-list/", authenticate, authenticateAdmin, getAllUser);

//Admin role
router.post("/register", authenticate, authenticateAdmin, registerUser);
router
  .route("/user-list/:userId")
  .get(authenticate, authenticateAdmin, getAllUser)
  .put(authenticate, authenticateAdmin, updateUser)
  .delete(authenticate, authenticateAdmin, deleteUser);

export default router;
