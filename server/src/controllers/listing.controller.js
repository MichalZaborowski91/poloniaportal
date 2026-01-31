import Listing from "../models/Listing.js";

export const createListing = async (req, res, next) => {
  try {
    const { country } = req.params;

    const { type, title, description, data, durationDays } = req.body;

    const listing = await Listing.create({
      user: req.user._id,
      country,
      type,
      title,
      description,
      data,
      durationDays,
    });

    res.status(201).json({
      listing,
    });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res) => {
  try {
    const { country } = req.params;
    const { type, city } = req.query;

    const now = new Date();

    const filter = {
      country,
      status: "active",
      expiresAt: { $gt: now },
    };

    if (type) {
      filter.type = type;
    }

    if (city) {
      filter["data.city"] = new RegExp(`^${city}$`, "i");
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });

    res.json({ listings });
  } catch (err) {
    console.error("GET LISTINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};
