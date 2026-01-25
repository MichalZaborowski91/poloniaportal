import { User } from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const updateMyProfile = async (req, res) => {
  try {
    const { displayName, firstName, lastName, accountType, companyName } =
      req.body;

    if (!displayName) {
      return res.status(400).json({ message: "Display name is required" });
    }

    const displayNameRegex = /^[a-zA-Z0-9]{3,}$/;
    if (!displayNameRegex.test(displayName)) {
      return res.status(400).json({
        message:
          "Display name must be at least 3 characters and contain only letters and numbers",
      });
    }

    const normalizedDisplayName = displayName.trim().toLowerCase();

    const existingUser = await User.findOne({
      "profile.displayNameNormalized": normalizedDisplayName,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Display name is already taken",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          "profile.displayName": displayName,
          "profile.displayNameNormalized": normalizedDisplayName,
          "profile.firstName": firstName,
          "profile.lastName": lastName,
          "profile.accountType": accountType,
          "profile.companyName": accountType === "business" ? companyName : "",
          profileCompleted: true,
        },
      },
      { new: true },
    );

    res.json({
      id: user._id,
      email: user.email,
      profile: user.profile,
      profileCompleted: user.profileCompleted,
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR", error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

//CLOUDINARY
//UPLOAD AVATAR
export const uploadMyAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user.id;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "poloniaportal/avatars",
        public_id: userId,
        overwrite: true,
        transformation: [
          { width: 256, height: 256, crop: "fill", gravity: "face" },
        ],
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const user = await User.findByIdAndUpdate(
          userId,
          { "profile.avatar": result.secure_url },
          { new: true },
        );

        res.json({ user });
      },
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//DELETE AVATAR
export const deleteMyAvatar = async (req, res) => {
  try {
    const userId = req.user.id;
    await cloudinary.uploader.destroy(`poloniaportal/avatars/${userId}`);

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { "profile.avatar": null } },
      { new: true },
    );
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete avatar" });
  }
};
