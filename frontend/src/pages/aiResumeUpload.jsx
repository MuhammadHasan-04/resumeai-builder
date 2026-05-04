import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";
import { Parse } from "../services/resumeUploadandParse.js";

export const AIResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a resume first");

    setLoading(true);

    try {
      const result = await Parse(file);
      console.log("Parsed Resume:", result);

      navigate("/templates", {
        state: { parsedResume: result },
      });
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else if (error.response?.data?.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("Failed to parse resume. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center px-6 py-16 bg-[#f4f1ee] text-center  max-w-full">
        <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 font-medium leading-snug tracking-tight font-serif">
            Translate your <span className="block">profyl with AI</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-700 font-serif">
            Upload your resume and let AI automatically convert it into a
            structured professional profile.
          </p>

          <div className="mt-12 flex flex-col items-center gap-6">
            <label
              htmlFor="resumeUpload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl w-full sm:w-96 h-52 cursor-pointer hover:border-black transition-all duration-200 bg-white"
            >
              <UploadCloud className="w-12 h-12 text-gray-500 mb-3" />

              <span className="text-gray-600 text-center px-4">
                {file ? file.name : "Click to upload or drag your resume here"}
              </span>

              <input
                id="resumeUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
            >
              {loading ? "Parsing Resume..." : "Upload & Parse Resume"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white w-full py-20">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-3xl font-serif text-slate-900 sm:text-4xl md:text-5xl">
            How To Use
          </h1>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h1 className="text-7xl font-semibold text-gray-300">01</h1>
              <p className="mt-5 font-semibold">Upload Resume</p>
              <p className="mt-5 text-slate-500 font-light leading-relaxed">
                Upload your existing resume and let AI analyze its structure.
              </p>
            </div>

            <div>
              <h1 className="text-7xl font-semibold text-gray-300">02</h1>
              <p className="mt-5 font-semibold uppercase">Select Template</p>
              <p className="mt-5 text-slate-500 font-light leading-relaxed">
                Choose from beautifully designed templates.
              </p>
            </div>

            <div>
              <h1 className="text-7xl font-semibold text-gray-300">03</h1>
              <p className="mt-5 font-semibold uppercase">Get Live Preview</p>
              <p className="mt-5 text-slate-500 font-light leading-relaxed">
                Instantly preview and download your resume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
