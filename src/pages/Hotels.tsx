import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { hotels, Hotel as HotelType } from "../data/hotels";
import HotelFilters from "../components/HotelFilters";
import HotelList from "../components/HotelList";

const Hotels = () => {
  const [filteredHotels, setFilteredHotels] = useState<HotelType[]>(hotels);
  const [priceRange, setPriceRange] = useState<number[]>([0, 30000]);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate min and max prices from all rooms in all hotels
  const allPrices = hotels.flatMap((hotel) => hotel.rooms.map((room) => room.price));
  const minPrice = 0;
  const maxPrice = 30000;

  const handleSearch = () => {
    let results = hotels;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(query) ||
          hotel.description.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query)
      );
    }
    results = results.filter((hotel) => {
      const hotelMinPrice = Math.min(...hotel.rooms.map((room) => room.price));
      return hotelMinPrice >= priceRange[0] && hotelMinPrice <= priceRange[1];
    });

    setFilteredHotels(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="relative pt-16 pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl mb-8">
              Discover premium accommodations near Manthokha Waterfall
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <HotelFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onApply={handleSearch}
        />
        <HotelList
          hotels={filteredHotels}
          minPrice={minPrice}
          maxPrice={maxPrice}
          originalHotels={hotels}
          setSearchQuery={setSearchQuery}
          setPriceRange={setPriceRange}
          setFilteredHotels={setFilteredHotels}
        />
      </div>
      <div className="mt-auto">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default Hotels;
