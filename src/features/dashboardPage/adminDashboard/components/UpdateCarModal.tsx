import { ICar } from "@/redux/features/bookings/bookingSlice";
import { useUpdateACarMutation } from "@/redux/features/cars/carsApi";
import { FC, useState, useEffect, ChangeEvent, ReactNode } from "react";

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
  car?: ICar;
}

const UpdateCarModal: FC<CustomModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  car,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isElectric, setIsElectric] = useState<boolean>(false);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [basicFeatures, setBasicFeatures] = useState<string[]>([]);
  const [additionalFeatures, setAdditionalFeatures] = useState<
    { name: string; feePerHour: number }[]
  >([]);
  const [pricePerHour, setPricePerHour] = useState<number>(0);
  const [locationWhereAvailable, setLocationWhereAvailable] = useState<
    string[]
  >([]);
  const [images, setImages] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [updateCar, { isLoading }] = useUpdateACarMutation();

  useEffect(() => {
    if (car) {
      const modifiedAdFeature = car.additionalFeatures.map((item) => ({
        name: item.name,
        feePerHour: item.feePerHour,
      }));
      setError("");
      setName(car.name || "");
      setDescription(car.description || "");
      setColor(car.color || "");
      setIsElectric(car.isElectric || false);
      setBasicFeatures(car.basicFeatures || []);
      setAdditionalFeatures(modifiedAdFeature || []);
      setPricePerHour(car.pricePerHour || 0);
      setLocationWhereAvailable(car.locationWhereAvailable || []);
      setImages(car.img || []);
      setIsFeatured(car.isFeatured || false);
    }
  }, [car]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    const base64Images: string[] = await Promise.all(
      newFiles.map((file) => convertToBase64(file))
    );
    setImages((prev) => [...prev, ...base64Images]);
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = [...locationWhereAvailable];
    updatedLocations[index] = value;
    setLocationWhereAvailable(updatedLocations);
  };

  const handleAddLocation = () => {
    setLocationWhereAvailable((prev) => [...prev, ""]);
  };

  const handleRemoveLocation = (index: number) => {
    setLocationWhereAvailable((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdditionalFeatureChange = (
    index: number,
    field: "name" | "feePerHour",
    value: string | number
  ) => {
    const updatedFeatures = [...additionalFeatures];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    };
    setAdditionalFeatures(updatedFeatures);
  };

  const handleAddFeature = () => {
    setAdditionalFeatures((prev) => [...prev, { name: "", feePerHour: 0 }]);
  };

  const handleRemoveFeature = (index: number) => {
    setAdditionalFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddBasicFeature = () => {
    setBasicFeatures((prev) => [...prev, ""]);
  };

  const handleRemoveBasicFeature = (index: number) => {
    setBasicFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBasicFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...basicFeatures];
    updatedFeatures[index] = value;
    setBasicFeatures(updatedFeatures);
  };

  const handleSubmit = async () => {
    const updateInfo = {
      name,
      description,
      color,
      isElectric,
      basicFeatures,
      additionalFeatures,
      pricePerHour,
      locationWhereAvailable,
      img: images,
      isFeatured,
    };

    try {
      await updateCar({
        carId: car?._id,
        updateInfo,
      }).unwrap();

      setIsModalOpen(false); // Close the modal after successful submission
    } catch (err: any) {
      setError(`Failed to update car details. ${err?.data?.message}`);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={`Modify Car Details of ${car?.name}`}
      description="Update the car details below. This action cannot be undone."
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Is Electric
        </label>
        <input
          type="checkbox"
          checked={isElectric}
          onChange={(e) => setIsElectric(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Is Featured
        </label>
        <input
          type="checkbox"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Price Per Hour
        </label>
        <input
          type="number"
          value={pricePerHour}
          onChange={(e) => setPricePerHour(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Location Where Available
        </label>
        {locationWhereAvailable.map((location, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={location}
              onChange={(e) => handleLocationChange(index, e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveLocation(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="text-blue-500 hover:text-blue-700 mt-2"
          onClick={handleAddLocation}
        >
          + Add Location
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Basic Features
        </label>
        {basicFeatures.map((feature, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Basic Feature"
              value={feature}
              onChange={(e) => handleBasicFeatureChange(index, e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveBasicFeature(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="text-blue-500 hover:text-blue-700 mt-2"
          onClick={handleAddBasicFeature}
        >
          + Add Basic Feature
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Additional Features
        </label>
        {additionalFeatures.map((feature, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Feature Name"
              value={feature.name}
              onChange={(e) =>
                handleAdditionalFeatureChange(index, "name", e.target.value)
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="number"
              placeholder="Fee Per Hour"
              value={feature.feePerHour}
              onChange={(e) =>
                handleAdditionalFeatureChange(
                  index,
                  "feePerHour",
                  Number(e.target.value)
                )
              }
              className="mt-1 ml-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => handleRemoveFeature(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="text-blue-500 hover:text-blue-700 mt-2"
          onClick={handleAddFeature}
        >
          + Add Feature
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div key={index} className="w-20 h-20 relative">
            <img
              src={image}
              alt={`Car Image ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
              onClick={() => handleRemoveImage(index)}
            >
              X
            </button>
          </div>
        ))}
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

export default UpdateCarModal;
