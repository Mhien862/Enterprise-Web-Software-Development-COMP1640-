import express from "express";
import {
  loginUser,
  logoutUser,
  getProfile,
  uploadFile,
  handleUpload,
} from "../controllers/userController.js";
import {
  registerUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserById,
  createEvent,
  updateEvent,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
  deleteEvent,
  getEventList,
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
router.post("/upload", authenticate, uploadFile, handleUpload);
//Admin role
router.post("/register", authenticate, authenticateAdmin, registerUser);
router
  .route("/user-list")
  .get(authenticate, authenticateAdmin, getUserById)
  .put(authenticate, authenticateAdmin, updateUser)
  .delete(authenticate, authenticateAdmin, deleteUser);
router
  .route("/event")
  .get(authenticate, authenticateAdmin, getEventList)
  .post(authenticate, authenticateAdmin, createEvent)
  .put(authenticate, authenticateAdmin, updateEvent)
  .delete(authenticate, authenticateAdmin, deleteEvent);

router
  .route("/academic-year")
  .post(authenticate, authenticateAdmin, createAcademicYear)
  .put(authenticate, authenticateAdmin, updateAcademicYear)
  .delete(authenticate, authenticateAdmin, deleteAcademicYear);
export default router;
