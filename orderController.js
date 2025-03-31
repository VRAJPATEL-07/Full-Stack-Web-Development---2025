const Order = require("../models/Order");

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};

exports.createOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user.id });
  res.status(201).json(order);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  Object.assign(order, req.body);
  await order.save();
  res.json(order);
};

exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};
