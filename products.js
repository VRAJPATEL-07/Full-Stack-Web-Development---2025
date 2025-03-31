const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataFilePath = path.join(__dirname, "../data/products.json");

// Read product data from file
const getProducts = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// 🟢 GET /products → Fetch all products
router.get("/", (req, res) => {
  let products = getProducts();

  // Query parameter filtering (e.g., /products?category=electronics)
  if (req.query.category) {
    products = products.filter(p => p.category === req.query.category);
  }

  res.json(products);
});

// 🟢 GET /products/:id → Fetch product by ID
router.get("/:id", (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

module.exports = router;
