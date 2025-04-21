
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import BookingEditForm from "./BookingEditForm";

interface BookingManagementProps {
  bookings: any[];
  loading: boolean;
  onBookingUpdated: () => void;
}

const BookingManagement: React.FC<BookingManagementProps> = ({ 
  bookings, 
  loading,
  onBookingUpdated 
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBooking, setEditingBooking] = useState<any>(null);
  
  const filteredBookings = bookings.filter(booking =>
    booking.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast({
        title: "Booking deleted",
        description: "The booking has been successfully deleted.",
      });
      
      onBookingUpdated();
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        title: "Delete failed",
        description: "Could not delete the booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <div className="w-1/3">
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {editingBooking ? (
        <BookingEditForm 
          booking={editingBooking} 
          onCancel={() => setEditingBooking(null)} 
          onSave={() => {
            setEditingBooking(null);
            onBookingUpdated();
          }} 
        />
      ) : (
        <>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-waterfall-600"></div>
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Guest Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.full_name}</TableCell>
                      <TableCell>{booking.email}</TableCell>
                      <TableCell>{formatDate(booking.checkin_date)}</TableCell>
                      <TableCell>{formatDate(booking.checkout_date)}</TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingBooking(booking)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteBooking(booking.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-4 text-gray-400"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
              <p>No bookings found</p>
              <p className="mt-2 text-sm">
                {searchQuery ? "Try adjusting your search query" : "Add a new booking to get started"}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookingManagement;
