import AboutUs from "@/features/aboutUs/AboutUs";
import CarDetailPage from "@/features/carDetailPage/CarDetailPage";
import CarsPage from "@/features/carsPage/CarsPage";
import DashboardPage from "@/features/dashboardPage/DashboardPage";
import { HomePage } from "@/features/homePage/HomePage";
import NotFoundPage from "@/features/NotFoundPage/NotFoundPage";
import SignInPage from "@/features/signInPage/SignInPage";
import SignUpPage from "@/features/signUpPage/signUpPage";
import AppLayout from "@/layout/AppLayout";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
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
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
