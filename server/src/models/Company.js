import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: null,
    },

    phone: String,
    email: String,
    website: String,

    country: String,
    city: String,

    //PLAN FOR FUTURE
    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    featuredUntil: Date,
  },
  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);
