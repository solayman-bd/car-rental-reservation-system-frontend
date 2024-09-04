/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useUpdateBookingMutation } from "@/redux/features/bookings/bookingApi";

interface CheckoutFormProps {
  amount: number;
  bookingId: string;
  onClose: () => void;
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  amount,
  bookingId,
  onClose,
}) => {
  const [updateBooking, { isLoading }] = useUpdateBookingMutation();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(`[PaymentMethod Error]", ${error}`);
      return;
    }

    // toast.success(`[PaymentMethod] ${paymentMethod}`);
    try {
      const data = {
        bookingId: bookingId,
        updateInfo: { isPaid: true },
      };

      await updateBooking(data);
      toast.success(
        `Payment of $${amount.toFixed(
          2
        )} for booking ID ${bookingId} successful!`
      );
      // Close the form
      onClose();
    } catch (err) {
      toast.error(`Failed to make payment.. ${err.data.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <form onSubmit={handleSubmit}>
          <CardElement className="mb-4" />
          <button
            type="submit"
            disabled={!stripe}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mx-3"
          >
            {isLoading ? "Loading.." : `Pay $${amount.toFixed(2)}`}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
