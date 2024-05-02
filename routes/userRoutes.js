import express from "express";
import {
  loginUser,
  logoutUser,
  getProfile,
  deleteContribution,
  getContributionById,
  uploadFile,
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
import {
  downloadAllFiles,
  getContribution,
  getContributionImg,
  getDashboardStatistics,
} from "../controllers/marketingManagerController.js";
import {
  sendEmailNotification,
  getContributionsPerFaculty,
  sendEmail,
} from "../controllers/marketingCoordinatorController.js";
import { isMarketingCoordinator } from "../middlewares/marketingCoordinatorMiddlewares.js";
import { uploadMiddleware } from "../middlewares/uploadMiddlewares.js";
const router = express.Router();

//User role

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authenticate, getProfile);
router
  .route("/upload/:eventId")
  .post(authenticate, uploadMiddleware, uploadFile)
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
router.get("/event-by-id/:eventId", authenticate, getContributionById);
router
  .route("/event")
  .get(authenticate, getEventList)
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
router.get("/contribution-img/:name", authenticate, getContributionImg);
router.get("/dashboard", authenticate, getDashboardStatistics);
router.post("/send-notification", authenticate, sendEmailNotification);
router.post("/send-email", authenticate, sendEmail);
router.get(
  "/contribution-per-faculty",
  authenticate,
  isMarketingCoordinator,
  getContributionsPerFaculty
);

export default router;
