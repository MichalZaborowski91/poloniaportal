import Listing from "../models/Listing.js";

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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
  console.log("PARAMS:", req.params);
  console.log("QUERY:", req.query);
  try {
    const { country } = req.params;
    const { type, q } = req.query;

    const now = new Date();

    const filter = {
      country,
      status: "active",
      expiresAt: { $gt: now },
    };

    //FILTER BY TYPE
    if (type) {
      filter.type = type;
    }

    //TEXT INPUT
    if (q) {
      const safe = escapeRegex(q.trim());

      //CONTAINS + STARTSWITH
      const regex = new RegExp(`.*${safe}.*`, "i");

      filter.$or = [
        { title: regex },
        { "data.position": regex },
        { "data.city": regex },
      ];
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });

    res.json({ listings });
  } catch (err) {
    console.error("GET LISTINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};
