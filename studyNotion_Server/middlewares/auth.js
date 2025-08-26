const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

// Auth Middleware
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    //    console.log("Token received in auth middleware:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded JWT:", decode);
      req.user = decode; // ✅ Assign to req.user (not req.User)
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};


// isStudent Middleware
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "You are not a student",
      });
    }
    next();
  } catch (error) {
    console.log("isStudent middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying student access",
    });
  }
};
// isInstructor Middleware
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "You are not an instructor",
      });
    }
    next();
  } catch (error) {
    console.log("isInstructor middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying instructor access",
    });
  }
};

// isAdmin Middleware
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not an admin",
      });
    }
    next();
  } catch (error) {
    console.log("isAdmin middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying admin access",
    });
  }
};
