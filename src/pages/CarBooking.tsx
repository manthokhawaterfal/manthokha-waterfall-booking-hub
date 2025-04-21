
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const CarBooking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Car Booking Services</h1>
          
          {/* Mountain Rides Promotion Section */}
          <div className="max-w-4xl mx-auto mb-10">
            <Card className="overflow-hidden">
              <div className="relative h-72">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&h=600&q=80" 
                  alt="Mountain Road Journey"
                  className="object-cover w-full h-full" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-bold">Mountain Rides</h2>
                    <p className="flex items-center text-sm opacity-90">
                      <MapPin className="w-4 h-4 mr-1" /> Gilgit-Baltistan, Pakistan
                    </p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Our Story</h3>
                <p className="text-gray-700 mb-4">
                  Mountain Rides was founded with a passion for showcasing the breathtaking beauty of Gilgit Baltistan to travelers from around the world. We started our journey with a vision to provide tourists with comfortable, reliable, and luxurious transportation that could navigate the challenging yet beautiful terrains of Northern Pakistan.
                </p>
                <p className="text-gray-700 mb-6">
                  Our commitment to excellence and deep roots in the region make us the perfect partner for your Gilgit Baltistan adventure.
                </p>
                
                <div className="flex justify-center mt-4">
                  <a 
                    href="https://mountainride.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white px-6">
                      Visit Mountain Rides
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Coming Soon Section */}
          <div className="max-w-4xl mx-auto text-center mt-12 bg-gray-50 rounded-lg p-10">
            <h2 className="text-2xl font-bold mb-4">Online Car Booking Coming Soon!</h2>
            <p className="text-gray-600 mb-6">
              We are working on integrating our online car booking system. Soon you'll be able to reserve vehicles directly through our platform for your Manthokha Waterfall adventures.
            </p>
            <p className="text-gray-600 mb-8">
              In the meantime, please contact Mountain Rides directly for all your transportation needs in Gilgit-Baltistan.
            </p>
            
            <Button variant="outline" className="border-waterfall-600 text-waterfall-600 hover:bg-waterfall-50">
              Get Notified When Available
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarBooking;
