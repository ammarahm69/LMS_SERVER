import Content from "../models/Content.js";
import fs from "fs";
import path from "path";

export const uploadContent = async (req, res) => {
  const { courseId } = req.params;
  const { title } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const newContent = new Content({
      course: courseId,
      title,
      fileUrl: req.file.path,
      fileType: req.file.mimetype,
    });

    await newContent.save();
    res.status(201).json({ message: "File uploaded successfully.", content: newContent });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file.", error: error.message });
  }
};

export const serveContent = async (req, res) => {
  const { contentId } = req.params;

  try {
    const content = await Content.findById(contentId).populate("course");
    if (!content) {
      return res.status(404).json({ message: "Content not found." });
    }

    // Secure access: check if the user is authorized
    if (
      req.user.role !== "admin" &&
      !content.course.enrolledStudents.includes(req.user.id)
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.sendFile(path.resolve(content.fileUrl));
  } catch (error) {
    res.status(500).json({ message: "Error serving file.", error: error.message });
  }
};
