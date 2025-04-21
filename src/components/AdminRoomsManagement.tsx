
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

const AdminRoomsManagement = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningRoomId, setAssigningRoomId] = useState<string | null>(null);
  const [assignHotelId, setAssignHotelId] = useState<string>("");

  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("rooms")
      .select("*");
    if (!error) setRooms(data || []);
    setLoading(false);
  };

  const fetchHotels = async () => {
    const { data, error } = await supabase
      .from("hotels")
      .select("id, name");
    if (!error) setHotels(data || []);
  };

  const handleAssignRoom = async (roomId: string, hotelId: string) => {
    if (!hotelId) return;
    await supabase
      .from("rooms")
      .update({ hotel_id: hotelId })
      .eq("id", roomId);
    setAssigningRoomId(null);
    setAssignHotelId("");
    fetchRooms();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">Rooms Management (Assign To Hotels)</h2>
        {loading ? (
          <div>Loading rooms...</div>
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
