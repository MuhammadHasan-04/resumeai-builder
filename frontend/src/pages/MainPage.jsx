import React from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="bg-[#f4f1ee] py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="flex flex-col items-center text-center px-6">
          <p className="mb-8 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            Stand Out. Get Noticed.
          </p>

          <div className="max-w-2xl font-serif mb-8 sm:max-w-3xl md:max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-slate-900 font-medium leading-[1.1] tracking-tight">
              Build a Resume That Gets You Hired Effortlessly
            </h1>
          </div>

          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 font-light max-w-xl sm:max-w-2xl md:max-w-3xl">
            A simple, distraction-free resume builder that helps you focus on
            what matters — your experience, your skills, and the impact you’ve
            made. Create a clean, professional resume without worrying about
            formatting, layouts, or design complexity, and present your story
            with clarity and confidence.
          </p>

          <button
            onClick={() => navigate("/resumePreview")}
            className="mt-8 sm:mt-10 px-8 sm:px-10 py-3 h-12 sm:h-14 cursor-pointer text-white bg-slate-900 transition hover:bg-black"
          >
            Start Drafting
          </button>
        </div>
      </section>

      <div className="px-8 py-8 sm:py-10 sm:px-10 md:px-15 md:py-15">
        <div className="py-5 sm:py-7 md:py-8 lg:py-10">
          <h1 className="text-3xl font-serif text-slate-900 sm:text-4xl md:text-5xl">
            The Principles of Profyl
          </h1>
        </div>
        <span className="max-w-10 border border-slate-900 flex flex-row sm:max-w-10 md:max-w-15 lg:max-w-20"></span>

        <div className="py-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:gird-cols-3 sm:py-25 md:py-30">
          <div>
            <h1 className="text-7xl font-semibold text-gray-300">01</h1>
            <p className="mt-5 tracking-wider font-semibold">
              VISUAL HEIRARCHY
            </p>
            <p className="mt-5 text-slate-500 max-w-md font-light leading-relaxed">
              Precision engineering of margins and weights to ensure the
              reader's eye is guided through your career milestones with
              intentionality
            </p>
          </div>
          <div>
            <h1 className="text-7xl font-semibold text-gray-300">02</h1>
            <p className="mt-5 tracking-wider font-semibold uppercase">
              Typographic Clarity
            </p>
            <p className="mt-5 text-slate-500 max-w-md font-light leading-relaxed">
              Utilizing bespoke font pairings that command respect in digital
              environments and absolute prestige on the physical page.
            </p>
          </div>
          <div>
            <h1 className="text-7xl font-semibold text-gray-300">03</h1>
            <p className="mt-5 tracking-wider font-semibold uppercase">
              Substantive Focus
            </p>
            <p className="mt-5 text-slate-500 max-w-md font-light leading-relaxed">
              A framework designed to strip away the decorative and elevate the
              narrative, focusing entirely on your professional impact.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#f4f1ee] py-15 px-15  ">
        <div className="flex justify-center">
          <blockquote className="text-3xl italic leading-relaxed max-w-6xl text-center sm:text-4xl md:text-5xl">
            "Profyl was built on a simple belief — when your experience is
            presented with clarity and intention, opportunities follow."
          </blockquote>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-900 sm:text-sm">
            Muhammad Hasan
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
            Profyl
          </p>
        </div>
      </div>

      <div className="bg-white py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-20 text-center">
            <h2 className="serif-text text-2xl font-medium text-slate-900 md:text-4xl">
              Crafted for Excellence
            </h2>
            <p className="mt-4 text-slate-500 font-light italic">
              The technical foundations of professional presentation.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <div className="py-6 flex justify-between items-baseline border-b border-slate-100">
                <h1 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  Markdown Support
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-tighter italic">
                  Native Editing
                </p>
              </div>

              <div className="py-6 flex justify-between items-baseline border-b border-slate-100">
                <h1 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  PDF/A Compliance
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-tighter italic">
                  Archival Grade
                </p>
              </div>

              <div className="py-6 flex justify-between items-baseline border-b border-slate-100">
                <h1 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  Vector Export
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-tighter italic">
                  Infinite Scaling
                </p>
              </div>

              <div className="py-6 flex justify-between items-baseline border-b border-slate-100">
                <h1 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  Grid Alignment
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-tighter italic">
                  Mathematical Balance
                </p>
              </div>

              <div className="py-6 flex justify-between items-baseline border-b border-slate-100 md:border-b-0">
                <h1 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  Multi-Page Continuity
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-tighter italic">
                  Editorial Flow
                </p>
              </div>

              <div className="py-6 flex justify-between items-baseline md:border-b-0">
                <h1 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                  Bespoke Specimens
                </h1>
                <p className="text-xs text-slate-400 uppercase tracking-tighter italic">
                  Curated Styles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 bg-[#f4f1ee] py-36">
        <div className="flex flex-col items-center text-center p-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl text-slate-900 font-medium leading-[1.1] tracking-tight font-serif">
              Ready to draft your professional Profyl?
            </h1>
            <p className="text-xl leading-relaxed text-slate-600 font-light mt-10">
              Begin with the substance. Refine with aesthetic. Command the room
              before you enter it.
            </p>
          </div>

          <div
            onClick={() => navigate("/resumePreview")}
            className="mt-15 flex flex-col gap-3 items-center cursor-pointer"
          >
            <p className="uppercase font-medium tracking-widest leading-relaxed text-slate-900 text-md flex items-center gap-2">
              Create Your Profyl
              <span className="inline-block text-xl">➔</span>
            </p>
            <span className="border border-slate-700 w-full max-w-xs"></span>
          </div>
        </div>
      </div>

      <footer className="px-10 ">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="flex items-center gap-2 cursor-pointer py-2">
            <div className="bg-black p-2 rounded-lg">
              <FileText className="text-white w-4 h-4" />
            </div>
            <h1 className="uppercase text-xl tracking-tight font-semibold text-gray-900">
              Profyl
            </h1>
          </div>
          <div className="text-slate-500 flex flex-row gap-3 tracking-wide leading-relaxed uppercase">
            <div className="text-slate-500 flex flex-row gap-3 tracking-wide leading-relaxed uppercase">
              <a
                href="https://github.com/MuhammadHasan-04"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                Github
              </a>
              <a
                href="https://www.instagram.com/hasan.__.altaf/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/muhammadhasanaltaf/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
