import { FC, useState, useEffect, ReactNode } from "react";
import { setUser, TAuthState } from "@/redux/features/auth/authSlice";
import { useUpdateUserMutation } from "@/redux/features/auth/authApi";
import { useGetAllCarsQuery } from "@/redux/features/cars/carsApi";
import { ICar } from "@/redux/features/bookings/bookingSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

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
  userInfo?: TAuthState;
}

const UpdateUserModal: FC<CustomModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  userInfo,
}) => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const { data: cars } = useGetAllCarsQuery(undefined);
  const allPreferences = [
    ...new Set(cars?.data.map((item: ICar) => item.basicFeatures).flat()),
  ];

  const [error, setError] = useState<string | null>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const availablePreferences = allPreferences.filter(
    (preference) => !selectedPreferences.includes(preference as string)
  );

  useEffect(() => {
    if (userInfo) {
      setError("");
      setPhone(userInfo?.user?.phone || "");
      setAddress(userInfo?.user?.address || "");
      setSelectedPreferences(userInfo?.user?.preferences || []);
    }
  }, [userInfo]);

  const handlePreferenceSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.value;
    if (selected && !selectedPreferences.includes(selected)) {
      setSelectedPreferences([...selectedPreferences, selected]);
    }
  };

  const handleRemovePreference = (preference: string) => {
    setSelectedPreferences(selectedPreferences.filter((p) => p !== preference));
  };

  const handleSubmit = async () => {
    const updateInfo = {
      phone,
      address,
      preferences: selectedPreferences,
    };

    try {
      const res = await updateUser(updateInfo).unwrap();

      dispatch(setUser({ user: res.data, token: userInfo?.token }));
      setIsModalOpen(false); // Close the modal after successful submission
      toast.success(`${res.data.name} is updated..`);
    } catch (err: any) {
      setError(`Failed to update booking.. ${err.data.message}`);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={`Modify user detail of ${userInfo?.user?.name}`}
      description="Update the user details below. This action cannot be undone."
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Preferences
        </label>
        <select
          onChange={handlePreferenceSelect}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select a preference</option>
          {availablePreferences.map((preference) => (
            <option key={preference as string} value={preference as string}>
              {preference as string}
            </option>
          ))}
        </select>
        <div className="mt-2">
          {selectedPreferences.map((preference) => (
            <div
              key={preference}
              className="flex items-center justify-between bg-gray-200 p-2 rounded mt-2"
            >
              <span className="text-sm">{preference}</span>
              <button
                onClick={() => handleRemovePreference(preference)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
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

export default UpdateUserModal;
