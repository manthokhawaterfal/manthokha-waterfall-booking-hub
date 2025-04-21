import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { hotels, Hotel } from "../data/hotels";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Check, Info } from "lucide-react";
import Newsletter from "../components/Newsletter";
import NotFound from "./NotFound";

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  useEffect(() => {
    if (id) {
      const foundHotel = hotels.find(h => h.id === parseInt(id));
      if (foundHotel) {
        setHotel(foundHotel);
        setSelectedImage(foundHotel.images[0]);
      }
    }
  }, [id]);
  
  if (!hotel) {
    return <NotFound />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-waterfall-900 to-waterfall-700 text-white pt-24 pb-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{hotel.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(hotel.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : i < hotel.rating 
                              ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                              : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-white/80">{hotel.rating} Stars</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{hotel.location}</span>
                </div>
              </div>
              
              <div className="mt-6 lg:mt-0">
                <Link to={`#rooms`}>
                  <Button className="bg-white text-waterfall-800 hover:bg-gray-100">
                    View Rooms & Rates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="lg:col-span-2 bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
              <img 
                src={selectedImage} 
                alt={hotel.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {hotel.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === image ? 'ring-2 ring-waterfall-500' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${hotel.name} - ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Hotel Details Tabs */}
          <Tabs defaultValue="overview" className="w-full mb-8">
            <TabsList className="border-b mb-6 pb-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="features">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="lg:flex gap-8">
                <div className="lg:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Hotel Overview</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-6">{hotel.overview}</p>
                    <p className="text-gray-700">
                      Located near the magnificent Manthokha Waterfall in Gilgit-Baltistan, our hotel provides the perfect accommodation for nature lovers and adventure seekers. With stunning views, comfortable rooms, and excellent service, we ensure a memorable stay for all our guests.
                    </p>
                  </div>
                </div>
                
                <div className="lg:w-1/3 mt-6 lg:mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-4">At a Glance</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{hotel.rooms.length} room types available</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Starting from PKR {Math.min(...hotel.rooms.map(room => room.price)).toLocaleString()} per night</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{hotel.location}</span>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Free cancellation up to 24 hours before check-in</span>
                        </li>
                      </ul>
                      
                      <div className="mt-6">
                        <Link to={`/hotel/${hotel.id}/rooms`}>
                          <Button className="w-full bg-waterfall-600 hover:bg-waterfall-700 text-white">
                            View Rooms & Book
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rooms" id="rooms">
              <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
              <div className="grid grid-cols-1 gap-6">
                {hotel.rooms.map(room => (
                  <Card key={room.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 relative">
                        <img 
                          src={room.images[0]} 
                          alt={room.name}
                          className="w-full h-full object-cover" 
                          style={{ minHeight: '200px' }}
                        />
                      </div>
                      
                      <CardContent className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mb-3">
                              <span className="mr-3">{room.capacity} Guests</span>
                              <span className="mr-3">{room.beds} {room.beds === 1 ? 'Bed' : 'Beds'}</span>
                              <span>{room.size} sq ft</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-waterfall-800">
                              PKR {room.price.toLocaleString()}
                            </p>
                            <p className="text-gray-500 text-sm">per night</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{room.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.amenities.slice(0, 5).map((amenity, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                          {room.amenities.length > 5 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              +{room.amenities.length - 5} more
                            </span>
                          )}
                        </div>
                        
                        <div className="flex justify-end">
                          <Link to={`/hotel/${hotel.id}/room/${room.id}`}>
                            <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="features">
              <h2 className="text-2xl font-bold mb-6">Hotel Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-4">Featured Amenities</h3>
                    <ul className="space-y-3">
                      {hotel.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-4">Services</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>24-hour front desk</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Daily housekeeping</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Luggage storage</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Tour desk</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Currency exchange</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-4">Recreation</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Guided waterfall tours</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Hiking trails access</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Photography spots</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Local cultural experiences</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="location">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 mb-4">
                    {hotel.name} is ideally located {hotel.location}, offering convenient access to the magnificent waterfall and other attractions in the area.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="font-medium text-lg mb-4">Nearby Attractions</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Manthokha Waterfall (main attraction)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Hiking trails</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Local village</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Mountain viewpoints</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-waterfall-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Local craft markets</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4">Transportation</h3>
                    <p className="text-gray-700 mb-3">
                      The hotel is accessible by road from Skardu. We offer transportation services and can arrange pickup from nearby transportation hubs.
                    </p>
                    <Link to="/car-booking">
                      <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
                        Book Transport
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-gray-200 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">Map Placeholder</p>
                      <p className="text-sm text-gray-500">Interactive map will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HotelDetails;
