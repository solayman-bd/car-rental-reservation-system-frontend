// components/BookingManagement.tsx
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { IBooking } from "@/interfaces/Booking"; // Import your booking interface

const dummyBookings: IBooking[] = [
  {
    carId: "64d7c6ef2fef1a59c8975fb1", // Example ObjectId
    hiringDate: "2024-08-01",
    returningDate: "2024-08-05",
    startTime: "10:00",
    endTime: "14:00",
    user: "64d7c6ef2fef1a59c8975fa1",
    car: "64d7c6ef2fef1a59c8975fc2",
    totalCost: 100,
    status: "Confirmed",
    additionalFeatures: ["GPS", "Child Seat"],
    startLocation: "Los Angeles",
  },
  {
    carId: "64d7c6ef2fef1a59c8975fb2",
    hiringDate: "2024-08-10",
    returningDate: "2024-08-12",
    startTime: "09:00",
    endTime: null,
    user: "64d7c6ef2fef1a59c8975fa2",
    car: "64d7c6ef2fef1a59c8975fc3",
    totalCost: 200,
    status: "Pending",
    additionalFeatures: ["Bike Rack"],
    startLocation: "New York",
  },
];

const BookingManagement: FC = () => {
  const upcomingBookings = dummyBookings.filter(
    (booking) => new Date(booking.hiringDate) >= new Date()
  );

  const pastBookings = dummyBookings.filter(
    (booking) => new Date(booking.hiringDate) < new Date()
  );

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Booking Management
      </h2>

      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Upcoming Bookings
        </h3>
        {upcomingBookings.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Car ID
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Hiring Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Returning Date
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
              {upcomingBookings.map((booking, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.carId}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.hiringDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.returningDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.startTime}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">You have no upcoming bookings.</p>
        )}

        <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          Past Bookings
        </h3>
        {pastBookings.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Car ID
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Hiring Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
                  Returning Date
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
              {pastBookings.map((booking, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.carId}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.hiringDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.returningDate}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.startTime}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">You have no past bookings.</p>
        )}

        <div className="mt-4">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Bookings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
