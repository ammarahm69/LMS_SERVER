import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  markLessonComplete,
  submitQuizScore,
  getCourseProgress,
} from "../controllers/markLessonControllers.js";

const router = express.Router();

router.post("/complete-lesson", authenticateUser, markLessonComplete);
router.post("/submit-quiz", authenticateUser, submitQuizScore);
router.get("/:courseId", authenticateUser, getCourseProgress);

export default router;
