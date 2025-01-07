import mongoose, { Schema } from "mongoose";

const contentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true }, // e.g., "video/mp4", "application/pdf"
  uploadedAt: { type: Date, default: Date.now },
});

const Content = mongoose.model("Content", contentSchema);
export default Content;
