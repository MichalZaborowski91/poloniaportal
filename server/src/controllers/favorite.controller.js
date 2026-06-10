import Favorite from "../models/Favorite.js";
import Listing from "../models/Listing.js";

export const toggleFavoriteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    //OWNER CAN'T ADD HIS OWN AD
    if (listing.user.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot favorite your own listing",
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      targetType: "listing",
      targetId: listing._id,
    });

    //DELETE FROM FAV
    if (existingFavorite) {
      await Favorite.deleteOne({
        _id: existingFavorite._id,
      });

      listing.favoritesCount = Math.max(0, (listing.favoritesCount || 0) - 1);

      await listing.save();

      return res.json({
        success: true,
        isFavorite: false,
        favoritesCount: listing.favoritesCount,
      });
    }

    //ADD TO FAV
    await Favorite.create({
      user: req.user._id,
      targetType: "listing",
      targetId: listing._id,
    });

    listing.favoritesCount += 1;

    await listing.save();

    return res.json({
      success: true,
      isFavorite: true,
      favoritesCount: listing.favoritesCount,
    });
  } catch (err) {
    console.error("TOGGLE FAVORITE ERROR:", err);

    res.status(500).json({
      message: "Failed to update favorite",
    });
  }
};

export const getFavoriteListings = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
      targetType: "listing",
    });

    const listingIds = favorites.map((f) => f.targetId);

    const listings = await Listing.find({
      _id: { $in: listingIds },
      status: "active",
    }).populate("company", "name logo slug");

    res.json({
      listings,
    });
  } catch (err) {
    console.error("GET FAVORITES ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch favorites",
    });
  }
};

export const getFavoriteStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findOne({
      user: req.user._id,
      targetType: "listing",
      targetId: id,
    });

    res.json({
      isFavorite: !!favorite,
    });
  } catch (err) {
    console.error("GET FAVORITE STATUS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch favorite status",
    });
  }
};
