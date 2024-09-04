import LoadingSpinner from "@/components/LoadingSpinner";
import {
  useChangeBookingStatusMutation,
  useGetAllBookingsQuery,
} from "@/redux/features/bookings/bookingApi";
import { IBooking } from "@/redux/features/bookings/bookingSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageBookings = () => {
  const { data: bookings = [], isLoading } = useGetAllBookingsQuery(undefined);
  const [changeBookingStatus] = useChangeBookingStatusMutation();
  const [loadingBookingId, setLoadingBookingId] = useState<string | null>(null);
  const [allBookings, setAllBookings] = useState<{
    pendingBookings: IBooking[];
    approvedBookings: IBooking[];
    cancelledBookings: IBooking[];
    paidBookings: IBooking[];
  }>({
    pendingBookings: [],
    approvedBookings: [],
    cancelledBookings: [],
    paidBookings: [],
  });

  useEffect(() => {
    if (bookings?.data) {
      const approvedBookings = bookings.data.filter(
        (booking: IBooking) => booking.status === "approved"
      );
      const cancelledBookings = bookings.data.filter(
        (booking: IBooking) => booking.status === "cancelled"
      );
      const pendingBookings = bookings.data.filter(
        (booking: IBooking) => booking.status === "pending"
      );
      const paidBookings = bookings.data.filter(
        (booking: IBooking) => booking.isPaid === true
      );
      setAllBookings({
        pendingBookings,
        approvedBookings,
        cancelledBookings,
        paidBookings,
      });
    }
  }, [bookings]);

  const handleApprove = async (bookingId: string) => {
    if (loadingBookingId) return; // Prevent multiple clicks
    setLoadingBookingId(bookingId);
    const payload = { bookingId, status: "approved" };
    try {
      await changeBookingStatus(payload).unwrap();
      toast.success("Booking status changed to approved");
    } catch (err: any) {
      toast.error(`Failed to change booking status...${err.data.message}`);
    } finally {
      setLoadingBookingId(null);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (loadingBookingId) return; // Prevent multiple clicks
    setLoadingBookingId(bookingId);
    const payload = { bookingId, status: "cancelled" };
    try {
      await changeBookingStatus(payload).unwrap();
      toast.success("Booking status changed to cancelled");
    } catch (err: any) {
      toast.error(`Failed to change booking status...${err.data.message}`);
    } finally {
      setLoadingBookingId(null);
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-4">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Bookings</h1>

      <BookingSection
        title="Pending Bookings"
        bookings={allBookings.pendingBookings}
        handleApprove={handleApprove}
        handleCancel={handleCancel}
        loadingBookingId={loadingBookingId}
      />

      <BookingSection
        title="Approved Bookings"
        bookings={allBookings.approvedBookings}
      />

      <BookingSection
        title="Cancelled Bookings"
        bookings={allBookings.cancelledBookings}
      />

      <BookingSection
        title="Paid Bookings"
        bookings={allBookings.paidBookings}
      />
    </div>
  );
};

interface BookingSectionProps {
  title: string;
  bookings: IBooking[];
  handleApprove?: (bookingId: string) => Promise<void>;
  handleCancel?: (bookingId: string) => Promise<void>;
  loadingBookingId?: string | null;
}

const BookingSection = ({
  title,
  bookings,
  handleApprove,
  handleCancel,
  loadingBookingId,
}: BookingSectionProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-auto mb-6">
      <h2 className="text-xl font-semibold mb-2 px-4 py-2 bg-gray-50">
        {title}
      </h2>
      {bookings.length === 0 ? (
        <h1 className="m-4">No {title.toLowerCase()} found</h1>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Location
              </th>
              {title === "Paid Bookings" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
              )}
              {handleApprove && handleCancel && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking: IBooking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.car.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.hiringDate} to {booking.returningDate || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.startLocation}
                </td>
                {title === "Paid Bookings" && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.totalCost.toFixed(2)}
                  </td>
                )}
                {handleApprove && handleCancel && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleApprove(booking._id)}
                      className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 ${
                        loadingBookingId === booking._id &&
                        "disabled opacity-35"
                      }`}
                      disabled={loadingBookingId === booking._id}
                    >
                      {loadingBookingId === booking._id
                        ? "Loading.."
                        : "Approve"}
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${
                        loadingBookingId === booking._id &&
                        "disabled opacity-35"
                      }`}
                      disabled={loadingBookingId === booking._id}
                    >
                      {loadingBookingId === booking._id
                        ? "Loading.."
                        : "Cancel"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBookings;
