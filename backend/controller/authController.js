import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/Users.js";

const generateToken = (user, expiresIn = "7d") => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET,
    { expiresIn },
  );
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("[DEBUG] Register request body:", { name, email });
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please login or use another email.",
      });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with default 'user' role
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isActive: true,
    });

    // Generate token
    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated. Contact administrator.",
      });
    }

    // Compare passwords securely using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login timestamp
    await user.update({ lastLogin: new Date() });

    // Generate token
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// REQUEST PASSWORD RESET
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // Don't reveal if email exists for security reasons
      return res.status(200).json({
        success: true,
        message: "If email exists, password reset link has been sent",
      });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await user.update({
      resetToken: hashedToken,
      resetTokenExpiry,
    });

    // In production, send email with reset link
    // For now, return token for testing (REMOVE IN PRODUCTION)
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to email",
      // For development only - remove in production
      resetLink: process.env.NODE_ENV === "development" ? resetLink : undefined,
    });
  } catch (err) {
    console.error("Password reset request error:", err);
    return res.status(500).json({
      success: false,
      message: "Error processing password reset request",
    });
  }
};

// VERIFY RESET TOKEN AND RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token, newPassword, password } = req.body;
  const passwordToSet = newPassword || password;

  try {
    // Hash the token to compare
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid reset token
    const user = await User.findOne({
      where: {
        resetToken: hashedToken,
      },
    });

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(passwordToSet, 12);

    // Update password and clear reset token
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please login with new password.",
    });
  } catch (err) {
    console.error("Password reset error:", err);
    return res.status(500).json({
      success: false,
      message: "Error resetting password",
    });
  }
};

export { registerUser, loginUser, requestPasswordReset, resetPassword };
