// routes/cartRoutes.js
import express from "express";
import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const calcTotal = (items) =>
  items.reduce((sum, it) => sum + it.price * it.quantity, 0);

// GET /api/cart
router.get("/", protect, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, items: [], totalAmount: 0 });
  }
  res.json(cart);
});

// POST /api/cart/add
router.post("/add", protect, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const qty = quantity || 1;

    const item = await MenuItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

    const idx = cart.items.findIndex((i) => i.itemId.toString() === itemId);
    if (idx >= 0) {
      cart.items[idx].quantity += qty;
    } else {
      cart.items.push({
        itemId,
        name: item.name,
        price: item.price,
        quantity: qty
      });
    }
    cart.totalAmount = calcTotal(cart.items);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error updating cart", error: err.message });
  }
});

// PATCH /api/cart/item/:itemId
router.patch("/item/:itemId", protect, async (req, res) => {
  const { quantity } = req.body;
  const { itemId } = req.params;

  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const idx = cart.items.findIndex((i) => i.itemId.toString() === itemId);
  if (idx === -1) return res.status(404).json({ message: "Item not in cart" });

  if (quantity <= 0) {
    cart.items.splice(idx, 1);
  } else {
    cart.items[idx].quantity = quantity;
  }
  cart.totalAmount = calcTotal(cart.items);
  await cart.save();
  res.json(cart);
});

// DELETE /api/cart/clear
router.delete("/clear", protect, async (req, res) => {
  let cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return res.json({ message: "Cart already empty" });

  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  res.json(cart);
});

export default router;
