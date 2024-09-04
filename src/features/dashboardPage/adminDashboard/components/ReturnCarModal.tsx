/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect } from "react";
import { useReturnTheCarMutation } from "@/redux/features/cars/carsApi";
import { toast } from "sonner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
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
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative z-10 p-4">
        <div className="border-b mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="overflow-y-auto max-h-[70vh]">{children}</div>
        <div className="mt-4 flex justify-end border-t pt-2">
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

interface ReturnCarModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookedCar: {
    carId: string;
    carName: string;
    user: string;
    startLocation: string;
    startDate: string;
    startTime: string;
    bookingId: string;
  };
}

const formatTimeToAMPM = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${adjustedHours}:${formattedMinutes} ${ampm}`;
};

const ReturnCarModal: FC<ReturnCarModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  bookedCar,
}) => {
  const [returningDate, setReturningDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>(
    new Date().toISOString().substring(11, 16)
  );
  const [returnTheCar, { isLoading }] = useReturnTheCarMutation();

  useEffect(() => {
    // Set default values
    setReturningDate(new Date().toISOString().substring(0, 10)); // current date
    setEndTime(new Date().toISOString().substring(11, 16)); // current time
  }, []);

  const handleSubmit = async () => {
    const startDateTime = new Date(
      `${bookedCar.startDate}T${bookedCar.startTime}`
    );
    const returningDateTime = new Date(`${returningDate}T${endTime}`);

    // Ensure the returning date is after the start date
    if (returningDate < bookedCar.startDate) {
      toast.error("Returning date must be after the start date.");
      return;
    }

    // Check if returning date is the same as start date
    if (
      returningDate === bookedCar.startDate &&
      returningDateTime <= startDateTime
    ) {
      toast.error(
        "Returning time must be after the start time if returning on the same day."
      );
      return;
    }

    try {
      const payload = {
        bookingId: bookedCar.bookingId,
        returningDate,
        endTime,
      };

      await returnTheCar(payload).unwrap();
      setIsModalOpen(false); // Close the modal after successful submission
      toast.success("Car returned successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(`Failed to return the car. ${err.data.message}.`);
      console.log(err);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={`Return Car: ${bookedCar.carName}`}
      description={`Return the car booked by ${bookedCar.user}.`}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="text"
          value={new Date(bookedCar.startDate).toLocaleDateString()}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="text"
          value={formatTimeToAMPM(bookedCar.startTime)}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Returning Date
        </label>
        <input
          type="date"
          value={returningDate}
          onChange={(e) => setReturningDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Return Car"}
        </button>
      </div>
    </Modal>
  );
};

export default ReturnCarModal;
