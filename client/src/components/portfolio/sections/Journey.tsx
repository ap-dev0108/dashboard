import React, { useState } from "react";

interface TimelineItem {
  id: string;
  years: string;
  title: string;
  company: string;
  description: string;
}

interface MyJourneyProps {
  heading?: string;
  experienceItems?: TimelineItem[];
  educationItems?: TimelineItem[];
}

export const MyJourney: React.FC<MyJourneyProps> = ({
  heading = "MY JOURNEY",
  experienceItems = [
    {
      id: "1",
      years: "2022 - PRESENT",
      title: "Senior Fullstack Developer",
      company: "Tech Innovators Inc.",
      description:
        "Leading development of enterprise SaaS applications. Mentoring junior developers and architecting scalable cloud solutions using modern stack.",
    },
    {
      id: "2",
      years: "2019 - 2022",
      title: "Frontend Engineer",
      company: "Creative Digital Agency",
      description:
        "Developed interactive, high-performance web experiences for diverse clients. Focused on accessibility and pixel-perfect design implementation.",
    },
  ],
  educationItems = [
    {
      id: "3",
      years: "2019",
      title: "Bachelor of Technology",
      company: "State University",
      description:
        "Computer Science & Engineering. Specialization in Full-Stack Development with focus on modern web technologies and cloud architecture.",
    },
    {
      id: "4",
      years: "2015 - 2019",
      title: "Diploma in Web Development",
      company: "Tech Academy",
      description:
        "Comprehensive training in frontend and backend technologies. Completed multiple industry projects and certifications.",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState<"experience" | "education">(
    "experience",
  );

  const items = activeTab === "experience" ? experienceItems : educationItems;

  return (
    <section className="bg-gray-100 py-32 px-8">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="font-bungee text-8xl font-black text-black tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-32">
        <button
          onClick={() => setActiveTab("experience")}
          className={`px-10 py-4 font-bungee text-base font-black tracking-widest transition-all ${
            activeTab === "experience"
              ? "bg-black text-white border-3 border-black"
              : "bg-white text-black border-3 border-black hover:bg-gray-50"
          }`}
        >
          EXPERIENCE
        </button>
        <button
          onClick={() => setActiveTab("education")}
          className={`px-10 py-4 font-bungee text-base font-black tracking-widest transition-all ${
            activeTab === "education"
              ? "bg-black text-white border-3 border-black"
              : "bg-white text-black border-3 border-black hover:bg-gray-50"
          }`}
        >
          EDUCATION
        </button>
      </div>

      {/* Timeline Container */}
      <div className="max-w-6xl mx-auto relative">
        {/* Horizontal Timeline Line */}
        <div className="absolute left-0 right-0 top-80 h-1 bg-black"></div>

        {/* Timeline Items */}
        <div className="space-y-40">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={item.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute w-5 h-5 bg-black rounded-full left-1/2 transform -translate-x-1/2 top-80 z-10"></div>

                {/* Card Container */}
                <div
                  className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Card */}
                  <div
                    className="w-5/12"
                    style={{
                      filter: "drop-shadow(7px 7px 0px rgba(0, 0, 0, 1))",
                    }}
                  >
                    <div className="bg-white border-4 border-black p-8">
                      {/* Year */}
                      <p className="text-xs font-bold text-gray-600 mb-3 tracking-widest uppercase">
                        {item.years}
                      </p>

                      {/* Title */}
                      <h3 className="text-3xl font-bold text-black mb-2">
                        {item.title}
                      </h3>

                      {/* Company */}
                      <p className="font-lora text-lg italic text-gray-700 mb-5">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p className="font-lora text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
