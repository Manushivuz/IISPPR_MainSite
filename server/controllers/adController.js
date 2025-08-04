import Advertisement from "../models/Advertisement.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

const getPublicId = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary')) return null;
  const parts = imageUrl.split('/');
  const publicIdWithExtension = parts.slice(parts.indexOf('upload') + 2).join('/');
  return path.parse(publicIdWithExtension).name;
};


// CREATE an ad 
export const createAd = async (req, res) => {
  try {
    const { title, description } = req.body;
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

    const newAd = new Advertisement({ title, description, imageUrl });
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
};

// GET all ads 
export const getAllAds = async (req, res) => {
  try {
    const ads = await Advertisement.find();
    res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ad by ID 
export const getAdById = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Not found" });
    res.status(200).json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE an ad by ID 
export const updateAd = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    const { title, description } = req.body;
    let imageUrl = ad.imageUrl;

    
    if (req.file) {
      // 1. Delete the old image from Cloudinary if it exists
      if (process.env.CLOUDINARY_CLOUD_NAME && ad.imageUrl.includes('cloudinary')) {
        const publicId = getPublicId(ad.imageUrl);
        if (publicId) await cloudinary.uploader.destroy(publicId);
      }
      
      // 2. Upload the new image
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "auto" });
        imageUrl = result.secure_url;
        fs.unlinkSync(req.file.path); // clean up new temp file
      } else {
        imageUrl = req.file.path; // update with new local path
      }
    }
    
    // Update the ad's details
    ad.title = title || ad.title;
    ad.description = description || ad.description;
    ad.imageUrl = imageUrl;

    const updatedAd = await ad.save();
    res.status(200).json(updatedAd);

  } catch (err) {
    if (req.file) { // clean up temp file on error
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
};

// DELETE one or more ads by ID 
export const deleteAds = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array of IDs: { "ids": ["id1", "id2"] }

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Array of ad IDs is required." });
    }

    // Find all ads to be deleted to get their image URLs
    const adsToDelete = await Advertisement.find({ _id: { $in: ids } });
    if (adsToDelete.length === 0) {
        return res.status(404).json({ message: "No ads found with the provided IDs." });
    }

    // If using Cloudinary, collect public_ids to delete images
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const publicIds = adsToDelete
        .map(ad => getPublicId(ad.imageUrl))
        .filter(id => id !== null);
      
      if (publicIds.length > 0) {
        // Bulk delete from Cloudinary
        await cloudinary.api.delete_resources(publicIds);
      }
    }

    // Delete ads from MongoDB
    await Advertisement.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: `Successfully deleted ${adsToDelete.length} ad(s).` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};