import mongoose from "mongoose";

const { Schema } = mongoose;

export const LISTING_TYPES = [
  "housing_wanted",
  "housing_offer",
  "job_wanted",
  "job_offer",
  "market_offer",
  "market_wanted",
  "service_offer",
];

export const LISTING_STATUS = ["active", "inactive", "expired", "deleted"];

export const LISTING_DURATIONS = [7, 31];

const ListingDataSchema = new Schema(
  {
    city: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    //JOB
    position: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    contactName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    contactPhone: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    contactEmail: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    portfolioLink: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    linkedinLink: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    image: {
      type: String,
      trim: true,
    },
    //HOUSING
    images: {
      type: [String],
      default: [],
    },
    // MARKETPLACE
    category: {
      type: String,
      enum: [
        "automotive",
        "real_estate",
        "electronics",
        "home_garden",
        "fashion",
        "kids",
        "sports_hobbies",
        "agriculture",
        "animals",
        "music_education",
        "business_services",
        "health_beauty",
        "free_stuff",
        "other",
      ],
    },

    price: {
      type: Number,
      min: 0,
    },

    condition: {
      type: String,
      enum: ["new", "used"],
    },
  },
  { _id: false },
);

const ListingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
      index: true,
    },

    country: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      enum: LISTING_TYPES,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    data: {
      type: ListingDataSchema,
      default: {},
    },

    status: {
      type: String,
      enum: LISTING_STATUS,
      default: "active",
      index: true,
    },

    durationDays: {
      type: Number,
      enum: LISTING_DURATIONS,
      default: 7,
    },

    expiresAt: {
      type: Date,
      required: function () {
        return this.type !== "service_offer";
      },
    },

    renewedAt: {
      type: Date,
      default: null,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    isPermanent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ListingSchema.pre("validate", function () {
  if (this.type === "service_offer") {
    this.isPermanent = true;
    this.expiresAt = null;
    return;
  }

  if (!this.expiresAt) {
    const now = new Date();
    this.expiresAt = new Date(now.setDate(now.getDate() + this.durationDays));
  }
});

ListingSchema.index({ country: 1, type: 1, status: 1, createdAt: -1 });
ListingSchema.index({ user: 1, status: 1 });
ListingSchema.index({ status: 1, expiresAt: 1 });
ListingSchema.index({ "data.city": 1 });

export default mongoose.model("Listing", ListingSchema);
