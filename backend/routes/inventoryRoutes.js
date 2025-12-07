// routes/inventoryRoutes.js
import express from "express";
import Inventory from "../models/Inventory.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, async (req, res) => {
  const inv = await Inventory.find().populate("itemId");
  res.json(inv);
});

export default router;
