const express = require("express");
const ProductRoute = require("./routes/productRoute")
const dotenv = require("dotenv");
const connectdb = require("./config/db");
const cors = require("cors");

dotenv.config();
connectdb();
const Product = require("./model/Product");

// Seed data if empty
const seedProducts = async () => {
  await Product.deleteMany({}); // Clear existing for dev
  const products = [
    { name: "Cotton Socks - 6 Pairs", description: "Comfortable cotton socks for daily wear", price: 10.9, image: "http://localhost:5000/images/cottonsocks.jpg", stock: 100, category: "Womens Dress" },
    { name: "Plain Cotton T-Shirt", description: "Basic comfortable t-shirt", price: 7.99, image: "http://localhost:5000/images/plaincottontshirt.jpg", stock: 50, category: "Womens Dress" },
    { name: "Denim Jeans", description: "Stylish denim jeans", price: 24.99, image: "http://localhost:5000/images/jeans.jpg", stock: 30, category: "Womens Dress" },
    { name: "Hoodie - Mustard Yellow", description: "Warm and cozy hoodie", price: 29.99, image: "http://localhost:5000/images/hoodie.jpg", stock: 20, category: "Mens Dress" },
    { name: "Running Shorts", description: "Athletic shorts for sports", price: 14.5, image: "http://localhost:5000/images/shorts.jpg", stock: 40, category: "Mens Dress" },
    { name: "Sneakers", description: "Comfortable running shoes", price: 59.99, image: "http://localhost:5000/images/sneakers.jpg", stock: 25, category: "Womens Dress" },
    { name: "Baseball Cap", description: "Adjustable baseball cap", price: 12.99, image: "http://localhost:5000/images/baseballcap.jpg", stock: 60, category: "Mens Dress" },
    { name: "Backpack", description: "Durable travel backpack", price: 34.99, image: "http://localhost:5000/images/backpack.jpg", stock: 15, category: "Womens Dress" },
    { name: "Sunglasses", description: "UV protection sunglasses", price: 19.99, image: "http://localhost:5000/images/sunglass.jpg", stock: 35, category: "Mens Dress" },
    { name: "Wristwatch", description: "Stylish wristwatch", price: 49.99, image: "http://localhost:5000/images/watch.jpg", stock: 10, category: "Womens Dress" }
  ];
  await Product.insertMany(products);
  console.log("Seeded products");
};
seedProducts();
const app = express();
const cors = require("cors");
app.use(cors({
  origin: true, // Your Vite dev server port
  credentials: true
}));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('../shopping/public/images'));

app.use("/api", ProductRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
