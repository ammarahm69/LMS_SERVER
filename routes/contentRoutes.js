// routes/contentRoutes.js
import express from "express";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { uploadContent, serveContent } from "../controllers/contentController.js";

const router = express.Router();

// Upload Content (Only Admins and Instructors)
router.post(
  "/:courseId/upload",
  authenticateUser,
  authorizeRoles("admin", "instructor"),
  upload.single("file"),
  uploadContent
);

// Serve Content (Enrolled Students and Instructors)
router.get(
  "/:contentId",
  authenticateUser,
  serveContent
);

export default router;
