import React from "react";
import { FileText, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg">
                <FileText className="text-slate-900 w-6 h-6" />
              </div>
              <span className="font-bold text-xl">Profyl</span>
            </div>
            <p className="text-slate-300 text-sm">
              Create stunning, ATS-optimized resumes with Profyl
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/resumePreview")}
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  Resume Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/templates")}
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/resumeUpload")}
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  Upload Resume
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-300 hover:text-white transition text-sm"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 p-2.5 rounded-lg transition"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 p-2.5 rounded-lg transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-700 hover:bg-slate-600 p-2.5 rounded-lg transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@profyl.com"
                className="bg-slate-700 hover:bg-slate-600 p-2.5 rounded-lg transition"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              &copy; {currentYear} Profyl. All rights reserved.
            </p>

            {/* Footer Links */}
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
