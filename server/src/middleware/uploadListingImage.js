import multer from "multer";

const storage = multer.memoryStorage();

export const uploadListingImage = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }

    cb(null, true);
  },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);
