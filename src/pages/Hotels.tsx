
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Star, Search, Hotel, MapPin } from "lucide-react";
import { hotels, Hotel as HotelType } from "../data/hotels";

const Hotels = () => {
  const [filteredHotels, setFilteredHotels] = useState<HotelType[]>(hotels);
  const [priceRange, setPriceRange] = useState<number[]>([0, 30000]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate min and max prices from all rooms in all hotels
  const allPrices = hotels.flatMap(hotel => hotel.rooms.map(room => room.price));
  const minPrice = 0;
  const maxPrice = 30000;

  const handleSearch = () => {
    let results = hotels;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        hotel => 
          hotel.name.toLowerCase().includes(query) || 
          hotel.description.toLowerCase().includes(query) ||
          hotel.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    results = results.filter(hotel => {
      const hotelMinPrice = Math.min(...hotel.rooms.map(room => room.price));
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
            backgroundImage: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80')",
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
        {/* Filter and Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                Search
              </Label>
              <div className="relative">
                <Input
                  id="search"
                  placeholder="Hotel name, location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="price-range" className="text-sm font-medium">
                  Price Range (PKR)
                </Label>
                <span className="text-sm text-gray-600">
                  {priceRange[0]} - {priceRange[1]}
                </span>
              </div>
              <Slider
                id="price-range"
                min={minPrice}
                max={maxPrice}
                step={1000}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
              />
            </div>
            
            {/* Apply Filters */}
            <div className="flex items-end">
              <Button 
                className="w-full bg-waterfall-600 hover:bg-waterfall-700 text-white"
                onClick={handleSearch}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {filteredHotels.length} {filteredHotels.length === 1 ? 'Hotel' : 'Hotels'} Found
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative">
                    <img 
                      src={hotel.images[0]} 
                      alt={hotel.name}
                      className="w-full h-full object-cover" 
                      style={{ minHeight: '200px' }}
                    />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm py-1 px-2 rounded-full flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 md:w-3/5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{hotel.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {hotel.features.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{hotel.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div>
                        <p className="text-sm">
                          <span className="text-gray-500">From </span>
                          <span className="font-bold text-lg text-waterfall-800">
                            PKR {Math.min(...hotel.rooms.map(room => room.price)).toLocaleString()}
                          </span>
                          <span className="text-gray-500"> / night</span>
                        </p>
                      </div>
                      
                      <Link to={`/hotel/${hotel.id}`}>
                        <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredHotels.length === 0 && (
            <div className="text-center py-12">
              <Hotel className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No hotels found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search filters</p>
              <Button 
                className="bg-waterfall-600 hover:bg-waterfall-700 text-white"
                onClick={() => {
                  setSearchQuery("");
                  setPriceRange([minPrice, maxPrice]);
                  setFilteredHotels(hotels);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default Hotels;
