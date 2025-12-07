

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "12px 20px",
    background: "#222",
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "6px 10px",
    borderRadius: "4px",
  };

  const linkHover = {
    background: "#444",
  };

  const buttonStyle = {
    background: "#ff4d4d",
    border: "none",
    padding: "6px 12px",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Menu</Link>

      {!user && (
        <>
          <Link to="/login" style={linkStyle}>Login</Link>
          <Link to="/register" style={linkStyle}>Register</Link>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <Link to="/admin" style={linkStyle}>Admin Dashboard</Link>
          <Link to="/admin/add-item" style={linkStyle}>Add Item</Link>
          {/* <Link to="/admin/items" style={linkStyle}>View Items</Link> */}
        </>
      )}

      {user?.role === "customer" && (
        <>
          <Link to="/cart" style={linkStyle}>Cart</Link>
          <Link to="/orders" style={linkStyle}>Orders</Link>
        </>
      )}

      {user && (
        <button onClick={logout} style={buttonStyle}>
          Logout
        </button>
      )}
    </nav>
  );
}

