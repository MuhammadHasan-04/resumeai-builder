import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance with auth token
const createAuthClient = () => {
  const client = axios.create({
    baseURL: baseUrl,
  });

  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return client;
};

export const Parse = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    const client = createAuthClient();
    const response = await client.post("/parseResume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Failed to upload resume:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
