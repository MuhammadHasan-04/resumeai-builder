import React from "react";
import { CirclePlus, Trash2 } from "lucide-react";

export const EducationCard = ({ education, setEducation }) => {
  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleAdd = () => {
    setEducation([
      ...education,
      { degree: "", school: "", year: "", location: "" },
    ]);
  };

  const handleDelete = (index) => {
    const updated = education.filter((_, i) => i !== index);
    setEducation(updated);
  };

  return (
    <div id="education" className="mt-8">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl">Education</h1>
        <button
          onClick={handleAdd}
          className="flex flex-col items-center text-blue-500"
        >
          <CirclePlus className="cursor-pointer" />
          <p className="text-sm">Add More</p>
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="space-y-8 py-6 ">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Degree and Field of Study
            </label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              placeholder="eg. Bachelors of Science"
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black placeholder:text-slate-300 transition-colors duration-300 placeholder:text-sm
md:placeholder:text-base"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                School
              </label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) => handleChange(index, "school", e.target.value)}
                placeholder="eg. Fast NUCES"
                className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black placeholder:text-slate-300 transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Year
              </label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => handleChange(index, "year", e.target.value)}
                placeholder="eg. 2026"
                className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black placeholder:text-slate-300 transition-colors duration-300 placeholder:text-sm
md:placeholder:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Location
            </label>
            <input
              type="text"
              value={edu.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
              placeholder="eg. Islamabad , Isb"
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black placeholder:text-slate-300 transition-colors duration-300 placeholder:text-sm
md:placeholder:text-base"
            />
          </div>
          {education.length > 1 && (
            <button
              onClick={() => handleDelete(index)}
              className="flex items-center gap-1 text-red-500 mt-2 cursor-pointer"
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
