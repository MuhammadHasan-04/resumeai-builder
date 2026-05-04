import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileText, Menu, X, LogOut, ChevronDown } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useAuth } from "../contexts/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const auth = useAuth();
  const user = auth.user;
  const isAdminUser = auth.user ? auth.user.role === "admin" : false;

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Navigation items
  const publicNavItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
  ];

  const userNavItems = [
    { label: "Dashboard", path: "/" },
    { label: "Resume Builder", path: "/resumePreview" },
    { label: "Upload Resume", path: "/resumeUpload" },
    { label: "Templates", path: "/templates" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const adminNavItems = [
    { label: "Dashboard", path: "/" },
    { label: "Admin Panel", path: "/admin" },
    { label: "Users", path: "/admin/users" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  let navItems = publicNavItems;
  if (user) {
    navItems = isAdminUser ? adminNavItems : userNavItems;
  }

  // If the current navigation state requests the user view (e.g., admin previewing builder
  // as a regular user), override navItems to show user navigation.
  if (location?.state?.asUser) {
    navItems = userNavItems;
  }

  const topNavItems = navItems.filter(
    (item) => !["/about", "/contact"].includes(item.path),
  );
  const secondaryItems = navItems.filter((item) =>
    ["/about", "/contact"].includes(item.path),
  );

  const exportPdf = async () => {
    try {
      const root = document.querySelector("[data-pdf-export='true']");
      if (!root) {
        alert("No resume preview found. Open Resume Builder to export.");
        return;
      }

      // Clone the resume preview and apply inline safe styles to avoid
      // html2canvas parsing issues with newer color functions (e.g. oklch)
      const clonedRoot = root.cloneNode(true);
      const all = [clonedRoot, ...Array.from(clonedRoot.querySelectorAll("*"))];
      all.forEach((el) => {
        try {
          el.style.color = "#111827";
          el.style.backgroundColor = "transparent";
          el.style.borderColor = "#d1d5db";
          el.style.caretColor = "#111827";
          el.style.fill = "currentColor";
          el.style.stroke = "currentColor";
          el.style.boxShadow = "none";
          el.style.textShadow = "none";
          el.style.filter = "none";
        } catch (e) {
          // ignore
        }
      });

      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "0";
      wrapper.style.zIndex = "99999";
      wrapper.appendChild(clonedRoot);
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(clonedRoot, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(wrapper);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const filename = (document.title || "resume")
        .replace(/\s+/g, "_")
        .toLowerCase();
      pdf.save(`${filename}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to export PDF. See console for details.");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <div className="bg-black p-2 rounded-lg">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="uppercase text-lg tracking-tight font-semibold hidden sm:inline text-slate-900 sm:text-xl md:text-2xl">
              Profyl
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {topNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium transition ${
                  isActive(item.path)
                    ? "text-slate-900 border-b-2 border-slate-900 pb-1"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}

            {secondaryItems.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen((prev) => !prev)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
                >
                  More <ChevronDown className="w-4 h-4" />
                </button>
                {isMoreOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
                    {secondaryItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setIsMoreOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu / Logout - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={exportPdf}
              className="text-sm font-medium px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Export PDF
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {user.name}
                  </span>
                  {isAdminUser && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                      ADMIN
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <div className="flex flex-col gap-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition ${
                    isActive(item.path)
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="px-4 pt-2">
                <button
                  onClick={() => {
                    exportPdf();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100"
                >
                  Export PDF
                </button>
              </div>

              {/* Mobile User Menu */}
              {user && (
                <>
                  <div className="px-4 py-3 bg-slate-100 rounded-lg my-2">
                    <p className="text-sm font-medium text-slate-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-600">{user.email}</p>
                    {isAdminUser && (
                      <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
