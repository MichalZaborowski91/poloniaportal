import { User } from "../models/User.js";

export const updateMyProfile = async (req, res) => {
  try {
    const { displayName, firstName, lastName, accountType, companyName } =
      req.body;

    if (!displayName) {
      return res.status(400).json({ message: "Display name is required" });
    }
    if (!accountType) {
      return res.status(400).json({ message: "Account type is required" });
    }
    if (accountType === "business" && !companyName) {
      return res.status(400).json({
        message: "Company name is required for business account",
      });
    }

    //REGEX NICKNAME
    const displayNameRegex = /^[a-zA-Z0-9]{3,}$/;

    if (!displayNameRegex.test(displayName)) {
      return res.status(400).json({
        message:
          "Display name must be at least 3 characters and contain only letters and numbers",
      });
    }

    const normalizedDisplayName = displayName.trim().toLowerCase();

    //Is displayName unique
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
        profile: {
          displayName,
          displayNameNormalized: normalizedDisplayName,
          firstName,
          lastName,
          accountType,
          companyName: accountType === "business" ? companyName : "",
        },
        profileCompleted: true,
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

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Display name is already taken",
      });
    }

    res.status(500).json({ message: "Profile update failed" });
  }
};
