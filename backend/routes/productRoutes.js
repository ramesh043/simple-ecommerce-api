const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const addProduct = async (req, res) => {
  const { title, price, description, category, image } = req.body;

  try {
    res.status(201).json({
      msg: "Product added successfully (dummy response)",
      product: { title, price, description, category, image },
    });
  } catch (error) {
    res.status(500).json({ msg: "Error adding product" });
  }
};

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/", authMiddleware, roleMiddleware("admin"), addProduct);

module.exports = router;
