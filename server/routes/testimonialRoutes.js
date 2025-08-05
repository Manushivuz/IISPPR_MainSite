import express from "express";
import multer from "multer";
import * as testimonialController from "../controllers/testimonialController.js";
import isAdmin from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Public routes
router.get("/", testimonialController.getAllTestimonials);

// Admin routes
router.post("/", isAdmin, upload.single("image"), testimonialController.createTestimonial);

// Modified route to delete one or more testimonials (expects IDs in the request body)
router.delete("/", isAdmin, testimonialController.deleteTestimonials);

export default router;
