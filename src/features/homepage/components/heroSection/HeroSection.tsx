import { Button } from "@/components/ui/button";
import heroBgUrl from "../../assets/heroImg5.svg";

const HeroSection = () => {
  return (
    <div
      className="relative bg-center bg-cover min-h-[500px] flex items-center justify-center mt-20"
      style={{ backgroundImage: `url(${heroBgUrl})` }}
    >
      {/* Overlay to darken the background for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-green-100 opacity-80"></div>
      {/* Content Container */}
      <div className="relative z-10 text-gray-900 text-center p-6">
        <h1 className="text-7xl font-bold mb-4">Find Your Perfect Ride</h1>
        <p className="mb-6 text-2xl">Book your car rental quickly and easily</p>

        {/* Book Now Button */}

        <Button
          className="font-bold mb-6 text-lg"
          variant={"destructive"}
          size={"lg"}
        >
          Book Now
        </Button>

        {/* Search Bar */}
        <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900 flex flex-col md:flex-row gap-4 mx-auto">
          <input
            type="text"
            placeholder="Enter Location"
            className="p-2 rounded-lg border border-gray-300 flex-1"
          />
          <input
            type="date"
            className="p-2 rounded-lg border border-gray-300 flex-1"
          />
          <Button className="font-bold text-lg bg-blue-500" size={"lg"}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
