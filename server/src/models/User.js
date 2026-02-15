import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifyToken: {
      type: String,
    },

    emailVerifyExpires: {
      type: Date,
    },
    verifyOrigin: {
      type: String,
    },
    profile: {
      displayName: { type: String, minlength: 3, maxlength: 20 },
      displayNameNormalized: { type: String },
      firstName: { type: String },
      lastName: { type: String },
      avatar: {
        type: String,
        default: null,
      },
      accountType: {
        type: String,
        enum: ["individual", "business"],
      },
      companyName: { type: String },
    },
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    firstLoginAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletionScheduledFor: {
      type: Date,
      default: null,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    captchaRequired: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

//CRITICAL INDEXES
userSchema.index({ email: 1 }, { unique: true });

userSchema.index({ isDeleted: 1, deletionScheduledFor: 1 });

userSchema.index(
  { "profile.displayNameNormalized": 1 },
  { unique: true, sparse: true },
);

//HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//COMPARE PASSWORD (LOGIN)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
