import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const loadCart = () => {
    api.get("/cart").then((res) => setCart(res.data));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const placeOrder = async () => {
    await api.post("/orders", {
      orderType: "delivery",
      deliveryAddress: {
        street: "MG Road",
        city: "Delhi",
        pincode: "110001",
      },
      paymentMethod: "COD",
    });

    alert("Order placed!");
    window.location.href = "/orders";
  };

  if (!cart) return "Loading...";

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map((it) => (
        <div key={it.itemId}>
          {it.name} — {it.quantity} x ₹{it.price}
        </div>
      ))}
      <h3>Total: ₹{cart.totalAmount}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
