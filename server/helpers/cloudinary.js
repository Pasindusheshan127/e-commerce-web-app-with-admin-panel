const cloudinary = require("cloudinary").v2; // Use v2 for better compatibility
const multer = require("multer");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use memory storage
const storage = multer.memoryStorage(); // Temporarily hold file data in memory

// Utility to handle image upload to Cloudinary
const imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

// Multer middleware for handling file uploads
const upload = multer({ storage });

// Export the Multer upload middleware and the upload utility
module.exports = { upload, imageUploadUtil };
