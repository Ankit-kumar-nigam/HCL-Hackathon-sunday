// models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  name: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    orderType: { type: String, enum: ["delivery", "carryout"], required: true },
    deliveryAddress: {
      street: String,
      city: String,
      pincode: String
    },
    paymentMethod: { type: String, enum: ["COD", "Online"], default: "COD" },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["placed", "preparing", "completed", "cancelled"],
      default: "placed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
