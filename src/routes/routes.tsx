import AboutUs from "@/features/aboutUs/AboutUs";
import CarDetailPage from "@/features/carDetailPage/CarDetailPage";
import CarsPage from "@/features/carsPage/CarsPage";
import AdminDashboard from "@/features/dashboardPage/adminDashboard/AdminDashboard";

import UserDashboardPage from "@/features/dashboardPage/userDashboard/UserDashboardPage";
import { HomePage } from "@/features/homePage/HomePage";
import NotFoundPage from "@/features/NotFoundPage/NotFoundPage";
import SignInPage from "@/features/signInPage/SignInPage";
import SignUpPage from "@/features/signUpPage/signUpPage";
import AppLayout from "@/layout/AppLayout";
import ProtectedRoute from "@/layout/ProtectedRoute";
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
        path: "/user-dashboard",
        element: (
          <ProtectedRoute role="user">
            <UserDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
