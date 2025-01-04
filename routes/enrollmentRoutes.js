import express from "express";
import {
  enrollStudent,
  getEnrolledStudents,
  getStudentCourses,
} from "../controllers/enrollmentControllers.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Enroll a student in a course
router.post(
  "/:courseId/enroll",
  authenticateUser,
  authorizeRoles("student"), // Only students can enroll
  enrollStudent
);

// Get all students in a course
router.get(
  "/:courseId/students",
  authenticateUser,
  authorizeRoles("admin", "instructor"), // Only instructors and admins can view this
  getEnrolledStudents
);

// Get all courses a student is enrolled in
router.get(
  "/student/courses",
  authenticateUser,
  authorizeRoles("student"), // Only students can view their courses
  getStudentCourses
);

export default router;
