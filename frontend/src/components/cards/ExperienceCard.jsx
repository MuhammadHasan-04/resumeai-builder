import React from "react";
import { CirclePlus, Trash2 } from "lucide-react";

export const ExperienceCard = ({ experience, setExperience }) => {
  const handleChange = (index, field, value) => {
    const updated = [...experience];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setExperience(updated);
  };

  const handleAdd = () => {
    setExperience([
      ...experience,
      {
        title: "",
        company: "",
        dates: "",
        description: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    if (experience.length === 1) return;
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  return (
    <div id="experience">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-3xl">Professional Experience</h1>

        <button
          onClick={handleAdd}
          className="flex flex-col items-center text-blue-500"
        >
          <CirclePlus className="cursor-pointer" />
          <p className="text-sm">Add More</p>
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={index} className="space-y-6 py-6 ">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Job Title
            </label>
            <input
              type="text"
              value={exp.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Senior Creative Designer"
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors placeholder:text-slate-300 duration-300 placeholder:text-sm
md:placeholder:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                placeholder="XYZ Company"
                className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors placeholder:text-slate-300 duration-300 placeholder:text-sm
md:placeholder:text-base"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Dates
              </label>
              <input
                type="text"
                value={exp.dates}
                onChange={(e) => handleChange(index, "dates", e.target.value)}
                placeholder="Jan 2022 - Present"
                className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors duration-300 placeholder:text-slate-300 placeholder:text-sm
md:placeholder:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Job Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Describe your responsibilities and achievements..."
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors placeholder:text-slate-300 duration-300 resize-none placeholder:text-sm
md:placeholder:text-base"
            />
          </div>

          {experience.length > 1 && (
            <div className="flex justify-start mt-3">
              <button
                onClick={() => handleDelete(index)}
                className="flex items-center gap-1 text-red-500 cursor-pointer"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
