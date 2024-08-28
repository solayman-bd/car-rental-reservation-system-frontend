// components/PersonalInformation.tsx
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const PersonalInformation: FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Personal Information
      </h3>
      <div className="space-y-2">
        <p className="text-gray-700">
          <strong>Name:</strong> {userInfo?.user?.name || "Not provided"}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {userInfo?.user?.email || "Not provided"}
        </p>
        <p className="text-gray-700">
          <strong>Role:</strong> {userInfo?.user?.role || "Not provided"}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong>
          {userInfo?.user?.phone
            ? userInfo?.user?.phone
            : "No phone number added. Please update to display."}
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong>
          {userInfo?.user?.address
            ? userInfo?.user?.address
            : "No address added. Please update your profile."}
        </p>
        <p className="text-gray-700">
          <strong>Preferences:</strong>
          {userInfo?.user?.preferences?.length
            ? userInfo?.user?.preferences.join(", ")
            : "No preferences added. Please update your profile."}
        </p>
      </div>
      <div className="mt-4">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Update User
        </Button>
      </div>
    </div>
  );
};

export default PersonalInformation;
