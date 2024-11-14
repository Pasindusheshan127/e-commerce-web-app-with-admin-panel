const bcrypt = require("bcrypt");

const User = require("../../models/user");

//register

const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Some error occurred",
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
