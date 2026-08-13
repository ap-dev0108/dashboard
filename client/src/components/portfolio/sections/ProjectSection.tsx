interface Project {
  id: string;
  title: string;
  url: string;
}

interface SelectedWorksProps {
  heading?: string;
  description?: string;
  descriptionSubtext?: string;
  projects?: Project[];
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({
  heading = "Write something about the selected projects or works",
  description = "Curated collection of recent projects showcasing full-stack development capabilities and design-centric solutions.",
  descriptionSubtext = "Selected Works",
  projects = [
    { id: "1", title: "Blogspot", url: "#" },
    { id: "2", title: "Idk", url: "#" },
    { id: "3", title: "Dokan", url: "#" },
    { id: "4", title: "Ascendly", url: "#" },
  ],
}) => {
  return (
    <section className="bg-black text-white py-24 px-8">
      {/* Section Title */}
      <div className="mb-16">
        <h2 className="font-bungee text-5xl font-bold flex items-center gap-3 justify-center">
          <span className="text-center">⚡</span>
          SELECTED WORKS
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Left - Description Card */}
        <div className="shrink-0 w-80 border-4 border-white p-8 flex flex-col justify-between">
          <div className="flex flex-col align-middle cursor-vertical-text">
            <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
              {heading}
            </h3>
            <p className="font-lora text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Right - Projects Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                className="group relative bg-white h-80 flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                {/* Project Title */}
                <h3 className="font-bungee text-4xl font-bold text-black text-center px-6 group-hover:scale-110 transition-transform duration-300">
                  {project.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
