
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutWaterfall = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Manthokha Waterfall</h2>
            <p className="text-gray-600 mb-4">
              Manthokha Waterfall is a spectacular natural wonder located in the District Kharmang region of Gilgit-Baltistan, Pakistan. Standing approximately 60 meters (197 feet) tall, it's one of the tallest waterfalls in Pakistan.
            </p>
            <p className="text-gray-600 mb-4">
              The waterfall is surrounded by lush greenery, picturesque landscapes, and rugged mountains, creating a serene and breathtaking environment that attracts visitors from all over the world.
            </p>
            <p className="text-gray-600 mb-8">
              Accessible by road from Skardu, Manthokha Waterfall offers a perfect retreat for nature lovers and adventure seekers alike. The stunning views and peaceful atmosphere make it an ideal destination for those looking to escape the bustle of city life.
            </p>
            <Link to="/about">
              <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white">
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&h=800" 
                alt="Manthokha Waterfall"
                className="rounded-lg shadow-lg object-cover w-full h-64" 
              />
              <img 
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=400" 
                alt="Mountains around Manthokha"
                className="rounded-lg shadow-lg object-cover w-full h-48" 
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600&h=400" 
                alt="River near Manthokha"
                className="rounded-lg shadow-lg object-cover w-full h-48" 
              />
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&h=800" 
                alt="Scenic View"
                className="rounded-lg shadow-lg object-cover w-full h-64" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWaterfall;
