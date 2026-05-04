import React from "react";
import { CirclePlus, Trash2 } from "lucide-react";

export const ProjectsCard = ({ projects, setProjects }) => {
  const handleChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleAdd = () => {
    setProjects([
      ...projects,
      { title: "", tech: "", link: "", description: "" },
    ]);
  };

  const handleDelete = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  return (
    <div id="projects" className="mt-8">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl">Projects</h1>
        <button
          onClick={handleAdd}
          className="flex flex-col items-center text-blue-500 "
        >
          <CirclePlus className="cursor-pointer" />
          <p className="text-sm">Add More</p>
        </button>
      </div>

      {projects.map((proj, index) => (
        <div key={index} className="space-y-6 py-6 ">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Project Title
            </label>
            <input
              value={proj.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              type="text"
              placeholder="AI Resume Builder"
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors duration-300 placeholder:text-slate-300 placeholder:text-sm
md:placeholder:text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Tech Stack
            </label>
            <input
              value={proj.tech}
              onChange={(e) => handleChange(index, "tech", e.target.value)}
              type="text"
              placeholder="React, Node.js, MongoDB"
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors duration-300 placeholder:text-slate-300 placeholder:text-sm
md:placeholder:text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Project Link
            </label>
            <input
              value={proj.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
              type="text"
              placeholder="https://github.com/username/project"
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors duration-300 placeholder:text-slate-300 placeholder:text-sm
md:placeholder:text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Description
            </label>
            <textarea
              rows="3"
              value={proj.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder="Brief description of the project and your impact..."
              className="border-0 border-b border-slate-300 bg-transparent py-2 px-1 outline-none focus:border-black transition-colors duration-300 placeholder:text-slate-300 resize-none placeholder:text-sm
md:placeholder:text-base"
            />
          </div>

          {projects.length > 1 && (
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
