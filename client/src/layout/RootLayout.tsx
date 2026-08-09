import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/Header";

export const RootLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
};
