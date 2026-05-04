import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Trash2,
  Edit,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  getAllUsers,
  getDashboardStats,
  toggleUserStatus,
  changeUserRole,
  deleteUser,
} from "../services/authService";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminCount: 0,
    regularUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsRes, usersRes] = await Promise.all([
        getDashboardStats(),
        getAllUsers(),
      ]);

      if (statsRes.success) {
        setStats(statsRes.data);
      } else {
        setError(statsRes.message);
      }

      if (usersRes.success) {
        setUsers(usersRes.data);
      } else {
        setError(usersRes.message);
      }
    } catch {
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const response = await toggleUserStatus(userId);
      if (response.success) {
        setSuccessMessage(response.message);
        fetchDashboardData();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(response.message);
      }
    } catch {
      setError("Failed to toggle user status");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      const response = await changeUserRole(userId, newRole);
      if (response.success) {
        setSuccessMessage(response.message);
        setEditingUserId(null);
        fetchDashboardData();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setError(response.message);
      }
    } catch {
      setError("Failed to change user role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await deleteUser(userId);
        if (response.success) {
          setSuccessMessage(response.message);
          fetchDashboardData();
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          setError(response.message);
        }
      } catch {
        setError("Failed to delete user");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Manage users and view system statistics
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() =>
                navigate("/resumePreview", {
                  state: { fromAdmin: true, asUser: true, returnTo: "/admin" },
                })
              }
              className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-all duration-200"
            >
              Enter Builder
            </button>
            <button
              onClick={() => navigate("/admin/templates")}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-medium hover:bg-slate-200 transition-all duration-200"
            >
              Setup Templates
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Admins</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.adminCount}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Regular Users
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.regularUsers}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.activeUsers}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.inactiveUsers}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <UserX className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Users</h2>
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition"
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <p className="text-slate-600">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-600">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {editingUserId === user.id ? (
                          <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="px-3 py-1.5 border border-slate-300 rounded text-sm"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          {editingUserId === user.id ? (
                            <>
                              <button
                                onClick={() =>
                                  handleChangeRole(user.id, selectedRole)
                                }
                                className="px-3 py-1.5 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingUserId(null)}
                                className="px-3 py-1.5 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingUserId(user.id);
                                  setSelectedRole(user.role);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
                              >
                                <Edit className="w-3 h-3" />
                                Change Role
                              </button>
                              <button
                                onClick={() => handleToggleStatus(user.id)}
                                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                                  user.isActive
                                    ? "bg-orange-600 text-white hover:bg-orange-700"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                              >
                                {user.isActive ? "Deactivate" : "Activate"}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
