import express from "express";
import upload from "../middlewares/multer.js";
import { createDocument,getAllDocuments,getDocumentById,deleteDocument } from "../controllers/documentController.js";
import cleanupTempUploads from "../middlewares/cleanupTemp.js";

const router = express.Router();

// POST /api/articles
router.post("/",cleanupTempUploads, upload.single("pdf"), createDocument);

router.get("/", getAllDocuments);

router.get("/:id", getDocumentById);

router.delete("/", deleteDocument);

export default router;
