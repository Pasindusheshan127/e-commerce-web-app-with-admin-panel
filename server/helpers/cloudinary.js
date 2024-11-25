const cloudinary = require("cloudinary").v2; // Use v2 for better compatibility
const multer = require("multer");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use memory storage
const storage = multer.memoryStorage(); // Temporarily hold file data in memory

// Multer middleware for handling file uploads
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(
        new Error("Unsupported file type. Only JPEG and PNG are allowed."),
        false
      ); // Reject the file
    }
  },
});

// Utility to handle image upload to Cloudinary
const ImageUploadUtil = async (base64Image) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      resource_type: "image", // Specify the file type as an image
      folder: "uploads", // Optional: specify folder in Cloudinary
    });
    return result;
  } catch (error) {
    console.error("Error during Cloudinary upload:", error.message);
    throw new Error("Image upload failed. Please try again.");
  }
};

// Export the Multer upload middleware and the upload utility
module.exports = { upload, ImageUploadUtil };
