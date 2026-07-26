import Event from "../models/Event.js";

import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary.js";
import { deleteImageFromCloudinary } from "../../utils/deleteImageFromCloudinary.js";
import { buildEventPayload } from "../services/buildEventPayload.js";

export const createEvent = async (req, res) => {
  try {
    const payload = await buildEventPayload(req.body, req.user);

    let coverImage = null;

    if (req.file) {
      coverImage = await uploadImageToCloudinary(
        req.file.buffer,
        "poloniaportal/events",
      );
    }

    const event = await Event.create({
      ...payload,
      user: req.user._id,
      coverImage,
    });

    return res.status(201).json({
      success: true,
      event,
    });
  } catch (err) {
    console.error("CREATE EVENT ERROR:", err);

    res.status(500).json({
      message: "Failed to create event",
    });
  }
};

//GET MY EVENTS
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({
      user: req.user._id,
    })
      .populate("company", "name logo slug")
      .populate(
        "user",
        "profile.displayName profile.displayNameNormalized profile.avatar",
      )
      .sort({ createdAt: -1 });

    res.json({
      events,
    });
  } catch (err) {
    console.error("GET MY EVENTS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};

// GET PUBLIC EVENTS
export const getEvents = async (req, res) => {
  try {
    const { country } = req.params;

    const events = await Event.find({
      country,
      status: "published",
    })
      .populate("company", "name slug logo")
      .populate(
        "user",
        "profile.displayName profile.displayNameNormalized profile.avatar",
      )
      .sort({ startDate: 1 });

    res.json({
      events,
    });
  } catch (err) {
    console.error("GET EVENTS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch events",
    });
  }
};

// GET PUBLIC EVENT
export const getEvent = async (req, res) => {
  try {
    const { country, id } = req.params;

    const event = await Event.findById(id)
      .populate("company", "name slug logo")
      .populate(
        "user",
        "profile.displayName profile.displayNameNormalized profile.avatar",
      );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    if (event.country !== country || event.status !== "published") {
      return res.status(404).json({
        message: "Event not found",
      });
    }
    res.json({
      event,
    });
  } catch (err) {
    console.error("GET EVENT ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch event",
    });
  }
};

export const getMyEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.json({
      event,
    });
  } catch (err) {
    console.error("GET MY EVENT ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch event",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const payload = await buildEventPayload(req.body, req.user);

    Object.assign(event, payload);

    if (req.file) {
      if (event.coverImage?.publicId) {
        await deleteImageFromCloudinary(event.coverImage.publicId);
      }

      event.coverImage = await uploadImageToCloudinary(
        req.file.buffer,
        "poloniaportal/events",
      );
    }

    await event.save();

    res.json({
      success: true,
      event,
    });
  } catch (err) {
    console.error("UPDATE EVENT ERROR:", err);

    res.status(500).json({
      message: "Failed to update event",
    });
  }
};
