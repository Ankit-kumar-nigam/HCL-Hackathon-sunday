// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import Menu from "./pages/Menu";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import Orders from "./pages/Orders";
// import AdminDashboard from "./pages/AdminDashboard";
// import AddItem from "./pages/AddItem";

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Menu />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/cart" element={<Cart />} />
//         <Route path="/orders" element={<Orders />} />

//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/add-item" element={<AddItem />} />
//       </Routes>
//     </>
//   );
// }

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AddItem from "./pages/AddItem";

export default function App() {
  // basic layout styles
  const layoutStyle = {
    maxWidth: "900px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  };

  return (
    <>
      {/* Navbar always shown */}
      <Navbar />

      {/* Page container */}
      <div style={layoutStyle}>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-item" element={<AddItem />} />
        </Routes>
      </div>
    </>
  );
}

