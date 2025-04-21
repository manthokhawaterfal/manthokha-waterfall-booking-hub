
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Hotel, MapPin } from "lucide-react";
import type { Hotel as HotelType } from "../data/hotels";

type HotelListProps = {
  hotels: HotelType[];
  minPrice: number;
  maxPrice: number;
  originalHotels: HotelType[];
  setSearchQuery: (q: string) => void;
  setPriceRange: (range: number[]) => void;
  setFilteredHotels: (hotels: HotelType[]) => void;
};

const HotelList: React.FC<HotelListProps> = ({
  hotels,
  minPrice,
  maxPrice,
  originalHotels,
  setSearchQuery,
  setPriceRange,
  setFilteredHotels,
}) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-6">
      {hotels.length} {hotels.length === 1 ? "Hotel" : "Hotels"} Found
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {hotels.map((hotel) => (
        <Card
          key={hotel.id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 relative">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover"
                style={{ minHeight: "200px" }}
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
                  {hotel.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
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
                      PKR {Math.min(...hotel.rooms.map((room) => room.price).filter(Boolean)).toLocaleString()}
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

    {hotels.length === 0 && (
      <div className="text-center py-12">
        <Hotel className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">No hotels found</h3>
        <p className="text-gray-500 mb-6">Try adjusting your search filters</p>
        <Button
          className="bg-waterfall-600 hover:bg-waterfall-700 text-white"
          onClick={() => {
            setSearchQuery("");
            setPriceRange([minPrice, maxPrice]);
            setFilteredHotels(originalHotels);
          }}
        >
          Clear Filters
        </Button>
      </div>
    )}
  </div>
);

export default HotelList;
