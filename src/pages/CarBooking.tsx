
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Newsletter from "../components/Newsletter";

const CarBooking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-24">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Car Booking Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Coming soon to ensure convenient transportation around Manthokha Waterfall
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Car Booking Service is Under Development</h2>
            <p className="text-gray-600 mb-6">
              We're working hard to bring you a seamless car booking experience for your trips to and around Manthokha Waterfall. Soon you'll be able to reserve vehicles ranging from comfortable sedans to rugged 4x4s suitable for the mountain terrain.
            </p>
          </div>
          
          <Card className="mb-12">
            <CardContent className="p-8 flex flex-col items-center">
              <div className="bg-orange-100 text-orange-800 p-3 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-car">
                  <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
                  <circle cx="6.5" cy="16.5" r="2.5" />
                  <circle cx="16.5" cy="16.5" r="2.5" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Future Car Booking Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-8">
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Range of Vehicles</h4>
                    <p className="text-sm text-gray-600">From economic options to premium vehicles suitable for mountain terrain.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Driver Options</h4>
                    <p className="text-sm text-gray-600">Hire experienced local drivers familiar with the terrain or drive yourself.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Flexible Booking</h4>
                    <p className="text-sm text-gray-600">Options for hourly, daily, or weekly rentals with easy modifications.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Pickup Options</h4>
                    <p className="text-sm text-gray-600">Convenient pickup locations including airports and major hotels.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-6">
                  In the meantime, you can arrange transportation through your hotel's concierge or contact us directly for assistance.
                </p>
                
                <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
                  Register for Updates
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Transportation Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Getting to Manthokha</h3>
                  <p className="text-gray-600 mb-4">
                    The waterfall is accessible by road from Skardu. The journey takes approximately 2-3 hours, depending on road conditions.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Distance from Skardu: ~60 km</li>
                    <li>• Nearest airport: Skardu Airport</li>
                    <li>• Road condition: Partially paved</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Vehicle Recommendations</h3>
                  <p className="text-gray-600 mb-4">
                    For the mountainous terrain around Manthokha Waterfall, we recommend vehicles with good ground clearance.
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• 4x4 SUVs for off-road sections</li>
                    <li>• Medium-sized cars for paved roads</li>
                    <li>• Experienced drivers familiar with mountain driving</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">Current Options</h3>
                  <p className="text-gray-600 mb-4">
                    Until our booking system is live, here are alternative ways to arrange transportation:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Hotel transportation services</li>
                    <li>• Local taxi services in Skardu</li>
                    <li>• Tour operators offering packages</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contact for Transportation Assistance</h2>
            <p className="text-gray-600 mb-6">
              Need help arranging transport to Manthokha Waterfall? Reach out to our team for assistance.
            </p>
            <div className="flex justify-center">
              <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white mr-4">
                Email Us
              </Button>
              <Button variant="outline">
                Call +92 345 678 9012
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default CarBooking;
