import { RootLayout } from "../layout/RootLayout";
import AllFinances from "../pages/finance";
import { createBrowserRouter } from "react-router-dom";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: AllFinances,
      },
    ],
  },
]);
