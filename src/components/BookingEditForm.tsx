
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingEditFormProps {
  booking: any;
  onCancel: () => void;
  onSave: () => void;
}

const BookingEditForm: React.FC<BookingEditFormProps> = ({ booking, onCancel, onSave }) => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    full_name: booking.full_name,
    email: booking.email,
    phone: booking.phone || "",
    checkin_date: booking.checkin_date,
    checkout_date: booking.checkout_date,
    guests: booking.guests,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("bookings")
        .update(formState)
        .eq("id", booking.id);

      if (error) throw error;

      toast({
        title: "Booking updated",
        description: "The booking has been successfully updated.",
      });
      
      onSave();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast({
        title: "Update failed",
        description: "Could not update the booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4">Edit Booking</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={formState.full_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              value={formState.guests}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="checkin_date">Check-in Date</Label>
            <Input
              id="checkin_date"
              name="checkin_date"
              type="date"
              value={formState.checkin_date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="checkout_date">Check-out Date</Label>
            <Input
              id="checkout_date"
              name="checkout_date"
              type="date"
              value={formState.checkout_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingEditForm;
