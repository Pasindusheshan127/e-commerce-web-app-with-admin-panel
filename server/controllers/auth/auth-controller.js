const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

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
    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User does not exist! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid password! Please try again",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: checkUser._id, role: checkUser.role, email: checkUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send the token as a cookie
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: {
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
};

//logout

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

//auth middleware

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized! Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.json({
      success: false,
      message: "unauthorised user! Please login again",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
