interface FooterNavLink {
  label: string;
  url: string;
}

interface FooterProps {
  name?: string;
  navLinks?: FooterNavLink[];
  email?: string;
  copyright?: string;
}

export const Footer: React.FC<FooterProps> = ({
  name = "ARYAN PRADHAN",
  navLinks = [
    { label: "WORK", url: "#" },
    { label: "SERVICES", url: "#" },
    { label: "EXPERIENCE", url: "#" },
  ],
  email = "hello@aryanpradhan.dev",
  copyright = "© 2023 All Rights Reserved.",
}) => {
  return (
    <footer className="bg-black text-white border-t border-gray-900">
      <div className="max-w-full mx-auto px-12 py-16">
        <div className="flex items-center justify-between gap-8">
          {/* Left - Name/Logo */}
          <div className="flex-shrink-0">
            <h2 className="font-bungee text-xl font-black tracking-wider whitespace-nowrap">
              {name}
            </h2>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex gap-16 flex-1 justify-center">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="font-lora text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right - Contact Info */}
          <div className="text-right flex-shrink-0">
            <p className="font-lora text-xs text-gray-400 mb-1 tracking-wide">
              {email}
            </p>
            <p className="font-lora text-xs text-gray-400 tracking-wide">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
