import Article from "../models/Article.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../config/cloudinary.js";
import fs from "fs";

const createArticle = async (req, res) => {
  try {
    const { title, author_names, date } = req.body;

    if (!title || !author_names || !date) {
      return res.status(400).json({ message: "All fields (title, author_names, date) are required" });
    }

    if (!req.file) {
      console.log("PDF not found in request");
      return res.status(400).json({ message: "PDF file is required" });
    }

    const localFilePath = req.file.path;

    const cloudinaryResult = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResult) {
      console.log("Cloudinary upload failed");
      return res.status(500).json({ message: "PDF upload failed" });
    }

    const newArticle = await Article.create({
      title,
      author_names: author_names.split(",").map(name => name.trim()),
      pdfUrl: cloudinaryResult.secure_url,
      date,
    });

    return res.status(201).json({ success: true, article: newArticle });
  } catch (error) {
    console.error("Error in createArticle:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};


const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 }); // latest first
    return res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).json({ message: "Failed to fetch articles" });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    return res.status(200).json({ success: true, article });
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return res.status(500).json({ message: "Failed to fetch article" });
  }
};



const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Extract Cloudinary public_id from the URL
    const pdfUrl = article.pdfUrl;
    const parts = pdfUrl.split("/");
    const fileWithExt = parts[parts.length - 1];
    const publicId = fileWithExt.split(".")[0]; // Remove extension

    // Delete from Cloudinary
    const cloudinaryResult = await deleteFromCloudinary(publicId);
    if (cloudinaryResult.result !== "ok") {
      console.warn("Cloudinary delete warning:", cloudinaryResult);
    }

    // Delete from MongoDB
    await Article.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};


export { createArticle,getAllArticles,getArticleById,deleteArticle };