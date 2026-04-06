import { User } from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import { Company } from "../models/Company.js";
import Listing from "../models/Listing.js";

export const updateMyProfile = async (req, res) => {
  try {
    const {
      displayName,
      firstName,
      lastName,
      city,
      bio,
      accountType,
      country,
      publicVisibility,
    } = req.body;

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
          "profile.city": city,
          "profile.bio": bio,

          country,
          accountType,

          "profile.publicVisibility.showFullName":
            publicVisibility?.showFullName ?? false,
          "profile.publicVisibility.showCity":
            publicVisibility?.showCity ?? false,
          "profile.publicVisibility.showBio":
            publicVisibility?.showBio ?? false,
          "profile.publicVisibility.showEmail":
            publicVisibility?.showEmail ?? false,

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

export const getUserPublicProfile = async (req, res) => {
  try {
    const { displayName } = req.params;

    const user = await User.findOne({
      "profile.displayNameNormalized": displayName.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = user.profile;

    // PUBLIC DATA
    const publicProfile = {
      displayName: profile.displayName,
      avatar: profile.avatar || "/avatar/avt.jpg",
      country: user.country,
      accountType: user.accountType,
      memberSince: user.createdAt,
    };

    const now = new Date();

    const listings = await Listing.find({
      user: user._id,
      status: "active",
      $or: [{ expiresAt: { $gt: now } }, { isPermanent: true }],
    })
      .select("title type data createdAt")
      .sort({ createdAt: -1 });

    if (profile.publicVisibility?.showFullName) {
      publicProfile.fullName =
        `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
    }

    if (profile.publicVisibility?.showCity) {
      publicProfile.city = profile.city;
    }

    if (profile.publicVisibility?.showBio) {
      publicProfile.bio = profile.bio;
    }

    if (profile.publicVisibility?.showEmail) {
      publicProfile.email = user.email;
    }

    const companies = await Company.find({ ownerId: user._id })
      .select("name slug logo city country")
      .sort({ createdAt: -1 });

    res.json({
      _id: user._id,
      profile: publicProfile,
      companies,
      listings,
    });
  } catch (err) {
    console.error("GET USER PUBLIC PROFILE ERROR", err);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};
