// Form validation rules and error messages
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Minimum 8 characters, at least one uppercase, lowercase, number, and special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: "No password" };

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
  ];

  return { strength, label: labels[strength], color: colors[strength] };
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateForm = (formData, formType) => {
  const errors = {};

  if (formType === "register" || formType === "signup") {
    if (!formData.name || !validateName(formData.name)) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password || !validatePassword(formData.password)) {
      errors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }
    if (
      formType === "signup" &&
      formData.confirmPassword !== formData.password
    ) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (formType === "login") {
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
  }

  if (formType === "forgot-password") {
    if (!formData.email || !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (formType === "reset-password") {
    if (!formData.password || !validatePassword(formData.password)) {
      errors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  return errors;
};
