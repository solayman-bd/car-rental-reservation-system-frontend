import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetMyBookingsQuery } from "@/redux/features/bookings/bookingApi";
import { IBooking } from "@/redux/features/bookings/bookingSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Payment/CheckoutForm";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51Pv6H104uzZ2C6jTrzkXgDAQFZYbDIwnt939x1LH9qSO0TKRbb5qqH3rkY0yF9Ntl9nsabYJSde0myTqaOzrzl7v00mMV2zOmb"
);

const PaymentManagement: FC = () => {
  const { data, isLoading } = useGetMyBookingsQuery(undefined);
  const [returnedBookings, setReturnedBookings] = useState<IBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [successfullPaymentList, setSuccessfullPaymentList] = useState<
    IBooking[]
  >([]);

  useEffect(() => {
    if (data?.data) {
      const filteredBookings = data.data.filter(
        (item: IBooking) => item.status === "returned" && item.isPaid === false
      );
      setReturnedBookings(filteredBookings);

      const successfulPayments = data.data.filter(
        (item: IBooking) => item.isPaid === true
      );
      setSuccessfullPaymentList(successfulPayments);
    }
  }, [data]);

  const handlePayNow = (booking: IBooking) => {
    setSelectedBooking(booking);
  };

  const handlePaymentSuccess = (booking: IBooking) => {
    setSuccessfullPaymentList((prev) => [...prev, booking]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Payment Management
      </h2>

      {/* Payment Section */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment for Returned Cars
        </h3>
        <p className="text-gray-700 mb-4">
          After returning a car, you can pay the amount here. Please ensure that
          your payment details are updated.
        </p>

        {returnedBookings.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Table Headers */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hiring Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Returning Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {returnedBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.car.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.hiringDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.returningDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.startTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.startLocation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.totalCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      onClick={() => handlePayNow(booking)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Pay Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-700">No returned cars pending payment.</p>
        )}
      </div>

      {/* Successful Payments Section */}
      {successfullPaymentList.length > 0 && (
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Successful Payments
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Table Headers */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Paid
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {successfullPaymentList.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.car.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.totalCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Assume payment date is available in booking */}
                    {booking.paymentDate || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stripe Payment */}
      {selectedBooking && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={selectedBooking.totalCost}
            bookingId={selectedBooking._id}
            onClose={() => {
              setSelectedBooking(null);
              handlePaymentSuccess(selectedBooking);
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default PaymentManagement;
