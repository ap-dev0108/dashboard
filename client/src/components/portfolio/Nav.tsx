import { Menu } from "./Menu";
import type { HeaderProps } from "./types/HeaderProps";

export const Header: React.FC<HeaderProps> = ({
  statusText = "Available for New Project",
  menuItems = ["Work", "Services", "Experience", "Contact"],
  menuItemCounts = { Work: 2, Services: 2, Experience: 2 },
  buttonText = "Let's Talk",
}) => {
  return (
    <header
      className="flex justify-between items-center px-8 py-6 font-lora bg-white border-b"
      style={{ borderColor: "rgba(26, 26, 26, 0.15)" }}
    >
      {/* Status Badge */}
      <div className="flex items-center gap-3 border border-[#1a1a1a] opacity-\[15\%\] rounded-full px-6 py-4">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
        <span className="text-sm font-medium text-[#1A1A1A] font-aryan">{statusText}</span>
      </div>

      {/* Menu */}
      <Menu items={menuItems} itemCounts={menuItemCounts} />

      {/* CTA Button */}
      <button
        className="px-6 py-3 bg-[#212223] text-white rounded-full font-lora text-sm font-medium hover:bg-[#2a2b2c] transition-colors flex items-center gap-2"
        aria-label={buttonText}
      >
        {buttonText}
        <span className="text-xs">↗</span>
      </button>
    </header>
  );
};
