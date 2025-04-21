
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { hotels, Hotel, Room } from "../data/hotels";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Check, Star, User, Users, Bed, Bath } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import NotFound from "./NotFound";

const RoomBooking = () => {
  const { hotelId, roomId } = useParams<{ hotelId: string; roomId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [specialRequests, setSpecialRequests] = useState("");
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (hotelId && roomId) {
      const foundHotel = hotels.find(h => h.id === parseInt(hotelId));
      if (foundHotel) {
        setHotel(foundHotel);
        const foundRoom = foundHotel.rooms.find(r => r.id === parseInt(roomId));
        if (foundRoom) {
          setRoom(foundRoom);
        }
      }
    }
  }, [hotelId, roomId]);
  
  if (!hotel || !room) {
    return <NotFound />;
  }
  
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        title: "Select a date",
        description: "Please select a check-in date for your booking.",
        variant: "destructive"
      });
      return;
    }
    
    if (!firstName || !lastName || !email || !phone) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, you would send this data to your backend
    toast({
      title: "Booking Successful!",
      description: `Your booking at ${hotel.name} for ${format(selectedDate, 'PPP')} has been confirmed.`,
    });
    
    // Reset form
    setSelectedDate(undefined);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAdults("1");
    setChildren("0");
    setSpecialRequests("");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-sm font-medium text-gray-500 hover:text-waterfall-600">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to="/hotels" className="text-sm font-medium text-gray-500 hover:text-waterfall-600">
                      Hotels
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link to={`/hotel/${hotel.id}`} className="text-sm font-medium text-gray-500 hover:text-waterfall-600">
                      {hotel.name}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-sm font-medium text-gray-500">{room.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          <h1 className="text-3xl font-bold mb-6">Booking: {room.name}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleBooking}>
                    <div className="space-y-6">
                      {/* Date Selection */}
                      <div>
                        <h2 className="text-xl font-bold mb-4">1. Select Date</h2>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="check-in">Check-in Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal mt-1"
                                  id="check-in"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {selectedDate ? (
                                    format(selectedDate, "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  initialFocus
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                      
                      {/* Guest Information */}
                      <div>
                        <h2 className="text-xl font-bold mb-4">2. Guest Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="first-name">First Name *</Label>
                            <Input 
                              id="first-name" 
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              required 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="last-name">Last Name *</Label>
                            <Input 
                              id="last-name" 
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              required 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone *</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required 
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Guest Count */}
                      <div>
                        <h2 className="text-xl font-bold mb-4">3. Number of Guests</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="adults">Adults *</Label>
                            <Select value={adults} onValueChange={setAdults}>
                              <SelectTrigger id="adults" className="mt-1">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="children">Children</Label>
                            <Select value={children} onValueChange={setChildren}>
                              <SelectTrigger id="children" className="mt-1">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0</SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      {/* Special Requests */}
                      <div>
                        <h2 className="text-xl font-bold mb-4">4. Additional Information</h2>
                        <div>
                          <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                          <Textarea 
                            id="special-requests" 
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="mt-1 resize-none" 
                            rows={4}
                          />
                        </div>
                      </div>
                      
                      {/* Submit */}
                      <Button 
                        type="submit" 
                        className="w-full bg-waterfall-600 hover:bg-waterfall-700 text-white text-lg py-6"
                      >
                        Complete Booking
                      </Button>
                      
                      <p className="text-sm text-gray-500 text-center">
                        By clicking "Complete Booking", you agree to our terms and conditions.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Booking Summary */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
                  
                  {/* Room Details */}
                  <div className="mb-6">
                    <img 
                      src={room.images[0]} 
                      alt={room.name}
                      className="w-full h-48 object-cover rounded-lg mb-4" 
                    />
                    <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{hotel.location}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">Capacity:</span>
                        </div>
                        <span className="font-medium">{room.capacity} Guests</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">Beds:</span>
                        </div>
                        <span className="font-medium">{room.beds} {room.beds === 1 ? 'Bed' : 'Beds'}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">Bathrooms:</span>
                        </div>
                        <span className="font-medium">{room.bathrooms}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amenities */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Room Amenities</h3>
                    <div className="grid grid-cols-2 gap-1">
                      {room.amenities.slice(0, 6).map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-waterfall-600 mr-1" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                      {room.amenities.length > 6 && (
                        <div className="col-span-2 text-sm text-waterfall-600 mt-1">
                          + {room.amenities.length - 6} more amenities
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <h3 className="font-medium mb-2">Price Details</h3>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Room rate:</span>
                      <span>PKR {room.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Taxes & fees:</span>
                      <span>PKR {Math.round(room.price * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4">
                      <span>Total:</span>
                      <span>PKR {(room.price + Math.round(room.price * 0.1)).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {/* Policies */}
                  <div className="bg-gray-50 p-4 rounded-lg text-sm">
                    <h3 className="font-medium mb-2">Policies:</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Check-in: After 2:00 PM</li>
                      <li>• Check-out: Before 12:00 PM</li>
                      <li>• Free cancellation up to 24 hours before check-in</li>
                      <li>• No smoking</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RoomBooking;
