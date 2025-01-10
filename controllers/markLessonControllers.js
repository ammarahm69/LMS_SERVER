import UserProgress from "../models/UserProgress.js";

export const markLessonComplete = async (req, res) => {
  const { courseId, lessonId } = req.body;
  const userId = req.user.id;

  try {
    let progress = await UserProgress.findOne({ user: userId, course: courseId });

    if (!progress) {
      progress = new UserProgress({ user: userId, course: courseId, completedLessons: [] });
    }

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      await progress.save();
    }

    res.status(200).json({ message: "Lesson marked as completed.", progress });
  } catch (error) {
    res.status(500).json({ message: "Error marking lesson as complete.", error: error.message });
  }
};

export const submitQuizScore = async (req, res) => {
  const { courseId, lessonId, score } = req.body;
  const userId = req.user.id;

  try {
    let progress = await UserProgress.findOne({
      user: userId,
      course: courseId,
    });

    if (!progress) {
      progress = new UserProgress({
        user: userId,
        course: courseId,
        quizScores: [],
      });
    }

    const existingQuiz = progress.quizScores.find(
      (quiz) => quiz.lesson.toString() === lessonId
    );

    if (existingQuiz) {
      existingQuiz.score = score;
    } else {
      progress.quizScores.push({ lesson: lessonId, score });
    }

    await progress.save();

    res
      .status(200)
      .json({ message: "Quiz score submitted successfully.", progress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting quiz score.", error: error.message });
  }
};

export const getCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;

  try {
    const progress = await UserProgress.findOne({
      user: userId,
      course: courseId,
    })
      .populate("completedLessons", "title")
      .populate("quizScores.lesson", "title");

    if (!progress) {
      return res
        .status(404)
        .json({ message: "No progress found for this course." });
    }

    res.status(200).json({ progress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching progress.", error: error.message });
  }
};
