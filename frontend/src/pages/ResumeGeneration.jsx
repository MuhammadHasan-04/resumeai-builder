import React from "react";
import { useState } from "react";
import { User, Briefcase, GraduationCap, Star, ScrollText } from "lucide-react";

import { InfoCrds } from "../components/cards/InfoCrds";
import { ExperienceCard } from "../components/cards/ExperienceCard";
import { EducationCard } from "../components/cards/EducationCard";
import { ProjectsCard } from "../components/cards/ProjectsCard";
import { SkillsCard } from "../components/cards/SkillsCard";
import { DefaultTemplate } from "../components/Templates/DefaultTemplate";
import { CleanTemplate } from "../components/Templates/CleanTemplate";

import { useLocation, useNavigate } from "react-router-dom";

export const ResumeGeneration = ({ currentTemplate }) => {
  const location = useLocation();
  const previewRef = React.useRef(null);

  const parsedResume = location.state?.parsedResume;
  const template = location.state?.template || currentTemplate || "default";

  const [resumeData, setResumeData] = useState(
    parsedResume || {
      info: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
      },
      experience: [{ title: "", company: "", dates: "", description: "" }],
      education: [{ degree: "", school: "", year: "", location: "" }],
      skills: { technical: "", tools: "" },
      projects: [{ title: "", tech: "", link: "", description: "" }],
    },
  );

  const fromAdmin = location.state?.fromAdmin;
  const returnTo = location.state?.returnTo || "/admin";
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-20 min-h-screen hover:w-30 shadow-lg transition-all duration-300 uppercase hidden lg:flex flex-col gap-12 py-10 items-center text-slate-400 tracking-wider leading-relaxed">
        {fromAdmin && (
          <div className="absolute left-6 top-20 lg:static lg:mb-4">
            <button
              onClick={() => navigate(returnTo)}
              className="px-3 py-1 rounded bg-slate-200 text-slate-900 text-xs"
            >
              Back to Admin View
            </button>
          </div>
        )}
        <div className="flex-col justify-center items-center hover:text-[#0fbd66] transition cursor-pointer">
          <User />
          <a href="#info">Info</a>
        </div>

        <div className="flex flex-col justify-center items-center hover:text-[#0fbd66] transition cursor-pointer">
          <Briefcase />
          <a href="#experience">Exp</a>
        </div>

        <div className="flex flex-col justify-center items-center hover:text-[#0fbd66] transition cursor-pointer">
          <GraduationCap />
          <a href="#education">Edu</a>
        </div>

        <div className="flex flex-col justify-center items-center hover:text-[#0fbd66] transition cursor-pointer">
          <Star />
          <a href="#skills">Skills</a>
        </div>

        <div className="flex flex-col justify-center items-center hover:text-[#0fbd66] transition cursor-pointer">
          <ScrollText />
          <a href="#projects">Proj</a>
        </div>
      </div>

      <div className="w-full shadow-lg min-h-screen p-10 lg:w-[40%]">
        <div className="flex flex-col gap-6">
          <InfoCrds
            info={resumeData.info}
            setInfo={(newInfo) =>
              setResumeData({ ...resumeData, info: newInfo })
            }
          />

          <ExperienceCard
            experience={resumeData.experience}
            setExperience={(newExp) =>
              setResumeData({ ...resumeData, experience: newExp })
            }
          />

          <EducationCard
            education={resumeData.education}
            setEducation={(newEdu) =>
              setResumeData({ ...resumeData, education: newEdu })
            }
          />

          <SkillsCard
            skills={resumeData.skills}
            setSkills={(newSkills) =>
              setResumeData({ ...resumeData, skills: newSkills })
            }
          />

          <ProjectsCard
            projects={resumeData.projects}
            setProjects={(newProjects) =>
              setResumeData({ ...resumeData, projects: newProjects })
            }
          />
        </div>
      </div>

      <div
        ref={previewRef}
        data-pdf-export="true"
        className="w-full flex justify-start p-10 lg:w-[60%] bg-white"
      >
        {template === "default" && <DefaultTemplate data={resumeData} />}

        {template === "clean" && <CleanTemplate data={resumeData} />}
      </div>
    </div>
  );
};
