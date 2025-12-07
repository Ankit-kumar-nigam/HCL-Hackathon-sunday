

//import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("pizza");
  const { user } = useContext(AuthContext);


  useEffect(() => {
    api.get("/menu").then((res) => setItems(res.data));
  }, []);

  const addToCart = async (id) => {
    await api.post("/cart/add", { itemId: id, quantity: 1 });
    alert("Added to cart");
  };

  // ---- STYLES ----
  const containerStyle = {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
  };

  const categoryBarStyle = {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  };

  const categoryButton = (cat) => ({
    padding: "8px 14px",
    borderRadius: "5px",
    border: "1px solid #333",
    cursor: "pointer",
    background: category === cat ? "#333" : "#fff",
    color: category === cat ? "white" : "black",
  });

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    margin: "10px 0",
    background: "#fdfdfd",
    display: "flex",
    gap: "15px",
  };

  const textBox = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const nameStyle = {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
  };

  const descStyle = {
    margin: "5px 0",
    color: "#555",
  };

  const priceStyle = {
    margin: "5px 0",
    fontWeight: "bold",
  };

  const buttonStyle = {
    background: "black",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "8px",
    width: "120px",
  };

  const imageStyle = {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  // FILTER ITEMS
  const filteredItems = items.filter((item) => item.category === category);

  return (
    <div style={containerStyle}>
      <h2>Menu</h2>

      {/* CATEGORY BUTTONS */}
      <div style={categoryBarStyle}>
        <button style={categoryButton("pizza")} onClick={() => setCategory("pizza")}>
          Pizza
        </button>

        <button style={categoryButton("drink")} onClick={() => setCategory("drink")}>
          Drinks
        </button>

        <button style={categoryButton("bread")} onClick={() => setCategory("bread")}>
          Bread
        </button>
      </div>

      {/* FILTERED ITEMS */}
      {filteredItems.length === 0 ? (
        <p>No items found for this category.</p>
      ) : (
        filteredItems.map((item) => (
          <div key={item._id} style={cardStyle}>

            {/* LEFT SIDE → IMAGE */}
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} style={imageStyle} />
            )}

            {/* RIGHT SIDE → TEXT */}
            <div style={textBox}>
              <h3 style={nameStyle}>{item.name}</h3>

              {/* ⭐ DESCRIPTION HERE */}
              <p style={descStyle}>{item.description}</p>

              <p style={priceStyle}>₹{item.price}</p>

              {/* <button style={buttonStyle} onClick={() => addToCart(item._id)}>
                Add to Cart
              </button> */}
              {user?.role === "customer" && (
  <button style={buttonStyle} onClick={() => addToCart(item._id)}>
    Add to Cart
  </button>
)}


              
            </div>

          </div>
        ))
      )}
    </div>
  );
}
