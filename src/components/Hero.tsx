
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30 z-1"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 fade-in">
          Experience the Magic of <span className="text-waterfall-300">Manthokha Waterfall</span>
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mb-8 slide-up">
          Discover premium accommodations nestled in the breathtaking landscapes of Gilgit-Baltistan, Pakistan
        </p>
        <div className="flex flex-col sm:flex-row gap-4 slide-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/hotels">
            <Button className="bg-waterfall-600 hover:bg-waterfall-700 text-white text-lg px-8 py-6">
              Browse Hotels
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </Link>
        </div>
        
        {/* Water animation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-waterfall-500/20 animate-water-flow z-1"></div>
      </div>
    </div>
  );
};

export default Hero;
