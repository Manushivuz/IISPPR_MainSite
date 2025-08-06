import express from "express";
import multer from "multer";
import * as adController from "../controllers/adController.js";
import * as pageAdController from "../controllers/pageAdController.js";
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

// Route for unassigning ads from page positions
router.delete("/unassign", isAdmin, pageAdController.deletePageAdAssignments);

export default router;