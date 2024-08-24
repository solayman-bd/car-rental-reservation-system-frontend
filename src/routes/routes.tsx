import AboutUs from "@/features/aboutUs/AboutUs";
import CarDetailPage from "@/features/carDetailPage/CarDetailPage";
import CarsPage from "@/features/carsPage/CarsPage";
import { HomePage } from "@/features/homePage/HomePage";
import NotFoundPage from "@/features/NotFoundPage/NotFoundPage";
import AppLayout from "@/layout/AppLayout";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cars",
        element: <CarsPage />,
      },
      {
        path: "/cars/:carId",
        element: <CarDetailPage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
