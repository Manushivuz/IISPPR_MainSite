import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Testimonial", testimonialSchema);
