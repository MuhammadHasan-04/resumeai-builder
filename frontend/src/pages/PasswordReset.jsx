import React, { useState } from "react";
import { FileText, AlertCircle, Check } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { requestPasswordReset, resetPassword } from "../services/authService";
import { validateForm, validateEmail } from "../utils/validation";

export const PasswordReset = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [step, setStep] = useState(token ? "reset" : "request"); // request or reset
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateEmail(formData.email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setLoading(true);
    try {
      const response = await requestPasswordReset(formData.email);

      if (response.success) {
        setSuccessMessage(
          "Password reset link sent to your email. Check your inbox!",
        );
        setFormData({ email: "", password: "", confirmPassword: "" });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setErrors({
          submit: response.message || "Failed to request password reset",
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const validationErrors = validateForm(formData, "reset-password");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(token, formData.password);

      if (response.success) {
        setSuccessMessage(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrors({
          submit: response.message || "Failed to reset password",
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

      {/* Password Reset Form */}
      <form
        onSubmit={step === "request" ? handleRequestReset : handleResetPassword}
        className="bg-white w-full max-w-md p-10 rounded-2xl shadow-lg border border-slate-200"
      >
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl text-slate-900">Reset Password</h2>
          <p className="text-slate-500 tracking-wide mt-2 text-sm">
            {step === "request"
              ? "Enter your email to receive a password reset link"
              : "Create a new password for your account"}
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
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

        {/* Request Step */}
        {step === "request" && (
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg mt-6 hover:bg-slate-800 transition cursor-pointer disabled:bg-slate-600 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        )}

        {/* Reset Step */}
        {step === "reset" && (
          <div className="space-y-5">
            {/* New Password Field */}
            <div className="flex flex-col gap-2">
              <label className="uppercase font-semibold text-sm tracking-wide text-slate-700">
                New Password
              </label>
              <input
                className={`border ${
                  errors.password ? "border-red-500" : "border-slate-300"
                } py-3 rounded-lg px-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "focus:ring-red-500"
                    : "focus:ring-slate-900"
                } transition`}
                type="password"
                name="password"
                id="password"
                required
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-600 text-xs flex gap-1 items-start">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-2">
              <label className="uppercase font-semibold text-sm tracking-wide text-slate-700">
                Confirm Password
              </label>
              <input
                className={`border ${
                  errors.confirmPassword ? "border-red-500" : "border-slate-300"
                } py-3 rounded-lg px-3 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "focus:ring-red-500"
                    : "focus:ring-slate-900"
                } transition`}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs flex gap-1 items-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg mt-6 hover:bg-slate-800 transition cursor-pointer disabled:bg-slate-600 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}

        {/* Back to Login */}
        <div className="flex justify-center items-center gap-2 mt-6 text-sm text-slate-600">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-slate-900 hover:text-black transition cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};
