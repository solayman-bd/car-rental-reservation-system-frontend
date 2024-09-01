// components/PaymentManagement.tsx
import { FC } from "react";
import { Button } from "@/components/ui/button";

const PaymentManagement: FC = () => {
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
        <p className="text-gray-700">
          After returning a car, you can pay the amount here. Please ensure that
          your payment details are updated.
        </p>

        <div className="mt-4">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
