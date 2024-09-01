/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBooking } from "@/redux/features/bookings/bookingSlice";
import { FC, useState, useEffect, ReactNode } from "react";
import { useUpdateBookingMutation } from "@/redux/features/bookings/bookingApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative z-10 max-h-[70vh] overflow-y-scroll p-3">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="p-4 overflow-y-auto max-h-[80%]">{children}</div>
        <div className="p-4 flex justify-end border-t">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

interface CustomModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  booking?: IBooking;
}

const UpdateBookingModal: FC<CustomModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  booking,
}) => {
  const [hiringDate, setHiringDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [startLocation, setStartLocation] = useState<string>("");

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [updateBooking, { isLoading }] = useUpdateBookingMutation();

  const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

  useEffect(() => {
    if (booking) {
      setError("");
      setHiringDate(booking.hiringDate || "");
      setStartTime(booking.startTime || "");
      setStartLocation(booking.startLocation || "");

      setSelectedFeatures(
        booking.additionalFeatures.map((feature) => feature) || []
      );
    }
  }, [booking]);

  const handleCheckboxChange = (featureName: string) => {
    setSelectedFeatures((prevSelected) =>
      prevSelected.includes(featureName)
        ? prevSelected.filter((name) => name !== featureName)
        : [...prevSelected, featureName]
    );
  };

  const handleSubmit = async () => {
    const updateInfo = {
      hiringDate,
      startTime,
      startLocation,

      additionalFeatures: selectedFeatures,
    };

    try {
      await updateBooking({
        bookingId: booking?._id,
        updateInfo,
      }).unwrap();

      setIsModalOpen(false); // Close the modal after successful submission
    } catch (err: any) {
      setError(`Failed to update booking.. ${err.data.message}`);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={`Modify booking detail of ${booking?.car.name}`}
      description="Update the booking details below. This action cannot be undone."
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Hiring Date
        </label>
        <input
          type="date"
          value={hiringDate}
          onChange={(e) => setHiringDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => {
            const value = e.target.value;
            if (!TIME_PATTERN.test(value)) {
              setError(
                "Invalid time format. Please use HH:mm in 24-hour format."
              );
            } else {
              setError(null);
              setStartTime(value);
            }
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Start Location
        </label>
        <select
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {booking?.car.locationWhereAvailable.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Additional Features
        </label>
        <div className="mt-1">
          {booking?.car?.additionalFeatures.map((feature) => (
            <div key={feature.name} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={feature.name}
                checked={selectedFeatures.includes(feature.name)}
                onChange={() => handleCheckboxChange(feature.name)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={feature.name}
                className="ml-2 text-sm text-gray-700"
              >
                {feature.name} (${feature.feePerHour}/hour)
              </label>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Modal>
  );
};

export default UpdateBookingModal;
