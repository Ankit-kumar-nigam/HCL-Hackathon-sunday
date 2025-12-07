// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import api from "../api/axiosClient";

// export default function AddItem() {
//   const { user } = useContext(AuthContext);

//   if (user?.role !== "admin") {
//     return <h3>Access Denied – Admin Only</h3>;
//   }

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     imageUrl: "",
//     stock: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       name: form.name,
//       description: form.description,
//       price: Number(form.price),
//       category: form.category,
//       imageUrl: form.imageUrl,
//       stock: Number(form.stock)
//     };

//     try {
//       const res = await api.post("/menu", payload);
//       alert("Item added successfully!");
//       console.log(res.data);
//     } catch (err) {
//       alert(err.response?.data?.message || "Error adding item");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Add New Menu Item</h2>

//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
//       >
//         <input type="text" placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <input type="text" placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <input type="number" placeholder="Price"
//           value={form.price}
//           onChange={(e) => setForm({ ...form, price: e.target.value })}
//         />

//         <input type="text" placeholder="Category"
//           value={form.category}
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//         />

//         <input type="text" placeholder="Image URL"
//           value={form.imageUrl}
//           onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
//         />

//         <input type="number" placeholder="Stock Quantity"
//           value={form.stock}
//           onChange={(e) => setForm({ ...form, stock: e.target.value })}
//         />

//         <button type="submit">Add Item</button>
//       </form>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosClient";

export default function AddItem() {
  const { user } = useContext(AuthContext);

  if (user?.role !== "admin") {
    return <h3>Access Denied – Admin Only</h3>;
  }

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      imageUrl: form.imageUrl,
      stock: Number(form.stock)
    };

    try {
      const res = await api.post("/menu", payload);
      alert("Item added successfully!");
      console.log(res.data);

      // ✅ CLEAR FIELDS AFTER SUCCESS
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        stock: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error adding item");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Menu Item</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
      >
        <input type="text" placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input type="text" placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input type="number" placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input type="text" placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <input type="text" placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <input type="number" placeholder="Stock Quantity"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

