// routes/orderRoutes.js
import express from "express";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";
import { protect } from "../middleware/authMiddleware.js";
import { sendEmail } from "../utils/sendEmail.js";


const router = express.Router();

// simple order number generator
const genOrderNumber = () =>
  "ORD-" + Date.now();

router.post("/", protect, async (req, res) => {
  try {
    const { orderType, deliveryAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Check and update inventory
    for (const cartItem of cart.items) {
      const inv = await Inventory.findOne({ itemId: cartItem.itemId });
      if (!inv || inv.stock < cartItem.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${cartItem.name}`
        });
      }
    }

    for (const cartItem of cart.items) {
      const inv = await Inventory.findOne({ itemId: cartItem.itemId });
      inv.stock -= cartItem.quantity;
      await inv.save();
    }

    const order = await Order.create({
      orderNumber: genOrderNumber(),
      userId: req.user._id,
      items: cart.items,
      orderType,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
      paymentMethod: paymentMethod || "COD",
      totalAmount: cart.totalAmount
    });
    // Send order confirmation email to customer
await sendEmail(
    req.user.email,
    `Order Placed Successfully - ${order.orderNumber}`,
    `
      <h2>Thank you for your order!</h2>
      <p>Your order <strong>${order.orderNumber}</strong> has been placed successfully.</p>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items
          .map(
            (it) => `<li>${it.name} x ${it.quantity} = ₹${it.price * it.quantity}</li>`
          )
          .join("")}
      </ul>
      <p>We will notify you once your order is prepared.</p>
    `
  );
  

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Order error", error: err.message });
  }
});

// GET /api/orders/my
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export default router;
