const express = require("express");
const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/products-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

/**
 * @desc    Upload an image
 * @route   POST /api/admin/products/upload-image
 * @access  Admin
 */
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

/**
 * @desc    Add a new product
 * @route   POST /api/admin/products
 * @access  Admin
 */
router.post("/", addProduct);
/**
 * @desc    Edit an existing product
 * @route   PUT /api/admin/products/:id
 * @access  Admin
 */
router.put("/:id", editProduct);
/**
 * @desc    Delete a product
 * @route   DELETE /api/admin/products/:id
 * @access  Admin
 */
router.delete("/:id", deleteProduct);
/**
 * @desc    Fetch all products
 * @route   GET /api/admin/products
 * @access  Admin
 */
router.get("/", fetchAllProducts);

module.exports = router;
