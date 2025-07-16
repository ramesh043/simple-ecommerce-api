const db = require("../utils/db");

exports.placeOrder = async (user_id, items) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    const orderRes = await client.query(
      "INSERT INTO orders (user_id) VALUES ($1) RETURNING *",
      [user_id]
    );
    const order_id = orderRes.rows[0].id;

    for (let item of items) {
      await client.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
        [order_id, item.product_id, item.quantity]
      );
    }

    await client.query("DELETE FROM cart WHERE user_id = $1", [user_id]);

    await client.query("COMMIT");
    return { order_id };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

exports.getOrdersByUser = (user_id) => {
  return db.query("SELECT * FROM orders WHERE user_id = $1", [user_id]);
};
