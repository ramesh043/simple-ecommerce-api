const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, orderController.placeOrder);
router.get("/", authMiddleware, orderController.getOrdersByUser);

module.exports = router;
