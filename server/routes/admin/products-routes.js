const express = require("express");
const {
  handleImageUpload,
} = require("../../controllers/admin/products-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

// POST route for uploading an image
router.post(
  "/upload",
  (req, res, next) => {
    try {
      // Add a simple check for the presence of a file
      if (!req.file) {
        throw new Error("File is missing from the request.");
      }
      next();
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
  upload.single("image"), // Multer middleware for handling the file upload
  handleImageUpload // Controller function to process the uploaded file
);

module.exports = router;
