import Testimonial from "../models/Testimonial.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

const getPublicId = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary')) return null;
  const parts = imageUrl.split('/');
  const publicIdWithExtension = parts.slice(parts.indexOf('upload') + 2).join('/');
  return path.parse(publicIdWithExtension).name;
};


// CREATE a testimonial 
export const createTestimonial = async (req, res) => {
  try {
    const { text, author } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image required" });
    }

    let imageUrl;

    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const result = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });
      imageUrl = result.secure_url;
      fs.unlinkSync(file.path);
    } else {
      console.warn("Cloudinary not configured. Saving local path.");
      imageUrl = file.path;
    }

    const newTestimonial = new Testimonial({ text, author, imageUrl });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
};

// GET all testimonials 
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE one or more testimonials by ID 
export const deleteTestimonials = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of IDs: { "ids": ["id1", "id2"] }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Array of ad IDs is required." });
    }

    // Find all ads to be deleted to get their image URLs
    const testimonialsToDelete = await Testimonial.find({ _id: { $in: ids } });
    if (testimonialsToDelete.length === 0) {
      return res.status(404).json({ message: "No ads found with the provided IDs." });
    }

    // If using Cloudinary, collect public_ids to delete images
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const publicIds = testimonialsToDelete
        .map(testimonial => getPublicId(testimonial.imageUrl))
        .filter(id => id !== null);

      if (publicIds.length > 0) {
        // Bulk delete from Cloudinary
        await cloudinary.api.delete_resources(publicIds);
      }
    }

    // Delete ads from MongoDB
    await Testimonial.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: `Successfully deleted ${testimonialsToDelete.length} testimonials(s).` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, author } = req.body;
    const file = req.file;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    // Update fields
    if (text !== undefined) testimonial.text = text;
    if (author !== undefined) testimonial.author = author;

    // Handle image update
    if (file) {
      // Delete old image from Cloudinary if configured
      if (process.env.CLOUDINARY_CLOUD_NAME && testimonial.imageUrl) {
        const publicId = getPublicId(testimonial.imageUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      // Upload new image
      let imageUrl;
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: "auto" });
        imageUrl = result.secure_url;
        fs.unlinkSync(file.path);
      } else {
        imageUrl = file.path;
      }
      testimonial.imageUrl = imageUrl;
    }

    await testimonial.save();
    res.status(200).json(testimonial);
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
};
