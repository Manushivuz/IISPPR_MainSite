import mongoose from "mongoose";

const pageAdSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
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

pageAdSchema.index({ page: 1, position: 1 }, { unique: true });


export default mongoose.model("PageAd", pageAdSchema);
