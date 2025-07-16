const db = require("../utils/db");

exports.getAllProducts = () => {
  return db.query("SELECT * FROM products");
};

exports.getProductById = (id) => {
  return db.query("SELECT * FROM products WHERE id = $1", [id]);
};

exports.addProduct = ({ id, title, price, description, category, image }) => {
  return db.query(
    `INSERT INTO products (id, title, price, description, category, image)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (id) DO NOTHING`,
    [id, title, price, description, category, image]
  );
};
