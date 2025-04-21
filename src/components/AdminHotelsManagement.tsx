
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
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import AdminRoomsManagement from "./AdminRoomsManagement";

interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  images: string[];
  features: string[];
  overview: string;
  created_at?: string;
}

const AdminHotelsManagement = () => {
  const { toast } = useToast();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    rating: 4.5,
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
      const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      toast({
        title: "Error fetching hotels",
        description: "Could not load hotel data.",
        variant: "destructive",
      });
      setHotels([]);
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
      rating: Number(hotel.rating),
      images: [...(hotel.images || [])],
      features: [...(hotel.features || [])],
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
      setSaveLoading(true);
      
      if (!formData.name || !formData.description || !formData.location) {
        toast({
          title: "Missing Fields",
          description: "Please fill all required fields",
          variant: "destructive",
        });
        setSaveLoading(false);
        return;
      }
      
      const hotelData = {
        ...formData,
        rating: Number(formData.rating),
        images: formData.images || [],
        features: formData.features || []
      };
      
      console.log("Saving hotel data:", hotelData);
      
      if (selectedHotel) {
        // Update existing hotel in Supabase
        const { data, error } = await supabase
          .from('hotels')
          .update(hotelData)
          .eq('id', selectedHotel.id)
          .select();
          
        console.log("Update response:", { data, error });
          
        if (error) throw error;
        
        toast({
          title: "Hotel Updated",
          description: `Hotel "${formData.name}" has been updated successfully.`,
        });
      } else {
        // Insert new hotel
        const { data, error } = await supabase
          .from('hotels')
          .insert([hotelData])
          .select();
          
        console.log("Insert response:", { data, error });
          
        if (error) throw error;
        
        toast({
          title: "Hotel Created",
          description: `Hotel "${formData.name}" has been created successfully.`,
        });
      }
      
      setIsEditing(false);
      fetchHotels();
    } catch (error: any) {
      console.error("Error saving hotel:", error);
      toast({
        title: "Error Saving Hotel",
        description: error.message || "Could not save hotel data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteHotel = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hotel? This cannot be undone.")) return;
    try {
      const { error } = await supabase
        .from('hotels')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast({
        title: "Hotel Deleted",
        description: "The hotel has been deleted successfully.",
      });
      fetchHotels();
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
        <AdminRoomsManagement hotelId={selectedHotel.id} hotelName={selectedHotel.name} hotels={hotels} />
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
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button
                onClick={handleNewHotel}
                className="bg-waterfall-600 hover:bg-waterfall-700 flex items-center"
              >
                <Plus size={16} className="mr-1" /> New Hotel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedHotel ? `Edit Hotel: ${selectedHotel.name}` : "Add New Hotel"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* --- FIELDS --- */}
                <div className="grid gap-2">
                  <label htmlFor="name" className="font-medium">Hotel Name*</label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="location" className="font-medium">Location*</label>
                  <Input 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="font-medium">Short Description*</label>
                  <Input 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="overview" className="font-medium">Long Description/Overview*</label>
                  <Textarea 
                    id="overview"
                    name="overview"
                    value={formData.overview}
                    onChange={handleChange}
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
                  />
                </div>
                {/* Images */}
                <div className="grid gap-2">
                  <label className="font-medium">Images</label>
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter image URL (or /your-image-from-public)" 
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
                {/* Features */}
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
                <Button 
                  onClick={handleSaveHotel} 
                  disabled={saveLoading}
                >
                  {saveLoading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </DialogContent>
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
