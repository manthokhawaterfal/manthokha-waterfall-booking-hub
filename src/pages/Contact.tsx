
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're here to help with any questions you have about Manthokha Waterfall and our accommodations
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-waterfall-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-waterfall-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-gray-600">Manthokha Waterfall, District Kharmang, Gilgit-Baltistan, Pakistan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-waterfall-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-waterfall-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-600">+92 345 678 9012</p>
                      <p className="text-gray-600">+92 321 123 4567</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-waterfall-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-waterfall-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-600">info@manthokhawaterfall.com</p>
                      <p className="text-gray-600">bookings@manthokhawaterfall.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex">
                    <div className="bg-waterfall-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-waterfall-700" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Office Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="block mb-2">
                        Your Name *
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="block mb-2">
                        Email Address *
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="block mb-2">
                      Subject
                    </Label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help you?" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="block mb-2">
                      Message *
                    </Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please describe your query or message..." 
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-waterfall-600 hover:bg-waterfall-700 text-white py-6"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">What are the best months to visit Manthokha Waterfall?</h3>
                <p className="text-gray-600">
                  The best time to visit is from May to October when the weather is mild and the waterfall is at its most spectacular. However, each season offers a unique perspective.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">How do I get to Manthokha Waterfall?</h3>
                <p className="text-gray-600">
                  The waterfall is accessible by road from Skardu. The journey takes approximately 2-3 hours, depending on road conditions. We can help arrange transportation.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Do I need to make hotel reservations in advance?</h3>
                <p className="text-gray-600">
                  Yes, especially during peak tourist season (June-August). We recommend booking accommodations at least 2-3 months in advance for the best availability and rates.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">What should I bring when visiting the waterfall?</h3>
                <p className="text-gray-600">
                  Comfortable walking shoes, weather-appropriate clothing, sunscreen, insect repellent, water bottle, and a camera. A light jacket is recommended even in summer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
