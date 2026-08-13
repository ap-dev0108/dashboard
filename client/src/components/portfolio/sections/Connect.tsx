import React, { useState } from "react";

interface LetsConnectProps {
  heading?: string;
  description?: string;
  resumeHeading?: string;
  resumeDescription?: string;
  resumeUrl?: string;
}

export const LetsConnect: React.FC<LetsConnectProps> = ({
  heading = "LET'S CONNECT",
  description = "Have a project in mind or want to explore opportunities? Fill out the form below.",
  resumeHeading = "GRAB MY RESUME",
  resumeDescription = "Get a detailed overview of my skills, experience, and educational background.",
  resumeUrl = "#",
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    iAm: "Company / Agency",
    purpose: "Work with me",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="bg-black text-white py-24 px-8 min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex gap-24">
          {/* Left Column - Form */}
          <div className="flex-1 pr-8">
            {/* Heading */}
            <h2 className="font-bungee text-8xl font-black text-white mb-12">
              {heading}
            </h2>

            {/* Description */}
            <p className="font-lora text-base text-gray-400 mb-16 max-w-md leading-relaxed">
              {description}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg">
              {/* Full Name */}
              <div>
                <label className="text-xs font-bold text-white tracking-widest mb-4 block">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full bg-transparent border border-gray-600 px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-white tracking-widest mb-4 block">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border border-gray-600 px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              {/* Two Column Row */}
              <div className="grid grid-cols-2 gap-8">
                {/* I Am */}
                <div>
                  <label className="text-xs font-bold text-white tracking-widest mb-4 block">
                    I AM A...
                  </label>
                  <div className="relative">
                    <select
                      value={formData.iAm}
                      onChange={(e) =>
                        setFormData({ ...formData, iAm: e.target.value })
                      }
                      className="w-full bg-transparent border border-gray-600 px-6 py-4 text-white focus:outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                    >
                      <option
                        value="Company / Agency"
                        className="bg-black text-white"
                      >
                        Company / Agency
                      </option>
                      <option
                        value="Freelancer"
                        className="bg-black text-white"
                      >
                        Freelancer
                      </option>
                      <option
                        value="Individual"
                        className="bg-black text-white"
                      >
                        Individual
                      </option>
                    </select>
                    <div className="pointer-events-none absolute right-6 top-1/2 transform -translate-y-1/2">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        stroke="currentColor"
                        className="text-gray-400"
                      >
                        <polyline points="1 1 6 6 11 1"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="text-xs font-bold text-white tracking-widest mb-4 block">
                    PURPOSE
                  </label>
                  <div className="relative">
                    <select
                      value={formData.purpose}
                      onChange={(e) =>
                        setFormData({ ...formData, purpose: e.target.value })
                      }
                      className="w-full bg-transparent border border-gray-600 px-6 py-4 text-white focus:outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                    >
                      <option
                        value="Work with me"
                        className="bg-black text-white"
                      >
                        Work with me
                      </option>
                      <option value="Hire" className="bg-black text-white">
                        Hire
                      </option>
                      <option
                        value="Collaborate"
                        className="bg-black text-white"
                      >
                        Collaborate
                      </option>
                    </select>
                    <div className="pointer-events-none absolute right-6 top-1/2 transform -translate-y-1/2">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        stroke="currentColor"
                        className="text-gray-400"
                      >
                        <polyline points="1 1 6 6 11 1"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold text-white tracking-widest mb-4 block">
                  MESSAGE
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={7}
                  className="w-full bg-transparent border border-gray-600 px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-white text-black font-bungee text-base font-black py-6 hover:bg-gray-200 transition-colors tracking-wide"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-700"></div>

          {/* Right Column - Resume */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {/* PDF Icon */}
            <div className="mb-12">
              <div className="w-20 h-24 bg-gray-600 rounded flex items-center justify-center relative">
                {/* Folded corner effect */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-gray-700"></div>
                {/* PDF Text */}
                <div className="text-white font-bold text-sm">PDF</div>
              </div>
            </div>

            {/* Heading */}
            <h3 className="font-bungee text-5xl font-black text-white mb-8 leading-tight">
              {resumeHeading}
            </h3>

            {/* Description */}
            <p className="font-lora text-base text-gray-400 mb-12 max-w-xs leading-relaxed">
              {resumeDescription}
            </p>

            {/* Download Button */}
            <a
              href={resumeUrl}
              download
              className="border-3 border-white px-12 py-5 text-white font-bungee text-base font-black hover:bg-white hover:text-black transition-colors flex items-center gap-4 tracking-wide"
            >
              <span>↓</span>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
