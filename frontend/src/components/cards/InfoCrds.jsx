import React from "react";

export const InfoCrds = ({ info, setInfo }) => {
  return (
    <div id="info">
      <p className="text-[#0fbd66] tracking-widest uppercase font-bold text-md">
        Personal Editoral
      </p>

      <div className="">
        <div className="max-w-2xl flex flex-col gap-2 ">
          <h1 className="font-serif text-3xl">Contact Details</h1>
          <p className="text-slate-500 leading-relaxed tracking-wide text-md">
            Establish your professional identity with a clean header. Use
            high-contrast typography for a lasting first impression.
          </p>
        </div>
        <div className="space-y-12 py-15 ">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={info.fullName}
                onChange={(e) => {
                  setInfo({ ...info, fullName: e.target.value });
                }}
                className="
    border-0
    border-b
    border-slate-300
    bg-transparent
    py-2
    px-1
    outline-none
    focus:border-black
    placeholder:text-slate-300
    placeholder:text-sm
md:placeholder:text-base

    transition-colors
    duration-300
  "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400"
              >
                Professional Title
              </label>
              <input
                type="text"
                placeholder="Senior Product Manager"
                value={info.title}
                onChange={(e) => {
                  setInfo({ ...info, title: e.target.value });
                }}
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
    placeholder:text-slate-300
    placeholder:text-sm
md:placeholder:text-base

    duration-300
  "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400"
              >
                Email Address
              </label>
              <input
                type="text"
                value={info.email}
                onChange={(e) => {
                  setInfo({ ...info, email: e.target.value });
                }}
                placeholder="name@example.com"
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
    placeholder:text-slate-300
    placeholder:text-sm
md:placeholder:text-base

    duration-300
  "
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400"
              >
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+92 3xx xxxxxxxx"
                value={info.phone}
                onChange={(e) => {
                  setInfo({ ...info, phone: e.target.value });
                }}
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
              <label
                htmlFor="name"
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400"
              >
                Location
              </label>
              <input
                type="text"
                placeholder="Islamabad , Pakistan"
                value={info.location}
                onChange={(e) => {
                  setInfo({ ...info, location: e.target.value });
                }}
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
    placeholder:text-slate-300
    placeholder:text-sm
md:placeholder:text-base

    duration-300
  "
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="summary"
              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 "
            >
              Professional Summary
            </label>

            <textarea
              id="summary"
              rows="3"
              value={info.summary}
              onChange={(e) => {
                setInfo({ ...info, summary: e.target.value });
              }}
              placeholder="Results-driven software engineer with 2+ years of experience building scalable web applications using the MERN stack..."
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
      resize-none
    "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
