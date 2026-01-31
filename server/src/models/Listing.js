import mongoose from "mongoose";

const { Schema } = mongoose;

export const LISTING_TYPES = [
  "housing_wanted",
  "housing_offer",
  "job_wanted",
  "job_offer",
  "business_ad",
  "event",
];

export const LISTING_STATUS = ["active", "expired", "deleted"];

export const LISTING_DURATIONS = [7, 31];

const ListingDataSchema = new Schema(
  {
    city: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    //JOB
    position: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    salaryFrom: {
      type: Number,
      min: 0,
    },

    salaryTo: {
      type: Number,
      min: 0,
    },

    contractType: {
      type: String,
      trim: true,
    },

    //HOUSING
    rent: {
      type: Number,
      min: 0,
    },

    budgetMax: {
      type: Number,
      min: 0,
    },

    rooms: {
      type: Number,
      min: 0,
    },

    furnished: {
      type: Boolean,
    },

    availableFrom: {
      type: Date,
    },

    //BUSINESS
    companyName: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 80,
    },

    website: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    //EVENT
    eventDate: {
      type: Date,
    },

    venue: {
      type: String,
      trim: true,
      maxlength: 120,
    },

    price: {
      type: Number,
      min: 0,
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

    country: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 2,
      maxlength: 2,
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
      minlength: 5,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 5000,
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
      required: true,
    },

    renewedAt: {
      type: Date,
      default: null,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ListingSchema.pre("validate", function () {
  if (!this.expiresAt) {
    const now = new Date();
    this.expiresAt = new Date(now.setDate(now.getDate() + this.durationDays));
  }
});

ListingSchema.index({ country: 1, type: 1 });
ListingSchema.index({ expiresAt: 1 });
ListingSchema.index({ "data.city": 1 });

export default mongoose.model("Listing", ListingSchema);
