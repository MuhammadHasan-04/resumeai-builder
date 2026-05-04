import React from "react";
import { Phone, Mail } from "lucide-react";

export const CleanTemplate = ({ data }) => {
  return (
    <div className=" bg-white w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4">
        <div className="flex items-center gap-2  justify-center sm:justify-start ">
          <Phone size={18} className="text-gray-700" />
          <a href={`tel:${data.info.phone}`} className="text-sm text-gray-700">
            {data.info.phone || "+92 3xxx xxxxxxx"}
          </a>
        </div>

        <div className="text-center">
          <h1 className="text-gray-900 text-2xl font-semibold">
            {data.info.fullName || "Your Name"}
          </h1>
          <div className="flex flex-row gap-2 items-center justify-center">
            <p className="text-gray-600 text-sm ">
              {data.info.title || "Senior AI Engineer"}
            </p>
            <p className="text-gray-600 text-sm">|</p>
            <p className="text-gray-600 text-sm">
              {data.info.location || "City , State"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-2">
          <Mail size={18} className="text-gray-700" />
          <a
            href={`mailto:${data.info.email}`}
            className="text-sm text-gray-700"
          >
            {data.info.email || "Email@example.com"}
          </a>
        </div>
      </div>

      <div className="py-10">
        <h1 className="text-lg  md:text-xl font-serif tracking-widest uppercase">
          About Me
        </h1>
        <hr className="border border-gray-600"></hr>
        <p className="font-serif leading-relaxed tracking-wide py-2 text-slate-800 text-sm sm:text-md md:text-base">
          {data.info.summary ||
            "Fast-paced, creative web developer with 6 years of experience with extensive knowledge of HTML, CSS, JavaScript, XHTML, JQuery, PHP and other web programming languages. Strong proficiency in visual design and user interface design."}
        </p>
      </div>

      <div className="py-5">
        <h1 className="text-lg  md:text-xl font-serif tracking-widest uppercase">
          Experience
        </h1>
        <hr className="border border-gray-600"></hr>
        {data.experience.map((exp, index) => (
          <div key={index} className="flex flex-col space-y-3 py-5 ">
            <div className="flex flex-row justify-between">
              <div>
                <p className="font-bold  text-lg  md:text-xl">
                  {" "}
                  {exp.title || "Job Title"}
                </p>
                <h1 className="font-light italic">
                  {exp.company || "XYZ Company"}
                </h1>
              </div>

              <div>
                <p className="font-light italic">
                  {exp.dates || "Jan,2024 - Present"}
                </p>
              </div>
            </div>
            <p className="font-serif leading-relaxed tracking-wide py-2 text-slate-800 text-sm sm:text-md md:text-base">
              {exp.description ||
                "Describe your responsibilities, achievements, and impact in this role..."}
            </p>
          </div>
        ))}
      </div>

      <div className="py-5">
        <h1 className="text-lg  md:text-xl font-serif tracking-widest uppercase">
          Personal Projects
        </h1>
        <hr className="border border-gray-600"></hr>
        {data.projects.map((proj, index) => (
          <div key={index} className="py-5">
            <div className="flex justify-between">
              <h1 className="font-bold text-lg md:text-xl">
                {proj.title || "Project Title"}
              </h1>
              <p className="  font-light italic">
                {proj.link || "www.github.com/"}
              </p>
            </div>

            <p className="font-serif leading-relaxed tracking-wide mt-7 text-slate-800 text-sm sm:text-md md:text-base">
              {proj.description ||
                "Brief description of the project and your role/impact..."}
            </p>
            <div className="flex gap-2">
              <p className="font-bold text-sm sm:text-md md:text-base">
                Technology Stack :
              </p>
              <p className="font-serif leading-relaxed tracking-wid text-slate-800 text-sm sm:text-md md:text-base">
                {proj.tech || "(e.g. React, Node.js)"}
              </p>{" "}
            </div>
          </div>
        ))}
      </div>

      <div className="py-5">
        <h1 className="text-lg  md:text-xl font-serif tracking-widest uppercase">
          technical Skills and Interests
        </h1>
        <hr className="border border-gray-600"></hr>
        <div className="py-5">
          <div className="flex font-serif leading-relaxed tracking-wide  text-slate-800 gap-2">
            <p className="font-bold text-sm sm:text-md md:text-base">
              Technical Skills :
            </p>
            <p className="text-sm sm:text-md md:text-base">
              {data.skills.technical || "Add your technical skills here ..."}
            </p>
          </div>

          <div className="flex font-serif leading-relaxed tracking-wide  text-slate-800 gap-2">
            <p className="font-bold text-sm sm:text-md md:text-base">
              Development Tools & Practices :
            </p>
            <p className="text-sm sm:text-md md:text-base">
              {data.skills.tools || "Add tools you are proficient with ..."}
            </p>
          </div>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-lg  md:text-xl font-serif tracking-widest uppercase">
          Education
        </h1>
        <hr className="border border-gray-600"></hr>

        {data.education.map((edu, index) => (
          <div key={index} className="py-5 flex flex-row justify-between">
            <div>
              <p className="font-semibold text-lg ">
                {edu.school || "School Name"}
              </p>
              <p className="font-light"> {edu.degree || "Degree Name"}</p>
            </div>
            <div className="font-light italic">
              <p>{edu.year || "2023-Ongoing"}</p>
              <p>{edu.location || "Location"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
