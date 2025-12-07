import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosClient";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      alert("Login successful");
      window.location.href = "/"; // Go to homepage / menu
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
