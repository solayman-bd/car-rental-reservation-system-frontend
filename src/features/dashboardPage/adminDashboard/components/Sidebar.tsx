// components/Sidebar.tsx
import { FC } from "react";
import hamIcon from "../assets/hamburgerIcon.svg";
interface SidebarProps {
  showSideBar: boolean;
  setShowSideBar: (show: boolean) => void;
  selectedSection: string;
  handleSectionChange: (section: string) => void;
}

const Sidebar: FC<SidebarProps> = ({
  showSideBar,
  setShowSideBar,
  selectedSection,
  handleSectionChange,
}) => {
  return (
    <>
      <img
        onClick={() => setShowSideBar(!showSideBar)}
        className="h-10 w-10 rounded-md md:hidden cursor-pointer text-gray-700 z-20 bg-slate-300 absolute top-0"
        src={hamIcon}
        alt="hamburger-icon"
      />
      <aside
        className={`absolute top-10 min-h-[95%] ${
          showSideBar ? "translate-x-0" : "translate-x-[-500%]"
        } transition-transform duration-300 bg-gray-800 text-white p-4 rounded-sm md:static md:w-1/6 md:translate-x-0`}
      >
        <ul className="space-y-2">
          {[
            "overview",
            "Manage Cars",
            "Manage Bookings",
            "Manage Return Cars",
            "User Management",
          ].map((section) => (
            <li
              key={section}
              className={`cursor-pointer p-2 rounded ${
                selectedSection === section
                  ? "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => {
                handleSectionChange(
                  section.split(" ").join("").toLocaleLowerCase()
                );
                setShowSideBar(!showSideBar);
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
