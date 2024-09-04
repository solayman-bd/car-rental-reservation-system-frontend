import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { ICar } from "@/redux/features/bookings/bookingSlice";
import { useGetAllCarsQuery } from "@/redux/features/cars/carsApi";

const CarsPage: React.FC = () => {
  const { data, isLoading, error } = useGetAllCarsQuery(undefined);

  const [products, setProducts] = useState<ICar[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (data) {
      const cars = data.data;
      setProducts(cars);

      // Flatten and extract unique categories from basicFeatures
      const allFeatures = cars.flatMap((car) => car.basicFeatures);
      const uniqueCategories = Array.from(new Set(allFeatures));
      setCategories(uniqueCategories);

      const highestPrice = Math.max(...cars.map((car) => car.pricePerHour));
      setMaxPrice(highestPrice);
      setPriceRange([0, highestPrice]);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.name === "minPrice") {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, maxPrice]);
    setSortOrder("asc");
  };

  const filteredProducts = products
    .filter(
      (car) =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((car) =>
      selectedCategory ? car.basicFeatures.includes(selectedCategory) : true
    )
    .filter(
      (car) =>
        car.pricePerHour >= priceRange[0] && car.pricePerHour <= priceRange[1]
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.pricePerHour - b.pricePerHour
        : b.pricePerHour - a.pricePerHour
    );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error loading the cars.</div>;
  }

  if (!data || data.data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="min-h-screen my-16">
      <h1 className="text-4xl font-bold mb-4 text-center">All Cars</h1>
      <div className="flex flex-col sm:flex-row min-h-[90%]">
        <aside className="w-full sm:w-64 p-4 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minPrice"
                value={priceRange[0]}
                onChange={handlePriceChange}
                className="w-full p-2 border border-gray-300 rounded"
                max={priceRange[1]}
              />
              <input
                type="number"
                name="maxPrice"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full p-2 border border-gray-300 rounded"
                min={priceRange[0]}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
          <button
            onClick={clearFilters}
            className="w-full p-2 bg-red-500 text-white rounded"
          >
            Clear Filters
          </button>
        </aside>
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-scroll h-[90%]">
            {filteredProducts.map((car) => (
              <Card isProductListPage={true} key={car._id} car={car} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CarsPage;
