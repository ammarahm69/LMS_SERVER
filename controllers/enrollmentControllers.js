import Course from "../models/Course.js";
import User from "../models/User.js";

// Enroll a student in a course
export const enrollStudent = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id; // Assumes student is authenticated and user ID is in req.user

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if the student is already enrolled
    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: "Student is already enrolled in this course" });
    }

    course.enrolledStudents.push(studentId);
    await course.save();

    res.status(200).json({ message: "Enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in course", error: error.message });
  }
};

// Get all students enrolled in a course
export const getEnrolledStudents = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate("enrolledStudents", "name email role");
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ enrolledStudents: course.enrolledStudents });
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrolled students", error: error.message });
  }
};

// Get all courses a student is enrolled in
export const getStudentCourses = async (req, res) => {
  const studentId = req.user.id;

  try {
    const courses = await Course.find({ enrolledStudents: studentId });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student courses", error: error.message });
  }
};
