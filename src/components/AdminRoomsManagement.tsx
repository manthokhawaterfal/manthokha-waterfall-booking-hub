
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface AdminRoomsManagementProps {
  hotelId?: string;
  hotelName?: string;
  hotels?: any[];
}

const AdminRoomsManagement: React.FC<AdminRoomsManagementProps> = ({ hotelId, hotelName, hotels: propHotels }) => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningRoomId, setAssigningRoomId] = useState<string | null>(null);
  const [assignHotelId, setAssignHotelId] = useState<string>("");

  useEffect(() => {
    if (hotelId) {
      fetchRoomsForHotel(hotelId);
    } else {
      fetchRooms();
    }
    
    if (propHotels) {
      setHotels(propHotels);
    } else {
      fetchHotels();
    }
  }, [hotelId, propHotels]);

  const fetchRooms = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("rooms")
      .select("*");
    
    if (error) {
      toast({
        title: "Error fetching rooms",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRooms(data || []);
    }
    setLoading(false);
  };

  const fetchRoomsForHotel = async (hotel_id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("hotel_id", hotel_id);
    
    if (error) {
      toast({
        title: "Error fetching rooms",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRooms(data || []);
    }
    setLoading(false);
  };

  const fetchHotels = async () => {
    const { data, error } = await supabase
      .from("hotels")
      .select("id, name");
    
    if (error) {
      toast({
        title: "Error fetching hotels",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setHotels(data || []);
    }
  };

  const handleAssignRoom = async (roomId: string, hotelId: string) => {
    if (!hotelId) {
      toast({
        title: "No hotel selected",
        description: "Please select a hotel to assign the room to.",
        variant: "destructive",
      });
      return;
    }
    
    const { error } = await supabase
      .from("rooms")
      .update({ hotel_id: hotelId })
      .eq("id", roomId);
    
    if (error) {
      toast({
        title: "Error assigning room",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Room assigned",
        description: "Room has been successfully assigned to the hotel.",
      });
      
      if (hotelId) {
        fetchRoomsForHotel(hotelId);
      } else {
        fetchRooms();
      }
    }
    
    setAssigningRoomId(null);
    setAssignHotelId("");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {hotelName ? `Rooms for: ${hotelName}` : "Rooms Management"}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-waterfall-600"></div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {hotelId ? "No rooms found for this hotel." : "No rooms found."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Name</TableHead>
                  <TableHead>Current Hotel</TableHead>
                  <TableHead>Assign To Hotel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>
                      {hotels.find((h) => h.id === room.hotel_id)?.name || "-"}
                    </TableCell>
                    <TableCell>
                      {assigningRoomId === room.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={assignHotelId}
                            onChange={(e) => setAssignHotelId(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option value="">Select Hotel</option>
                            {hotels.map((hotel) => (
                              <option value={hotel.id} key={hotel.id}>
                                {hotel.name}
                              </option>
                            ))}
                          </select>
                          <Button
                            size="sm"
                            onClick={() => handleAssignRoom(room.id, assignHotelId)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setAssigningRoomId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            setAssigningRoomId(room.id);
                            setAssignHotelId(room.hotel_id ?? "");
                          }}
                        >
                          Assign
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminRoomsManagement;
