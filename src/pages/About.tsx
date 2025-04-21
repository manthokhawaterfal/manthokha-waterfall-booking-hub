
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import Newsletter from "../components/Newsletter";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-24">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Manthokha Waterfall</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover the natural wonder of Pakistan's Gilgit-Baltistan region
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">The Magnificent Manthokha Waterfall</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-center">
              <div>
                <p className="text-gray-700 mb-6">
                  Manthokha Waterfall is a spectacular natural wonder located in the District Kharmang region of Gilgit-Baltistan, Pakistan. Standing approximately 60 meters (197 feet) tall, it's one of the tallest waterfalls in Pakistan and a sight that leaves visitors in awe.
                </p>
                <p className="text-gray-700 mb-6">
                  The name "Manthokha" has special significance in the local language, reflecting the cultural heritage and natural beauty of the area. The waterfall is surrounded by lush greenery, picturesque landscapes, and rugged mountains, creating a serene and breathtaking environment.
                </p>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&h=600" 
                  alt="Manthokha Waterfall"
                  className="rounded-lg shadow-lg object-cover w-full h-full" 
                />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 mt-12 text-gray-900">Natural Splendor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-center">
              <div className="order-2 md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&h=600" 
                  alt="Mountains around Manthokha"
                  className="rounded-lg shadow-lg object-cover w-full h-full" 
                />
              </div>
              <div className="order-1 md:order-2">
                <p className="text-gray-700 mb-6">
                  The journey to Manthokha Waterfall takes visitors through some of the most scenic landscapes in Pakistan. The area is characterized by towering mountains, crystal-clear streams, and vibrant flora that changes with the seasons.
                </p>
                <p className="text-gray-700 mb-6">
                  In spring and summer, the surroundings burst with colorful wildflowers and lush vegetation, while autumn brings a spectacular display of golden and amber hues. Even in winter, when the water flow is reduced and sometimes frozen, the waterfall takes on a magical, ice-palace quality.
                </p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 mt-12 text-gray-900">Visitor Experience</h2>
            <div className="mb-8">
              <p className="text-gray-700 mb-6">
                Accessible by road from Skardu, Manthokha Waterfall has become a popular tourist destination for both domestic and international travelers. Visitors can enjoy various activities around the waterfall, including:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Hiking</h3>
                    <p className="text-gray-600">
                      Explore well-marked trails that lead to various viewpoints offering different perspectives of the waterfall.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Photography</h3>
                    <p className="text-gray-600">
                      Capture the breathtaking natural beauty of the waterfall and surrounding landscapes.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">Local Culture</h3>
                    <p className="text-gray-600">
                      Experience the rich traditions and warm hospitality of the local communities.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-gray-700 mb-6">
                The best time to visit Manthokha Waterfall is from May to October, when the weather is mild and the waterfall is at its most spectacular. However, each season offers a unique perspective on this natural wonder.
              </p>
              
              <p className="text-gray-700 mb-6">
                For visitors' comfort and convenience, various accommodations have been developed near the waterfall, ranging from luxury resorts to cozy inns, all designed to complement the natural beauty of the surroundings while providing modern amenities.
              </p>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 mt-12 text-gray-900">Conservation Efforts</h2>
            <div className="mb-8">
              <p className="text-gray-700 mb-6">
                As tourism to Manthokha Waterfall increases, there has been a growing emphasis on sustainable practices and conservation efforts to preserve the natural environment. Local authorities and community organizations work together to:
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Maintain clean and safe trails</li>
                <li>Implement waste management systems</li>
                <li>Educate visitors about the importance of respecting nature</li>
                <li>Support eco-friendly tourism practices</li>
                <li>Preserve the local flora and fauna</li>
              </ul>
              
              <p className="text-gray-700 mb-6">
                Visitors are encouraged to follow guidelines to minimize their environmental impact and help preserve the pristine beauty of Manthokha Waterfall for future generations.
              </p>
            </div>
            
            <div className="bg-waterfall-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4 text-waterfall-800">Plan Your Visit</h2>
              <p className="text-gray-700 mb-6">
                Manthokha Waterfall is more than just a destination—it's an experience that connects visitors with the raw beauty of nature and the rich cultural heritage of Gilgit-Baltistan. Whether you're an adventure seeker, nature lover, or someone looking for a peaceful retreat, the waterfall offers something for everyone.
              </p>
              <p className="text-gray-700 mb-6">
                Make your trip to Manthokha Waterfall memorable by staying at one of our hand-picked accommodations. Experience the perfect blend of comfort, luxury, and nature, right at the doorstep of this magnificent natural wonder.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;
