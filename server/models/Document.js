import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["article", "report"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author_names: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);
export default Document;
