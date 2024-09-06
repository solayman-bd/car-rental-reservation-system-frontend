import { useUpdateBookingMutation } from "@/redux/features/bookings/bookingApi";
import { IBooking } from "@/redux/features/bookings/bookingSlice";
import { toast } from "sonner";

interface IDeleteModalInfo {
  isOpen: boolean;
  booking: IBooking | null;
}

interface IDeleteModalProps {
  deleteModalInfo: IDeleteModalInfo;
  setDeleteModalInfo: React.Dispatch<React.SetStateAction<IDeleteModalInfo>>;
}

const DeleteModal: React.FC<IDeleteModalProps> = ({
  setDeleteModalInfo,
  deleteModalInfo,
}) => {
  // Use the mutation hook at the top level
  const [updateBooking, { isLoading }] = useUpdateBookingMutation();

  const toggleModal = () => {
    setDeleteModalInfo((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      booking: null,
    }));
  };

  const confirmDelete = async () => {
    if (deleteModalInfo.booking) {
      const data = {
        bookingId: deleteModalInfo.booking._id,
        updateInfo: { status: "cancelled" },
      };

      try {
        await updateBooking(data).unwrap(); // Unwrap the promise to handle success or error
        toast.error(`${deleteModalInfo.booking.car.name} is deleted ........`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error(
          `Failed to delete ${deleteModalInfo.booking.car.name} ........`
        );
      }
    }
    setDeleteModalInfo({ isOpen: false, booking: null });
  };

  return (
    <div
      id="delete-modal"
      tabIndex={-1}
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-y-auto"
    >
      <div className="relative w-full h-auto max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={toggleModal}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4  text-red-600 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel the order?
            </h3>
            <button
              onClick={confirmDelete}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              {isLoading ? "Deleting..." : "Yes, I'm sure"}
            </button>
            <button
              onClick={toggleModal}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
