import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <main className="px-10 py-4 max-w-100 border-r border-r-[#E5E7EB] max-h-screen">
      <aside className="grid grid-rows-2 gap-7">
        <div className="p-0 m-0">
          <h1 className="text-aryan-display text-aryan-title font-aryan">
            Aryan
          </h1>
        </div>
        <div>
          <ul className="font-menu text-menu-labels flex justify-between">
            <Link to="/"> Home </Link>
            <Link to="/finances"> Finance </Link>
            <Link to="/media"> Media </Link>
            <Link to="/projects"> Projects </Link>
          </ul>
        </div>
      </aside>
    </main>
  );
};
