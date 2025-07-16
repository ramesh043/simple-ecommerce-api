require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const app = express();
const PORT = 3000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoute);
app.use("/cart", cartRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("hello Ramesh");
});

// app.get("/test-db", async (req, res) => {
//   try {
//     const result = await db.query("SELECT NOW()");
//     res.json({ db_time: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Start server
app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
