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

    openingHours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String,
    },

    features: [String],

    whatsapp: String,

    phone: String,
    email: String,
    website: String,

    country: String,
    city: String,

    isFeatured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    viewsTotal: {
      type: Number,
      default: 0,
    },

    featuredUntil: Date,

    showOnHomepage: Boolean,

    gallery: [String],
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
      youtube: String,
      tiktok: String,
      google: String,
      x: String,
    },

    location: {
      lat: Number,
      lng: Number,
    },
  },

  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);
