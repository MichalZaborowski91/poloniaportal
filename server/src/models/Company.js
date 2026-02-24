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
      maxlength: 1000,
    },

    logo: {
      type: String,
      default: "/companyLogoPlaceholder/companyLogoPlaceholder.webp",
    },

    phone: String,
    email: String,
    website: String,

    country: String,
    city: String,

    //PLAN FOR FUTURE
    plan: {
      type: String,
      enum: ["free", "plus", "business"],
      default: "free",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    featuredUntil: Date,

    showOnHomepage: Boolean,

    gallery: [String],
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
    },
    openingHours: Object,
    location: {
      lat: Number,
      lng: Number,
    },
  },

  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);
