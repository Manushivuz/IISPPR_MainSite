import express from "express";
import multer from "multer";
import * as adController from "../controllers/adController.js";
import isAdmin from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Public routes
router.get("/", adController.getAllAds);
router.get("/:id", adController.getAdById);

// Admin routes
router.post("/", isAdmin, upload.single("image"), adController.createAd);

//  route to edit/update an ad by ID
router.put("/:id", isAdmin, upload.single("image"), adController.updateAd);

// Modified route to delete one or more ads (expects IDs in the request body)
router.delete("/", isAdmin, adController.deleteAds);

export default router;