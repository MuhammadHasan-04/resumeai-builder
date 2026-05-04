import express from "express";
import {
  getAllUsers,
  getUserById,
  toggleUserStatus,
  changeUserRole,
  deleteUser,
  getDashboardStats,
} from "../controller/adminController.js";
import { authMiddleware, authorizeRole } from "../middleware/rbacMiddleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(authorizeRole("admin"));

// Dashboard stats
router.get("/dashboard/stats", getDashboardStats);

// User management
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.patch("/users/:userId/toggle-status", toggleUserStatus);
router.patch("/users/:userId/role", changeUserRole);
router.delete("/users/:userId", deleteUser);

export default router;
