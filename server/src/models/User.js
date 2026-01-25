import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
    profile: {
      displayName: { type: String },
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
  },
  { timestamps: true },
);

userSchema.index(
  { "profile.displayNameNormalized": 1 },
  { unique: true, sparse: true },
);

//Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//Compare password (login)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
