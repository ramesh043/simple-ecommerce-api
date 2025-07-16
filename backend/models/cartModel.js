const db = require("../utils/db"); // ✅ Import the PostgreSQL client

exports.getCartByUser = (user_id) => {
  return db.query("SELECT * FROM cart WHERE user_id = $1", [user_id]);
};

exports.addToCart = (user_id, product_id, quantity) => {
  return db.query(
    `INSERT INTO cart (user_id, product_id, quantity)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, product_id)
     DO UPDATE SET quantity = cart.quantity + $3`,
    [user_id, product_id, quantity]
  );
};

exports.removeFromCart = (user_id, product_id) => {
  return db.query("DELETE FROM cart WHERE user_id = $1 AND product_id = $2", [
    user_id,
    product_id,
  ]);
};

exports.clearCart = (user_id) => {
  return db.query("DELETE FROM cart WHERE user_id = $1", [user_id]);
};
