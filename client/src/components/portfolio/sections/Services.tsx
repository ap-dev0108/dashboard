interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta?: string;
}

interface ServicesOfferingProps {
  heading?: string;
  services?: ServiceCard[];
}

export const ServicesOffering: React.FC<ServicesOfferingProps> = ({
  heading = "WHAT I'M OFFERING",
  services = [
    {
      id: "1",
      icon: "code",
      title: "Fullstack development",
      description: "End-to-end development of web applications. From designing intuitive interfaces to building robust backend architectures. Ensuring scalability, performance, and security.",
      cta: "Let's Talk",
    },
    {
      id: "2",
      icon: "monitor",
      title: "Frontend Engineering",
      description: "Crafting pixel-perfect, responsive, and accessible user interfaces. Utilizing modern frameworks like React and Vue to deliver seamless user experiences.",
      cta: "Let's Talk",
    },
    {
      id: "3",
      icon: "server",
      title: "Backend Architecture",
      description: "Designing RESTful APIs and microservices. Database modeling, optimization, and secure server-side logic using Node.js, Python, or Go.",
      cta: "Let's Talk",
    },
  ],
}) => {
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "code":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-800"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case "monitor":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-800"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        );
      case "server":
        return (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-800"
          >
            <rect x="2" y="2" width="20" height="8" rx="1" ry="1"></rect>
            <rect x="2" y="14" width="20" height="8" rx="1" ry="1"></rect>
            <line x1="6" y1="6" x2="6" y2="6.01"></line>
            <line x1="6" y1="18" x2="6" y2="18.01"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-gray-100 py-32 px-8">
      {/* Heading */}
      <div className="text-center mb-24">
        <h2 className="font-bungee text-8xl font-black text-black tracking-tight leading-none">
          {heading}
        </h2>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-800 rounded-3xl p-8 flex flex-col justify-between h-full"
            >
              {/* Icon Container */}
              <div className="mb-8">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                  {renderIcon(service.icon)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-lora text-gray-400 text-base leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              {/* CTA Button */}
              <button className="self-start px-7 py-3 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
                {service.cta || "Learn More"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};