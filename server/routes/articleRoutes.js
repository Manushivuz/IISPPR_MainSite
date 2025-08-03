import express from "express";
import upload from "../middlewares/multer.js";
import { createArticle,getAllArticles, getArticleById,deleteArticle } from "../controllers/articleController.js";

const router = express.Router();

// POST /api/articles
router.post("/", upload.single("pdf"), createArticle);

router.get("/", getAllArticles);

router.get("/:id", getArticleById);

router.delete("/:id", deleteArticle);

export default router;
