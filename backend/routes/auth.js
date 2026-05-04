import express from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} from "../controller/authController.js";
import {
  validateRegister,
  validateLogin,
  validatePasswordReset,
  validateNewPassword,
  handleValidationErrors,
  sanitizeInputs,
} from "../middleware/validationMiddleware.js";

const router = express.Router();


router.use(sanitizeInputs);

// Register route
router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  registerUser,
);

// Login route
router.post("/login", validateLogin, handleValidationErrors, loginUser);

// Password reset routes
router.post(
  "/forgot-password",
  validatePasswordReset,
  handleValidationErrors,
  requestPasswordReset,
);

router.post(
  "/reset-password",
  validateNewPassword,
  handleValidationErrors,
  resetPassword,
);

export default router;
