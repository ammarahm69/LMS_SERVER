import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedLessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  quizScores: [
    {
      lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
      score: Number,
    },
  ],
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
