import noImageAvailable from "../../../../assets/no-image.png";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useCreateACarMutation,
  useDeleteACarMutation,
  useGetAllCarsQuery,
  useUpdateACarMutation,
} from "@/redux/features/cars/carsApi";
import { ICar } from "@/components/Card";
import DeleteModalForAdmin from "./DeleteModalForAdmin";

const ManageCars: FC = () => {
  const [deleteModalInfo, setDeleteModalInfo] = useState<{
    isOpen: boolean;
    car: null | ICar;
  }>({ isOpen: false, car: null });

  const { data: cars = [], refetch } = useGetAllCarsQuery(undefined);
  const [createCar] = useCreateACarMutation();
  const [updateCar] = useUpdateACarMutation();
  const [deleteCar] = useDeleteACarMutation();

  return (
    <div className="p-6 border-gray-200 rounded-lg shadow-lg max-h-screen overflow-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage Cars</h3>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Car Listings
        </h4>
        <Button className="bg-blue-600 my-2">Add Car</Button>
        {cars?.data?.length === 0 ? (
          <p>No cars available.</p>
        ) : (
          <div className="space-y-4 flex flex-row flex-wrap gap-5 items-center justify-between">
            {cars?.data?.map(
              (car: ICar) =>
                !car.isDeleted && (
                  <div
                    key={car._id}
                    className="p-4 rounded-lg shadow-lg border-gray-200 md:w-[45%]"
                  >
                    <h5 className="text-lg font-semibold">{car.name}</h5>
                    <p>Description: {car.description}</p>
                    <p>Color: {car.color}</p>
                    <p>Electric: {car.isElectric ? "Yes" : "No"}</p>
                    <p>Basic Features: {car.basicFeatures.join(", ")}</p>
                    <p>
                      Additional Features:
                      {car.additionalFeatures.map(
                        (feature: any, index: number) => (
                          <span key={index}>
                            {" "}
                            {feature.name} (${feature.feePerHour}/hour),
                          </span>
                        )
                      )}
                    </p>
                    <p>Price Per Hour: ${car.pricePerHour}</p>
                    <p>Status: {car.status}</p>
                    <p>
                      Currently Hired: {car.isCurrentlyHired ? "Yes" : "No"}
                    </p>
                    <p>Available at: {car.locationWhereAvailable.join(", ")}</p>
                    <div className="mt-2">
                      <img
                        src={
                          car.img && car.img.length > 0
                            ? car.img[0]
                            : noImageAvailable
                        }
                        alt={car.name || "No image available"}
                        className="w-30 h-auto rounded-lg"
                      />
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <Button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        // onClick={() => handleEdit(car)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() =>
                          setDeleteModalInfo((prev) => ({
                            ...prev,
                            isOpen: !prev.isOpen,
                            car: car,
                          }))
                        }
                      >
                        Delete
                      </Button>
                    </div>
                    {deleteModalInfo.isOpen && (
                      <DeleteModalForAdmin
                        setDeleteModalInfo={setDeleteModalInfo}
                        deleteModalInfo={deleteModalInfo}
                      />
                    )}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCars;
