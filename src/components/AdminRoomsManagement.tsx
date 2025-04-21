
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

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
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New room form state
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    price: 0,
    capacity: 1,
    hotel_id: hotelId || "",
    features: [] as string[],
    images: [] as string[]
  });
  
  // Temp values for features and images
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    if (hotelId) {
      fetchRoomsForHotel(hotelId);
      // Set hotel id for new room form
      setNewRoom(prev => ({ ...prev, hotel_id: hotelId }));
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
      .select("*")
      .order('name');
    
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
      .eq("hotel_id", hotel_id)
      .order('name');
    
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
      .select("id, name")
      .order('name');
    
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
  
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setNewRoom(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setNewRoom(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setNewRoom(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewRoom(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({
      ...prev,
      [name]: name === "price" || name === "capacity" ? Number(value) : value
    }));
  };
  
  const handleCreateRoom = async () => {
    if (!newRoom.name || !newRoom.price) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!newRoom.hotel_id) {
      toast({
        title: "Hotel not selected",
        description: "Please select a hotel for this room.",
        variant: "destructive",
      });
      return;
    }
    
    const { data, error } = await supabase
      .from("rooms")
      .insert([newRoom])
      .select();
    
    if (error) {
      toast({
        title: "Error creating room",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Room created",
        description: `Room "${newRoom.name}" has been created successfully.`,
      });
      
      // Reset form
      setNewRoom({
        name: "",
        description: "",
        price: 0,
        capacity: 1,
        hotel_id: hotelId || "",
        features: [],
        images: []
      });
      
      setIsAddingRoom(false);
      
      // Refresh rooms list
      if (hotelId) {
        fetchRoomsForHotel(hotelId);
      } else {
        fetchRooms();
      }
    }
  };
  
  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    
    const { error } = await supabase
      .from("rooms")
      .delete()
      .eq("id", roomId);
    
    if (error) {
      toast({
        title: "Error deleting room",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Room deleted",
        description: "Room has been deleted successfully.",
      });
      
      // Refresh rooms list
      if (hotelId) {
        fetchRoomsForHotel(hotelId);
      } else {
        fetchRooms();
      }
    }
  };
  
  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {hotelName ? `Rooms for: ${hotelName}` : "Rooms Management"}
          </h2>
          <div className="flex gap-4">
            <Input
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
            <Dialog open={isAddingRoom} onOpenChange={setIsAddingRoom}>
              <DialogTrigger asChild>
                <Button className="bg-waterfall-600 hover:bg-waterfall-700 flex items-center gap-2">
                  <Plus size={16} /> Add New Room
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Room</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="font-medium">Room Name*</label>
                    <Input
                      id="name"
                      name="name"
                      value={newRoom.name}
                      onChange={handleInputChange}
                      placeholder="Deluxe Room"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="font-medium">Description</label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newRoom.description || ""}
                      onChange={handleInputChange}
                      placeholder="Spacious room with mountain view"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="price" className="font-medium">Price per Night*</label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={newRoom.price}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="capacity" className="font-medium">Capacity*</label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        value={newRoom.capacity}
                        onChange={handleInputChange}
                        min={1}
                      />
                    </div>
                  </div>
                  {!hotelId && (
                    <div className="grid gap-2">
                      <label htmlFor="hotel_id" className="font-medium">Assign to Hotel*</label>
                      <select
                        id="hotel_id"
                        name="hotel_id"
                        value={newRoom.hotel_id}
                        onChange={(e) => setNewRoom(prev => ({ ...prev, hotel_id: e.target.value }))}
                        className="border p-2 rounded"
                      >
                        <option value="">Select a hotel</option>
                        {hotels.map(hotel => (
                          <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* Features */}
                  <div className="grid gap-2">
                    <label className="font-medium">Features</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="e.g., Wi-Fi, TV, etc."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                      />
                      <Button onClick={handleAddFeature} className="shrink-0">Add</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-1 mt-2">
                      {newRoom.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <span className="text-sm">{feature}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFeature(index)}
                            className="text-red-500"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Images */}
                  <div className="grid gap-2">
                    <label className="font-medium">Images</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter image URL (or /your-image-from-public)"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                      />
                      <Button onClick={handleAddImage} className="shrink-0">Add</Button>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {newRoom.images.map((image, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                          <div className="flex items-center">
                            <img
                              src={image.startsWith("http") ? image : image.startsWith("/") ? image : "/" + image}
                              alt={`Preview ${index}`}
                              className="h-10 w-10 object-cover rounded-sm mr-2"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                            <span className="text-sm truncate max-w-[200px]">{image}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                            className="text-red-500"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingRoom(false)}>Cancel</Button>
                  <Button onClick={handleCreateRoom}>Create Room</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-waterfall-600"></div>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {hotelId ? "No rooms found for this hotel." : "No rooms found."}
            <div className="mt-4">
              <Button onClick={() => setIsAddingRoom(true)} className="bg-waterfall-600 hover:bg-waterfall-700">
                Add First Room
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Current Hotel</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>${room.price}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      {hotels.find((h) => h.id === room.hotel_id)?.name || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
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
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setAssigningRoomId(room.id);
                                setAssignHotelId(room.hotel_id ?? "");
                              }}
                            >
                              Assign
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteRoom(room.id)}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
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
