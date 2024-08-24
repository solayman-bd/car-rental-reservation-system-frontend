import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/NavBar";

import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <FooterSection />
    </div>
  );
};

export default AppLayout;
