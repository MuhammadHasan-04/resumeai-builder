import React from "react";
import { Link, useLocation } from "react-router-dom";

const titleBySegment = {
  about: "About",
  contact: "Contact",
  admin: "Admin",
  users: "Users",
  templates: "Templates",
  resumePreview: "Resume Builder",
  resumeUpload: "Upload Resume",
  "resume-history": "Resume History",
};

export const Breadcrumbs = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="w-full bg-[#f4f1ee] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-slate-600">
        <Link to="/" className="hover:text-slate-900 transition">
          Home
        </Link>
        {pathParts.map((part, index) => {
          const to = `/${pathParts.slice(0, index + 1).join("/")}`;
          const isLast = index === pathParts.length - 1;
          const label =
            titleBySegment[part] ||
            part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <span key={to}>
              <span className="mx-2 text-slate-400">/</span>
              {isLast ? (
                <span className="font-semibold text-slate-900">{label}</span>
              ) : (
                <Link to={to} className="hover:text-slate-900 transition">
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};
