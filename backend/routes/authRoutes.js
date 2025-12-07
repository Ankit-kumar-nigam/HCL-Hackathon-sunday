// routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || "customer",
      address
    });

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: genToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: "Register error", error: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: genToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

export default router;
