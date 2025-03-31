const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const logger = require("./middleware/loggerMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use("/orders", orderRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
