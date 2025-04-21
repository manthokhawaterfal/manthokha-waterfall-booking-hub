
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Car, Hotel, Calendar } from 'lucide-react';

const BookingInfo = () => {
  const bookingOptions = [
    {
      id: 1,
      icon: <Hotel className="h-10 w-10 text-waterfall-600" />,
      title: "Hotel Booking",
      description: "Choose from a variety of accommodations near Manthokha Waterfall, ranging from luxury resorts to cozy inns.",
      features: ["Online Reservation", "Flexible Dates", "Special Rates"],
      link: "/hotels",
      buttonText: "Find Hotels"
    },
    {
      id: 2,
      icon: <Calendar className="h-10 w-10 text-forest-600" />,
      title: "Tour Packages",
      description: "Explore guided tour packages that include accommodation, meals, and sightseeing around Manthokha Waterfall.",
      features: ["Expert Guides", "All-Inclusive", "Group Discounts"],
      link: "/hotels",
      buttonText: "View Packages"
    },
    {
      id: 3,
      icon: <Car className="h-10 w-10 text-orange-600" />,
      title: "Car Booking",
      description: "Rent vehicles for convenient transportation to and from Manthokha Waterfall and surrounding attractions.",
      features: ["Various Options", "Driver Available", "GPS Navigation"],
      link: "/car-booking",
      buttonText: "Book a Car"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Visit</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make your trip to Manthokha Waterfall hassle-free with our convenient booking options for accommodation and transportation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookingOptions.map((option) => (
            <Card key={option.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-t-4 border-t-waterfall-500">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-gray-100 rounded-full">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6">{option.description}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {option.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link to={option.link}>
                    <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white w-full">
                      {option.buttonText}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingInfo;
