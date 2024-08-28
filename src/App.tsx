import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";

import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "./redux/store";
export default function App() {
  return (
    <Provider store={store}>
      <div className="overflow-x-hidden bg-gradient-to-b from-green-50 to-green-100 min-h-screen px-8">
        <RouterProvider router={router} />
      </div>
      <Toaster />
    </Provider>
  );
}
