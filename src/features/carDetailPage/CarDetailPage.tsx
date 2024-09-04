import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Magnifier from "../../components/imageMagnifier/ImageMagnifier";
import SectionsWraper from "@/components/SectionWrapper";

import { ICar } from "@/redux/features/bookings/bookingSlice";
import { useGetASingleCarQuery } from "@/redux/features/cars/carsApi";

const CarDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { carId } = useParams<{ carId: string }>();
  const { data, error, isLoading } = useGetASingleCarQuery(carId);

  const [product, setProduct] = useState<ICar | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setProduct(data.data);
    }
  }, [data]);

  const handleBooking = () => {
    if (carId) {
      navigate(`/booking/${carId}`);
    }
  };
  const handleFeatureSelect = (featureName: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureName)
        ? prev.filter((f) => f !== featureName)
        : [...prev, featureName]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 dark:text-gray-400 text-lg">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 dark:text-red-400 text-lg">
          Error fetching data. Please try again later.
        </div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    if (!product) return 0;
    const basePrice = product.pricePerHour;
    const additionalFees = product.additionalFeatures
      ?.filter((feature) => selectedFeatures.includes(feature.name))
      .reduce((total, feature) => total + feature.feePerHour, 0);
    return basePrice + additionalFees;
  };

  return (
    <>
      <SectionsWraper heading={`Car Detail`}>
        <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer text-gray-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4 justify-center items-center">
              <div className="md:w-[50%] px-4">
                <Magnifier imgSrc={product?.img[0] as string} />
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <button
                      className={`w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold ${
                        product?.status === "unavailable"
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-gray-800 dark:hover:bg-gray-700"
                      }`}
                      onClick={handleBooking}
                      disabled={product?.status === "unavailable"}
                    >
                      {product?.status === "unavailable"
                        ? "Unavailable"
                        : "Book Now"}
                    </button>
                  </div>
                  <div className="w-1/2 px-2">
                    <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[98%] md:w-[50%] px-4">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {product?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-2xl mb-4">
                  {product?.description}
                </p>

                <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-xl">
                    Features:
                  </span>
                  <ul className="text-gray-600 dark:text-gray-300 text-base mt-2 flex gap-2">
                    {product?.basicFeatures.map((feature, index) => (
                      <li key={index} className="mt-1">
                        <strong className="text-blue-500">{feature}</strong>
                        {product?.basicFeatures.length - 1 === index ? "" : ","}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Features Selection */}
                <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-xl">
                    Additional Features:
                  </span>
                  <ul className="text-gray-600 dark:text-gray-300 text-base mt-2">
                    {product?.additionalFeatures?.map((feature, i) => (
                      <li key={i} className="flex items-center mt-1">
                        <input
                          type="checkbox"
                          id={`feature-${feature.name}`}
                          className="mr-2"
                          checked={selectedFeatures.includes(feature.name)}
                          onChange={() => handleFeatureSelect(feature.name)}
                        />
                        <label htmlFor={`feature-${feature.name}`}>
                          {feature.name} / ${feature.feePerHour} per hour
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex mb-4 flex-col md:flex-row">
                  <div className="mr-4 text-xl">
                    <span className="font-bold text-gray-700 dark:text-gray-300 ">
                      Price:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      ${calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xl">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {product?.status === "available"
                        ? `Available`
                        : "Unavailable"}
                    </span>
                  </div>
                </div>

                {/* <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300 text-xl">
                    Customer Reviews:
                  </span>
                  <ul className="text-gray-600 dark:text-gray-300 text-base mt-2">
                    {product?.customerReviews.map((review, index) => (
                      <li key={index} className="mt-1">
                        <strong>{review.name}:</strong> {review.review}
                      </li>
                    ))}
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </SectionsWraper>
    </>
  );
};

export default CarDetailPage;
