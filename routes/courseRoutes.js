import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseControllers.js";

const router = express.Router();

// Route for creating a course
router.post("/", createCourse);

// Route for getting all courses
router.get("/", getAllCourses);

// Route for getting a single course by ID
router.get("/:id", getCourseById);

// Route for updating a course
router.put("/:id", updateCourse);

// Route for deleting a course
router.delete("/:id", deleteCourse);

export default router;
