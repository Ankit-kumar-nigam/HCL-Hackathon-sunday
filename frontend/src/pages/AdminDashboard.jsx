
import { useEffect, useState, useContext } from "react";
import api from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();

  if (user?.role !== "admin") {
    return <h3>Access Denied – Admin Only</h3>;
  }

  useEffect(() => {
    api.get("/inventory")
      .then((res) => setInventory(res.data))
      .catch((err) => console.log(err));
  }, []);


const removeItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
  
    try {
      await api.delete(`/menu/${itemId}`);
  
      // Update UI
      const updated = inventory.filter((inv) => inv.itemId._id !== itemId);
      setInventory(updated);
  
      alert("Item removed successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete item");
    }
  };
  

  const containerStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  };

  const buttonStyle = {
    background: "black",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  };

  const removeButtonStyle = {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    margin: "10px 0",
    background: "#fafafa",
  };

  return (
    <div style={containerStyle}>
      <h2>Admin Dashboard</h2>

      <button style={buttonStyle} onClick={() => navigate("/admin/add-item")}>
        Add New Item
      </button>

      <h3>Available Menu Items</h3>

      {inventory.length === 0 && <p>No items available.</p>}

      <div>
        {inventory.map((inv) => (
          <div key={inv._id} style={cardStyle}>
            <h3>{inv.itemId.name}</h3>
            <p>{inv.itemId.description}</p>
            <p>Price: ₹{inv.itemId.price}</p>
            <p>Category: {inv.itemId.category}</p>
            <p><b>Stock: {inv.stock}</b></p>

            {/* REMOVE ITEM BUTTON */}
            <button
  style={{
    background: "red",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px"
  }}
  onClick={() => removeItem(inv.itemId._id)}
>
  Remove Item
</button>

          </div>
        ))}
      </div>
    </div>
  );
}
