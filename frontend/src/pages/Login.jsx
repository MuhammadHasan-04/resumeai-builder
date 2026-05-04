import React, { useState } from "react";
import { FileText, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateForm } from "../utils/validation";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    // Validate form
    const validationErrors = validateForm(formData, "login");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await auth.login(formData.email, formData.password);

      if (response.success) {
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          const destination =
            response.data?.user?.role === "admin" ? "/admin" : "/resumePreview";
          navigate(destination);
        }, 1500);
      } else {
        setErrors({
          submit: response.message || "Login failed",
        });
      }
    } catch (error) {
      setErrors({
        submit: error.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-center space-y-6 mb-12">
        <div className="bg-black p-3 rounded-lg hover:bg-slate-800 transition">
          <FileText className="text-white w-8 h-8" />
        </div>
        <h1 className="uppercase text-lg tracking-widest font-semibold text-gray-900 sm:text-xl md:text-2xl">
          Profyl
        </h1>
      </div>

      {/* Login Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-10 rounded-2xl shadow-lg border border-slate-200"
      >
        <div className="mb-8 text-center">
          <h2 className="font-serif text-4xl text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 tracking-wide mt-2 text-sm">
            Enter your credentials to access your workspace
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{successMessage}</p>
          </div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{errors.submit}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label className="uppercase font-semibold text-sm tracking-wide text-slate-700">
              Email Address
            </label>
            <input
              className={`border ${
                errors.email ? "border-red-500" : "border-slate-300"
              } py-3 rounded-lg px-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-slate-900"
              } transition`}
              type="email"
              name="email"
              id="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-600 text-xs flex gap-1 items-center">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="uppercase font-semibold text-sm tracking-wide text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-slate-500 hover:text-slate-900 transition font-medium"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-slate-300"
                } py-3 rounded-lg px-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-slate-900"
                } transition pr-10`}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs flex gap-1 items-center">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg mt-6 hover:bg-slate-800 transition cursor-pointer disabled:bg-slate-600 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {/* Sign Up Link */}
          <div className="flex justify-center items-center gap-2 mt-6 text-sm text-slate-600">
            <p>New to Profyl?</p>
            <button
              onClick={() => navigate("/signup")}
              type="button"
              className="font-semibold text-slate-900 hover:text-black transition cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>

      {/* Footer Note */}
      <p className="text-xs text-slate-500 mt-8 text-center max-w-md">
        Your session will expire after 7 days of inactivity for security
        purposes.
      </p>
    </div>
  );
};
