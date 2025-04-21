
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BookingManagement from "@/components/AdminBookingManagement";
import AdminTabs from "@/components/AdminTabs";
import AdminHotelsManagement from "@/components/AdminHotelsManagement";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error fetching bookings",
        description: "Could not load booking data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button 
              onClick={fetchBookings}
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Refresh
            </Button>
          </div>

          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "bookings" && (
            <BookingManagement 
              bookings={bookings} 
              loading={loading} 
              onBookingUpdated={fetchBookings} 
            />
          )}
          
          {activeTab === "hotels" && (
            <AdminHotelsManagement />
          )}
          
          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-500">Admin settings will be available in future updates.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
