interface TechBadge {
  name: string;
}

interface TechnicalArsenalProps {
  heading?: string;
  firstRow?: TechBadge[];
  secondRow?: TechBadge[];
}

export const TechnicalArsenal: React.FC<TechnicalArsenalProps> = ({
  heading = "TECHNICAL ARSENAL",
  firstRow = [
    { name: "JAVASCRIPT" },
    { name: "TYPESCRIPT" },
    { name: "REACT" },
    { name: "NEXT.JS" },
    { name: "NODE.JS" },
    { name: "EXPRESS" },
  ],
  secondRow = [
    { name: "MONGODB" },
    { name: "POSTGRESQL" },
    { name: "TAILWIND CSS" },
    { name: "GIT" },
    { name: "DOCKER" },
  ],
}) => {
  return (
    <section className="bg-white py-40 px-8">
      {/* Heading */}
      <div className="text-center mb-24">
        <h2 className="font-bungee text-8xl font-black text-black tracking-tight">
          {heading}
        </h2>
      </div>

      {/* Tech Badges Container */}
      <div className="flex flex-col items-center gap-12">
        {/* First Row */}
        <div className="flex flex-wrap justify-center gap-6">
          {firstRow.map((tech, index) => (
            <div
              key={index}
              style={{
                filter: "drop-shadow(6px 6px 0px rgba(0, 0, 0, 1))",
              }}
            >
              <div className="bg-white border-4 border-black px-8 py-4">
                <span className="font-bungee text-sm font-black text-black whitespace-nowrap tracking-wide">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div 
          className="flex flex-wrap justify-center gap-6"
          style={{ marginLeft: "90px" }}
        >
          {secondRow.map((tech, index) => (
            <div
              key={index}
              style={{
                filter: "drop-shadow(6px 6px 0px rgba(0, 0, 0, 1))",
              }}
            >
              <div className="bg-white border-4 border-black px-8 py-4">
                <span className="font-bungee text-sm font-black text-black whitespace-nowrap tracking-wide">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};