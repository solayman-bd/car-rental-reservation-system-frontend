import React, { useState, useEffect } from "react";

import Card, { ICar } from "@/components/Card";
import { fakeCarData } from "../homePage/components/featuredCarsSection/falkeCarData";

const CarsPage: React.FC = () => {
  //   const { data, error, isLoading } = useGetAllProductsQuery(undefined);
  const { data, error, isLoading } = fakeCarData;
  const [products, setProducts] = useState<ICar[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    if (data) {
      setProducts(data.data);
      const allCategories: string[] = Array.from(
        new Set(data.data.map((product: ICar) => product.type))
      );
      setCategories(allCategories);
      const highestPrice = Math.max(
        ...data.data.map((product: ICar) => product.price)
      );
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
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.type === selectedCategory : true
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
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
        <aside className="w-full sm:w-64 p-4 border border-gray-100  shadow-sm">
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
            {filteredProducts.map((product) => (
              <Card isProductListPage={true} key={product._id} car={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CarsPage;
