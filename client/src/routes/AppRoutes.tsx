import { RootLayout } from "../layout/RootLayout";
import AllFinances from "../pages/finance";
import { createBrowserRouter } from "react-router-dom";
import Medias from "../pages/media";
import Home from "../pages/Home";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/media",
        Component: Medias,
      },
      {
        path: "/finances",
        Component: AllFinances,
      },
    ],
  },
]);
