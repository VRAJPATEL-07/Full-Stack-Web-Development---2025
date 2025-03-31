const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const { getOrders, createOrder, updateOrder, deleteOrder } = require("../controllers/orderController");

const router = express.Router();

router.get("/", authMiddleware, getOrders);
router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);

module.exports = router;
