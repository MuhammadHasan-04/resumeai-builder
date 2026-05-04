import React, { useState } from "react";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#f4f1ee] py-20 sm:py-24 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="mb-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
            Contact
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-slate-900 leading-tight">
            Let&apos;s Talk About Your Career Goals
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
            Questions, feedback, or partnership ideas. Send a message and we
            will get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-serif text-3xl text-slate-900">Reach Us</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Profyl support is available for account issues, feature requests,
            and onboarding help.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-slate-200 rounded-xl p-6 bg-white"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white rounded-lg py-2.5 hover:bg-black transition"
            >
              Send Message
            </button>
          </div>

          {submitted && (
            <p className="mt-4 text-sm text-green-700">
              Thanks, your message has been captured.
            </p>
          )}
        </form>
      </section>
    </div>
  );
};
