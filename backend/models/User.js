// models/User.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  pincode: String
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    address: addressSchema
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
