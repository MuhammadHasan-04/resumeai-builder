import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import defaultImg from "../../assets/default.png";
import cleanImg from "../../assets/clean.png";

export const TemplatePage = ({ currentTemplate, setCurrentTemplate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const parsedResume = location.state?.parsedResume;
  const [selectedTemplate, setSelectedTemplate] = React.useState(
    currentTemplate || "default",
  );

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentTemplate(template);

    navigate("/resumePreview", {
      state: {
        parsedResume,
        template,
      },
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f1ee] p-15">
      <h1 className="text-xl uppercase font-bold md:text-3xl">
        Free Resume templates
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 sm:py-16 md:py-20 gap-6 sm:gap-8 md:gap-10">
        <div
          className="cursor-pointer flex flex-col items-center space-y-3"
          onClick={() => handleTemplateSelect("default")}
        >
          <img
            src={defaultImg}
            alt="Default Template"
            className={`rounded-xl transition-all ${
              selectedTemplate === "default"
                ? "ring-4 ring-black scale-105"
                : ""
            }`}
          />
          <p className="mt-2 font-medium">Default</p>
        </div>

        <div
          className="cursor-pointer flex flex-col items-center space-y-3"
          onClick={() => handleTemplateSelect("clean")}
        >
          <img
            src={cleanImg}
            alt="Clean Template"
            className={`rounded-xl transition-all ${
              selectedTemplate === "clean" ? "ring-4 ring-black scale-105" : ""
            }`}
          />
          <p className="mt-2 font-medium">Clean</p>
        </div>
      </div>
    </div>
  );
};
