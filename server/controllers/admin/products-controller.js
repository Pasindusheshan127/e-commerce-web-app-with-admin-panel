const { ImageUploadUtil } = require("../../helpers/cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please upload an image.",
      });
    }

    // Convert file buffer to base64
    const base64Image = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    // Upload the base64 image to Cloudinary
    const uploadResult = await ImageUploadUtil(base64Image);

    // Respond with success and the uploaded image details
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: uploadResult,
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error.message);

    // Respond with a failure message
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

module.exports = {
  handleImageUpload,
};
