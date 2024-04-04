import express from "express";
import {
  loginUser,
  logoutUser,
  getProfile,
  handleUpload,
  deleteContribution,
  getContributionById,
} from "../controllers/userController.js";
import {
  registerUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserList,
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
import { uploadFile } from "../middlewares/uploadMiddlewares.js";
import {
  downloadAllFiles,
  getContribution,
  getDashboardStatistics,
} from "../controllers/marketingManagerController.js";
import {
  sendEmailNotification,
  getContributionsPerFaculty,
} from "../controllers/marketingCoordinatorController.js";
import { isMarketingCoordinator } from "../middlewares/marketingCoordinatorMiddlewares.js";
const router = express.Router();

//User role

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticate, getProfile);
router
  .route("/upload")
  .post(authenticate, uploadFile, handleUpload)
  .delete(authenticate, deleteContribution)
  .get(authenticate, getContributionById);

//Admin role
router.post("/register", authenticate, authenticateAdmin, registerUser);
router.get("/user", authenticate, authenticateAdmin, getUserById);
router
  .route("/user-list")
  .get(authenticate, authenticateAdmin, getUserList)
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

router.get("/download-all", authenticate, downloadAllFiles);
router.get("/contribution", authenticate, getContribution);
router.get("/dashboard", authenticate, getDashboardStatistics);
router.post("/send-email", authenticate, sendEmailNotification);
router.get(
  "/contribution-per-faculty",
  authenticate,
  isMarketingCoordinator,
  getContributionsPerFaculty
);

export default router;
