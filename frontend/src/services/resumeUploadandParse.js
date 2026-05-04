import axios from "axios";

const baseUrl = "http://localhost:3000/api/parseResume";

export const Parse = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    const response = await axios.post(`${baseUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to upload resume:", error.message);
  }
};
