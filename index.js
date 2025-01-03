import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import authorizeRoutes from "./routes/authorizedRoutes.js";

dotenv.config();
const app = express();
const PORT = 5000;

connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authorizeRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
