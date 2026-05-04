import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";

export const AdminTemplateManagement = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([
    { id: 1, name: "Default", slug: "default", isBuiltIn: true },
    { id: 2, name: "Clean", slug: "clean", isBuiltIn: true },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddTemplate = () => {
    setError("");
    setSuccessMessage("");

    if (!newTemplateName.trim()) {
      setError("Template name is required");
      return;
    }

    const slug = newTemplateName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    if (templates.some((t) => t.slug === slug)) {
      setError("Template with this name already exists");
      return;
    }

    const newTemplate = {
      id: Math.max(...templates.map((t) => t.id), 0) + 1,
      name: newTemplateName,
      slug,
      isBuiltIn: false,
    };

    setTemplates([...templates, newTemplate]);
    setSuccessMessage(`Template "${newTemplateName}" added successfully`);
    setNewTemplateName("");
    setShowAddForm(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteTemplate = (id, name) => {
    const template = templates.find((t) => t.id === id);
    if (template?.isBuiltIn) {
      setError("Cannot delete built-in templates");
      return;
    }

    if (window.confirm(`Are you sure you want to delete template "${name}"?`)) {
      setTemplates(templates.filter((t) => t.id !== id));
      setSuccessMessage(`Template "${name}" deleted successfully`);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Manage Templates
              </h1>
              <p className="text-slate-600">Add or delete resume templates</p>
            </div>
            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-medium hover:bg-slate-200 transition-all duration-200"
            >
              Back to Admin
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Add Template Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Add New Template
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              {showAddForm ? "Cancel" : "Add Template"}
            </button>
          </div>

          {showAddForm && (
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter template name (e.g., Modern, Minimal, Executive)"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTemplate()}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                autoFocus
              />
              <button
                onClick={handleAddTemplate}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
              >
                Save
              </button>
            </div>
          )}
        </div>

        {/* Templates Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Templates</h2>
          </div>

          {templates.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-600">No templates found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((template) => (
                    <tr
                      key={template.id}
                      className="border-b border-slate-200 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                        {template.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {template.slug}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            template.isBuiltIn
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {template.isBuiltIn ? "Built-In" : "Custom"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() =>
                            handleDeleteTemplate(template.id, template.name)
                          }
                          disabled={template.isBuiltIn}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium transition ${
                            template.isBuiltIn
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-700 text-sm">
            <strong>Note:</strong> Built-in templates (Default, Clean) cannot be
            deleted. Custom templates can be added and removed at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplateManagement;
