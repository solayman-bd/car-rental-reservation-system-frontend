// pages/DashboardPage.tsx
import { FC, useState } from "react";

import Sidebar from "./components/Sidebar";
import PersonalInformation from "./components/PersonalInformation";
import ManageCars from "./components/ManageCars";
import ManageBookings from "./components/ManageBookings";
import ManageReturnCars from "./components/ManageReturnCars";
import UserManagement from "./components/UserManagement";

const AdminDashboardPage: FC = () => {
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

        {selectedSection === "managecars" && <ManageCars />}

        {selectedSection === "managebookings" && <ManageBookings />}
        {selectedSection === "managereturncars" && <ManageReturnCars />}

        {selectedSection === "usermanagement" && <UserManagement />}
      </main>
    </div>
  );
};

export default AdminDashboardPage;
