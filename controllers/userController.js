import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const newUser = new User({ name, email, password, role }); // Pass plain-text password
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("User Found:", user); // Debug: Check if user is found

    if (!user) return res.status(400).json({ message: "User does not exist." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password Valid:", isPasswordValid); // Debug: Check password validation result

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Generated Token:", token); // Debug: Verify token generation

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error Logging In:", error.message); // Debug: Log error message
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};
