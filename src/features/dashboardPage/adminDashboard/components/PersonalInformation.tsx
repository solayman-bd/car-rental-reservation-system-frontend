import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import UpdateUserModal from "./updateUserModal";
import { useGetAllCarsQuery } from "@/redux/features/cars/carsApi";
import { useGetAllBookingsQuery } from "@/redux/features/bookings/bookingApi";
import { ICar } from "@/components/Card";
import { IBooking } from "@/redux/features/bookings/bookingSlice";
import LoadingSpinner from "@/components/LoadingSpinner";

const DashboardOverview: FC = () => {
  const { data: cars = [], isLoading: isCarsLoading } =
    useGetAllCarsQuery(undefined);
  const { data: bookings = [], isLoading: isBookingsLoading } =
    useGetAllBookingsQuery(undefined);

  // Assuming each car object has an `isAvailable` property
  const availableCars = cars?.data?.filter(
    (car: ICar) => car.isCurrentlyHired == false && car.isDeleted == false
  ).length;

  // Calculate total bookings and revenue
  const totalBookings = bookings?.data?.length || 0;
  const currentlyActiveBookings =
    bookings?.data?.filter((item: IBooking) => item.isPaid == false).length ||
    0;

  const totalPaidBookings =
    bookings?.data?.filter((item: IBooking) => item.isPaid == true).length || 0;
  const cancelledBookings =
    bookings?.data?.filter((item: IBooking) => item.status == "cancelled")
      .length || 0;
  const totalRevenue =
    bookings?.data
      ?.filter((item: IBooking) => item.isPaid == true)
      .reduce((sum: number, booking: IBooking) => sum + booking.totalCost, 0) ||
    0;

  if (isCarsLoading || isBookingsLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className=" p-4 rounded-lg mb-6 border-gray-200  shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-lg font-medium text-gray-700">Total Bookings</h4>
          <p className="text-2xl font-bold text-blue-500">{totalBookings}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-lg font-medium text-gray-700">
            Currently Active Bookings
          </h4>
          <p className="text-2xl font-bold text-blue-500">
            {currentlyActiveBookings}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-lg font-medium text-gray-700">
            Cancelled Bookings
          </h4>
          <p className="text-2xl font-bold text-blue-500">
            {cancelledBookings}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-lg font-medium text-gray-700">
            Total Paid Bookings
          </h4>
          <p className="text-2xl font-bold text-blue-500">
            {totalPaidBookings}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-lg font-medium text-gray-700">Available Cars</h4>
          <p className="text-2xl font-bold text-green-500">{availableCars}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h4 className="text-lg font-medium text-gray-700">Revenue</h4>
          <p className="text-2xl font-bold text-yellow-500">
            ${totalRevenue?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const PersonalInformation: FC = () => {
  const userInfo = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* Dashboard Overview Section */}
      <DashboardOverview />

      {/* Personal Information Section */}
      <div className=" p-6 shadow-lg border-gray-200 rounded-lg mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Personal Information
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            <strong>Name: </strong> {userInfo?.user?.name || "Not provided"}
          </p>
          <p className="text-gray-700">
            <strong>Email: </strong> {userInfo?.user?.email || "Not provided"}
          </p>
          <p className="text-gray-700">
            <strong>Role: </strong> {userInfo?.user?.role || "Not provided"}
          </p>
          <p className="text-gray-700">
            <strong>Phone: </strong>
            {userInfo?.user?.phone
              ? userInfo?.user?.phone
              : "No phone number added. Please update to display."}
          </p>
          <p className="text-gray-700">
            <strong>Address: </strong>
            {userInfo?.user?.address
              ? userInfo?.user?.address
              : "No address added. Please update your profile."}
          </p>
          <p className="text-gray-700">
            <strong>Preferences: </strong>
            {userInfo?.user?.preferences?.length
              ? userInfo?.user?.preferences.join(", ")
              : "No preferences added. Please update your profile."}
          </p>
        </div>
        <div className="mt-4">
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Update User
          </Button>
        </div>
        <UpdateUserModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          userInfo={userInfo}
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
