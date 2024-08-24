import { HomePage } from "@/features/homepage/HomePage";
import AppLayout from "@/layout/AppLayout";

import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
