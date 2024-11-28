const express = require("express");
const {
  handleImageUpload,
} = require("../../controllers/admin/products-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

// POST route for uploading an image
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

module.exports = router;
