import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Forbidden = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">403 — Forbidden</h1>
      <p className="text-slate-600">
        You do not have permission to access this page.
      </p>
    </div>
  </div>
);

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const auth = useAuth();

  if (!auth?.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !auth.hasRole(requiredRole)) {
    return <Forbidden />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
};

export const UserRoute = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};
