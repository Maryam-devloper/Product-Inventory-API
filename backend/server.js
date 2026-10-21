const productRoutes = require("./routes/productRoutes");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const app = express();

// Security and request middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Limit repeated requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests. Please try again later."
  })
);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Inventory API is running!"
  });
});

// Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// Make uploaded images accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Centralized error handling (must come after routes)
app.use(errorHandler);

startServer();
