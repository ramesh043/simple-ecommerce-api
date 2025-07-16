const db = require("../utils/db");

exports.getCartItems = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await db.query(
      `SELECT c.product_id, p.title, p.image, p.price, c.quantity
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get Cart Error:", err.message);
    res.status(500).json({ msg: "Failed to fetch cart items" });
  }
};

exports.removeFromCart = async (req, res) => {
  const user_id = req.user.id;
  const { product_id } = req.body;
  if (!product_id)
    return res.status(400).json({ msg: "Product ID is required" });

  try {
    await db.query("DELETE FROM cart WHERE user_id = $1 AND product_id = $2", [
      user_id,
      product_id,
    ]);
    res.json({ msg: "Item removed from cart" });
  } catch (err) {
    console.error("Remove Cart Item Error:", err.message);
    res.status(500).json({ msg: "Failed to remove item from cart" });
  }
};

exports.addToCart = async (req, res) => {
  const db = require("../utils/db");
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    const exists = await db.query(
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (exists.rows.length > 0) {
      await db.query(
        "UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3",
        [quantity, user_id, product_id]
      );
    } else {
      await db.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)",
        [user_id, product_id, quantity]
      );
    }

    res.json({ msg: "Item added to cart" });
  } catch (err) {
    console.error("Cart Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
