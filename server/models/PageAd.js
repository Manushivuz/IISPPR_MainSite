import mongoose from "mongoose";

const pageAdSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      unique: true, // each page should be listed only once
      trim: true,
      lowercase: true
    },
    position: {
      type: String,
      enum: ["top", "bottom"],
      required: true,
    },
    adIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Advertisement",
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("PageAd", pageAdSchema);
