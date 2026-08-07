import { Sidebar } from "../components/Sidebar";
import AllFinances from "../pages/finance";
import Medias from "../pages/media";

export const RootLayout = () => {
  return (
    <section className="grid grid-cols-2 gap-5">
      <Sidebar />
      <div className="grid grid-cols-2 gap-6">
        <AllFinances />
        <Medias />
      </div>
    </section>
  );
};
