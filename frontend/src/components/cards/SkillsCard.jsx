import React from "react";

export const SkillsCard = ({ skills, setSkills }) => {
  return (
    <div id="skills">
      <h1 className="font-serif text-3xl">Skills</h1>

      <div className="space-y-12 py-15">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Technical Skills
          </label>
          <input
            type="text"
            value={skills.technical}
            onChange={(e) => {
              setSkills({ ...skills, technical: e.target.value });
            }}
            placeholder="e.g. JavaScript, React, Node.js"
            className="
              border-0
              border-b
              border-slate-300
              bg-transparent
              py-2
              px-1
              outline-none
              focus:border-black
              transition-colors
              duration-300
              placeholder:text-slate-300
              placeholder:text-sm
md:placeholder:text-base
            "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Tools & Technologies
          </label>
          <input
            value={skills.tools}
            onChange={(e) => {
              setSkills({ ...skills, tools: e.target.value });
            }}
            type="text"
            placeholder="e.g. Git, Docker, Figma"
            className="
              border-0
              border-b
              border-slate-300
              bg-transparent
              py-2
              px-1
              outline-none
              focus:border-black
              transition-colors
              duration-300
              placeholder:text-slate-300
              placeholder:text-sm
md:placeholder:text-base
            "
          />
        </div>
      </div>
    </div>
  );
};
