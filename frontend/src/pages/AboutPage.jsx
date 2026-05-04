import React from "react";
import { useNavigate } from "react-router-dom";

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#f4f1ee] py-20 sm:py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            Our Story
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-slate-900 leading-tight">
            Built To Make Professional Storytelling Effortless
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
            Profyl was created for students and professionals who want resumes
            that feel intentional, clean, and credible. We focus on structure,
            clarity, and confidence so recruiters can quickly understand your
            impact.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <article className="border border-slate-200 rounded-xl p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">
            Mission
          </p>
          <h2 className="mt-3 text-2xl font-serif text-slate-900">
            Clarity First
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Every section in Profyl is designed to reduce noise and emphasize
            outcomes, so your achievements stand out immediately.
          </p>
        </article>

        <article className="border border-slate-200 rounded-xl p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">
            Approach
          </p>
          <h2 className="mt-3 text-2xl font-serif text-slate-900">
            Modern + Practical
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            We combine practical templates with smart editing tools to help you
            produce polished resumes quickly without sacrificing quality.
          </p>
        </article>

        <article className="border border-slate-200 rounded-xl p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold">
            Promise
          </p>
          <h2 className="mt-3 text-2xl font-serif text-slate-900">
            Career Confidence
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            From your first internship to senior roles, Profyl gives you a
            reliable framework to present your career with confidence.
          </p>
        </article>
      </section>

      <section className="bg-[#f4f1ee] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-3xl text-slate-900">
            Ready to build your next version?
          </h3>
          <p className="mt-4 text-slate-600">
            Start creating your resume in minutes with a layout that feels
            premium and professional.
          </p>
          <button
            onClick={() => navigate("/resumePreview")}
            className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-black transition"
          >
            Start Building
          </button>
        </div>
      </section>
    </div>
  );
};
