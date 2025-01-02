import express from "express";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authenticateUser, (req, res) => {
  res.send(`Welcome, user ${req.user.id}`);
});

router.get("/admin", authenticateUser, authorizeRoles("admin"), (req, res) => {
  res.send("Welcome to the admin panel.");
});

export default router;
