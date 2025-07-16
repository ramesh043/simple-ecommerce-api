const axios = require("axios");

exports.getAllProducts = async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch products" });
  }
};
