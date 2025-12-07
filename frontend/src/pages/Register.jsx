import { useState } from "react";
import api from "../api/axiosClient";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    city: "",
    pincode: "",
    role: "customer" // default role
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,              // 👈 NEW FIELD
      address: {
        street: form.street,
        city: form.city,
        pincode: form.pincode
      }
    };

    try {
      await api.post("/auth/register", body);
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <form 
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
      >

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* --- Role Dropdown --- */}
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        {/* --- Address Fields --- */}
        <input
          type="text"
          placeholder="Street"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
        />

        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <input
          type="text"
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
