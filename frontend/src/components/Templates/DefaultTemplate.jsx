import React from "react";

export const DefaultTemplate = ({ data }) => {
  return (
    <>
      {/* fullName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: "", */}
      <div className=" bg-white w-full  mx-auto md:p-10">
        <h1 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
          {data.info.fullName || "Your Name"}
        </h1>
        <hr className="border border-slate-400 w-full" />
        <div className="flex flex-wrap gap-1 text-gray-600 mt-1 text-md  sm:gap-2 md:gap-4">
          <h1>{data.info.phone || "Phone Number"} |</h1>

          <h1>{data.info.email || "Email@example.com"} |</h1>
          {data.info.location || "City , State"}
        </div>

        <div className="mt-8">
          <h1 className=" font-bold text-xl text-gray-900 py-2">
            Executive Summary{" "}
          </h1>
          <hr className="border border-slate-400 w-full" />
          <p className="mr-5 py-2 text-gray-600">
            {data.info.summary ||
              "Fast-paced, creative web developer with 6 years of experience with extensive knowledge of HTML, CSS, JavaScript, XHTML, JQuery, PHP and other web programming languages. Strong proficiency in visual design and user interface design."}{" "}
          </p>
        </div>

        <div className="mt-8">
          <h1 className=" font-bold text-xl text-gray-900 py-2">Experience </h1>
          <hr className="border border-slate-400 w-full" />
          {data.experience.map((exp, index) => (
            <div key={index} className="flex flex-col py-3">
              <h1 className="font-semibold tracking-tight text-md ">
                {exp.company || "XYZ Company"}
              </h1>
              <div className="flex flex-row gap-2">
                <h1 className="font-semibold tracking-tight text-md ">
                  {exp.title || "Job Title"}
                </h1>
                <p> | </p>
                <h1 className="font-semibold tracking-tight text-md ">
                  {exp.dates || "Jan,2024 - Present"}
                </h1>
              </div>
              <p className="text-gray-700 mt-1 ">
                {exp.description ||
                  "Describe your responsibilities, achievements, and impact in this role..."}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h1 className=" font-bold text-xl text-gray-900 py-2">Skills </h1>
          <hr className="border border-slate-400 w-full" />
          <div className="py-2">
            <div className="flex flex-col py-2">
              <h1 className="font-semibold text-md">Technical Skills:</h1>
              <p className="text-gray-700">
                {data.skills.technical || "Add your technical skills here ..."}
              </p>
            </div>
            <div>
              <h1 className="font-semibold text-md">Technical Skills:</h1>

              <p className="text-gray-700">
                {data.skills.tools || "Add tools you are proficient with ..."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="font-bold text-xl text-gray-900 py-2">Education</h1>
          <hr className="border border-slate-400 w-full" />

          {data.education.map((edu, index) => (
            <div key={index} className="py-2">
              <h1 className="font-semibold text-md">
                {edu.degree || "Degree Name"}
              </h1>
              <h1 className="text-gray-700">{edu.school || "School Name"}</h1>
              <div className="flex gap-2 text-gray-600">
                <p>{edu.year || "Year"}</p>
                <p>{edu.location || "Location"}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h1 className="font-bold text-xl text-gray-900 py-2">Projects</h1>
          <hr className="border border-slate-400 w-full" />

          {data.projects.map((proj, index) => (
            <div key={index} className="py-3">
              <h1 className="font-semibold text-md">
                {proj.title || "Project Title"}
              </h1>
              <p className="text-gray-600">
                {proj.tech || "Tech Stack (e.g. React, Node.js, MongoDB)"}
              </p>
              <a
                href={proj.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {proj.link || "Project Link"}
              </a>
              <p className="text-gray-700 mt-1">
                {proj.description ||
                  "Brief description of the project and your role/impact..."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
