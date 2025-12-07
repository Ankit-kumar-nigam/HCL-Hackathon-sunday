

A full-stack MERN application where customers can order food items and admins can manage menu items, inventory, and stock. The system includes role-based authentication, category filtering, cart functionality, order placement, stock deduction, and email notifications.

🚀 Tech Stack
Frontend

    1)React (Vite)
    2)React Router DOM
    3)Axios
    4)Context API (Authentication)
    5)Inline/Minimal CSS

Backend
    1)Node.js
    2)Express.js
    3)MongoDB + Mongoose
    4)JWT Authentication
    5)BcryptJS
    6)Nodemailer

⭐ Features Overview
👤 User (Customer)
    1)Register & Login using JWT authentication
    2)Browse menu items
    3)Filter items by category (Pizza, Drink, Bread)
    4)See description, price, and image of items
    5)Add items to cart
    6)View and modify cart items
    7)Place orders
    8)View order history (My Orders)

🛠 Admin
    1)Login as admin
    2)View Admin Dashboard
    3)Add new items with:
    4)Name
    5)Description
    6)Price
    7)Category
    8)Image URL
    9)Stock

View available inventory with real-time stock

Remove items from menu + inventory

Stock auto-decreases after customer places order

📬 Email Notification
    Customer receives order confirmation email after order placement

Project Structure
/backend
  /routes
  /models
  /middleware
  /utils
  server.js

/frontend
  /src
    /pages
    /components
    /context
    /api
    App.jsx

Backend Setup
Step 1 — Install dependencies
cd backend
npm install

Step 2 — Create .env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

Step 3 — Run backend
npm run dev


Server will run on:

http://localhost:5001


Frontend Setup
Step 1 — Install dependencies
cd frontend
npm install

Step 2 — Create .env
VITE_API_URL=http://localhost:5000/api

Step 3 — Start frontend
npm run dev


App will run on:

http://localhost:5173


🔗 API Endpoints Summary
Authentication

POST /api/auth/register – Register (admin or customer)

POST /api/auth/login – Login and receive JWT

Menu

GET /api/menu – Get all available items

POST /api/menu – Add item (admin only)

DELETE /api/menu/:id – Delete item (admin only)

Inventory

GET /api/inventory – View all items with stock (admin only)

Cart

GET /api/cart – Fetch user cart

POST /api/cart/add – Add item to cart

PATCH /api/cart/item/:id – Update quantity

DELETE /api/cart/clear – Clear cart

Orders

POST /api/orders – Place order

GET /api/orders/my – View order history



Key Features Implemented
🔐 JWT Authentication

Token stored in localStorage

Automatically added to requests using Axios interceptor

📦 Menu Management

Admin can add items

Each item has:

name, description, price, category, imageUrl, stock

🛒 Cart System

Add to cart

Update quantity

Auto-calculate total amount

🛍 Order Placement

Creates order

Deducts stock from inventory

Clears cart

📨 Email Notification

Sends order confirmation mail using Nodemailer

🔍 Category Filter

Customer can switch between:

Pizza

Drink

Bread

Only items of that category are shown.

❌ Remove Item

Admin can delete:

Menu item

Inventory stock for that item




Progress Completed

Backend API ✔

MongoDB Schema ✔

JWT auth & middleware ✔

Email service ✔

Add item ✔

Remove item ✔

Category filtering ✔

Cart and orders ✔

Admin dashboard ✔

Frontend integration ✔



Final Notes

This project successfully integrates complete MERN functionality with authentication, cart, order system, inventory management, and admin controls.

You can now deploy backend and frontend easily.