import type { HeroSectionProps } from "../types/HeroSectionProps";

export const HeroSection: React.FC<HeroSectionProps> = ({
  firstName = "ARYAN",
  lastName = "PRADHAN",
  title = "Software Developer",
  description = "Designing and developing digital products",
  ctaText = "Let's Collaborate",
  profileImageUrl = "client/src/components/portfolio/assets/image.png",
  socialLinks = [
    { icon: "github", label: "GitHub", url: "#" },
    { icon: "linkedin", label: "LinkedIn", url: "#" },
    { icon: "mail", label: "Email", url: "#" },
    { icon: "twitter", label: "Twitter", url: "#" },
  ],
}) => {
  return (
    <div className="min-h-screen bg-white px-8 py-16 flex flex-col">
      {/* Name */}
      <div className="mb-20 max-w-full text-center h-25">
        <h1 className="font-bungee text-[145px] font-bold leading-none">
          <span
            className="inline-block"
            style={{
              WebkitTextStroke: "2px #1A1A1A",
              color: "transparent",
              marginRight: "0.15em",
            }}
          >
            {firstName}
          </span>
          <span className="inline-block text-black">{lastName}</span>
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex items-center justify-between gap-6">
        {/* Left Section - Title, Description, Button */}
        <div className="">
          {/* Title and Description */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">{title}</h2>
            <p className="text-lg text-gray-600 font-lora">{description}</p>
          </div>

          {/* CTA Button */}
          <button
            className="px-8 py-4 bg-[#1A1A1A] text-white rounded-full font-lora text-base font-medium hover:bg-[#333333] transition-colors flex items-center gap-2 inline-flex"
            aria-label={ctaText}
          >
            {ctaText}
            <span className="text-sm">↗</span>
          </button>
        </div>

        {/* Center - Profile Image */}
        <div className="flex justify-center">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-80 h-96 object-cover rounded-lg grayscale"
          />
        </div>

        {/* Right Section - Social Links */}
        <div className="flex flex-col gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="flex items-center gap-3 px-6 py-3 border border-[#1A1A1A] rounded-full hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              <span className="text-xl">
                {link.icon === "github" && "↗"}
                {link.icon === "linkedin" && "in"}
                {link.icon === "mail" && "✉"}
                {link.icon === "twitter" && "𝕏"}
              </span>
              <span className="font-lora text-sm font-medium">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
