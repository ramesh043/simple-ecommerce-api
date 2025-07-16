const db = require("../utils/db");

exports.findByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = $1", [email]);
};

exports.create = ({ username, email, password, role }) => {
  return db.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
    [username, email, password, role]
  );
};
