const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      //   required: [true, "Image URL is required"],
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Product title must be at least 3 characters long"],
      maxlength: [100, "Product title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ["electronics", "fashion", "home", "beauty", "sports", "other"],
        message:
          "Category must be one of: electronics, fashion, home, beauty, sports, other",
      },
    },
    brand: {
      type: String,
      //   required: [true, "Brand is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be at least 0"],
    },
    salePrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price; // Sale price should be less than the regular price
        },
        message: "Sale price must be less than the regular price",
      },
    },
    totalStock: {
      type: Number,
      //   required: [true, "Total stock is required"],
      min: [0, "Total stock must be at least 0"],
      default: 0,
    },
    averageReview: {
      type: Number,
      min: [0, "Average review must be at least 0"],
      max: [5, "Average review cannot exceed 5"],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
