require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

module.exports = pool;
//369eeb94a54a0d3c65d3e98b1c533bd459dd34cfb2356881aa50fb11b8ace7bdfd5409a6c2f728b2bc4f8983381abaeacbab6f4d83e6185293aa17b4b3265e1a
