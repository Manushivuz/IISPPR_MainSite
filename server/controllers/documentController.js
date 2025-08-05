import Document from "../models/Document.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../config/cloudinary.js";
import { extractPublicId } from 'cloudinary-build-url';

const createDocument = async (req, res) => {
  try {
    const { title, author_names, date, type } = req.body;

    if (!title || !date || !type) {
      return res.status(400).json({ message: "Fields 'title', 'date', and 'type' are required" });
    }

    if (!["article", "report"].includes(type)) {
      return res.status(400).json({ message: "Invalid type. Must be 'article' or 'report'" });
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

    const newDocument = await Document.create({
      type,
      title,
      author_names: author_names ? author_names.split(",").map(name => name.trim()) : [],
      pdfUrl: cloudinaryResult.secure_url,
      date,
    });

    return res.status(201).json({ success: true, document: newDocument });
  } catch (error) {
    console.error("Error in createDocument:", error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type || !["article", "report"].includes(type)) {
      return res.status(400).json({ message: "Query parameter 'type' must be 'article' or 'report'" });
    }

    const documents = await Document.find({ type }).sort({ createdAt: -1 }); // latest first

    return res.status(200).json({ success: true, documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return res.status(500).json({ message: "Failed to fetch documents" });
  }
};


const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;

    if (!type || !["article", "report"].includes(type)) {
      return res.status(400).json({ message: "Query parameter 'type' must be 'article' or 'report'" });
    }

    const document = await Document.findOne({ _id: id, type });

    if (!document) {
      return res.status(404).json({ message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found` });
    }

    return res.status(200).json({ success: true, document });
  } catch (error) {
    console.error("Error fetching document by ID:", error);
    return res.status(500).json({ message: "Failed to fetch document" });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { ids } = req.body; // expecting: { ids: ["id1", "id2", ...] }
    const { type } = req.query;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "'ids' must be a non-empty array" });
    }

    if (!type || !["article", "report"].includes(type)) {
      return res.status(400).json({ message: "Query parameter 'type' must be 'article' or 'report'" });
    }

    const deleted = [];
    const failed = [];

    for (const id of ids) {
      try {
        const document = await Document.findOne({ _id: id, type });

        if (!document) {
          failed.push({ id, reason: "Not found" });
          continue;
        }

        const publicId = `${extractPublicId(document.pdfUrl)}.pdf`; // keep .pdf for raw files

        const cloudinaryResult = await deleteFromCloudinary(publicId);
        if (cloudinaryResult?.result !== "ok") {
          failed.push({ id, reason: "Cloudinary deletion failed", cloudinaryResult });
          continue;
        }

        await Document.findByIdAndDelete(id);
        deleted.push(id);
      } catch (err) {
        failed.push({ id, reason: "Unexpected error", error: err.message });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Deletion process completed",
      deleted,
      failed,
    });
  } catch (error) {
    console.error("Error in batch delete:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};



export { createDocument,getAllDocuments,getDocumentById,deleteDocument };