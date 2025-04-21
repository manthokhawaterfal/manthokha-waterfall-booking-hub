
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Canada",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
    text: "Our stay near Manthokha Waterfall was magical! The hotel was comfortable with breathtaking views, and the sound of the waterfall was so peaceful. Highly recommend!"
  },
  {
    id: 2,
    name: "Ahmed Khan",
    location: "Lahore, Pakistan",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150",
    text: "The hospitality was exceptional. Staff went above and beyond to make our family trip memorable. The waterfall is a must-see attraction in Gilgit-Baltistan!"
  },
  {
    id: 3,
    name: "Emma Wilson",
    location: "UK",
    rating: 4,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150",
    text: "A stunning location with great accommodations. The guided tour of the waterfall was informative and the views were absolutely spectacular!"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-waterfall-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Guest Experiences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what our guests have to say about their stay near the magnificent Manthokha Waterfall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
