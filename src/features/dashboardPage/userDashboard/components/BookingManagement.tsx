import { FC, useState } from "react";
import { useGetMyBookingsQuery } from "@/redux/features/bookings/bookingApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";

import UpdateBookingModal from "./UpdateBookingModal";
import { IBooking } from "@/redux/features/bookings/bookingSlice";
import DeleteModal from "./DeleteModal";

const BookingManagement: FC = () => {
  const [deleteModalInfo, setDeleteModalInfo] = useState<{
    isOpen: boolean;
    booking: null | IBooking;
  }>({ isOpen: false, booking: null });
  const handleCancel = (booking: IBooking) => {
    setDeleteModalInfo((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      booking: booking,
    }));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetMyBookingsQuery(undefined);
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Booking Management
      </h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Past Bookings
          </h3>
          {data?.data?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full w-full bg-white">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Car Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Start Location
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Hiring Date
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Start Time
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((booking: IBooking, index: number) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                        {booking?.car.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                        {booking.startLocation}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                        {booking.hiringDate}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                        {booking.startTime}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 cursor-pointer">
                        <Button variant={"outline"}>{booking.status}</Button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 cursor-pointer">
                        <button
                          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600  ${
                            (booking.status == "approved" ||
                              booking.status == "cancelled") &&
                            "cursor-not-allowed opacity-55"
                          }`}
                          disabled={
                            booking.status == "approved" ||
                            booking.status == "cancelled"
                          }
                          onClick={() => setIsModalOpen(!isModalOpen)}
                        >
                          Modify Booking
                        </button>
                        <UpdateBookingModal
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                          booking={booking}
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700 cursor-pointer">
                        <button
                          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600  ${
                            booking.status == "approved" &&
                            "cursor-not-allowed opacity-55"
                          }`}
                          disabled={booking.status == "approved"}
                          onClick={() => handleCancel(booking)}
                        >
                          Cancel Booking
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {deleteModalInfo.isOpen && (
                  <DeleteModal
                    setDeleteModalInfo={setDeleteModalInfo}
                    deleteModalInfo={deleteModalInfo}
                  />
                )}
              </table>
            </div>
          ) : (
            <p className="text-gray-700">You have no past bookings.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
