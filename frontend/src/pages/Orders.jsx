// import { useState, useEffect } from "react";
// import api from "../api/axiosClient";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     api.get("/orders/my").then((res) => setOrders(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>My Orders</h2>
//       {orders.map((o) => (
//         <div key={o._id}>
//           <h3>{o.orderNumber}</h3>
//           <p>Total: ₹{o.totalAmount}</p>
//         </div>
//       ))}
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import api from "../api/axiosClient";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/my").then((res) => setOrders(res.data));
  }, []);

  // styles
  const containerStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    margin: "10px 0",
    background: "#fdfdfd",
  };

  const orderTitleStyle = {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  };

  const textStyle = {
    margin: "6px 0",
  };

  return (
    <div style={containerStyle}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div key={o._id} style={cardStyle}>
            <h3 style={orderTitleStyle}>{o.orderNumber}</h3>
            <p style={textStyle}>Total: ₹{o.totalAmount}</p>
            <p style={textStyle}>Placed On: {new Date(o.createdAt).toLocaleString()}</p>

            <h4>Items:</h4>
            {o.items.map((item, idx) => (
              <p key={idx} style={textStyle}>
                {item.name} × {item.quantity} — ₹{item.price * item.quantity}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
