// pages/DashboardPage.tsx
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Sidebar from "./components/Sidebar";
import PersonalInformation from "./components/PersonalInformation";
import BookingManagement from "./components/BookingManagement";
import PaymentManagement from "./components/PaymentManagement";

const UserDashboardPage: FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth);
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedSection, setSelectedSection] = useState("overview");

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="min-h-screen relative flex">
      <Sidebar
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        selectedSection={selectedSection}
        handleSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="mt-10 md:mt-0 md:p-6 w-full">
        {selectedSection === "overview" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              User Dashboard
            </h2>
            <PersonalInformation />
            {/* Add booking history content here if needed */}
          </div>
        )}

        {selectedSection === "booking" && <BookingManagement />}

        {selectedSection === "payment" && <PaymentManagement />}
      </main>
    </div>
  );
};

export default UserDashboardPage;
