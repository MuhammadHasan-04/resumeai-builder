import User from "../models/Users.js";

// GET ALL USERS (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "resetToken", "resetTokenExpiry"],
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.error("Get users error:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

// GET USER BY ID (Admin only)
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["password", "resetToken", "resetTokenExpiry"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Get user error:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
    });
  }
};

// TOGGLE USER ACTIVE STATUS (Admin only)
const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent admin from deactivating themselves
    if (user.id === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: "Cannot deactivate your own account",
      });
    }

    const updatedStatus = !user.isActive;
    await user.update({ isActive: updatedStatus });

    return res.status(200).json({
      success: true,
      message: `User account ${updatedStatus ? "activated" : "deactivated"} successfully`,
      data: {
        userId: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (err) {
    console.error("Toggle user status error:", err);
    return res.status(500).json({
      success: false,
      message: "Error updating user status",
    });
  }
};

// CHANGE USER ROLE (Admin only)
const changeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'user' or 'admin'",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent self-role-change
    if (user.id === req.user.userId && role === "user") {
      return res.status(400).json({
        success: false,
        message: "Cannot change your own role to user",
      });
    }

    const oldRole = user.role;
    await user.update({ role });

    return res.status(200).json({
      success: true,
      message: `User role changed from ${oldRole} to ${role}`,
      data: {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Change role error:", err);
    return res.status(500).json({
      success: false,
      message: "Error changing user role",
    });
  }
};

// DELETE USER (Admin only)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent self-deletion
    if (user.id === req.user.userId) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete your own account",
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};

// GET DASHBOARD STATS (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const adminCount = await User.count({ where: { role: "admin" } });
    const regularUsers = await User.count({ where: { role: "user" } });
    const activeUsers = await User.count({ where: { isActive: true } });
    const inactiveUsers = await User.count({ where: { isActive: false } });

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        adminCount,
        regularUsers,
        activeUsers,
        inactiveUsers,
      },
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching dashboard stats",
    });
  }
};

export {
  getAllUsers,
  getUserById,
  toggleUserStatus,
  changeUserRole,
  deleteUser,
  getDashboardStats,
};
