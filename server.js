const express = require("express");
const productRoutes = require("./routes/products");

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use product routes
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
