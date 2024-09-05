import React from "react";
import noImageSrc from "../assets/no-image.png";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ICar } from "@/redux/features/bookings/bookingSlice";

interface ICarCardProps {
  car: ICar;
  isProductListPage?: boolean;
}

const Card: React.FC<ICarCardProps> = ({ car, isProductListPage }) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = noImageSrc;
  };

  return (
    <div className="m-1 h-[400px] flex flex-col overflow-hidden rounded-lg border border-gray-200  shadow-md">
      <Link
        className="relative mx-3 mt-3 flex justify-center h-60 overflow-hidden rounded-xl"
        to={`/cars/${car._id}`}
      >
        <img
          className="object-cover min-w-full"
          src={car.img[0]}
          alt={car.name}
          onError={handleImageError}
        />
        {car.isFeatured && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            Featured
          </span>
        )}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link to={`/cars/${car._id}`}>
          <h5 className="text-xl tracking-tight text-slate-900">{car.name}</h5>
          <p className="text-sm text-gray-600 mt-1">{car.description}</p>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ${car.pricePerHour}
              </span>
            </p>
          </div>
          Location to start:
          {car.locationWhereAvailable.map((item, index) => (
            <span key={index} className="mr-1">
              {item}
              {index < car.locationWhereAvailable.length - 1 && ","}
            </span>
          ))}
          <button
            type="button"
            className={`flex items-center justify-center rounded-md ${
              car.status == "unavailable"
                ? "bg-gray-700 cursor-not-allowed"
                : "hover:bg-gray-700 bg-slate-900"
            }  px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300`}
            disabled={car.status == "unavailable"}
          >
            {isProductListPage ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                width="68"
                height="68"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M11.999 3l.001 17" />
                <path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            )}

            {isProductListPage
              ? car.status == "available"
                ? "View Detail"
                : "Unavailable"
              : car.status == "available"
              ? "Book Now"
              : "Unavailable"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
