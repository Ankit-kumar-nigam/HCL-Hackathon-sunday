// routes/menuRoutes.js
import express from "express";
import MenuItem from "../models/MenuItem.js";
import Inventory from "../models/Inventory.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/menu
router.get("/", async (req, res) => {
  const items = await MenuItem.find({ isAvailable: true });
  res.json(items);
});

// POST /api/menu  (admin)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    const item = await MenuItem.create({ name, description, price, category, imageUrl });
    await Inventory.create({ itemId: item._id, stock: stock || 0 });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating menu item", error: err.message });
  }
});

// DELETE /api/menu/:id
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const itemId = req.params.id;

    // Delete menu item
    await MenuItem.findByIdAndDelete(itemId);

    // Delete inventory for this item
    await Inventory.findOneAndDelete({ itemId });

    res.json({ message: "Item removed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete error", error: err.message });
  }
});


export default router;
