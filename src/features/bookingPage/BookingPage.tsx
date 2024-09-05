import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { verifyToken } from "@/utils/verifyToken";
import { ICar } from "@/redux/features/bookings/bookingSlice";
import { useGetASingleCarQuery } from "@/redux/features/cars/carsApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useBookACarMutation } from "@/redux/features/bookings/bookingApi";

const BookingPage = () => {
  const [bookACar, { isLoading: bookLoading }] = useBookACarMutation();
  const { carId } = useParams<{ carId: string }>();
  const { data, error, isLoading } = useGetASingleCarQuery(carId);
  const [product, setProduct] = useState<ICar | null>(null);
  const [nid, setNid] = useState("");
  const [license, setLicense] = useState("");
  const [hiringDate, setHiringDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  let user: unknown;
  if (token) {
    user = verifyToken(token);
  }

  useEffect(() => {
    if (data) {
      setProduct(data.data);
    }
    if ((user as any)?.role !== "user") {
      dispatch(logout());
      toast.error("Only users can book a car...");
    }
  }, [data, dispatch, user]);

  const handleFeatureSelect = (featureName: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureName)
        ? prev.filter((f) => f !== featureName)
        : [...prev, featureName]
    );
  };
  const validateForm = () => {
    if (!nid || !license || !hiringDate || !startTime || !startLocation) {
      toast.error("Please fill out all required fields");
      return false;
    }

    const currentDate = new Date(); // Current date and time

    // Create a new Date object for today, stripping out the time part
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create a new Date object for the selected hiring date, stripping out the time part
    const selectedDate = new Date(hiringDate);
    selectedDate.setHours(0, 0, 0, 0);

    // Check if the hiring date is in the past (ignoring the time)
    if (selectedDate < today) {
      toast.error("Hiring date must be today or later");
      return false;
    }

    // If hiring date is today, validate that start time is in the future
    if (selectedDate.getTime() === today.getTime()) {
      const [startHour, startMinute] = startTime.split(":");

      // Create a Date object combining hiringDate and startTime
      const selectedStartTime = new Date(hiringDate);
      selectedStartTime.setHours(
        parseInt(startHour),
        parseInt(startMinute),
        0,
        0
      );

      // Compare selected start time with the current time
      if (selectedStartTime <= currentDate) {
        toast.error("Start time must be later than the current time");
        return false;
      }
    }

    return true;
  };

  const handleBooking = async () => {
    const formData = {
      carId,
      nid,
      drivingLicense: license,
      startLocation,
      startTime,
      hiringDate,
      additionalFeatures: selectedFeatures,
    };
    try {
      if (validateForm()) {
        await bookACar(formData);
        toast.success("Car is booked successfully...");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (er: any) {
      toast.error(`Failed to book... ${er.data.message}`);
    }
  };

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error fetching data
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Book {product?.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Car Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img
            src={product?.img[0]}
            alt={product?.name}
            className="w-full mb-4 rounded-lg"
          />
          <h2 className="text-3xl font-bold">{product?.name}</h2>
          <p className="text-gray-600 mt-2">{product?.description}</p>
          <p className="text-gray-800 font-semibold mt-4">
            Price per hour: ${product?.pricePerHour}
          </p>

          <div className="mt-4">
            <h3 className="font-bold">Basic Features:</h3>
            <ul className="list-disc ml-4">
              {product?.basicFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">Additional Features:</h3>
            <ul className="list-none">
              {product?.additionalFeatures.map((feature, i) => (
                <li key={i}>
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
        </div>

        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Booking Details</h2>

          <div className="mb-4">
            <label htmlFor="nid" className="block font-bold">
              NID/Passport
            </label>
            <input
              type="text"
              id="nid"
              value={nid}
              onChange={(e) => setNid(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter NID or Passport number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="license" className="block font-bold">
              Driving License
            </label>
            <input
              type="text"
              id="license"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter Driving License number"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hiringDate" className="block font-bold">
              Hiring Date
            </label>
            <input
              type="date"
              id="hiringDate"
              value={hiringDate}
              onChange={(e) => setHiringDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startTime" className="block font-bold">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startLocation" className="block font-bold">
              Start Location
            </label>
            <select
              id="startLocation"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Select location</option>
              {product?.locationWhereAvailable.map((location, i) => (
                <option key={i} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleBooking}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
          >
            {bookLoading ? "Loading.." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
