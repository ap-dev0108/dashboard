import { Outlet } from "react-router-dom";
import { Header } from "../components/Headers/Header";

export const RootLayout = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
};
