
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { featuredHotels } from '@/data/hotels';
import { Star } from 'lucide-react';

const FeaturedHotels = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Hotels</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the finest accommodations near Manthokha Waterfall, offering comfort, luxury, and breathtaking views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={hotel.images[0]} 
                  alt={hotel.name}
                  className="w-full h-full object-cover image-hover" 
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm py-1 px-2 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-sm font-medium">{hotel.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{hotel.location}</p>
                <p className="text-gray-700 mb-6">{hotel.description}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">{hotel.rooms.length} room types</p>
                  </div>
                  <Link to={`/hotel/${hotel.id}`}>
                    <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* View All Hotels Card */}
          <Card className="overflow-hidden bg-waterfall-50 border-dashed border-2 border-waterfall-300 flex flex-col justify-center items-center min-h-[400px]">
            <CardContent className="text-center p-6">
              <h3 className="text-xl font-bold mb-4 text-waterfall-800">Discover More Hotels</h3>
              <p className="text-gray-600 mb-6">
                Explore our full collection of premium accommodations near Manthokha Waterfall.
              </p>
              <Link to="/hotels">
                <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
                  View All Hotels
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
