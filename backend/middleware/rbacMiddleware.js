import jwt from "jsonwebtoken";
import User from "../models/Users.js";

// Authentication middleware - verify JWT token
export const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token missing or invalid format",
    });
  }

  const token = authorizationHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again",
        tokenExpired: true,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid or malformed token",
    });
  }
};

// Authorization middleware - check user role
export const authorizeRole = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Verify user still exists and is active
      const user = await User.findByPk(req.user.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: "Account is deactivated. Contact administrator.",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Required role: ${allowedRoles.join(
            " or ",
          )}. Your role: ${user.role}`,
        });
      }

      // Attach full user info to request
      req.user.role = user.role;
      req.user.isActive = user.isActive;

      next();
    } catch (err) {
      console.error("Authorization error:", err);
      return res.status(500).json({
        success: false,
        message: "Authorization check failed",
      });
    }
  };
};

// Optional: Session timeout middleware
export const sessionTimeout = (timeout = 30 * 60 * 1000) => {
  return (req, res, next) => {
    if (req.user) {
      const tokenExp = req.user.exp * 1000;
      const now = Date.now();

      if (now > tokenExp) {
        return res.status(401).json({
          success: false,
          message: "Session expired. Please login again",
        });
      }
    }
    next();
  };
};
