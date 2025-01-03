import Course from "../models/Course.js";

//Create a new Course
export const createCourse = async (req, res) => {
  const { title, description, category, price, createdAt } = req.body;
  try {
    const newCourse = new Course({
      title,
      description,
      category,
      price,
      createdAt,
    });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

//Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting courses", error: error.message });
  }
};

//Get single course by id
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, price } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, category, price },
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });
    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating course", error: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting course", error: error.message });
  }
};
