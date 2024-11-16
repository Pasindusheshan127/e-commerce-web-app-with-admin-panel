const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    if (err.code === 11000) {
      // Mongoose duplicate key error
      return res.status(400).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};

//login
const login = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//logout

//auth middleware

module.exports = { registerUser };
