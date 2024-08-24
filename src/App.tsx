import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-green-50 to-green-100 min-h-screen px-8">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
