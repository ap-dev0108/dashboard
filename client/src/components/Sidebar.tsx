import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BarChart3, DollarSign, Grid3x3 } from "lucide-react";

interface NavItem {
  icon: React.ComponentType<{ size: number }>;
  label: string;
  href: string;
}

export const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BarChart3, label: "Reviews", href: "/media" },
    { icon: DollarSign, label: "Finance", href: "/finances" },
    { icon: Grid3x3, label: "Projects", href: "/projects" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-8 py-8">
        <h1 className="text-4xl font-bold text-blue-600">Aryan</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3"
                    : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
                }`
              }
            >
              <Icon size={24} />
              <span className="text-lg font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer space */}
      <div className="px-4 py-4"></div>
    </aside>
  );
};

export default Sidebar;
