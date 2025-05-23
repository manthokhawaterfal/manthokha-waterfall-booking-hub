
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define image interface
interface SlideImage {
  src: string;
  alt: string;
}

// Prepare slideshow images with both defaults and images from public/ folder provided as window.heroSlides for demo
const defaultSlides: SlideImage[] = [
  {
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1920&q=80",
    alt: "Waterfall view in mountains"
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
    alt: "Foggy mountain view"
  },
  {
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=80",
    alt: "River between mountains"
  }
];

// Helper to detect local images in 'public/' folder by a convention (starting with "/" or via a global)
const getLocalImages = (): SlideImage[] => {
  // If using static import (preferred)
  const localImgArr: SlideImage[] = [];
  // You can add e.g. "/my-waterfall-1.jpg" below, or update window.heroSlides = [{src, alt}, ...] in your app for dynamic demo
  if (window && (window as any).heroSlides) {
    return (window as any).heroSlides;
  }
  // fallback demo example:
  // localImgArr.push({ src: "/header-local.jpg", alt: "Your uploaded header image" });
  return localImgArr;
};

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<SlideImage[]>([...defaultSlides, ...getLocalImages()]);

  // Allow reloading images from window.heroSlides or similar
  useEffect(() => {
    const loadedImages = [...defaultSlides, ...getLocalImages()];
    setSlides(loadedImages);
    console.log("Loaded slideshow images:", loadedImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Main background slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${slide.src}')`,
              opacity: currentSlide === index ? 1 : 0,
            }}
            aria-hidden={currentSlide !== index}
          >
            {/* Overlay for each slide */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30"></div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button 
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white h-10 w-10 rounded-full flex items-center justify-center"
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      
      <button 
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white h-10 w-10 rounded-full flex items-center justify-center"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </button>

      {/* Content - overlaid on top of the carousel */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center absolute inset-0 z-10 text-center">
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

export default HeroSlideshow;
