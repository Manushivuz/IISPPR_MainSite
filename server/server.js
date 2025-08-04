import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import documentRoutes from "./routes/documentRoutes.js";
import adRoutes from "./routes/adRoutes.js";

// Load env vars


connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/documents", documentRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Mainsite running...");
});

// API routes
app.use("/api/ads", adRoutes);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
