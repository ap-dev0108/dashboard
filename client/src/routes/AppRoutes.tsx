import { RootLayout } from "../layout/RootLayout";
import AllFinances from "../pages/finance";
import { createBrowserRouter } from "react-router-dom";
import Medias from "../pages/media";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: AllFinances,
      },
      {
        path: "/media",
        Component: Medias
      }
    ],
  },
]);
