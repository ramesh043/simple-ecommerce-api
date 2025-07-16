const db = require("../utils/db");

exports.placeOrder = async (req, res) => {
  const user_id = req.user.id;
  const { items } = req.body; // items = [{ product_id, quantity }]

  try {
    const order = await db.query(
      "INSERT INTO orders (user_id, created_at) VALUES ($1, NOW()) RETURNING id",
      [user_id]
    );

    const orderId = order.rows[0].id;

    for (let item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.product_id, item.quantity]
      );
    }

    res
      .status(201)
      .json({ msg: "Order placed successfully", order_id: orderId });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getOrdersByUser = async (req, res) => {
  const user_id = req.user.id;

  try {
    const orders = await db.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.json(orders.rows);
  } catch (error) {
    console.error("Fetch Orders Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
