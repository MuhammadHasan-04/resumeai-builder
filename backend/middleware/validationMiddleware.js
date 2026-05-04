import { body, validationResult } from "express-validator";

// Validation rules
export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character",
    ),
];

export const validateLogin = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validatePasswordReset = [
  body("email").trim().isEmail().withMessage("Valid email is required"),
];

export const validateNewPassword = [
  body("newPassword")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character",
    ),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character",
    ),
  body("token").trim().notEmpty().withMessage("Reset token is required"),
  body().custom((value) => {
    const hasPassword =
      (typeof value?.password === "string" &&
        value.password.trim().length > 0) ||
      (typeof value?.newPassword === "string" &&
        value.newPassword.trim().length > 0);

    if (!hasPassword) {
      throw new Error("New password is required");
    }
    return true;
  }),
];

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

// Input sanitization middleware
export const sanitizeInputs = (req, res, next) => {
  // Check if req.body exists before trying to access properties
  if (!req.body) {
    return next();
  }

  if (req.body.name && typeof req.body.name === "string") {
    req.body.name = req.body.name.trim().replace(/[<>]/g, "");
  }
  if (req.body.email && typeof req.body.email === "string") {
    req.body.email = req.body.email.toLowerCase().trim();
  }
  if (req.body.password && typeof req.body.password === "string") {
    req.body.password = req.body.password.trim();
  }
  if (req.body.newPassword && typeof req.body.newPassword === "string") {
    req.body.newPassword = req.body.newPassword.trim();
  }
  if (
    req.body.confirmPassword &&
    typeof req.body.confirmPassword === "string"
  ) {
    req.body.confirmPassword = req.body.confirmPassword.trim();
  }
  if (req.body.token && typeof req.body.token === "string") {
    req.body.token = req.body.token.trim();
  }
  next();
};
