import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock3, Eye } from "lucide-react";
import { getResumeHistory } from "../services/authService";

const mapResumeToPreviewState = (resume) => ({
  info: resume.personalInfo || {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experience: resume.experience || [],
  education: resume.education || [],
  skills: resume.skills || { technical: "", tools: "" },
  projects: resume.projects || [],
});

export const ResumeHistory = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError("");

      const response = await getResumeHistory();
      if (response.success === false) {
        setError(response.message || "Failed to load resume history");
        setResumes([]);
      } else {
        setResumes(Array.isArray(response) ? response : []);
      }

      setLoading(false);
    };

    loadHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f1ee]">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Clock3 className="w-6 h-6 text-gray-700" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Resume History
            </h2>
            <p className="text-gray-600">
              Saved resumes from your exports appear here.
            </p>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading history...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && resumes.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-600">
            No saved resumes yet. Export a CV to add it here.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {resume.title || "Untitled Resume"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Template: {resume.template || "default"}
                  </p>
                </div>
                <span className="text-xs text-gray-500">
                  {resume.createdAt
                    ? new Date(resume.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>

              <div className="mt-4 text-sm text-gray-700 space-y-2">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {resume.personalInfo?.fullName || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Title:</span>{" "}
                  {resume.personalInfo?.title || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {resume.personalInfo?.email || "N/A"}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/resumePreview", {
                    state: {
                      parsedResume: mapResumeToPreviewState(resume),
                      template: resume.template || "default",
                    },
                  })
                }
                className="mt-6 inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
              >
                <Eye className="w-4 h-4" />
                View Resume
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
