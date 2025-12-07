// models/Inventory.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
