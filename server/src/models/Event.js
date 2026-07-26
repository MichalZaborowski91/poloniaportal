import mongoose from "mongoose";

const { Schema } = mongoose;

export const EVENT_CATEGORIES = [
  "community",
  "business",
  "culture",
  "sport",
  "education",
  "kids",
  "charity",
  "music",
  "food",
  "other",
];

export const EVENT_STATUS = ["published", "cancelled", "finished", "deleted"];

const EventSchema = new Schema(
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
      maxlength: 5000,
    },

    category: {
      type: String,
      required: true,
      enum: EVENT_CATEGORIES,
      index: true,
    },

    coverImage: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
    },

    city: {
      type: String,
      trim: true,
      maxlength: 100,
      index: true,
    },

    venue: {
      type: String,
      trim: true,
      maxlength: 150,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 250,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    onlineLink: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    startDate: {
      type: Date,
      required: true,
      index: true,
    },

    endDate: {
      type: Date,
      required: true,
      index: true,
    },

    timeZone: {
      type: String,
      default: null,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    priceLabel: {
      type: String,
      trim: true,
      default: "",
    },

    capacity: {
      type: Number,
      default: 0,
      min: 0,
    },

    unlimitedCapacity: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: EVENT_STATUS,
      default: "published",
      index: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    favoritesCount: {
      type: Number,
      default: 0,
    },

    attendeesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

EventSchema.index({
  country: 1,
  status: 1,
  startDate: 1,
});

EventSchema.index({
  country: 1,
  city: 1,
  startDate: 1,
});

EventSchema.index({
  category: 1,
  startDate: 1,
});

EventSchema.pre("validate", function () {
  if (this.endDate <= this.startDate) {
    throw new Error("End date must be after start date");
  }

  if (this.isOnline) {
    this.city = null;
    this.venue = null;
    this.address = null;
  } else {
    this.onlineLink = null;
  }
});

export default mongoose.model("Event", EventSchema);
