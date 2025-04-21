
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type HotelFiltersProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  minPrice: number;
  maxPrice: number;
  onApply: () => void;
};

const HotelFilters: React.FC<HotelFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
  onApply,
}) => (
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
          onClick={onApply}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  </div>
);

export default HotelFilters;
