import { useGetAllBookingsQuery } from "@/redux/features/bookings/bookingApi";
import { IBooking } from "@/redux/features/bookings/bookingSlice";
import { useState, useEffect } from "react";
import ReturnCarModal from "./returnCarModal";

const ManageReturnCars = () => {
  const { data: bookings = [], isLoading } = useGetAllBookingsQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCar, setSelectedCar] = useState<{
    carId: string;
    carName: string;
    user: string;
    startLocation: string;
    startDate: string;
    startTime: string;
    bookingId: string;
    returningDate?: string;
    endTime?: string;
    totalCost?: number;
  } | null>(null);
  const [bookedCars, setBookedCars] = useState<
    {
      carId: string;
      carName: string;
      user: string;
      startLocation: string;
      startDate: string;
      startTime: string;
      bookingId: string;
      status: "approved" | "pending" | "cancelled";
    }[]
  >([]);

  const [returnedButNotPaidCars, setReturnedButNotPaidCars] = useState<
    {
      carId: string;
      carName: string;
      user: string;
      startLocation: string;
      startDate: string;
      startTime: string;
      bookingId: string;
      returningDate: string;
      endTime: string;
      totalCost: number;
    }[]
  >([]);

  useEffect(() => {
    if (bookings?.data) {
      const bookedCarsButNotReturnedNecessaryDetail = bookings.data
        .filter(
          (item: IBooking) => item.totalCost == 0 && item.status == "approved"
        )
        .map((item: IBooking) => ({
          carId: item.car._id,
          carName: item.car.name,
          user: item.user.email,
          startLocation: item.startLocation,
          startDate: item.hiringDate,
          startTime: item.startTime,
          bookingId: item._id,
          status: item.status,
        }));
      setBookedCars(bookedCarsButNotReturnedNecessaryDetail);

      const filteredCars = bookings.data
        .filter(
          (item: IBooking) =>
            item.totalCost != 0 &&
            !item.isPaid &&
            item.returningDate &&
            item.endTime
        )
        .map((item: IBooking) => ({
          carId: item.car._id,
          carName: item.car.name,
          user: item.user.email,
          startLocation: item.startLocation,
          startDate: item.hiringDate,
          startTime: item.startTime,
          bookingId: item._id,
          returningDate: item.returningDate,
          endTime: item.endTime,
          totalCost: item.totalCost,
        }));
      setReturnedButNotPaidCars(filteredCars);
    }
  }, [bookings]);

  const handleReturnCar = (car: {
    carId: string;
    carName: string;
    user: string;
    startLocation: string;
    startDate: string;
    startTime: string;
    bookingId: string;
    returningDate?: string;
    endTime?: string;
    totalCost?: number;
  }) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 overflow-x-scroll">
      <h1 className="text-2xl font-semibold mb-4">Manage Return Cars</h1>

      {/* Section for Booked Cars */}
      <h2 className="text-xl font-semibold mb-4">Booked Cars</h2>
      {bookedCars.length === 0 ? (
        <p className="my-4">No cars currently booked.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 mb-8">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookedCars.map((car) => (
              <tr key={car.carId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {car.carId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {car.carName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.startLocation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.startTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleReturnCar(car)}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
                  >
                    Return Car
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Section for Returned But Not Paid Cars */}
      <h2 className="text-xl font-semibold mb-4">Returned But Not Paid Cars</h2>
      {returnedButNotPaidCars.length === 0 ? (
        <p className="my-4">No cars have been returned but not paid for.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Returning Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {returnedButNotPaidCars.map((car) => (
              <tr key={car.carId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {car.carId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {car.carName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.startLocation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.startTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.returningDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {car.endTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${car.totalCost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCar && (
        <ReturnCarModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          bookedCar={selectedCar}
        />
      )}
    </div>
  );
};

export default ManageReturnCars;
