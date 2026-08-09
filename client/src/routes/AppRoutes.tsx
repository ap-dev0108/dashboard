import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "../layout/RootLayout";

import Home from "../pages/Home";
import LoginPage from "../pages/login";
import Medias from "../pages/media";
import AllFinances from "../pages/finance";
import ProjectsSection from "../pages/project";
import NotFoundPage from "../pages/notFound";

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
        path: "media",
        Component: Medias,
      },
      {
        path: "finances",
        Component: AllFinances,
      },
      {
        path: "projects",
        Component: ProjectsSection,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
