
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { hotels as initialHotels } from "../data/hotels";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import AdminRoomsManagement from "./AdminRoomsManagement";

interface Hotel {
  id: number | string;
  name: string;
  description: string;
  location: string;
  rating: number;
  images: string[];
  features: string[];
  overview: string;
}

const AdminHotelsManagement = () => {
  const { toast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    rating: 0,
    images: [] as string[],
    features: [] as string[],
    overview: ""
  });
  
  // Temporary state for input fields
  const [newImage, setNewImage] = useState("");
  const [newFeature, setNewFeature] = useState("");
  
  useEffect(() => {
    fetchHotels();
  }, []);
  
  const fetchHotels = async () => {
    try {
      setLoading(true);
      
      // Since there's no hotels table yet in Supabase, use the initial data
      // In the future, when hotels table exists, uncomment this code:
      /*
      const { data, error } = await supabase
        .from('hotels')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      // If we have data in Supabase, use it
      if (data && data.length > 0) {
        setHotels(data);
      } else {
        // Otherwise, use initial data
        setHotels(initialHotels);
      }
      */
      
      // For now, use initial data
      setHotels(initialHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast({
        title: "Error fetching hotels",
        description: "Could not load hotel data. Using default dataset instead.",
        variant: "destructive",
      });
      
      setHotels(initialHotels);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
  
  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      name: hotel.name,
      description: hotel.description,
      location: hotel.location,
      rating: hotel.rating,
      images: [...hotel.images],
      features: [...hotel.features],
      overview: hotel.overview || ""
    });
    setIsEditing(true);
  };
  
  const handleNewHotel = () => {
    setSelectedHotel(null);
    setFormData({
      name: "",
      description: "",
      location: "",
      rating: 4.5,
      images: [],
      features: [],
      overview: ""
    });
    setIsEditing(true);
  };
  
  const handleSaveHotel = async () => {
    try {
      // Basic validation
      if (!formData.name || !formData.description || !formData.location) {
        toast({
          title: "Missing Fields",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        return;
      }
      
      if (selectedHotel) {
        // Update existing hotel
        const updatedHotel = {
          ...selectedHotel,
          ...formData
        };
        
        // For now, just update local state as we don't have a Supabase table yet
        setHotels(prev => 
          prev.map(h => h.id === selectedHotel.id ? updatedHotel : h)
        );
        
        toast({
          title: "Hotel Updated",
          description: `Hotel "${formData.name}" has been updated successfully.`,
        });
      } else {
        // Create new hotel
        const newHotel = {
          id: Date.now(), // Simple ID for now
          ...formData
        };
        
        setHotels(prev => [...prev, newHotel]);
        
        toast({
          title: "Hotel Created",
          description: `Hotel "${formData.name}" has been created successfully.`,
        });
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving hotel:", error);
      toast({
        title: "Error Saving Hotel",
        description: "Could not save hotel data. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteHotel = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this hotel? This cannot be undone.")) return;
    
    try {
      // For now, just remove from local state
      setHotels(prev => prev.filter(h => h.id !== id));
      
      toast({
        title: "Hotel Deleted",
        description: "The hotel has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        title: "Error Deleting Hotel",
        description: "Could not delete hotel. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleManageRooms = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowRooms(true);
  };
  
  if (showRooms && selectedHotel) {
    return (
      <div>
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => setShowRooms(false)}
            className="mr-4"
          >
            ← Back to Hotels
          </Button>
          <h2 className="text-2xl font-bold">Rooms for: {selectedHotel.name}</h2>
        </div>
        <AdminRoomsManagement hotelId={selectedHotel.id} hotelName={selectedHotel.name} />
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Hotel Management</h2>
        <div className="flex space-x-4">
          <div className="w-64">
            <Input
              placeholder="Search hotels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                onClick={handleNewHotel}
                className="bg-waterfall-600 hover:bg-waterfall-700 flex items-center"
              >
                <Plus size={16} className="mr-1" /> New Hotel
              </Button>
            </DialogTrigger>
            {isEditing && (
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {selectedHotel ? `Edit Hotel: ${selectedHotel.name}` : "Add New Hotel"}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="font-medium">Hotel Name*</label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="location" className="font-medium">Location*</label>
                    <Input 
                      id="location" 
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="description" className="font-medium">Short Description*</label>
                    <Input 
                      id="description" 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="overview" className="font-medium">Long Description/Overview*</label>
                    <Textarea 
                      id="overview" 
                      name="overview"
                      value={formData.overview}
                      onChange={handleChange}
                      required
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="rating" className="font-medium">Rating (1-5)*</label>
                    <Input 
                      id="rating" 
                      name="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                    />
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
                              src={image} 
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
                        placeholder="Enter hotel feature" 
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
                  <Button onClick={handleSaveHotel}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-waterfall-600"></div>
        </div>
      ) : filteredHotels.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell className="font-medium">{hotel.name}</TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell>{hotel.rating}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManageRooms(hotel)}
                    >
                      Manage Rooms
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditHotel(hotel)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteHotel(hotel.id)}
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
          <p className="text-gray-500 mb-4">No hotels found</p>
          <Button 
            onClick={handleNewHotel}
            className="bg-waterfall-600 hover:bg-waterfall-700"
          >
            Create First Hotel
          </Button>
        </Card>
      )}
    </div>
  );
};

export default AdminHotelsManagement;
