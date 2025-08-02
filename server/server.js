const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Mainsite running...");
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
