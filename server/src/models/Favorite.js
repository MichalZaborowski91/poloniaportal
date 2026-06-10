import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    targetType: {
      type: String,
      required: true,
      enum: ["listing", "company", "user", "event"],
      index: true,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

favoriteSchema.index(
  {
    user: 1,
    targetType: 1,
    targetId: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("Favorite", favoriteSchema);
