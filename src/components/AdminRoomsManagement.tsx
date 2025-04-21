
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Room {
  id: string;
  hotel_id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  images: string[];
  features: string[];
  created_at?: string;
  beds?: number;
  bathrooms?: number;
  size?: number;
  amenities?: string[];
}

interface Hotel {
  id: string;
  name: string;
}

interface AdminRoomsManagementProps {
  hotelId: string;
  hotelName: string;
  hotels: Hotel[];
}

const AdminRoomsManagement: React.FC<AdminRoomsManagementProps> = ({ hotelId, hotelName, hotels }) => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    hotel_id: hotelId,
    name: "",
    description: "",
    price: 0,
    capacity: 1,
    images: [] as string[],
    features: [] as string[],
  });

  // Temporary state for input fields
  const [newImage, setNewImage] = useState("");
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    fetchRooms();
    setFormData(prev => ({
      ...prev,
      hotel_id: hotelId,
    }));
  }, [hotelId]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('hotel_id', hotelId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRooms(data || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast({
        title: "Error fetching rooms",
        description: "Could not load room data.",
        variant: "destructive",
      });
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "price" || name === "capacity"
          ? Number(value)
          : value
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }));
      setNewImage("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setFormData({
      hotel_id: room.hotel_id,
      name: room.name,
      description: room.description || "",
      price: Number(room.price),
      capacity: Number(room.capacity),
      images: [...(room.images || [])],
      features: [...(room.features || [])],
    });
    setIsEditing(true);
  };

  const handleNewRoom = () => {
    setSelectedRoom(null);
    setFormData({
      hotel_id: hotelId,
      name: "",
      description: "",
      price: 10000,
      capacity: 2,
      images: [],
      features: [],
    });
    setIsEditing(true);
  };

  const handleSaveRoom = async () => {
    try {
      if (!formData.name || !formData.description || formData.price <= 0 || !formData.hotel_id) {
        toast({
          title: "Missing Fields",
          description: "Please fill all required fields and select a hotel.",
          variant: "destructive",
        });
        return;
      }
      if (selectedRoom) {
        const { error } = await supabase
          .from('rooms')
          .update({
            ...formData,
            price: Number(formData.price),
            capacity: Number(formData.capacity),
            images: formData.images,
            features: formData.features,
          })
          .eq('id', selectedRoom.id);
        if (error) throw error;
        toast({
          title: "Room Updated",
          description: `Room "${formData.name}" has been updated successfully.`,
        });
      } else {
        const { error } = await supabase
          .from('rooms')
          .insert([{
            ...formData,
            price: Number(formData.price),
            capacity: Number(formData.capacity),
            images: formData.images,
            features: formData.features,
          }]);
        if (error) throw error;
        toast({
          title: "Room Created",
          description: `Room "${formData.name}" has been created successfully.`,
        });
      }
      setIsEditing(false);
      fetchRooms();
    } catch (error) {
      console.error("Error saving room:", error);
      toast({
        title: "Error Saving Room",
        description: "Could not save room data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room? This cannot be undone.")) return;
    try {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast({
        title: "Room Deleted",
        description: "The room has been deleted successfully.",
      });
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
      toast({
        title: "Error Deleting Room",
        description: "Could not delete room. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">Rooms for {hotelName}</h3>
        <div className="flex space-x-4">
          <div className="w-64">
            <Input
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedRoom ? `Edit Room: ${selectedRoom.name}` : "Add New Room"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="hotel_id" className="font-medium">Hotel*</label>
                  <select
                    id="hotel_id"
                    name="hotel_id"
                    value={formData.hotel_id}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                  >
                    {hotels.map(hotel => (
                      <option value={hotel.id} key={hotel.id}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="name" className="font-medium">Room Name*</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="font-medium">Description*</label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="price" className="font-medium">Price (PKR)*</label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="capacity" className="font-medium">Capacity (Guests)*</label>
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="font-medium">Images</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter image URL"
                      value={newImage}
                      onChange={e => setNewImage(e.target.value)}
                    />
                    <Button onClick={handleAddImage} className="shrink-0">Add</Button>
                  </div>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {formData.images.map((image, index) => (
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
                <div className="grid gap-2">
                  <label className="font-medium">Features</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter room feature"
                      value={newFeature}
                      onChange={e => setNewFeature(e.target.value)}
                    />
                    <Button onClick={handleAddFeature} className="shrink-0">Add</Button>
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    {formData.features.map((feature, index) => (
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRoom}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            onClick={handleNewRoom}
            className="bg-waterfall-600 hover:bg-waterfall-700 flex items-center"
          >
            <Plus size={16} className="mr-1" /> New Room
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-waterfall-600"></div>
        </div>
      ) : filteredRooms.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Price (PKR)</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell>{room.price && Number(room.price).toLocaleString()}</TableCell>
                  <TableCell>{room.capacity} guests</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRoom(room)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteRoom(room.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-gray-500 mb-4">No rooms found for this hotel</p>
          <Button
            onClick={handleNewRoom}
            className="bg-waterfall-600 hover:bg-waterfall-700"
          >
            Add First Room
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AdminRoomsManagement;
