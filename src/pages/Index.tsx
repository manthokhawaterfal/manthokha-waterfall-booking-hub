
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSlideshow from "../components/HeroSlideshow";
import FeaturedHotels from "../components/FeaturedHotels";
import AboutWaterfall from "../components/AboutWaterfall";
import BookingInfo from "../components/BookingInfo";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSlideshow />
        <BookingInfo />
        <AboutWaterfall />
        <FeaturedHotels />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
