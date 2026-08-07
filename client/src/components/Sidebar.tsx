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
          <ul className="font-menu text-menu-labels">
            <li> Home </li>
            <li> Finance </li>
            <li> Media </li>
            <li> Projects </li>
          </ul>
        </div>
      </aside>
    </main>
  );
};
